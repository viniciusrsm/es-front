export default function AddMenuModal(){
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-6 rounded-lg w-11/12 max-w-md shadow-lg">
                <h2 className="text-xl font-semibold mb-4">Adicionar ao Menu</h2>
                <form className="space-y-4">
                    <input
                    type="text"
                    placeholder="Nome do Prato"
                    className="w-full p-3 rounded-md bg-gray-200 text-gray-900 placeholder-gray-600 focus:outline-none"
                    />
                    <textarea
                    placeholder="Descrição"
                    className="w-full p-3 rounded-md bg-gray-200 text-gray-900 placeholder-gray-600 focus:outline-none resize-none h-24"
                    ></textarea>
                    <input
                    type="text"
                    placeholder="Preço"
                    className="w-full p-3 rounded-md bg-gray-200 text-gray-900 placeholder-gray-600 focus:outline-none"
                    />
                    <input
                    type="file"
                    className="w-full p-3 rounded-md bg-gray-200 text-gray-900 placeholder-gray-600 focus:outline-none"
                    />
                    <div className="flex justify-end gap-2">
                    <button
                        type="button"
                        className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                    >
                        Cancelar
                    </button>
                    <button
                        type="submit"
                        className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
                    >
                        Adicionar ao Menu
                    </button>
                    </div>
                </form>
            </div>
        </div>
      );
}