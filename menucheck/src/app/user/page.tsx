'use client';

import Image from "next/image";

export default function RestaurantePerfil() {
  const restaurante = {
    nome: "Restaurante A",
    tipoCozinha: "Italiana",
    bairro: "Centro",
    cidade: "São Paulo",
    descricao:
      "Um lugar aconchegante que oferece pratos italianos autênticos feitos com ingredientes frescos e selecionados.",
    imagem: "/restaurante.jpg", // Substituir com a imagem real
    avaliacaoMedia: 4.5,
  };

  const avaliacoes = [
    {
      id: 1,
      usuario: "João da Silva",
      comentario: "Comida deliciosa, ambiente agradável e ótimo atendimento.",
      nota: 5,
    },
    {
      id: 2,
      usuario: "Maria Oliveira",
      comentario: "A comida é boa, mas achei o atendimento um pouco demorado.",
      nota: 4,
    },
    {
      id: 3,
      usuario: "Carlos Pereira",
      comentario: "O ambiente é bonito, mas os pratos poderiam ser mais bem servidos.",
      nota: 3,
    },
  ];

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col items-center">
      {/* Header */}
      <div className="w-full bg-custom1 p-4 flex justify-between items-center shadow-md">
        <div className="flex items-center space-x-2">
          <Image
            src="/icons8-anonymous-mask.svg" // Substituir com a imagem correta
            alt="logo"
            width={32}
            height={32}
          />
          <span className="text-gray-800 font-semibold text-xl">MenuCheck</span>
        </div>
        <button className="bg-gray-600 text-white py-2 px-4 rounded-md hover:bg-gray-700">
          Voltar
        </button>
      </div>

      {/* Informações do Restaurante */}
      <div className="w-full max-w-4xl bg-white mt-8 p-6 rounded-lg shadow-lg">
        <div className="flex flex-col md:flex-row items-center md:items-start space-y-6 md:space-y-0 md:space-x-6">
          {/* Imagem do Restaurante */}
          <Image
            src={restaurante.imagem}
            alt={`Imagem do ${restaurante.nome}`}
            width={300}
            height={200}
            className="rounded-lg shadow-md"
          />
          {/* Detalhes */}
          <div>
            <h1 className="text-2xl font-semibold text-gray-800">
              {restaurante.nome}
            </h1>
            <p className="text-gray-700">{restaurante.tipoCozinha}</p>
            <p className="text-gray-700">
              {restaurante.bairro}, {restaurante.cidade}
            </p>
            <p className="mt-4 text-gray-600">{restaurante.descricao}</p>
            <div className="flex items-center mt-4">
              <span className="text-yellow-400 text-2xl">★</span>
              <span className="text-gray-800 text-xl font-semibold ml-2">
                {restaurante.avaliacaoMedia.toFixed(1)}
              </span>
              <span className="text-gray-600 ml-2">
                ({avaliacoes.length} avaliações)
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Avaliações dos Usuários */}
      <div className="w-full max-w-4xl bg-white mt-8 p-6 rounded-lg shadow-lg">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Avaliações</h2>
        <div className="space-y-6">
          {avaliacoes.map((avaliacao) => (
            <div
              key={avaliacao.id}
              className="bg-custom2 p-4 rounded-lg shadow-md flex flex-col space-y-2"
            >
              <div className="flex items-center space-x-4">
                <div className="bg-gray-300 w-12 h-12 rounded-full flex items-center justify-center">
                  <span className="text-gray-600 font-bold text-xl">
                    {avaliacao.usuario[0]}
                  </span>
                </div>
                <h3 className="text-gray-800 font-semibold">
                  {avaliacao.usuario}
                </h3>
              </div>
              <p className="text-gray-600">{avaliacao.comentario}</p>
              <div className="flex items-center">
                {Array(5)
                  .fill(null)
                  .map((_, index) => (
                    <span
                      key={index}
                      className={`${
                        index < avaliacao.nota
                          ? "text-yellow-400"
                          : "text-gray-400"
                      } text-lg`}
                    >
                      ★
                    </span>
                  ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
