'use client';

import { useState } from 'react';

export default function CreateMenu() {

  return (
    <div className="flex flex-col items-center min-h-screen bg-slate-100">
      {/* Header */}
      <div className="w-full bg-custom2 p-4 flex justify-between items-center shadow-md">
        <h1 className="text-xl font-semibold text-gray-800">Criar Menu</h1>
      </div>

      {/* Form */}
      <form
        className="mt-8 w-full max-w-4xl p-6 bg-white rounded-lg shadow-lg space-y-6"
        // onSubmit={handleSubmit}
      >
        {/* Informações do Restaurante */}
        <div>
          <h2 className="text-lg font-semibold mb-4 text-gray-800">Informações do Restaurante</h2>
          <input
            type="text"
            name="restaurantName"
            // value={menu.restaurantName}
            // onChange={handleRestaurantChange}
            placeholder="Nome do Restaurante"
            className="w-full p-3 rounded-md bg-gray-200 text-gray-900 placeholder-gray-600 mb-4"
          />
          <input
            type="text"
            name="cuisineType"
            // value={menu.cuisineType}
            // onChange={handleRestaurantChange}
            placeholder="Tipo de Cozinha"
            className="w-full p-3 rounded-md bg-gray-200 text-gray-900 placeholder-gray-600 mb-4"
          />
          <input
            type="text"
            name="neighborhood"
            // value={menu.neighborhood}
            // onChange={handleRestaurantChange}
            placeholder="Bairro"
            className="w-full p-3 rounded-md bg-gray-200 text-gray-900 placeholder-gray-600 mb-4"
          />
          <input
            type="text"
            name="city"
            // value={menu.city}
            // onChange={handleRestaurantChange}
            placeholder="Cidade"
            className="w-full p-3 rounded-md bg-gray-200 text-gray-900 placeholder-gray-600"
          />
        </div>

        {/* Pratos */}
        <div>
          <h2 className="text-lg font-semibold mb-4 text-gray-800">Pratos</h2>
          {/* {menu.dishes.map((dish, index) => (
            <div key={index} className="border-b border-gray-300 pb-4 mb-4">
              <input
                type="text"
                name="name"
                value={dish.name}
                // onChange={(e) => handleDishChange(index, e)}
                placeholder="Nome do Prato"
                className="w-full p-3 rounded-md bg-gray-200 text-gray-900 placeholder-gray-600 mb-4"
              />
              <textarea
                name="description"
                value={dish.description}
                // onChange={(e) => handleDishChange(index, e)}
                placeholder="Descrição"
                className="w-full p-3 rounded-md bg-gray-200 text-gray-900 placeholder-gray-600 mb-4"
              ></textarea>
              <input
                type="text"
                name="price"
                value={dish.price}
                // onChange={(e) => handleDishChange(index, e)}
                placeholder="Preço"
                className="w-full p-3 rounded-md bg-gray-200 text-gray-900 placeholder-gray-600 mb-4"
              />
              <input
                type="file"
                name="photo"
                // onChange={(e) => handleDishChange(index, e)}
                className="w-full p-3 bg-gray-200 text-gray-900 mb-4"
              />
              <button
                type="button"
                // onClick={() => removeDish(index)}
                className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
              >
                Remover Prato
              </button>
            </div>
          ))} */}
          <button
            type="button"
            // onClick={addDish}
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            Adicionar Prato
          </button>
        </div>

        {/* Botão de Enviar */}
        <button
          type="submit"
          className="w-full py-3 bg-green-500 text-white rounded-md hover:bg-green-600"
        >
          Criar Menu
        </button>
      </form>
    </div>
  );
}
