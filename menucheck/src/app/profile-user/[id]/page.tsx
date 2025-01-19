"use client";
import { apiService } from "@/service/api";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import CreateEditDialog from "../../restaurants/createEditDialog";
import DeleteModal from "../../restaurants/deleteDialog";
import CreateDialog from "./createRestaurantDialog";
import { useParams } from "next/navigation";



export default function UserProfile() {
  const [userRestaurants, setUserRestaurants] = useState<Restaurante[]>([])
  const [userId, setUserId] = useState<number | null>(null);
  const [username, setUsername] = useState<string | null>(null); // Novo estado para o nome do usuário
  const [userInfo, setUserInfo] = useState<User | null>(null);
  const [createResModal, setCreateResModal] = useState<boolean>(false); 
  const [createModal, setCreateModal] = useState<boolean>(false);
  const [deleteModal, setDeleteModal] = useState<boolean>(false);
  const [selectedRestaurantId, setSelectedRestaurantId] = useState<number | null>(null);
  const [editData, setEditData] = useState<Restaurante | null>(null);
  const { id } = useParams();

  function handleLogout() {
    sessionStorage.removeItem("access_token"); // Remove o token salvo
    setUserId(null); // Limpa o estado de autenticação (se necessário)
    window.location.href = "/login"; // Redireciona para a página inicial
  }

  useEffect(() => {
    async function getData() {
      try {
        const resUserId = await apiService.get("auth/user"); // Chamada para o backend
        const resRestaurantByUser = await apiService.get(`/restaurant/byUser/${resUserId.sub}`)
        const resUserInfo =  await apiService.get(`/user/infoUser/${resUserId.sub}`)

        setUserRestaurants(resRestaurantByUser)
        setUserId(resUserId.sub); // Armazena o id do usuário no estado
        setUsername(resUserId.username)
        setUserInfo(resUserInfo)
      } catch {}

    }

    getData(); // Chama a função
  }, []); // Adiciona dependência vazia para executar apenas uma vez


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
        <h2 className="flex justify-center items-center text-xl w-full p-3 mt-6 bg-gray-600 text-white rounded-md hover:bg-gray-700">
            Meus Restaurantes
        </h2>
        <div className="mt-6 p-6 bg-white rounded-lg shadow-md">
            <h1 className="text-2xl font-semibold text-gray-800">
            {`Nome de Usuário: ${userInfo?.username}`}
            </h1>
            <p className="mt-2 text-lg text-gray-600">{`Nome: ${userInfo?.name}`}</p>
        </div>
        <div className="flex items-center justify-end mt-4">
            {userId && (
            <button 
                className="p-3  text-sm font-semibold bg-blue-500 text-white rounded-md shadow-md hover:bg-blue-600"
                onClick={() => {
                    setCreateResModal(true)
                }}
            >
                Criar Restaurante
            </button>
            )}
        </div>
        <div className="grid grid-cols-1 mt-4 sm:grid-cols-2 lg:grid-cols-2 gap-6">
          {userRestaurants.map((restaurant) => (
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

              <Link href={`/profile-restaurant/${restaurant.id}`} className="w-fit">
                <button className="mt-4 bg-gray-600 text-white py-2 px-4 rounded-md hover:bg-gray-700">
                  Ver mais
                </button>
              </Link>
            </div>
          ))}
        </div>
      </div>
      <CreateEditDialog open={createModal} setOpen={setCreateModal} infos={editData} />
      <DeleteModal open={deleteModal} setOpen={setDeleteModal} restaurantId={selectedRestaurantId || undefined}/>
      <CreateDialog open={createResModal} setOpen={setCreateResModal} userId={parseInt(id as string, 10)}/>
    </div>
  );
}
