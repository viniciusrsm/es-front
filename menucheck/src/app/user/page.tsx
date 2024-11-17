'use client';

import Image from "next/image";

export default function UserPerfil() {
  const user = {
    avatar: "/icons8-anonymous-mask.svg",
    nome: "João da Silva",
    email: "joao.silva@example.com",
    telefone: "(11) 98765-4321",
    cidade: "São Paulo",
    preferencias: ["Comida Italiana", "Comida Japonesa", "Cafés"],
  };

  const restaurantesAvaliados = [
    {
      id: 1,
      nome: "Restaurante A",
      tipoCozinha: "Italiana",
      bairro: "Centro",
      cidade: "São Paulo",
      estrelas: 4,
    },
    {
      id: 2,
      nome: "Restaurante B",
      tipoCozinha: "Japonesa",
      bairro: "Jardins",
      cidade: "São Paulo",
      estrelas: 5,
    },
    {
      id: 3,
      nome: "Restaurante C",
      tipoCozinha: "Brasileira",
      bairro: "Moema",
      cidade: "São Paulo",
      estrelas: 3,
    },
  ];

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col items-center">
      {/* Header */}
      <div className="w-full bg-custom1 p-4 flex justify-between items-center shadow-md">
        <div className="flex items-center space-x-2">
          <Image
            src="/icons8-anonymous-mask.svg"
            alt="logo"
            width={32}
            height={32}
          />
          <span className="text-gray-800 font-semibold text-xl">MenuCheck</span>
        </div>
        <button className="bg-gray-600 text-white py-2 px-4 rounded-md hover:bg-gray-700">
          Logout
        </button>
      </div>

      {/* Main Content */}
      <div className="w-full max-w-4xl bg-white mt-8 p-6 rounded-lg shadow-lg">
        {/* Avatar e Nome */}
        <div className="flex items-center space-x-4 mb-6">
          <Image
            src={user.avatar}
            alt="Avatar do usuário"
            width={96}
            height={96}
            className="rounded-full shadow-md"
          />
          <div>
            <h1 className="text-2xl font-semibold text-gray-800">{user.nome}</h1>
            <p className="text-gray-600">{user.email}</p>
          </div>
        </div>

        {/* Informações do Usuário */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <h2 className="text-lg font-semibold text-gray-800">Telefone</h2>
            <p className="text-gray-600">{user.telefone}</p>
          </div>
          <div>
            <h2 className="text-lg font-semibold text-gray-800">Cidade</h2>
            <p className="text-gray-600">{user.cidade}</p>
          </div>
        </div>

        {/* Preferências */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Preferências</h2>
          <ul className="list-disc list-inside space-y-2">
            {user.preferencias.map((pref, index) => (
              <li key={index} className="text-gray-600">
                {pref}
              </li>
            ))}
          </ul>
        </div>

        {/* Restaurantes Avaliados */}
        <div>
          <h2 className="text-lg font-semibold text-gray-800 mb-4">
            Restaurantes Avaliados
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {restaurantesAvaliados.map((restaurante) => (
              <div
                key={restaurante.id}
                className="bg-custom1 rounded-lg shadow-lg p-4 flex flex-col"
              >
                <div className="bg-gray-300 h-32 flex items-center justify-center rounded-lg mb-4">
                  <p className="text-gray-600 text-sm">IMAGEM DO RESTAURANTE</p>
                </div>
                <h3 className="text-lg font-semibold text-gray-900">
                  {restaurante.nome}
                </h3>
                <p className="text-gray-700">{restaurante.tipoCozinha}</p>
                <p className="text-gray-700">
                  {restaurante.bairro} / {restaurante.cidade}
                </p>
                <div className="flex items-center mt-4">
                  {/* Estrelas */}
                  {Array(5)
                    .fill(null)
                    .map((_, index) => (
                      <span
                        key={index}
                        className={`${
                          index < restaurante.estrelas
                            ? "text-yellow-400"
                            : "text-gray-400"
                        } text-lg`}
                      >
                        ★
                      </span>
                    ))}
                </div>
                <button className="mt-4 bg-gray-600 text-white py-2 px-4 rounded-md hover:bg-gray-700">
                  Ver mais
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
