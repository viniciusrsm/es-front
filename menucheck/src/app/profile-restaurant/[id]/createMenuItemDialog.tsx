import { apiService } from "@/service/api";
import { Dialog, DialogContent } from "@mui/material";
import { useState } from "react";

interface MenuItemDialogProps {
  open: boolean;
  setOpen: (value: boolean) => void;
  menuId: number; // ID do menu ao qual o item será associado
}

export default function MenuItemDialog(props: MenuItemDialogProps) {
  const { open, setOpen, menuId } = props;
  const [name, setName] = useState<string>("");
  const [desc, setDesc] = useState<string>("");
  const [price, setPrice] = useState<number>(0);
  const [error, setError] = useState<string | null>(null);
  

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validações simples
    if (!name.trim()) {
      setError("O nome do item é obrigatório.");
      return;
    }

    if (!desc.trim()) {
      setError("A descrição do item é obrigatória.");
      return;
    }

    if (price <= 0) {
      setError("O preço deve ser maior que 0.");
      return;
    }

    try {
      // Chamada para criar um novo MenuItem
      await apiService.post("/menu-item", {
        name,
        desc,
        price,
        menuId, // Adiciona o ID do menu ao qual o item pertence
      });

      // Sucesso: limpa os estados e fecha o modal
      setOpen(false);
      setName("");
      setDesc("");
      setPrice(0);
      setError(null);
      alert("Item criado com sucesso!");
      window.location.reload(); // Recarrega para refletir as mudanças
    } catch (error) {
      console.error("Erro ao criar item do menu:", error);
      setError("Erro ao criar o item. Tente novamente.");
    }
  };

  return (
    <Dialog
      open={open}
      onClose={() => setOpen(false)}
      className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
    >
      <DialogContent>
        <h2 className="text-xl font-semibold mb-4">Criar Item do Menu</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Nome do Item"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-3 rounded-md bg-gray-200 text-gray-900 placeholder-gray-600 focus:outline-none"
          />
          <textarea
            placeholder="Descrição"
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
            rows={3}
            className="w-full p-3 rounded-md bg-gray-200 text-gray-900 placeholder-gray-600 focus:outline-none"
          />
          <input
            type="number"
            placeholder="Preço"
            value={price}
            onChange={(e) => setPrice(Number(e.target.value))}
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
