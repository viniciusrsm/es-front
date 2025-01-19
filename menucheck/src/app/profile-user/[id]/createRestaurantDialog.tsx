import { apiService } from "@/service/api";
import { Dialog, DialogContent } from "@mui/material";
import { useState } from "react";

interface CreateDialogProps {
  open: boolean;
  setOpen: (value: boolean) => void;
  userId: number;
}

export default function CreateDialog(props: CreateDialogProps) {
  const { open, setOpen, userId } = props;

  // Estados locais para armazenar valores do formulário
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validações simples
    if (!name || !address || !phone) {
      setError("Todos os campos obrigatórios devem ser preenchidos.");
      return;
    }

    try {
      // Chamada à API para criar o restaurante
      const response = await apiService.post(`/restaurant`, {
        name,
        address,
        phone,
        description,
        userId,
      });
      console.log(response);

      alert("Restaurante criado com sucesso!");
      setOpen(false); // Fecha o modal
      setError(null); // Limpa erros
      window.location.reload(); // Recarrega a página para refletir mudanças
    } catch (error) {
      console.error("Erro ao criar restaurante:", error);
      setError("Erro ao criar o restaurante. Tente novamente.");
    }
  };

  return (
    <Dialog
      open={open}
      onClose={() => setOpen(false)}
      className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
    >
      <DialogContent>
        <h2 className="text-xl font-semibold mb-4">Criar Restaurante</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Nome"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-3 rounded-md bg-gray-200 text-gray-900 placeholder-gray-600 focus:outline-none"
          />
          <input
            type="text"
            placeholder="Bairro / Cidade"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="w-full p-3 rounded-md bg-gray-200 text-gray-900 placeholder-gray-600 focus:outline-none"
          />
          <input
            type="text"
            placeholder="Telefone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full p-3 rounded-md bg-gray-200 text-gray-900 placeholder-gray-600 focus:outline-none"
          />
          <textarea
            placeholder="Descrição (opcional)"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={4}
            className="w-full p-3 rounded-md bg-gray-200 text-gray-900 placeholder-gray-600 focus:outline-none"
          />
          {error && (
            <p className="text-red-500 text-sm">{error}</p>
          )}
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
              Criar
            </button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
