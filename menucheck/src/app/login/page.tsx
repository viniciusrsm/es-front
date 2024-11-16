'use client'

import Image from "next/image";
import Link from "next/link";

export default function Login(){

    return(
    <div className="flex items-center justify-center min-h-screen bg-slate-100">
        <div className="border-custom1 p-10 rounded-lg shadow-lg max-w-md w-full bg-custom1">
          <div className="flex justify-center mb-6">
            <Image
              src='icons8-anonymous-mask.svg'
              width={96}
              height={96}
              alt="logo"
            />
          </div>
          <h1 className="text-center text-2xl font-semibold mb-8 text-gray-800">MenuCheck</h1>
  
          <form className="space-y-4">
            <input 
              type="text"
              placeholder="Username"
              className="w-full p-3 rounded-md bg-gray-300 text-gray-900 placeholder-gray-700 focus:outline-none"
               />
  
            <input
              type="password"
              placeholder="Password"
              className="w-full p-3 rounded-md bg-gray-300 text-gray-900 placeholder-gray-700 focus:outline-none"
            />
            
            <button
              type="submit"
              className="w-full p-3 mt-6 bg-gray-600 text-white rounded-md hover:bg-gray-700"
            >
              Login
            </button>
          </form>
          
          <p className="text-center text-sm mt-4 text-gray-700">
            Não possui conta? <Link href="/register" className="text-gray-900">Registre-se</Link>
          </p>
        </div>
      </div>
    );
}