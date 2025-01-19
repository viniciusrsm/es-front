'use client';

import { apiService } from "@/service/api";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation"; // Atualizado para usar useParams
import Link from "next/link";
import ReviewDialog from "./reviewDialog";
import EditReviewDialog from "./editReviewDialog";
import CreateMenuDialog from "./createMenuDialog";
import DeleteReviewDialog from "./deleteReviewDialog";
import EditMenuDialog from "./editMenuDialog";
import DeleteMenuDialog from "./deleteMenuDialog";
import CreateMenuItemDialog from "./createMenuItemDialog";



export default function RestaurantePerfil() {
  const [abaAtiva, setAbaAtiva] = useState("avaliacoes");
  const [menuSelecionado, setMenuSelecionado] = useState<Menu | null>(null);
  const [reviewModal, setReviewModal] = useState<boolean>(false);
  const [editReviewModal, setEditReviewModal] = useState<boolean>(false);
  const [deleteReviewModal, setDeleteReviewModal] = useState<boolean>(false);
  const [createMenuModal, setCreateMenuModal] = useState<boolean>(false);
  const [editMenuModal, setEditMenuModal] = useState<boolean>(false);
  const [deleteMenuModal, setDeleteMenuModal] = useState<boolean>(false);
  const [createMenuItemModal, setCreateMenuItemModal] = useState<boolean>(false);
  const [userId, setUserId] = useState<number | null>(null);
  const [username, setUsername] = useState<string | null>(null); // Novo estado para o nome do usuário
  const [restaurante, setRestaurante] = useState<Restaurante | null>(null);
  const [userNames, setUserNames] = useState<{ [key: number]: string }>({}); // Mapeamento de userId para username
  const [avaliacoes, setAvaliacoes] = useState<Rating[]>([]);
  const [menu, setMenu] = useState<Menu[]>([]);
  const [menuItem, setMenuItem] = useState<MenuItem[]>([]); 
  const [editReview, setEditReview] = useState<Rating | null>(null);
  const [editMenu, setEditMenu] = useState<Menu | null>(null);
  const [selectedMenuId, setSelectedMenuId] = useState<number | null>(null);
  const [selectedMenuItemId, setSelectedMenuItemId] = useState<number | null>(null);
  const [selectedAvaliacaoId, setSelectedAvaliacaoId] = useState<number | null>(null);
  const { id } = useParams(); // Use o hook useParams para obter os parâmetros da URL

  async function getPratos(pratosId: number) {
    try {
        const response = await apiService.get(`/menu-item/pratos/${pratosId}`); // Use pratosId
        setMenuItem(response); // Ajuste baseado na resposta da API
    } catch (error) {
        console.error(`Erro ao buscar prato com ID ${pratosId}:`, error);
    }
}

function handleLogout() {
    sessionStorage.removeItem("access_token"); // Remove o token salvo
    setUserId(null); // Limpa o estado de autenticação (se necessário)
    window.location.href = "/restaurants"; // Redireciona para a página inicial
  }
  
  

  useEffect(() => {
    async function getData() {
      try {
        const resRestaurant = await apiService.get(`/restaurant/${id}`); 
        
        setRestaurante(resRestaurant || []); // Salva os dados do restaurante no estado
      } catch (error) {
        console.log('Erro ao buscar restaurante especificado:', error);
      }

      try {
        const resRating = await apiService.get(`/rating/allRatings/${id}`)
        setAvaliacoes(resRating || [])
        
      } catch (error) {
        console.error("Erro ao buscar avaliações:", error);
      }

      try {
        const resUserId = await apiService.get("auth/user"); // Chamada para o backend
        
        setUserId(resUserId.sub); // Armazena o id do usuário no estado
        setUsername(resUserId.username)
      } catch {}

      try {
        const resMenus = await apiService.get(`/menu/by/restaurant/${id}`)
        setMenu(resMenus);
      } catch (error) {
        console.error("Erro ao buscar menus:", error);
      }
    }

    if (id) {
        getData();
    }
  }, [id]);


  useEffect(() => {
    async function fetchUserNames() {
      const uniqueUserIds = [...new Set(avaliacoes.map((av) => av.userId))]; // Obtém IDs únicos
      const userNameMap: { [key: number]: string } = {};

      for (const userId of uniqueUserIds) {
        try {
          const response = await apiService.get(`/rating/nameRating/${userId}`);
          userNameMap[userId] = response; 
        } catch (error) {
          console.error(`Erro ao buscar nome do usuário com ID ${userId}:`, error);
        }
      }

      setUserNames(userNameMap); // Atualiza o estado com o mapeamento
    }

    if (avaliacoes.length > 0) {
      fetchUserNames();
    }
  }, [avaliacoes]);
  

  return (
    
    <div className="min-h-screen bg-slate-100 flex flex-col items-center">
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
                > 
                    Login 
                </Link> : 
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

      {/* Informações do Restaurante */}
      <div className="w-full max-w-4xl bg-white mt-8 p-6 rounded-lg shadow-lg">
        <div className="flex flex-col md:flex-row items-center md:items-start space-y-6 md:space-y-0 md:space-x-6">
          {/* Detalhes */}
          <div>
            <h1 className="text-2xl font-semibold text-gray-800">
              {`Restaurante: ${restaurante?.name}`}
            </h1>
            <p className="text-gray-700 mt-2">
            {`Bairro/Cidade: ${restaurante?.address}`}
            </p>
            <p className="mt-4 text-gray-600">{`Descrição: ${restaurante?.description}`}</p>
            <div className="flex items-center mt-4">
              <span className="text-yellow-400 text-2xl">★</span>
               <span className="text-gray-600 ml-2 mr-6">
                ({avaliacoes?.length} avaliações)
              </span>
              {!userId ? (
                  <p className="text-gray-800">
                    Logue para avaliar!
                  </p>
                ) : (
                  abaAtiva === "avaliacoes" ? (
                    <button
                      className="flex-1 p-2 rounded-lg font-semibold shadow-md bg-custom1 text-white"
                      onClick={() => setReviewModal(true)}
                    >
                      Avalie
                    </button>
                  ) : abaAtiva === "menu" && userId === restaurante?.userId? (
                    <button
                      className="flex-1 p-2 rounded-lg font-semibold shadow-md bg-custom1 text-white"
                      onClick={() => setCreateMenuModal(true)}
                    >
                      Crie Menu
                    </button>
                  ) : null
              )}

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
          <div>
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Avaliações</h2>
            <button>

            </button>
          </div>
          <div className="space-y-6">
            {avaliacoes?.map((avaliacao) => (
              <div
                key={avaliacao.id}
                className="bg-custom2 p-4 rounded-lg shadow-md flex flex-col space-y-2"
              >
                <div className="flex items-center space-x-4">
                  
                  <h3 className="text-gray-800 font-semibold">
                  {userNames[avaliacao.userId] || "Usuário Desconhecido"}
                  </h3>
                  <div className="flex gap-2 ml-auto">
                    {(userId === avaliacao.userId) && (
                      <>
                        {/* Botão de editar */}
                        <button
                          onClick={() => {
                            setEditReviewModal(true);
                            setEditReview({
                              id: avaliacao.id,
                              userId: avaliacao.userId,
                              stars: avaliacao.stars,
                              description: avaliacao.description,
                              restaurantId: avaliacao.restaurantId
                            });
                          }}
                        >
                          <Image
                            src={'/assets/pencil.svg'}
                            width={24}
                            height={24}
                            alt="Editar avaliação"
                          />
                        </button>

                        {/* Botão de deletar */}
                        <button
                          onClick={() => {
                            setSelectedAvaliacaoId(avaliacao.id);
                            setDeleteReviewModal(true);
                          }}
                        >
                          <Image
                            src={'/assets/trash.svg'}
                            width={24}
                            height={24}
                            alt="Deletar avaliação"
                          />
                        </button>
                      </>
                    )}
                  </div>
                </div>
                <p className="text-gray-600">{avaliacao.description}</p>
                <div className="flex items-center">
                  {Array(5)
                    .fill(null)
                    .map((_, index) => (
                      <span
                        key={index}
                        className={`${
                          index < avaliacao.stars
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
            {menu.map((menu) => (
              <div
                key={menu.id}
                className="bg-custom2 p-4 rounded-lg shadow-md cursor-pointer"
                onClick={async () => {
                    setMenuSelecionado(menu);
                    await getPratos(menu.id);
                }}
              >
                <h3 className="text-gray-800 font-semibold">
                  {menu.name}
                </h3>
                <div className="flex gap-2 ml-auto">
                    {(userId === menu.userId) && (
                      <>
                        {/* Botão de editar */}
                        <button
                          onClick={() => {
                            setEditMenuModal(true);
                            setEditMenu({
                              id: menu.id,
                              name: menu.name,
                              userId: menu.userId,
                              restaurantId: menu.restaurantId
                            });
                          }}
                        >
                          <Image
                            src={'/assets/pencil.svg'}
                            width={24}
                            height={24}
                            alt="Editar avaliação"
                          />
                        </button>

                        {/* Botão de deletar */}
                        <button
                          onClick={() => {
                            setSelectedMenuId(menu.id);
                            setDeleteMenuModal(true);
                          }}
                        >
                          <Image
                            src={'/assets/trash.svg'}
                            width={24}
                            height={24}
                            alt="Deletar avaliação"
                          />
                        </button>
                      </>
                    )}
                  </div>
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
                {menuSelecionado?.name}
              </h2>
              <button
                onClick={() => setMenuSelecionado(null)}
                className="text-gray-600 hover:text-gray-800"
              >
                ✕
              </button>
            </div>
            <div className="space-y-4">
            {userId === menuSelecionado.userId && (
              <button
                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                onClick={() => {
                  setCreateMenuItemModal(true);
                  setSelectedMenuId(menuSelecionado.id);
                }
                } // Abre o modal de adicionar prato
              >
                Adicionar Prato
              </button>
            )}

                {menuItem && menuItem.length > 0 && menuItem.map((prato: MenuItem) => (
                    <div
                        key={prato.id}
                        className="bg-gray-100 p-4 rounded-lg shadow-md flex flex-col space-y-2"
                    >
                        <h3 className="text-gray-800 font-semibold">{prato.name}</h3>
                        <p className="text-gray-600">{prato.desc}</p>
                        <span className="text-gray-800 font-bold">R$ {prato.price}</span>
                    </div>
                ))}
            </div>
          </div>
        </div>
      )}
      </div>
      <ReviewDialog 
          open={reviewModal}
          setOpen={setReviewModal}
          userId={userId!} // Exemplo: passar o ID do usuário
          restaurantId={restaurante?.id} // Exemplo: passar o ID do restaurante
      />
      <EditReviewDialog open={editReviewModal} setOpen={setEditReviewModal} infos={editReview as Rating | null}/>
      <DeleteReviewDialog open={deleteReviewModal} setOpen={setDeleteReviewModal} id={selectedAvaliacaoId!}/>
      <EditMenuDialog open={editMenuModal} setOpen={setEditMenuModal} infos={editMenu as Menu | null}/>
      <DeleteMenuDialog open={deleteMenuModal} setOpen={setDeleteMenuModal} id={selectedMenuId!}/>
      <CreateMenuDialog open={createMenuModal} setOpen={setCreateMenuModal} userId={userId!} restaurantId={restaurante?.id!}/>
      <CreateMenuItemDialog open={createMenuItemModal} setOpen={setCreateMenuItemModal} menuId={selectedMenuId!}/>
    </div>
  );
}
