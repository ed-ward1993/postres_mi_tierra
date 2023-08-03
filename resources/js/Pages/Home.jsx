import {React, useEffect, useState} from 'react';
import Layout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { usePage, useForm } from '@inertiajs/react';
import Icon from '@/components/Icon';

const Home = () => {
    // const {citas} = usePage().props;
    const [rolesActual, setRolesActual] = useState('');

    const rolActual = (e) => {
        axios.get(route('main.rol')).then((response) => {
            setRolesActual(response.data.roles);
        }).catch((error) => {
        });
    }

    useEffect(() => {
        rolActual();
      }, []);


    return (
        <>
        <Head title="Inicio" />
        <div className="flex flex-col h-full">
            <div className="flex-1">
                <div className="max-w-full mx-auto sm:px-6 lg:px-8">
                    <div className="h-10 overflow-hidden shadow-sm sm:rounded-lg border-2 border-[#dfefff] mb-5  ">
                        <div className="px-5 pt-1 text-[#048FC2]">Postres de mi tierra</div>
                    </div>
                </div>
                {(rolesActual === 'Agendador' || rolesActual === 'Administrador') && (
                <div className='w-full centrar mb-4'>
                    <div className='text-[#003066] text-2xl font-bold'>
                        Notificaciones
                    </div>
                </div>
                )}

                <div className="max-w-[97%] mx-auto sm:px-6">
                    <div className="flex-col overflow-hidden shadow-sm sm:rounded-lg border-2 border-gray-200">
                    {(rolesActual === 'Empresa' || rolesActual === 'Empresa_Sede') && (
                        <>
                        <div className="w-full centrar p-6 font-bold text-2xl text-[#6F7477]">Bienvenido</div>
                        <div className="w-full centrar -mt-4 p-6 font-semibold text-xl text-[#026882] max-2xl:text-lg max-2xl:-mt-8 max-lg:text-sm max-lg:-mt-4">Selecciona una opción del menú que esta ubicado en la parte superior</div>
                        <div className="centrar w-full">
                            <img src="images/SVG/muñeco.svg" className="max-2xl:h-60" />
                        </div>
                        </>
                    )}
                        {/* {(rolesActual === 'Agendador' || rolesActual === 'Administrador') && (
                            <div className='w-full p-2 grid grid-cols-1 lg:grid-cols-3 gap-2'>
                                {citas.data.map((cita, index) => (
                                        <div className="col-span-1 border border-gray-300 rounded-md p-4 shadow-sm flex" key={index}>
                                            <div className='w-4/5 '>
                                                <div className='w-10/12 uppercase text-sm font-semibold mb-2 text-[#002F65] italic' >
                                                    {cita.sede}
                                                </div>
                                                <div className='flex space-x-3'>
                                                    <div className=''>
                                                        <span className='text-sm font-medium mt-1'>Citas por asignar:  </span>
                                                    </div>
                                                    <div className=' centrar'>
                                                        <div className='bg-gray-300 rounded-full w-8 h-8 centrar '>
                                                            <div className='text-lg font-bold text-[#002F65]'>
                                                                {cita.cantidad_citas}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className='w-1/5 '>
                                                <div className=' lg:w-11 lg:h-11 w-8 h-8 rounded-full  bg-gradient-to-r from-[#026882] to-[#002F65] centrar'>
                                                <Icon className="lg:w-7 lg:h-7 w-5 h-5 fill-current text-white group-hover:text-gray-300 focus:text-gray-600" name="campana" />
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                }
                                   {
                                    citas.data.length === 0 && (
                                        <div
                                        className="drop-shadow-lg rounded-lg border-t-2 transition-opacity duration-500 ease-in-out bg-[#fafcff] hover:opacity-75 transform hover:-translate-y-1 hover:scale-10 p-4 flex w-full h-full text-lg font-semibold text-[#003066">
                                            No Hay Citas Por Asignar...
                                        </div>
                                    )
                                }
                            </div>
                        )} */}
                    </div>
                </div>
            </div>
        </div>
        </>
    );
};
Home.layout = page => <Layout title="Principal" children={page} />;
export default Home;
