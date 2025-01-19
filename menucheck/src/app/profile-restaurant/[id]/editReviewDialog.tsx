import { apiService } from "@/service/api";
import { Dialog, DialogContent } from "@mui/material";
import { useEffect, useState } from "react";



interface EditEvaluationDialogProps {
  open: boolean;
  setOpen: (value: boolean) => void;
  infos?: Rating | null;
}

export default function EditReviewDialog(props: EditEvaluationDialogProps) {
  const { open, setOpen, infos } = props;

  // Estados locais para armazenar valores do formulário
  const [stars, setStars] = useState(infos?.stars || 0);
  const [description, setDescription] = useState(infos?.description || "");
  const [error, setError] = useState<string | null>(null);

  // Atualiza os valores quando o modal é aberto ou as informações mudam
  useEffect(() => {
    if (infos) {
      setStars(infos.stars);
      setDescription(infos.description || "");
    }
  }, [infos]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validações simples
    if (!stars || stars < 1 || stars > 5) {
      setError("A avaliação deve ter entre 1 e 5 estrelas.");
      return;
    }

    if (!description) {
      setError("A descrição não pode estar vazia.");
      return;
    }

    try {
      // Chamada à API para atualizar a avaliação
      const response = await apiService.patch(`/rating/${infos?.id}`, {
        stars,
        description,
        userId: infos?.userId,
      });

      alert("Avaliação atualizada com sucesso!");
      setOpen(false); // Fecha o modal
      setError(null); // Limpa erros
      window.location.reload(); // Recarrega a página para refletir mudanças
    } catch (error) {
      console.error("Erro ao atualizar avaliação:", error);
      setError("Erro ao atualizar a avaliação. Tente novamente.");
    }
  };

  return (
    <Dialog open={open} onClose={() => setOpen(false)} className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <DialogContent>
        <h2 className="text-xl font-semibold mb-4">Editar Avaliação</h2>
        {error && <p className="text-red-500 mb-2">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <label className="block">
            <span className="block text-gray-700">Estrelas</span>
            <input
              type="number"
              min={1}
              max={5}
              value={stars}
              onChange={(e) => setStars(Number(e.target.value))}
              className="w-full p-3 rounded-md bg-gray-200 text-gray-900 placeholder-gray-600 focus:outline-none"
            />
          </label>
          <textarea
            placeholder="Descrição"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={4}
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
              Salvar Modificações
            </button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
