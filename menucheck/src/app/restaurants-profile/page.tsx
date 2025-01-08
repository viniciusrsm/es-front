'use client';

import Image from "next/image";
import restaurant_image from "../assets/pizza.png"
import { useState } from "react";

export default function RestaurantePerfil() {
  const [abaAtiva, setAbaAtiva] = useState("avaliacoes");
  const [menuSelecionado, setMenuSelecionado] = useState<{
    id: number;
    nome: string;
    pratos: { id: number; nome: string; descricao: string; preco: string }[];
  } | null>(null);
  

  const restaurante = {
    nome: "Restaurante A",
    tipoCozinha: "Italiana",
    bairro: "Centro",
    cidade: "São Paulo",
    descricao:
      "Um lugar aconchegante que oferece pratos italianos autênticos feitos com ingredientes frescos e selecionados.",
    imagem: restaurant_image, // Substituir com a imagem real
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

  const menus = [
    {
      id: 1,
      nome: "Menu Vegetariano",
      pratos: [
        { id: 1, nome: "Salada Caesar", descricao: "Salada fresca com molho Caesar", preco: "R$ 25,00" },
        { id: 2, nome: "Risoto de Legumes", descricao: "Risoto cremoso com legumes frescos", preco: "R$ 35,00" },
      ],
    },
    {
      id: 2,
      nome: "Menu Padrão",
      pratos: [
        { id: 3, nome: "Pizza Margherita", descricao: "Pizza clássica com tomate e manjericão", preco: "R$ 40,00" },
        { id: 4, nome: "Lasanha à Bolonhesa", descricao: "Lasanha tradicional com molho à bolonhesa", preco: "R$ 50,00" },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col items-center">
      {/* Header */}
      <div className="w-full bg-custom1 p-4 flex justify-between items-center shadow-md">
        <div className="flex items-center space-x-2">
          <Image
            src='icons8-anonymous-mask.svg' // Substituir com a imagem correta
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
      <div className="w-full max-w-4xl mt-4 flex space-x-4">
        <button
          className={`flex-1 p-3 rounded-lg font-semibold shadow-md ${
            abaAtiva === "avaliacoes" ? "bg-custom1 text-white" : "bg-white text-gray-800"
          }`}
          onClick={() => setAbaAtiva("avaliacoes")}
        >
          Avaliações
        </button>
        <button
          className={`flex-1 p-3 rounded-lg font-semibold shadow-md ${
            abaAtiva === "menu" ? "bg-custom1 text-white" : "bg-white text-gray-800"
          }`}
          onClick={() => setAbaAtiva("menu")}
        >
          Menu
        </button>
      </div>
      {abaAtiva === "avaliacoes" && (
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
      )}

      {abaAtiva === "menu" && (
        <div className="w-full max-w-4xl bg-white mt-8 p-6 rounded-lg shadow-lg">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Menus</h2>
          <div className="space-y-6">
            {menus.map((menu) => (
              <div
                key={menu.id}
                className="bg-custom2 p-4 rounded-lg shadow-md cursor-pointer"
                onClick={() => setMenuSelecionado(menu)}
              >
                <h3 className="text-gray-800 font-semibold">{menu.nome}</h3>
              </div>
            ))}
          </div>
        </div>
      )}
      {/* Modal para os pratos do menu */}
      {menuSelecionado && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold text-gray-800">
                {menuSelecionado?.nome}
              </h2>
              <button
                onClick={() => setMenuSelecionado(null)}
                className="text-gray-600 hover:text-gray-800"
              >
                ✕
              </button>
            </div>
            <div className="space-y-4">
              {menuSelecionado.pratos.map((prato:any) => (
                <div
                  key={prato.id}
                  className="bg-gray-100 p-4 rounded-lg shadow-md flex flex-col space-y-2"
                >
                  <h3 className="text-gray-800 font-semibold">{prato.nome}</h3>
                  <p className="text-gray-600">{prato.descricao}</p>
                  <span className="text-gray-800 font-bold">{prato.preco}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
      </div>
    </div>
  );
}
