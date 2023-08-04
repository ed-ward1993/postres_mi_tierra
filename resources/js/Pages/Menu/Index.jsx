import React, {useEffect, useState, useRef} from "react";
import {usePage, useForm, Link, Head} from "@inertiajs/react";
import Pagination from "@/components/Pagination";
import Swal from "sweetalert2";
import Icon from '@/components/Icon';


export default function Index ({ auth }) {
    const { menus, queryMenus, page } = usePage().props;
    const { data, setData, get, delete: destroy, errors} = useForm({
        queryMenus: queryMenus || '',
        page: page || '',
        status: '0',
    });

    function deleteMenu(id) {
        Swal.fire({
            title: (data.status === '0'?'in':'')+"activando men&uacute;",
            icon: 'warning',
            html: "Est&aacute; seguro de "+(data.status === '0'?'in':'')+"activar el men&uacute;?",
            showCloseButton: true,
            showCancelButton: true,
            focusConfirm: false,
            confirmButtonText:
                '<i className="fa-solid fa-check"></i> Aceptar',
            confirmButtonColor: '#026882',
            confirmButtonAriaLabel: (data.status === '0'?'in':'')+'activa el men&uacute;',
            cancelButtonText:
                '<i className="fa-solid fa-times"></i> Cancelar',
            cancelButtonAriaLabel: 'Cancela la '+(data.status === 0?'in':'')+'activaci&oacute;n del men&uacute;'

        }).then((result) => {
            if (result.isConfirmed) {
                destroy(route("menus.destroy",id),{preserveState: true,preserveScroll: true});
            }
        });
    }

    function handleSearch(e){
        e.preventDefault();
        get(route("menus.index"),{preserveState: true,preserveScroll: true});
    }

    return (
        <>
            <Head title="Menús" />
            <div className="grid grid-cols-6 my-3">
                <div className="col-span-3 lg:col-span-1">
                    <form className="inline-flex rounded-md shadow-sm w-full" onSubmit={handleSearch}>
                        <input type="text" id="queryUsers" name="queryUsers"
                               className="block w-full text-gray-900 border border-gray-300 rounded-lg bg-gray-50"
                               value={data.queryMenus}
                               placeholder="Buscar" onChange={(e) => setData("queryMenus", e.target.value)} />
                        <button type="submit"
                                className="bg-transparent border-0 text-gray-900 -ml-6">
                            <i className="fa-solid fa-search"></i>
                        </button>
                    </form>
                </div>
                <div className="col-span-1 lg:col-span-4">&nbsp;</div>
                <div className="col-span-2 lg:col-span-1">
                    <div className="flex flex-row-reverse">
                        {/*{auth.permissions.includes('menus.create') && (*/}
                            <Link
                                className="btn_principal"
                                href={route("menus.create")}
                                preserveScroll={true}
                                preserveState={true}
                            >
                                Crear Menú
                            </Link>
                        {/*)}*/}
                    </div>
                </div>
            </div>
            <div className="overflow-x-auto bg-white rounded shadow">

                    <table className="w-full border text-center text-base font-semibold table-auto whitespace-nowrap">
                                <thead className="border-t font-medium border-2 border-grey-900">
                                    <tr className="font-bold text-left bg-gray-100">
                                        <th scope="col" className="border-r px-6 pt-5 pb-4">
                                            #
                                        </th>
                                        <th scope="col" className="border-r px-6 pt-5 pb-4">
                                        Titulo
                                        </th>
                                        <th scope="col" className="border-r px-6 pt-5 pb-4">
                                        URL/Ruta
                                        </th>
                                        <th scope="col" className="border-r px-6 pt-5 pb-4">
                                        Padre
                                        </th>
                                        <th scope="col" className="border-r px-6 pt-5 pb-4">
                                            Acciones
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className='text-left'>
                    {menus.data.map(({ id, title, uri, type, status, parent }) => (
                        <tr key={id} className="hover:bg-gray-50 focus-within:bg-gray-100">
                            <td className="px-6 py-4 font-medium border-r  text-blue-900 whitespace-nowrap ">
                                {id}
                            </td>
                            <td className="whitespace-nowrap border-r px-6 py-4">
                                {title}
                            </td>
                            <td className="whitespace-nowrap border-r px-6 py-4">
                                {uri}
                            </td>
                            <td className="whitespace-nowrap border-r px-6 py-4">
                                {parent?parent.title:''}
                            </td>
                            <td className="whitespace-nowrap border-r px-3 py-2 space-x-2 centrar">
                                {/*{auth.permissions.includes('menus.edit') && (*/}
                                    <Link
                                        type="button"
                                        tabIndex="1"
                                        className="p-1 text-sm text-white bg-[#026882] hover:bg-[#003442] rounded"
                                        href={route("menus.edit", id)}
                                    >
                                           <div className='w-6 h-6  '>
                                            <Icon className="w-6 h-6 text-white fill-current group-hover:text-gray-300 focus:text-gray-600 " name="edit" />
                                            </div>
                                    </Link>
                                {/*)}*/}
                                &nbsp;&nbsp;
                                {/*{auth.permissions.includes('menus.destroy') && (*/}
                                    <button
                                        title={(status>0?"in":"")+"activar Menú"}
                                        type="button"
                                        className={"p-1 text-sm text-white bg-"+(status>0?"red":"green")+"-500 rounded"}
                                        onClick={(e)=> {setData("status", status > 0?'0':'1');deleteMenu(id,status);}}
                                    >
                                        {status === 0 && (
                                            <div className='w-6 h-6'>
                                            <Icon className="w-6 h-6 text-white fill-current group-hover:text-gray-300 focus:text-gray-600" name="comprobado" />
                                            </div>
                                        )}
                                        {status > 0 && (

                                              <div className='w-6 h-6  '>
                                              <Icon className="w-6 h-6 text-white fill-current group-hover:text-gray-300 focus:text-gray-600 " name="trash" />
                                              </div>
                                        )}
                                    </button>
                                {/*)}*/}
                            </td>
                        </tr>
                    ))}
                    {menus.data.length === 0 && (
                        <tr>
                            <td
                                className="px-6 py-4 border-t"
                                colSpan="5"
                            >
                                No hay men&uacute;s registrados
                            </td>
                        </tr>
                    )}
                    </tbody>
                </table>
                <Pagination className="mt-6" links={menus.links} />
            </div>
        </>
    );
}
