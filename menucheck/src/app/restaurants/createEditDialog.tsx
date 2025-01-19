import { apiService } from "@/service/api";
import { Dialog, DialogContent } from "@mui/material";
import { useEffect, useState } from "react";

interface Restaurant {
    id: number;
    name: string;
    address: string;
    phone: string;
    description: string;
    userId: number;
  }

interface CreateEditDialogProps {
    open: boolean;
    setOpen: (value: boolean) => void;
    infos?: Restaurant | null
}

export default function CreateEditDialog(props: CreateEditDialogProps){

    const { open, setOpen, infos } = props;

    // Estados locais para armazenar valores do formulário
    const [name, setName] = useState(infos?.name || "");
    const [address, setAddress] = useState(infos?.address || "");
    const [phone, setPhone] = useState(infos?.phone || "");
    const [description, setDescription] = useState(infos?.description || "");
    const [error, setError] = useState<string | null>(null);

  // Atualiza os valores quando o modal é aberto ou as informações mudam
  useEffect(() => {
    if (infos) {
      setName(infos.name);
      setAddress(infos.address);
      setPhone(infos.phone);
      setDescription(infos.description || "");
    }
  }, [infos]);


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validações simples
    if (!name || !address || !phone) {
      setError("Todos os campos obrigatórios devem ser preenchidos.");
      return;
    }

    try {
      // Chamada à API para atualizar o restaurante
      const response = await apiService.patch(`/restaurant/${infos?.id}`, {
        name,
        address,
        phone,
        description,
        userId: infos?.userId,
      });
      

      alert("Restaurante atualizado com sucesso!");
      setOpen(false); // Fecha o modal
      setError(null); // Limpa erros
      window.location.reload(); // Recarrega a página para refletir mudanças
    } catch (error) {
      console.error("Erro ao atualizar restaurante:", error);
      setError("Erro ao atualizar o restaurante. Tente novamente.");
    }
  };

    return (
        <Dialog open={open} onClose={() => setOpen(false)} className={`fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center`}>
            <DialogContent>
                <h2 className="text-xl font-semibold mb-4">Informações Gerais</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                    type="text"
                    placeholder="Nome"
                    value={name}
                    onChange={(e) => setName(e.target.value)}                    className="w-full p-3 rounded-md bg-gray-200 text-gray-900 placeholder-gray-600 focus:outline-none"
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
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}                    defaultValue={infos ? infos.phone : ""}
                    className="w-full p-3 rounded-md bg-gray-200 text-gray-900 placeholder-gray-600 focus:outline-none"
                    />
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