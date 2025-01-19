import { apiService } from "@/service/api";
import { Dialog, DialogContent, DialogTitle } from "@mui/material";

interface DeleteDialogProps {
    open: boolean;
    setOpen: (value: boolean) => void;
    restaurantId?: number;
}

export default function DeleteDialog(props: DeleteDialogProps){

    const { open, setOpen, restaurantId } = props;

    const handleDelete = async () => {
        if (!restaurantId) {
          alert("Erro: ID do restaurante não encontrado!");
          return;
        }
    
        try {
          // Chamada à API para deletar o restaurante
          await apiService.delete(`/restaurant/${restaurantId}`);
          alert("Restaurante deletado com sucesso!");
          setOpen(false); // Fecha o modal
          window.location.reload(); // Recarrega a página para refletir mudanças
        } catch (error) {
          console.error("Erro ao deletar restaurante:", error);
          alert("Erro ao deletar o restaurante. Tente novamente.");
        }
      };

    return (
        <Dialog open={open} onClose={() => setOpen(false)} className={`p-4`}>
            <DialogTitle className="text-center">Deletar restaurante?</DialogTitle>
            <DialogContent>

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