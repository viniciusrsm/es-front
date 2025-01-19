import { apiService } from "@/service/api";
import { Dialog, DialogContent } from "@mui/material";
import { ReactNode, useState } from "react";

interface ReviewDialogProps {
    open: boolean;
    setOpen: (value: boolean) => void;
    userId?: number;
    restaurantId?: number;
}

export default function ReviewDialog(props: ReviewDialogProps){

    const { open, setOpen, userId, restaurantId } = props;
    const [stars, setStars] = useState<number | undefined>();
    const [description, setDescription] = useState<string>("");
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!stars || stars < 1 || stars > 5) {
          setError("A nota deve estar entre 1 e 5.");
          return;
        }
    
        try {
          const response= await apiService.post("/rating", {
            stars,
            description,
            userId,
            restaurantId,
          });
          
          setOpen(false); // Fecha o modal
          setStars(undefined); // Reseta os campos
          setDescription("");
          setError(null);
          alert("Avaliação enviada com sucesso!");
          window.location.reload();
        } catch (error) {
          console.error("Erro ao enviar avaliação:", error);
          setError("Erro ao enviar a avaliação. Tente novamente.");
        }
      };

    return (
        <Dialog open={open} onClose={() => setOpen(false)} className={`fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center`}>
            <DialogContent>
                <h2 className="text-xl font-semibold mb-4">Avalie</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    
                    <input
                    type="number"
                    placeholder="Nota (1 a 5)"
                    min={1}
                    max={5}
                    value={stars}
                    onChange={(e) => setStars(Number(e.target.value))}
                    className="w-full p-3 rounded-md bg-gray-200 text-gray-900 placeholder-gray-600 focus:outline-none"
                    />
                    <textarea
                    placeholder="Descrição"
                    rows={6} // Define a altura da área de texto
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full p-3 rounded-md bg-gray-200 text-gray-900 placeholder-gray-600 focus:outline-none"
                    />
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