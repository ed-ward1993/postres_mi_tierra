import { useForm, usePage,Link, Head } from '@inertiajs/react';
import { useState } from "react";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import Swal from 'sweetalert2';
import Icon from '@/Components/Icon';
import TableButton from '@/Components/TableButton';
import Pagination from '@/Components/Pagination'
import DynamicSelect from '@/Components/DynamicSelect';

const Index = () => {
    const{categorias, queryCategorias}=usePage().props;
    console.log(categorias.data);

    const [formulario, setFormulario] = useState(false);
    const [listado, setListado] = useState(true);

    const [operation, setOperation] = useState(1);

    const buscarInfo = (e) => {
        get(route("categorias.index"), {
            preserveScroll: true,
            preserveState: true,
        })
    }

    let { data, setData, get , post, processing, errors: formErrors} = useForm({
        id: "",
        nombre: "",
        descripcion: "",
        queryCategorias: queryCategorias || ''
    });

    const openModal = (op, id, nombre) => {
        setFormulario(true);
        setListado(false);
        setOperation(op);
        setData({   
        nombre: "",
        descripcion: ""
       
    });
        if (op === 1) {
        } else {
            setData({ id: id, nombre: nombre, descripcion: descripcion });
        }
    };

    return (
        <>
        <Head title="Categorias" />
        <div className="flex flex-col h-full">
            <div className="flex-1">
                <div className="max-w-full mx-auto sm:px-6 ">
                    <div className="h-8 py px-2 overflow-hidden shadow-sm sm:rounded-md mb-5 border-[#E5E7EB] border">
                        <Link
                            href={route('categorias.index')}
                            className="text-[#02558A] hover:text-[#0088be8c] text-lg  italic">Categorias </Link>
                            {formulario && operation === 1 && (
                                <span className='text-base text-gray-900'>/ Crear</span>
                        )}
                        {formulario && operation === 2 && (
                                <span className='text-base text-gray-900'>/ Editar</span>
                        )}
                    </div>
                </div>    
                <div className="max-w-[97%] mx-auto sm:px-6">
                    {listado && (
                        <div className="flex-col overflow-hidden shadow-sm sm:rounded-lg ">
                            <div className="flex items-center justify-between mb-6 px-1">
                                <div className="col-span-3 lg:col-span-1">
                                    <form className="inline-flex rounded-md shadow-sm w-full" >
                                        <input type="text"
                                            className="block w-full text-gray-900 border border-gray-300 rounded-lg bg-gray-50"
                                            placeholder="Buscar"
                                            value={data.queryCategorias}
                                            onChange={(e) => setData("queryCategorias", e.target.value)}
                                            onKeyUp={buscarInfo} />
                                        <button
                                            className="bg-transparent border-0 text-gray-900 -ml-6">
                                            <i className="fa-solid fa-search"></i>
                                        </button>
                                    </form>
                                </div>
                                <Link
                                    onClick={() => openModal(1)}
                                    className="px-6 py-3 rounded bg-[#01356A] text-white text-sm font-bold whitespace-nowrap hover:bg-[#001E41] focus:bg-[#001E41] focus:outline-none"
                                    preserveScroll={true}
                                    preserveState={true}
                                >
                                    Crear Categorias
                                </Link>
                            </div>

                            <div className="overflow-x-auto bg-white rounded shadow mb-2">
                                <table className="w-full border text-center text-base font-semibold table-auto whitespace-nowrap">
                                    <thead className="border-t font-medium border-2 border-grey-900">
                                        <tr className="font-bold text-left bg-gray-100">
                                            <th
                                                scope="col"
                                                className="border-r px-6 pt-5 pb-4"
                                            >
                                                #
                                            </th>                                               
                                            <th
                                                scope="col"
                                                className="border-r px-6 pt-5 pb-4"
                                            >
                                               Nombre
                                            </th> 
                                            <th
                                                scope="col"
                                                className="border-r px-6 pt-5 pb-4"
                                            >
                                               Descripción
                                            </th>                                              
                                            <th
                                                scope="col"
                                                className="border-r px-6 pt-5 pb-4"
                                            >
                                                Estado
                                            </th>
                                            <th
                                                scope="col"
                                                className="border-r px-6 pt-5 pb-4"
                                            >
                                                Acciones
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="text-left">
                                        {categorias.data.map((categoria, i) => (
                                            <tr
                                                key={categoria.id}
                                                className="hover:bg-gray-50 focus-within:bg-gray-100 border-b"
                                            >
                                                <td className="whitespace-nowrap border-r px-6 py-4">
                                                    {i + 1}
                                                </td>
                                                <th
                                                    scope="row"
                                                    className="px-6 py-4 font-medium border-r  text-blue-900 whitespace-nowrap "
                                                >
                                                   {categoria.nombre}
                                                </th>
                                                <th
                                                    scope="row"
                                                    className="px-6 py-4 font-medium border-r  text-blue-900 whitespace-nowrap "
                                                >
                                                   {categoria.descripcion}
                                                </th>                                               
                                                <td className="whitespace-nowrap border-r px-6 py-4 font-medium">
                                                    {categoria.estado == true ? (
                                                        <p>Activo</p>
                                                    ) : (
                                                        <p>Inactivo</p>
                                                    )}
                                                </td>
                                                <td className="whitespace-nowrap border-r px-3 py-2 space-x-2 centrar">                                                      

                                                    <div className='w-8 h-8'>
                                                        <TableButton
                                                            className='bg-[#026882] hover:bg-[#003442] p-1 '
                                                            onClick={() => openModal(2,
                                                            categoria.id, 
                                                            categoria.nombre,
                                                            )}>
                                                            <div className='w-6 h-6  '>
                                                                <Icon className="w-6 h-6 text-white fill-current group-hover:text-gray-300 focus:text-gray-600 " name="edit" />
                                                            </div>
                                                        </TableButton>
                                                    </div>
                                                    {categoria.estado == true ? (
                                                        <div className='w-8 h-8'>
                                                            <TableButton
                                                                className='bg-[#CB0E28] hover:bg-[#AE0C22] p-1 '
                                                                onClick={() => inactivar(categoria.id)}>
                                                                <div className='w-6 h-6  '>
                                                                    <Icon className="w-6 h-6 text-white fill-current group-hover:text-gray-300 focus:text-gray-600 " name="trash" />
                                                                </div>
                                                            </TableButton>
                                                        </div>
                                                    ) : (
                                                        <TableButton
                                                            className='bg-[#026882]/10 hover:bg-[#026882]/50 p-1'
                                                            onClick={() => activar(categoria.id)}>
                                                            <div className='w-6 h-6'>
                                                                <Icon className="w-7 h-7 -ml-[0.15rem] -mt-[0.15rem] text-green-400 fill-current group-hover:text-gray-300 focus:text-gray-600" name="comprobado" />
                                                            </div>
                                                        </TableButton>
                                                    )}
                                                </td>
                                            </tr>
                                        ))}
                                        {categorias.length === 0 && (
                                            <tr>
                                                <td
                                                    className="px-6 py-4 border-t"
                                                    colSpan="4"
                                                >
                                                    No se encuentran cargos.
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}

                    {/* Formulario Crear/Editar*/}
                    {formulario && (
                        <div className="mx-auto my-2 px-4 ">
                            <div className="p-8 rounded shadow">
                                <form name="createForm" onSubmit={save}>
                                    {(operation === 1 ||
                                        operation === 2) && (
                                            <div className='w-full p-2 grid grid-cols-6 gap-2'>
                                            <p className="hidden">{operation}</p>
                                          
                                            <div className="px-3 col-span-6 mb-3">
                                                <InputLabel
                                                    forInput="nombre"
                                                    value="Nombre"
                                                    className="text-sm font-medium"
                                                />
                                                <TextInput
                                                    id="nombre"
                                                    type="text"
                                                    className="mt-1 block mb-6 uppercase"
                                                    name="nombre"
                                                    errors={errors.nombre}
                                                    value={data.nombre}
                                                    onChange={e => setData('nombre', e.target.value)}
                                                    placeholder="Nombre del categoria"        
                                                />
                                            </div>
                                          
                                        </div>                                              
                                        )}
                                    
                                    <div className="grid justify-items-stretch">
                                        <div className="mt-4 justify-self-end space-x-2">
                                            <button
                                                type="submit"
                                                className="px-3 py-2 rounded bg-[#002F65] text-white text-sm font-bold whitespace-nowrap hover:bg-[#001E41] focus:bg-[#001E41]"
                                            >
                                                {operation === 1 && (
                                                    <div> Guardar</div>
                                                )}
                                                {operation === 2 && (
                                                    <div> Editar</div>
                                                )}
                                            </button>
                                            <Link
                                                href={route("categorias.index")}
                                                className="px-3 py-2 rounded bg-[#667379] text-white text-sm font-bold whitespace-nowrap hover:bg-[#595D60] focus:bg-[#6F7477]"
                                            >
                                                Atrás
                                            </Link>
                                        </div>
                                    </div>

                                </form>
                            </div>
                        </div>
                    )} 
                   
                    {/* Cierre Formulario */}
                </div>
                {listado && (
                    <div className="ml-10 mb-6">
                        <Pagination  links={categorias.links} />
                    </div>
                )}
            </div>
        </div>
    </>
    );
};

export default Index;