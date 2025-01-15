import { Dialog, DialogContent } from "@mui/material";

interface CreateEditDialogProps {
    open: boolean;
    setOpen: (value: boolean) => void;
    infos?: Restaurant | null
}

export default function CreateEditDialog(props: CreateEditDialogProps){

    const { open, setOpen, infos } = props;

    return (
        <Dialog open={open} onClose={() => setOpen(false)} className={`fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center`}>
            <DialogContent>
                <h2 className="text-xl font-semibold mb-4">Informações Gerais</h2>
                <form className="space-y-4">
                    <input
                    type="text"
                    placeholder="Nome"
                    defaultValue={infos ? infos.name : ""}
                    className="w-full p-3 rounded-md bg-gray-200 text-gray-900 placeholder-gray-600 focus:outline-none"
                    />
                    <input
                    type="text"
                    placeholder="Tipo de Cozinha"
                    className="w-full p-3 rounded-md bg-gray-200 text-gray-900 placeholder-gray-600 focus:outline-none"
                    />
                    <input
                    type="text"
                    placeholder="Bairro / Cidade"
                    defaultValue={infos ? infos.address : ""}
                    className="w-full p-3 rounded-md bg-gray-200 text-gray-900 placeholder-gray-600 focus:outline-none"
                    />
                    <input
                    type="text"
                    placeholder="Telefone"
                    defaultValue={infos ? infos.phone : ""}
                    className="w-full p-3 rounded-md bg-gray-200 text-gray-900 placeholder-gray-600 focus:outline-none"
                    />
                    <input
                    type="email"
                    placeholder="Email"
                    defaultValue={infos ? infos.email : ""}
                    className="w-full p-3 rounded-md bg-gray-200 text-gray-900 placeholder-gray-600 focus:outline-none"
                    />
                    <input
                    type="text"
                    placeholder="Descrição"
                    defaultValue={infos ? infos.description : ""}
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