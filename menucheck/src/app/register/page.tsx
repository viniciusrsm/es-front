'use client'

import { apiService } from "@/service/api";
import TextField from '@mui/material/TextField';
import { useFormik } from 'formik';
import Image from "next/image";
import Link from "next/link";
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import * as Yup from 'yup';

export default function Register(){
    const [error, setError] = useState(false)
    const router = useRouter();
    const formik = useFormik({
        initialValues: {
            username: '',
            name: '',
            senha: '',
        },
        validationSchema: Yup.object({
            username: Yup.string().required('O campo Apelido é obrigatório'),
            name: Yup.string().required('O campo Nome é obrigatório'),
            senha: Yup.string().required('O campo Senha é obrigatório'),
        }),        
        onSubmit: async (values, { setSubmitting }) => {
        console.log(values);
        
        console.log("submiting")

        try {
            // Aqui você pode fazer qualquer formatação adicional de dados necessária antes de enviar para o backend
            // Por exemplo, você pode querer converter a data de aniversário para um formato específico
            // Enviar dados para o backend

            const response = await apiService.post('/user', values);
            if (response) {
                // Se o usuário foi criado com sucesso, redirecione para a página de login
                router.push('/login');
                console.log("Usuário cadastrado com sucesso!");
                setError(false)
            }
        } catch (error) {
            console.error('Erro ao cadastrar usuário:', error);
            setError(true)
            // Lidar com o erro de exceção, como exibir uma mensagem de erro para o usuário
        } finally {
            setSubmitting(false);
        }

        },
    })


    return(
        <div className="flex items-center justify-center min-h-screen bg-slate-100">
            <div className="border-custom1 p-10 rounded-lg shadow-lg max-w-md w-full bg-custom1">
            <div className="flex justify-center mb-6">
                <Image
                    src='assets/icons8-anonymous-mask.svg'
                    width={96}
                    height={96}
                    alt="logo"
                />
            </div>
            <h1 className="text-center text-2xl font-semibold mb-8 text-gray-800">MenuCheck</h1>
    
            <form 
                className="space-y-4"
                onSubmit={formik.handleSubmit}
            >

                <div className="flex flex-col mb-4 w-full">
                    <TextField
                        id="username"
                        name="username"
                        label="Apelido"
                        variant="outlined"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.username}
                    />
                    {formik.touched.username && formik.errors.username ? (
                        <div className="text-sm text-red-800">{formik.errors.username}</div>
                    ) : null}
                </div>
                <div className="flex flex-col mb-4 w-full">
                    <TextField
                        id="name"
                        name="name"
                        label="Nome"
                        variant="outlined"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.name}
                    />
                    {formik.touched.name && formik.errors.name ? (
                        <div className="text-sm text-red-800">{formik.errors.name}</div>
                    ) : null}
                </div>
            
    
                <div className="flex flex-col mb-4 w-full">
                    <TextField
                        id="senha"
                        name="senha"
                        label="Senha"
                        variant="outlined"
                        type="password"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.senha}
                        error={formik.touched.senha && Boolean(formik.errors.senha)}
                        helperText={formik.touched.senha && formik.errors.senha}
                    />
                </div>
                <span className={`text-vermelho mb-2 font-semibold ${error ? "block" : "hidden"}`}>Erro ao cadastrar usuário!</span>
                <button
                    type="submit"
                    className="w-full p-3 mt-6 bg-gray-600 text-white rounded-md hover:bg-gray-700"
                >
                    Registrar
                </button>

            </form>
    
            <p className="text-center text-sm mt-4 text-gray-700">
                Já possui conta?{' '}
                <Link href="/login" className="text-gray-900">Conecte-se</Link>
            </p>
            </div>
        </div>
    );
}