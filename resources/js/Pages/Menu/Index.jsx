import React, {useEffect, useState, useRef} from "react";
import {usePage, useForm, Link, Head} from "@inertiajs/react";
import Pagination from "@/Components/Pagination";
import Swal from "sweetalert2";

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
                '<i class="fa-solid fa-check"></i> Aceptar',
            confirmButtonColor: '#22c55e',
            confirmButtonAriaLabel: (data.status === '0'?'in':'')+'activa el men&uacute;',
            cancelButtonText:
                '<i class="fa-solid fa-times"></i> Cancelar',
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
                                className="px-6 py-2 text-white bg-green-500 rounded-md focus:outline-none"
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
                <table className="w-full whitespace-nowrap">
                    <thead className="text-white bg-gray-600">
                    <tr className="font-bold text-left">
                        <th className="px-6 pt-5 pb-4">#</th>
                        <th className="px-6 pt-5 pb-4">Titulo</th>
                        <th className="px-6 pt-5 pb-4">URL/Ruta</th>
                        <th className="px-6 pt-5 pb-4">Padre</th>
                        <th className="px-6 pt-5 pb-4 text-center">Acciones</th>
                    </tr>
                    </thead>
                    <tbody>
                    {menus.data.map(({ id, title, uri, type, status, parent }) => (
                        <tr key={id} className="">
                            <td className="border-t p-2">
                                {id}
                            </td>
                            <td className="border-t p-2">
                                {title}
                            </td>
                            <td className="border-t p-2">
                                {uri}
                            </td>
                            <td className="border-t p-2">
                                {parent?parent.title:''}
                            </td>
                            <td className="border-t text-center p-2">
                                {/*{auth.permissions.includes('menus.edit') && (*/}
                                    <Link
                                        type="button"
                                        tabIndex="1"
                                        className="px-4 py-2 text-sm text-white bg-blue-500 rounded"
                                        href={route("menus.edit", id)}
                                    >
                                        <i className="fa-solid fa-pen"></i>
                                    </Link>
                                {/*)}*/}
                                &nbsp;&nbsp;
                                {/*{auth.permissions.includes('menus.destroy') && (*/}
                                    <button
                                        title={(status>0?"in":"")+"activar Menú"}
                                        type="button"
                                        className={"px-4 py-2 text-sm text-white bg-"+(status>0?"red":"green")+"-500 rounded"}
                                        onClick={(e)=> {setData("status", status > 0?'0':'1');deleteMenu(id,status);}}
                                    >
                                        {status === 0 && (
                                            <i className="fa-solid fa-check-circle"></i>
                                        )}
                                        {status > 0 && (
                                            <i className="fa-solid fa-times-circle"></i>
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
                <Pagination class="mt-6" links={menus.links} />
            </div>
        </>
    );
}
