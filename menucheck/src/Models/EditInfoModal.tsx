'use client';

export default function EditInfoModal() { //{ isOpen, onClose, onSubmit, data, title } Lembrar de colocar esse parametros na função
//   if (!isOpen) return null; // Não renderiza se o modal não estiver aberto

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg w-11/12 max-w-md shadow-lg">
        <h2 className="text-xl font-semibold mb-4">
            {/* {title} */}
        </h2>
        <form 
            // onSubmit={onSubmit} 
            className="space-y-4">
          <input
            type="text"
            // defaultValue={data?.name || ''}
            placeholder="Nome"
            className="w-full p-3 rounded-md bg-gray-200 text-gray-900 placeholder-gray-600 focus:outline-none"
          />
          <input
            type="text"
            // defaultValue={data?.type || ''}
            placeholder="Tipo de Cozinha"
            className="w-full p-3 rounded-md bg-gray-200 text-gray-900 placeholder-gray-600 focus:outline-none"
          />
          <input
            type="text"
            // defaultValue={data?.location || ''}
            placeholder="Bairro / Cidade"
            className="w-full p-3 rounded-md bg-gray-200 text-gray-900 placeholder-gray-600 focus:outline-none"
          />
          <input
            type="text"
            // defaultValue={data?.phone || ''}
            placeholder="Telefone"
            className="w-full p-3 rounded-md bg-gray-200 text-gray-900 placeholder-gray-600 focus:outline-none"
          />
          <input
            type="email"
            // defaultValue={data?.email || ''}
            placeholder="Email"
            className="w-full p-3 rounded-md bg-gray-200 text-gray-900 placeholder-gray-600 focus:outline-none"
          />
          <div className="flex justify-end gap-2">
            <button
              type="button"
            //   onClick={onClose}
              className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
            >
              Salvar modificações
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
