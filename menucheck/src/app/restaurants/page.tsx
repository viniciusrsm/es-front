"use client";
import { apiService } from "@/service/api";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
export default function Restaurants() {
  const [restaurants, setRestaurants] = useState<any[]>([]);
  const [userId, setUserId] = useState<any[]>([]);
  // const [accessToken, setAccessToken] = useState<string | null>(null);
  // useEffect(() => {
  //   // Acesse o sessionStorage somente no cliente
  //   const token = sessionStorage.getItem('accessToken');
  //   setAccessToken(token);
  // }, []);

  useEffect(() => {
    async function getData() {
      try {
        const resRestaurant = await apiService.get("restaurant"); // Chamada para o backend
        const resUserId = await apiService.get("auth/user"); // Chamada para o backend

        setRestaurants(resRestaurant || []); // Armazena a lista de restaurantes no estado
        setUserId(resUserId.sub); // Armazena o id do usuário no estado
      } catch (error) {
        console.error("Erro ao buscar restaurantes:", error);
      }
    }

    getData(); // Chama a função
  }, []); // Adiciona dependência vazia para executar apenas uma vez

  // Função para calcular a média de estrelas das avaliações
  function calculateAverageStars(ratings: any) {
    if (!ratings || ratings.length === 0) return 0;
    const totalStars = ratings.reduce(
      (sum: any, rating: any) => sum + rating.stars,
      0
    );
    return Math.round(totalStars / ratings.length); // Arredonda a média
  }

  return (
    <div className="flex flex-col items-center min-h-screen bg-slate-100">
      {/* Header */}
      <div className="w-full bg-custom2 p-4 flex justify-between items-center shadow-md">
        <div className="flex items-center bg-custom1 p-4 shadow-md">
          <Image
            src="icons8-anonymous-mask.svg"
            width={48}
            height={48}
            alt="logo"
          />
          <h1 className="text-xl font-semibold text-gray-800">MenuCheck</h1>
        </div>
        <div className="flex items-center space-x-4">
          <Image
            src="icons8-rick-sanchez.svg"
            width={48}
            height={48}
            alt="logo"
          />
          <Link
            href="/login"
            className="bg-custom3 text-white py-2 px-4 rounded-md hover:bg-gray-700"
          >
            Login
          </Link>
        </div>
      </div>

      {/* Main Content */}
      <div className="mt-8 w-full max-w-6xl px-4">
        <h2 className="text-2xl font-semibold mb-6 text-gray-800">
          Restaurantes
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
          {restaurants.map((restaurant) => (
            <div
              key={restaurant.id}
              className="bg-custom1 rounded-lg shadow-lg p-4 flex flex-col"
            >
              <h3 className="text-lg font-semibold text-gray-900">
                {restaurant.name}
              </h3>
              <p className="text-gray-700">
                {restaurant.description || "Sem descrição disponível"}
              </p>
              <p className="text-gray-700">{restaurant.address}</p>
              <p className="text-gray-700">Telefone: {restaurant.phone}</p>

              <div className="flex items-center mt-4">
                {/* Exibe a média de estrelas calculada */}
                {Array(5)
                  .fill(null)
                  .map((_, index) => (
                    <span
                      key={index}
                      className={`${
                        index < calculateAverageStars(restaurant.ratings)
                          ? "text-yellow-400"
                          : "text-gray-400"
                      } text-lg`}
                    >
                      ★
                    </span>
                  ))}
                <span className="ml-2 text-gray-600">
                  ({restaurant.ratings?.length || 0} avaliações)
                </span>
              </div>

              <Link href={`/restaurant-profile/${restaurant.id}`}>
                <button className="mt-4 bg-gray-600 text-white py-2 px-4 rounded-md hover:bg-gray-700">
                  Ver mais
                </button>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
