import { apiService } from "@/service/api";
import { Dialog, DialogContent } from "@mui/material";
import { useState } from "react";

interface ReviewDialogProps {
    open: boolean;
    setOpen: (value: boolean) => void;
    infos?: Rating | null
}

export default function ReviewDialog(props: ReviewDialogProps){

    const { open, setOpen} = props;
    // Estado para armazenar os valores do formulário
    const [rating, setRating] = useState<number | null>(null);
    const [description, setDescription] = useState<string>("");


  // Função para enviar os dados ao backend
  const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault(); // Evita o reload da página
        if (!rating || rating < 1 || rating > 5) {
            alert("Por favor, insira uma nota válida entre 1 e 5.");
            return;
        }

        try {
            const response = await apiService.post("/rating", {
                rating,
                description,
            });
            

            alert("Avaliação enviada com sucesso!");
            setOpen(false); // Fecha o modal após o envio bem-sucedido
            setRating(null); // Limpa o campo de nota
            setDescription(""); // Limpa o campo de descrição
        } catch (error) {
            console.error(error);
            alert(
                "Ocorreu um erro ao enviar sua avaliação. Por favor, tente novamente."
            );
        }
    };

    return (
        <Dialog open={open} onClose={() => setOpen(false)} className={`fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center`}>
            <DialogContent>
                <h2 className="text-xl font-semibold mb-4">Avalie</h2>
                <form className="space-y-4">
                    
                    <input
                    type="number"
                    placeholder="Nota (1 a 5)"
                    min={1}
                    max={5}
                    value={rating || ""}
                    onChange={(e) => setRating(Number(e.target.value))}
                    className="w-full p-3 rounded-md bg-gray-200 text-gray-900 placeholder-gray-600 focus:outline-none"
                    />
                    <textarea
                    placeholder="Descrição"
                    rows={6} // Define a altura da área de texto
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