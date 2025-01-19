import { apiService } from "@/service/api";
import { Dialog, DialogContent, DialogTitle } from "@mui/material";

interface DeleteMenuDialogProps {
  open: boolean;
  setOpen: (value: boolean) => void;
  id?: number; // ID do menu a ser deletado
}

export default function DeleteMenuDialog(props: DeleteMenuDialogProps) {
  const { open, setOpen, id } = props;

  const handleDelete = async () => {
    if (!id) {
      alert("Erro: ID do menu não encontrado!");
      return;
    }

    try {
      // Chamada à API para deletar o menu
      await apiService.delete(`/menu/${id}`);
      alert("Menu deletado com sucesso!");
      setOpen(false); // Fecha o modal
      window.location.reload(); // Recarrega a página para refletir mudanças
    } catch (error) {
      console.error("Erro ao deletar menu:", error);
      alert("Erro ao deletar o menu. Tente novamente.");
    }
  };

  return (
    <Dialog open={open} onClose={() => setOpen(false)} className="p-4">
      <DialogTitle className="text-center">Deletar menu?</DialogTitle>
      <DialogContent>
        <p className="text-gray-700 mb-4">
          Tem certeza que deseja deletar este menu? Esta ação não pode ser desfeita.
        </p>
        <div className="flex justify-end gap-2">
          <button
            type="button"
            className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
            onClick={() => setOpen(false)}
          >
            Cancelar
          </button>
          <button
            className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
            onClick={handleDelete}
          >
            Confirmar
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
