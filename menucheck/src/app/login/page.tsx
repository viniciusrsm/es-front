'use client'

import Link from "next/link";
import { apiService } from "@/service/api";
import { isAxiosError } from "axios";
import { useFormik } from 'formik';
import TextField from '@mui/material/TextField';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import * as Yup from 'yup';


export default function Login(){
  
  const [error, setError] = useState(false);

  const router = useRouter()

  const formik2 = useFormik({
      initialValues: {
        username: '', 
        senha: '', // Alterado de senhaLogin para senha
      },
      validationSchema: Yup.object({
        username: Yup.string().required('Nome de usuário inválido').required('O campo usuário é obrigatório'),
        senha: Yup.string().required('O campo Senha é obrigatório'),
      }),
      onSubmit: async (values) => {
        try {
          // Fazer uma solicitação ao backend para verificar o login
          const response: {
            access_token?: string;
          } = await apiService.post('/auth/login', values);
        
          

          if (response && response.access_token) {
            // Se a solicitação for bem-sucedida, o login é válido
            console.log('Login bem-sucedido!');
            
            sessionStorage.setItem('access_token', response.access_token); // Salvar o token na sessionStorage
  
            router.push('/restaurants') // Redirecionar o usuário para a página de destino

          } else {
            // Se a solicitação falhar, o login é inválido
            console.error('Credenciais inválidas!');
            // Exibir uma mensagem de erro para o usuário
          }
        } catch (error) {
          if (isAxiosError(error) && (error.response?.status === 401 || error?.response?.status === 500)) {
            setError(true);
          }
          // Lidar com erros de requisição ou exceções
          console.error('Erro ao fazer a requisição:', error);
          // Exibir uma mensagem de erro para o usuário
        }
      }
    })

    return(
    <div className="flex items-center justify-center min-h-screen bg-slate-100">
        <div className="border-custom1 p-10 rounded-lg shadow-lg max-w-md w-full bg-custom1">
          <div className="flex justify-center mb-6">
            <Image
              src='/icons8-anonymous-mask.svg'
              width={96}
              height={96}
              alt="logo"
            />
          </div>
          <h1 className="text-center text-2xl font-semibold mb-8 text-gray-800">MenuCheck</h1>
  
          <form 
            className="space-y-4 "
            onSubmit={formik2.handleSubmit}
          >
            <div className="flex flex-col mb-4 w-full">
              <TextField
                id="username"
                name="username"
                label="Apelido"
                variant="outlined"
                value={formik2.values.username}
                onChange={formik2.handleChange}
                onBlur={formik2.handleBlur}
              />
            </div>
  
            <div className="flex flex-col mb-4 w-full">
              <TextField
                id="senha"
                name="senha"
                type="password"
                label="Senha"
                variant="outlined"
                value={formik2.values.senha}
                onChange={formik2.handleChange}
                onBlur={formik2.handleBlur}
              />
            </div>
            
            {error && <div className='text-center text-sm'>
              <p className='text-zinc-800'>Usuário ou senha inválidos.</p>
            </div>}
            
            <div>
              <button
                type="submit"
                className="w-full p-3 mt-6 bg-gray-600 text-white rounded-md hover:bg-gray-700"
              >
                Login
              </button>
            </div>
          </form>
          
          <div >
            <span className="text-center text-sm mt-4 text-gray-700">
              Não possui conta? <Link href="/register" className="text-gray-900">Registre-se</Link>
            </span>
          </div>
        </div>
      </div>
    );
}