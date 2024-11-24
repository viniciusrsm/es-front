'use client'
import EditInfoModal from "@/Models/EditInfoModal";
import Image from "next/image";
import Link from "next/link";
export default function Restaurants(){
    const restaurantes = [
        {
          id: 1,
          nome: "Pizzaria do Jorgino",
          tipoCozinha: "Italiana",
          bairro: "Centro",
          cidade: "São Paulo",
          estrelas: 4,
        },
        {
          id: 2,
          nome: "Nazo Sushi Bar",
          tipoCozinha: "Japonesa",
          bairro: "Jardins",
          cidade: "São Paulo",
          estrelas: 5,
        },
        {
          id: 3,
          nome: "Bar do dois irmãos",
          tipoCozinha: "Brasileira",
          bairro: "Moema",
          cidade: "São Paulo",
          estrelas: 3,
        },
        {
          id: 4,
          nome: "Coffe Break",
          tipoCozinha: "Francesa",
          bairro: "Itaim Bibi",
          cidade: "São Paulo",
          estrelas: 4,
        },
      ];


    return(
        <div className="flex flex-col items-center min-h-screen bg-slate-100">
        {/* Header */}
        <div className="w-full bg-custom2 p-4 flex justify-between items-center shadow-md">
            <div className="flex items-center bg-custom1 p-4 shadow-md">
                <Image
                    src='icons8-anonymous-mask.svg'
                    width={48}
                    height={48}
                    alt="logo"
                />
                <h1 className="text-xl font-semibold text-gray-800">MenuCheck</h1>
            </div>
            <div className="flex items-center space-x-4">
                <Image
                    src='icons8-rick-sanchez.svg'
                    width={48}
                    height={48}
                    alt="logo"
                />
                <Link href='/login' className="bg-custom3 text-white py-2 px-4 rounded-md hover:bg-gray-700">
                    Login
                </Link>
            </div>
        </div>

        {/* Main Content */}
        <div className="mt-8 w-full max-w-6xl px-4">
            <h2 className="text-2xl font-semibold mb-6 text-gray-800">Restaurantes</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
            {restaurantes.map((restaurante) => (
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
                                index < restaurante.estrelas ? "text-yellow-400" : "text-gray-400"
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
    );
}