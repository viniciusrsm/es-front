import { Dialog, DialogContent, DialogTitle } from "@mui/material";

interface DeleteDialogProps {
    open: boolean;
    setOpen: (value: boolean) => void;
}

export default function DeleteDialog(props: DeleteDialogProps){

    const { open, setOpen } = props;

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
            >
                Confirmar
            </button>
            </div>
            </DialogContent>
            
        </Dialog>
      );
}