"use client";
import { apiService } from "@/service/api";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import CreateRestaurantDialog from "./createEditDialog";
import DeleteRestaurantModal from "./deleteDialog";



export default function Restaurants() {
  const [restaurants, setRestaurants] = useState<Restaurante[]>([]);
  const [userId, setUserId] = useState<number | null>(null);
  const [username, setUsername] = useState<string | null>(null); // Novo estado para o nome do usuário
  const [avaliacoes, setAvaliacoes] = useState<Rating[]>([]); 
  const [createModal, setCreateModal] = useState<boolean>(false);
  const [deleteModal, setDeleteModal] = useState<boolean>(false);
  const [selectedRestaurantId, setSelectedRestaurantId] = useState<number | null>(null);
  const [editData, setEditData] = useState<Restaurante | null>(null);

  function handleLogout() {
    sessionStorage.removeItem("access_token"); // Remove o token salvo
    setUserId(null); // Limpa o estado de autenticação (se necessário)
    window.location.href = "/login"; // Redireciona para a página inicial
  }

  useEffect(() => {
    async function getData() {
      try {
        const resRestaurant = await apiService.get("restaurant"); // Busca restaurantes
        const restaurantsWithRatings = await Promise.all(
          resRestaurant.map(async (restaurant: any) => {
            const ratings = await apiService.get(`rating/allRatings/${restaurant.id}`);
            const averageRating = calculateAverageStars(ratings);
            
              return { ...restaurant, averageRating, ratingsCount: ratings.length };
          })
        );
        setRestaurants(restaurantsWithRatings);
      } catch (error) {
        console.error("Erro ao buscar restaurantes:", error);
      }

      try {
        const resUserId = await apiService.get("auth/user"); // Chamada para o backend
        setUserId(resUserId.sub); // Armazena o id do usuário no estado
        setUsername(resUserId.username)
      } catch {}

    }

    getData(); // Chama a função
  }, []); // Adiciona dependência vazia para executar apenas uma vez

  function calculateAverageStars(ratings: any[]): number {
    if (!ratings || ratings.length === 0) return 0;
    const totalStars = ratings.reduce((sum, rating) => sum + rating.stars, 0);
    return totalStars / ratings.length; // Média correta: soma / quantidade
  }

  return (
    <div className="flex flex-col items-center min-h-screen bg-slate-100">
      {/* Header */}

      <div className="w-full bg-custom2 p-4 flex justify-between items-center shadow-md">
      <Link href='/restaurants'>
          <div className="flex items-center bg-custom1 p-4 shadow-md">
            <Image
              src="/assets/icons8-anonymous-mask.svg"
              width={48}
              height={48}
              alt="logo"
            />
            <h1 className="text-xl font-semibold text-gray-800">MenuCheck</h1>
          </div>
      </Link>
        <div className="flex items-center space-x-4">
          {!userId ? 
            <Link
              href="/login"
              className="bg-custom3 text-white py-2 px-4 rounded-md hover:bg-gray-700"
            > Login </Link> : 
            <>
                  <Link href={`/profile-user/${userId}`}>
                    <div className="flex items-center rounded-lg bg-custom1 p-3 shadow-md">
                      <h1 className="rounded-lg font-semibold  text-gray-600">{username ? `${username}` : "Carregando..."}</h1>
                    </div>
                  </Link>
                  <Link
                      href="/"
                      onClick={handleLogout} // Função de logout
                      className="bg-custom3 text-white py-2 px-4 rounded-md hover:bg-gray-700"
                  > 
                      Logout 
                  </Link>
                </>
          }
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
              <div className="flex justify-between">
                <h3 className="text-lg font-semibold text-gray-900">
                  {restaurant.name}
                </h3>
                <div className="flex gap-2">
                  {(userId == restaurant.userId) ?                    
                    <>
                      <button onClick={() => {
                        setCreateModal(true);
                        setEditData({id: restaurant.id, userId: restaurant.userId, name: restaurant.name, address: restaurant.address, phone: restaurant.phone, email: restaurant.email, description: restaurant.description, ratings: restaurant.ratings,   ratingsCount: restaurant.ratingsCount, averageRating: restaurant.averageRating})
                        }}>
                          <Image src={'/assets/pencil.svg'} width={28} height={28} alt="trash" /></button>
                      <button 
                        onClick={() => {
                          setSelectedRestaurantId(restaurant.id)
                          setDeleteModal(true)
                          }
                        }
                      >
                        <Image src={'/assets/trash.svg'} width={28} height={28} alt="trash" /></button>
                    </> : <></>
                  }
                  </div>
              </div>
              <p className="text-gray-700">
                {restaurant.description || "Sem descrição disponível"}
              </p>
              <p className="text-gray-700">{restaurant.address}</p>
              <p className="text-gray-700">Telefone: {restaurant.phone}</p>

              <div className="flex items-center mt-4">
                {Array(5)
                  .fill(null)
                  .map((_, index) => (
                    <span
                      key={index}
                      className={`${
                        index < Math.floor(restaurant.averageRating)
                          ? "text-yellow-400"
                          : "text-gray-400"
                      } text-lg`}
                    >
                      ★
                    </span>
                  ))}
                <span className="ml-2 text-gray-600">
                  ({restaurant.ratingsCount || 0} avaliações)
                </span>
              </div>

              <Link href={`/profile-restaurant/${restaurant.id}`} className="w-fit">
                <button className="mt-4 bg-gray-600 text-white py-2 px-4 rounded-md hover:bg-gray-700">
                  Ver mais
                </button>
              </Link>
            </div>
          ))}
        </div>
      </div>
      <CreateRestaurantDialog open={createModal} setOpen={setCreateModal} infos={editData} />
      <DeleteRestaurantModal open={deleteModal} setOpen={setDeleteModal} restaurantId={selectedRestaurantId || undefined}/>
    </div>
  );
}
