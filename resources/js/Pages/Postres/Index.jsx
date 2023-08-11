import { Link, usePage } from "@inertiajs/react";
import { useState } from "react";

const Index = () => {
    const { postres } = usePage().props;
    console.log(postres.data);

    const [formulario, setFormulario] = useState(false);
    const [listado, setListado] = useState(true);

    const [operation, setOperation] = useState(1);
    return (
        <div>
           <div className="flex flex-col h-full">
                <div className="flex-1">
                    <div className="max-w-full mx-auto sm:px-6 ">
                        <div className="h-8 py px-2 overflow-hidden shadow-sm sm:rounded-md mb-5 border-[#E5E7EB] border">
                            <Link
                                href={route('usuarios.indexClientes')}
                                className="text-[#02558A] hover:text-[#0088be8c] text-lg  italic">Postres </Link>
                            {formulario && operation === 1 && (
                                <span className='text-base text-gray-900'>/ Crear</span>
                            )}
                            {formulario && operation === 2 && (
                                <span className='text-base text-gray-900'>/ Editar</span>
                            )}

                        </div>
                    </div>

                    <div className="max-w-[97%] mx-auto sm:px-6">
                    <div className="flex items-center justify-between mb-6 px-1">
                                    <div className="col-span-3 lg:col-span-1">
                                        <form className="inline-flex rounded-md shadow-sm w-full" >
                                            <input type="text"
                                                className="block w-full text-gray-900 border border-gray-300 rounded-lg bg-gray-50"

                                                placeholder="Buscar" />
                                            <button type="submit"
                                                className="bg-transparent border-0 text-gray-900 -ml-6">
                                                <i className="fa-solid fa-search"></i>
                                            </button>
                                        </form>
                                    </div>
                                    <Link
                                        onClick={() => openModal(1)}
                                        className="btn_principal"
                                        preserveScroll={true}
                                        preserveState={true}
                                    >
                                        Nuevo Postre
                                    </Link>
                                </div>

                    <div className="w-full grid grid-cols-12 h-5/6 gap-x-6 gap-y-8">
                        {postres.data.map((postre) => {
                            return (
                                <div
                                    key={postre.id_postres}
                                    className="col-span-6 lg:col-span-3"
                                >
                                    <div className="text-center w-64 max-md:w-60 h-96 ml-10 max-sm:ml-1 max-md:-ml-8 max-lg:ml-0 max-2xl:ml-6 max-xl:px-5 max-2xl:px-2 max-sm:px-1">
                                    <div className="h-full w-full aspect-square  -z-10  grid-cols-3">
                                            <div className=" w-full h-[95%] max-md:h-[75%] max-2xl:h-[70%] rounded-lg shadow-lg cursor-pointer border-b-4 border-[#008BBF] bg-white to-white/40 max-2xl:w-full">
                                                <h3 className="text-[#00477C] text-3xl max-2xl:text-xl mt-2 font-bold h-10">
                                                    {postre.id_postres}
                                                </h3>
                                                <div className="h-[70%] max-2xl:h-[65%] max-2xl:w-full centrar">
                                                    <div className="w-full centrar">
                                                        <img
                                                            src={
                                                                postre.url_logo
                                                            }
                                                            className="w-40 h-40 max-2xl:w-32 max-2xl:h-32 mt-4 max-2xl:mt-1 rounded-sm content"
                                                        />
                                                    </div>
                                                </div>
                                                <div className="centrar w-full mt-4 ">
                                                    <div className="w-28 h-7 max-2xl:w-16 max-2xl:5 centrar text-white font-bold p-4 max-2xl:p-2 bg-[#002f65] border border-transparent shadow-sm transition-all duration-500 ease-in-out hover:bg-[#001E41] hover:text-indigo-50 transform hover:-translate-y-1 hover:scale-100 dark:text-gray-50 rounded-lg">

                                                        <Link
                                                            className="text-xl max-2xl:text-xs -mt-1"
                                                            href={route(
                                                                "main",
                                                                [postre.id]
                                                            )}
                                                        >
                                                            Ingresar
                                                        </Link>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                </div>
            </div>
        </div>
</div>
        </div>
    );
};

export default Index;
