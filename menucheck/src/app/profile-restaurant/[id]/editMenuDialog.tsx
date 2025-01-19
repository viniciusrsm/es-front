import { apiService } from "@/service/api";
import { Dialog, DialogContent } from "@mui/material";
import { useEffect, useState } from "react";

interface EditMenuDialogProps {
  open: boolean;
  setOpen: (value: boolean) => void;
  infos?: Menu | null; // Define o tipo da entidade Menu
}

export default function EditMenuDialog(props: EditMenuDialogProps) {
  const { open, setOpen, infos } = props;

  // Estados locais para armazenar valores do formulário
  const [name, setName] = useState(infos?.name || "");
  const [restaurantId, setRestaurantId] = useState(infos?.restaurantId || 0);
  const [error, setError] = useState<string | null>(null);

  // Atualiza os valores quando o modal é aberto ou as informações mudam
  useEffect(() => {
    if (infos) {
      setName(infos.name || "");
      setRestaurantId(infos.restaurantId || 0);
    }
  }, [infos]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validações simples
    if (!name.trim()) {
      setError("O nome do menu não pode estar vazio.");
      return;
    }

    if (!restaurantId || restaurantId <= 0) {
      setError("O ID do restaurante deve ser válido.");
      return;
    }

    try {
      // Chamada à API para atualizar o menu
      const response = await apiService.patch(`/menu/${infos?.id}/${infos?.userId}`, {
        name,
        restaurantId,
        userId: infos?.userId, // Mantém o userId original
      });

      alert("Menu atualizado com sucesso!");
      setOpen(false); // Fecha o modal
      setError(null); // Limpa erros
      window.location.reload(); // Recarrega a página para refletir mudanças
    } catch (error) {
      console.error("Erro ao atualizar menu:", error);
      setError("Erro ao atualizar o menu. Tente novamente.");
    }
  };

  return (
    <Dialog
      open={open}
      onClose={() => setOpen(false)}
      className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
    >
      <DialogContent>
        <h2 className="text-xl font-semibold mb-4">Editar Menu</h2>
        {error && <p className="text-red-500 mb-2">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <label className="block">
            <span className="block text-gray-700">Nome do Menu</span>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-3 rounded-md bg-gray-200 text-gray-900 placeholder-gray-600 focus:outline-none"
            />
          </label>
          <label className="block">
            <span className="block text-gray-700">ID do Restaurante</span>
            <input
              type="number"
              min={1}
              value={restaurantId}
              onChange={(e) => setRestaurantId(Number(e.target.value))}
              className="w-full p-3 rounded-md bg-gray-200 text-gray-900 placeholder-gray-600 focus:outline-none"
            />
          </label>
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
              Salvar Modificações
            </button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
