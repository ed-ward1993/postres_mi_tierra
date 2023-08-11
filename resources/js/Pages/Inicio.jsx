import React from 'react'
import Carusel from '../Components/Empresa/Carusel'
import { Link, usePage } from '@inertiajs/react';

export default function Inicio() {
    const {  auth } = usePage().props
    console.log(auth);
    return (
        <div className="w-full h-screen centrar flex-col bg-dunes bg-cover bg-left-bottom ]">
        {/* <div className="w-full h-screen centrar flex-col bg-dunes bg-cover bg-left-bottom bg-[url('../../images/PNG/fondo_empresas.jpeg')]"> */}
            <div className='w-5/6 h-full flex flex-col'>
                <div className="centrar flex-col w-full h-56 max-2xl:h-24 max-md:mt-3">
                    <div className='centrar flex-col rounded-full w-40 h-40 max-2xl:h-14 max-2xl:w-14 max-lg:mt-4 max-2xl:mt-3 -mt-5'>
                        {/* <img src="images/SVG/logo_blanco.svg" className="object-cover w-24 h-24 max-md:w-16" /> */}
                    </div>
                    <div className='centrar w-1/2 h-8 -mt-3 max-md:w-full max-2xl:w-full max-2xl:mt-2 '>
                        <h1 className='text-3xl max-md:text-base max-2xl:text-lg font-bold text-[#fff]'>Postres de Mi Tierra</h1>
                    </div>
                </div>
                <div className=' w-full h-4/6'>
                    <div className='w-full h-4/5 p-5 z-50 mt-5 max-md:h-5/6'>
                        <Carusel />
                    </div>
                    <div className='w-full h-14 centrar'>
                        <div className=' w-1/2 max-2xl:w-full centrar space-x-10 max-md:space-x-3 max-md:h-8 '>
                        {(auth.user.roles[0].name === 'super_administrador' || auth.user.roles[0].name === 'administrador') && (
                            <Link href={route('dashboard')} as="button" className='boton_secundario'>
                                Administración
                            </Link>
                        )}
                            <Link href={route('logout')} method="post" as="button" className='boton_secundario'>
                                Cerrar Sesión
                            </Link>
                        </div>
                    </div>
                </div>
                <div className="centrar w-full h-18 max-md:h-10 absolute inset-x-0 bottom-0">
                    {/* <img src="images/postres.png" className=" w-56 max-md:w-32 max-2xl:w-40 " /> */}
                </div>
            </div>
        </div>
    )
}

