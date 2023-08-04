import DangerButton from '@/Components/DangerButton';
import InputLabel from '@/Components/InputLabel';
import SecondaryButton from '@/Components/SecondaryButton';
import TextInput from '@/Components/TextInput';
import { useState } from 'react';
import { useForm, Link, usePage, router } from '@inertiajs/react';
import { Head } from '@inertiajs/react';
import PrimaryButton from '@/Components/PrimaryButton';
import WarningButton from '@/Components/WarningButton';
import Swal from 'sweetalert2';
import { Inertia } from '@inertiajs/inertia';
import Pagination from '@/Components/Pagination';
import TableButton from '@/Components/TableButton';
import Icon from '@/Components/Icon';

export default function Permisos(props) {

    const { permisos,queryPermisos } = usePage().props;

    // console.log(permisos);
    const [formulario, setFormulario] = useState(false);
    const [listado, setListado] = useState(true);

    const [operation, setOperation] = useState(1);

    const { data, setData ,get} = useForm({
        id: '', nombre: '',
        queryPermisos: queryPermisos || ''

    });


    const openModal = (op, id, nombre) => {
        setFormulario(true);
        setListado(false);
        setOperation(op);
        setData({ nombre: '' });
        if (op === 1) {
        }
        else {
            setData({ id: id, nombre: nombre });
        }
    }


    const save = (e) => {
        e.preventDefault();
        if (operation === 1) {
            axios.post(route('permisos.store'), {
                nombre: data.nombre
            })
                .then(function (response) {
                    Swal.fire({
                        icon: 'success',
                        title: 'Permiso guardado Exitosamente!',
                        showConfirmButton: true,
                    }).then(() => {
                        setFormulario(false);
                        setListado(true);
                        router.get(route('permisos.index'), {}, { preserveState: true, preserveScroll: true });
                    });
                })
                .catch(function (error) {
                    Swal.fire({
                        icon: 'error',
                        title: 'Ocurrió un error!',
                        showConfirmButton: true,
                    })
                });
        }
        else {
            axios.post(route('permisos.update'), {
                id: data.id,
                nombre: data.nombre
            })
                .then(function (response) {
                    Swal.fire({
                        icon: 'success',
                        title: 'Permiso Actualizado Exitosamente!',
                        showConfirmButton: true,
                    }).then(() => {
                        setFormulario(false);
                        setListado(true);
                        router.get(route('permisos.index'), {}, { preserveState: true, preserveScroll: true });
                    });
                })
                .catch(function (error) {
                    Swal.fire({
                        icon: 'error',
                        title: 'Ocurrió un error!',
                        showConfirmButton: true,
                    })
                });
        }
    }

    const inactivar = (id) => {
        Swal.fire({
            title: 'Esta Seguro de desactivar este Permiso?',
            type: 'warning',
            showCancelButton: true,
            showConfirmButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Aceptar',
            cancelButtonText: 'Cancelar',
        }).then((result) => {
            if (result.value) {
                axios.put(route('permisos.inactivar'), {
                    'id': id
                }).then((response) => {
                    router.get(route('permisos.index'), {}, { preserveState: true, preserveScroll: true });
                    Swal.fire(
                        'Desactivado!',
                        'El registro ha sido desactivado con éxito.',
                        'success'
                    )
                }).catch(function (error) {
                    console.log(error);
                });


            } else if (
                // Read more about handling dismissals
                result.dismiss === Swal.DismissReason.cancel
            ) {

            }
        })
    }

    const activar = (id) => {
        Swal.fire({
            title: 'Esta Seguro de activar este Permiso?',
            type: 'warning',
            showCancelButton: true,
            showConfirmButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Aceptar',
            cancelButtonText: 'Cancelar',
        }).then((result) => {
            if (result.value) {
                axios.put(route('permisos.activar'), {
                    'id': id
                }).then((response) => {
                    router.get(route('permisos.index'), {}, { preserveState: true, preserveScroll: true });
                    Swal.fire(
                        'Activado!',
                        'El registro ha sido activado con éxito.',
                        'success'
                    )
                }).catch(function (error) {
                    console.log(error);
                });


            } else if (
                // Read more about handling dismissals
                result.dismiss === Swal.DismissReason.cancel
            ) {

            }
        })
    }

    const buscarInfo = (e) => {
        get(route("permisos.index"), {
            preserveScroll: true,
            preserveState: true,
        })
    }

    return (
        <>
            <Head title="Permisos" />

            <div className="flex flex-col h-full">
                <div className="flex-1">

                    <div className="max-w-full mx-auto sm:px-6 ">
                        <div className="h-8 py px-2 overflow-hidden shadow-sm sm:rounded-md mb-5 border-[#E1B869] border">
                            <Link
                                href={route('permisos.index')}
                                className="text-[#ce9936] hover:text-[#846222] text-lg  italic">Permisos </Link>
                            {formulario && operation === 1 && (
                                <span className='text-base text-[#a47e38]'>/ Crear</span>
                            )}
                            {formulario && operation === 2 && (
                                <span className='text-base text-[#a47e38]'>/ Editar</span>
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
                                                value={data.queryPermisos}
                                                onChange={(e) => setData("queryPermisos", e.target.value)}
                                                onKeyUp={buscarInfo} />
                                            <button
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
                                        Crear Permiso
                                    </Link>


                                </div>

                                <div className="overflow-x-auto bg-white rounded shadow mb-6">
                                    <table className="w-full border text-center text-base font-semibold table-auto whitespace-nowrap ">
                                        <thead className="border-t font-medium border-2 border-grey-900">
                                            <tr className="font-bold text-left bg-gray-100">
                                                <th scope="col" className="border-r px-6 pt-5 pb-4">
                                                    #
                                                </th>
                                                <th scope="col" className="border-r px-6 pt-5 pb-4">
                                                    Nombre
                                                </th>
                                                <th scope="col" className="border-r px-6 pt-5 pb-4">
                                                    Fecha Creación
                                                </th>
                                                <th scope="col" className="border-r px-6 pt-5 pb-4">
                                                    Estado
                                                </th>
                                                <th scope="col" className="border-r px-6 pt-5 pb-4">
                                                    Acciones
                                                </th>

                                            </tr>
                                        </thead>
                                        <tbody className='text-left'>
                                            {permisos.data.map((permiso, i) => (
                                                <tr key={permiso.id} className="hover:bg-gray-50 focus-within:bg-gray-100 border-b">
                                                    <td className="whitespace-nowrap border-r px-6 py-4">
                                                        {(i + 1)}
                                                    </td>
                                                    <th scope="row" className="px-6 py-4 font-medium border-r  text-blue-900 whitespace-nowrap ">
                                                        {permiso.name}
                                                    </th>
                                                    <td className="whitespace-nowrap border-r px-6 py-4 font-medium">
                                                        {permiso.created_at}
                                                    </td>
                                                    <td className="whitespace-nowrap border-r px-6 py-4 font-medium">
                                                        {permiso.status == true ? <p>Activo</p> : <p>Inactivo</p>}
                                                    </td>
                                                    <td className="whitespace-nowrap border-r px-3 py-2 space-x-2 centrar">
                                                        <div className='w-8 h-8'>
                                                            <TableButton
                                                                className='bg-[#026882] hover:bg-[#003442] p-1 '
                                                                onClick={() => openModal(2, permiso.id, permiso.name)}>
                                                                <div className='w-6 h-6  '>
                                                                    <Icon className="w-6 h-6 text-white fill-current group-hover:text-gray-300 focus:text-gray-600 " name="edit" />
                                                                </div>
                                                            </TableButton>
                                                        </div>
                                                        {permiso.status == true ?
                                                            <div className='w-8 h-8'>
                                                                <TableButton
                                                                    className='bg-[#CB0E28] hover:bg-[#AE0C22] p-1 '
                                                                    onClick={() => inactivar(permiso.id)}>
                                                                    <div className='w-6 h-6  '>
                                                                        <Icon className="w-6 h-6 text-white fill-current group-hover:text-gray-300 focus:text-gray-600 " name="trash" />
                                                                    </div>
                                                                </TableButton>
                                                            </div>
                                                            :
                                                            <div className='w-8 h-8'>
                                                                <TableButton
                                                                    className='bg-[#026882]/10 hover:bg-[#026882]/50 p-1'
                                                                    onClick={() => activar(permiso.id)}>
                                                                    <div className='w-6 h-6'>
                                                                        <Icon className="w-7 h-7 -ml-[0.15rem] -mt-[0.15rem] text-green-400 fill-current group-hover:text-gray-300 focus:text-gray-600" name="comprobado" />
                                                                    </div>
                                                                </TableButton>
                                                            </div>
                                                        }
                                                    </td>
                                                </tr>
                                            ))}
                                            {permisos.length === 0 && (
                                                <tr>
                                                    <td className="px-6 py-4 border-t" colSpan="4">
                                                        No se encuentran permisos.
                                                    </td>
                                                </tr>
                                            )}
                                        </tbody>
                                    </table>
                                    <Pagination className="mt-6" links={permisos.links} />
                                </div>
                            </div>
                        )}

                        {/* Formulario Crear/Editar*/}
                        {formulario && (
                            <div className="mx-auto my-2 px-4" >
                                <div className="p-8 bg-white rounded shadow">
                                    <form name="createForm" onSubmit={save}>
                                    <div className="flex flex-col">
                                                    <div className='w-full'>
                                                        <InputLabel
                                                            forInput="nombre"
                                                            value="Nombre"
                                                            className="text-sm font-medium"
                                                        />
                                                        <TextInput
                                                            id="nombre"
                                                            type="text"
                                                            className="mt-1 block w-full"
                                                            name="nombre"
                                                            placeholder="Escriba el permiso"
                                                            value={data.nombre}
                                                            onChange={(e) => setData('nombre', e.target.value)}
                                                        />
                                                    </div>
                                    </div>
                                       

                                        <div className="mt-4 flex justify-between">
                                            <button
                                                type="submit"
                                                className="px-6 py-2 font-bold text-white bg-[#843c1a] rounded"
                                            >
                                                Guardar
                                            </button>
                                            <Link
                                                href={route("permisos.index")}
                                                className="px-4 py-2 text-white bg-[#d13a1f]
                                                 rounded"
                                            >
                                                Atrás
                                            </Link>
                                        </div>


                                    </form>
                                </div>
                            </div>
                        )}
                        {/* Cierre Formulario */}

                    </div>
                </div>
            </div>
        </>
    );
}
