import { apiService } from "@/service/api";
import { Dialog, DialogContent } from "@mui/material";
import { useState } from "react";

interface MenuDialogProps {
  open: boolean;
  setOpen: (value: boolean) => void;
  userId?: number;
  restaurantId: number;
}

export default function MenuDialog(props: MenuDialogProps) {
  const { open, setOpen, userId, restaurantId } = props;
  const [name, setName] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setError("O nome do menu é obrigatório.");
      return;
    }

    try {
      await apiService.post("/menu", {
        name,
        userId,
        restaurantId,
      });

      setOpen(false); // Fecha o modal
      setName(""); // Reseta os campos
      setError(null);
      alert("Menu criado com sucesso!");
      window.location.reload();
    } catch (error) {
      console.error("Erro ao criar menu:", error);
      setError("Erro ao criar o menu. Tente novamente.");
    }
  };

  return (
    <Dialog
      open={open}
      onClose={() => setOpen(false)}
      className={`fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center`}
    >
      <DialogContent>
        <h2 className="text-xl font-semibold mb-4">Criar Menu</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Nome do Menu"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-3 rounded-md bg-gray-200 text-gray-900 placeholder-gray-600 focus:outline-none"
          />
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <div className="flex justify-end gap-2">
            <button
              type="button"
              className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
              onClick={() => setOpen(false)}
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
            >
              Enviar
            </button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
