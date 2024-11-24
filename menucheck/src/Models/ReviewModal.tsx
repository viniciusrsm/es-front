'use client';

export default function ReviewModal() {  // { isOpen, onClose, onSubmit }  Lembrar de colocar esses parametros na função 
//   if (!isOpen) return null; // Não renderiza o modal se não estiver aberto

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-gray-900 text-white p-6 rounded-lg w-11/12 max-w-md">
        <h2 className="text-xl font-semibold mb-4">AVALE O RESTAURANTE</h2>
        <p className="mb-2">Avaliação (0 - 5 estrelas)</p>
        <div className="flex gap-1 mb-4">
          {/* Ícones de estrelas */}
          {[1, 2, 3, 4, 5].map((star) => (
            <span key={star} className="text-yellow-400 text-2xl cursor-pointer">
              ★
            </span>
          ))}
        </div>
        <textarea
          rows={4}
          className="w-full p-3 rounded-md bg-gray-700 text-gray-200 mb-4 focus:outline-none"
          placeholder="Comentários"
        ></textarea>
        <div className="flex justify-end gap-2">
          <button
            // onClick={onClose}
            className="px-4 py-2 bg-red-500 rounded-md hover:bg-red-600"
          >
            Cancelar
          </button>
          <button
            // onClick={onSubmit}
            className="px-4 py-2 bg-green-500 rounded-md hover:bg-green-600"
          >
            Enviar
          </button>
        </div>
      </div>
    </div>
  );
}
