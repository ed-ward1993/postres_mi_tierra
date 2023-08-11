import DangerButton from "@/Components/DangerButton";
import InputLabel from "@/Components/InputLabel";
import SecondaryButton from "@/Components/SecondaryButton";
import TextInput from "@/Components/TextInput";
import { useState } from "react";
import { useForm, Link, usePage, router } from "@inertiajs/react";
import { Head } from "@inertiajs/react";
import PrimaryButton from "@/Components/PrimaryButton";
import WarningButton from "@/Components/WarningButton";
import Swal from "sweetalert2";
import { Inertia } from "@inertiajs/inertia";
import CheckInput from "@/Components/CheckInput";
import TableButton from '@/Components/TableButton';
import Icon from '@/Components/Icon';
import Pagination from '@/Components/Pagination'
import { Checkbox } from 'primereact/checkbox';


export default function Index(props) {
    const { roles, permisos, nombre_menu, queryRoles } = usePage().props;
    // console.log(roles);
    const [formulario, setFormulario] = useState(false);
    const [listado, setListado] = useState(true);

    const [operation, setOperation] = useState(1);

    let [selectedPermissions, setSelectedPermissions] = useState([]);

    let global = '';

    const { data, setData, get } = useForm({
        id: "",
        nombre: "",
        description: "",
        permiso: "",
        queryRoles: queryRoles || ''
    });

    const openModal = (op, id, nombre, description) => {
        setFormulario(true);
        setListado(false);
        setOperation(op);
        setData({ nombre: "", description: "", permisos: [] });
        if (op === 1) {
        } else {
            obtenerRolPermisos(id);
            setData({ id: id, nombre: nombre, description: description });
        }
    };

    const save = (e) => {
        e.preventDefault();
        if (operation === 1) {
            axios
                .post(route("roles.store"), {
                    nombre: data.nombre,
                    description: data.description,
                })
                .then(function (response) {
                    Swal.fire({
                        icon: "success",
                        title: "Rol guardado Exitosamente!",
                        showConfirmButton: true,
                    }).then(() => {
                        setFormulario(false);
                        setListado(true);
                        router.get(
                            route("roles.index"),
                            {},
                            { preserveState: true, preserveScroll: true }
                        );
                    });
                })
                .catch(function (error) {
                    Swal.fire({
                        icon: "error",
                        title: "Ocurrió un error!",
                        showConfirmButton: true,
                    });
                });
        } else if (operation === 2) {
            axios
                .post(route("roles.update"), {
                    id: data.id,
                    nombre: data.nombre,
                    description: data.description,
                })
                .then(function (response) {
                    Swal.fire({
                        icon: "success",
                        title: "Rol Actualizado Exitosamente!",
                        showConfirmButton: true,
                    }).then(() => {
                        setFormulario(false);
                        setListado(true);
                        router.get(
                            route("roles.index"),
                            {},
                            { preserveState: true, preserveScroll: true }
                        );
                    });
                })
                .catch(function (error) {
                    Swal.fire({
                        icon: "error",
                        title: "Ocurrió un error!",
                        showConfirmButton: true,
                    });
                });
        } else {
            axios.put(route('roles.asignarPermisos'), {
                id: data.id,
                permisos: selectedPermissions,

            })
                .then(function (response) {
                    Swal.fire({
                        icon: 'success',
                        title: 'Permisos Asignados Exitosamente!',
                        showConfirmButton: true,
                    }).then(() => {
                        setFormulario(false);
                        setListado(true);
                        router.get(route('roles.index'), {}, { preserveState: true, preserveScroll: true });
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
    };

    const inactivar = (id) => {
        Swal.fire({
            title: "Esta Seguro de desactivar este Rol?",
            type: "warning",
            showCancelButton: true,
            showConfirmButton: true,
            confirmButtonColor: '#026882',
            cancelButtonColor: '#AE0C22',
            confirmButtonText: "Aceptar",
            cancelButtonText: "Cancelar",
        }).then((result) => {
            if (result.value) {
                axios
                    .put(route("roles.inactivar"), {
                        id: id,
                    })
                    .then((response) => {
                        router.get(
                            route("roles.index"),
                            {},
                            { preserveState: true, preserveScroll: true }
                        );
                        Swal.fire(
                            "Desactivado!",
                            "El registro ha sido desactivado con éxito.",
                            "success"
                        );
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            } else if (
                // Read more about handling dismissals
                result.dismiss === Swal.DismissReason.cancel
            ) {
            }
        });
    };

    const activar = (id) => {
        Swal.fire({
            title: "Esta Seguro de activar este Rol?",
            type: "warning",
            showCancelButton: true,
            showConfirmButton: true,
            confirmButtonColor: '#026882',
            cancelButtonColor: '#AE0C22',
            confirmButtonText: "Aceptar",
            cancelButtonText: "Cancelar",
        }).then((result) => {
            if (result.value) {
                axios
                    .put(route("roles.activar"), {
                        id: id,
                    })
                    .then((response) => {
                        router.get(
                            route("roles.index"),
                            {},
                            { preserveState: true, preserveScroll: true }
                        );
                        Swal.fire(
                            "Activado!",
                            "El registro ha sido activado con éxito.",
                            "success"
                        );
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            } else if (
                // Read more about handling dismissals
                result.dismiss === Swal.DismissReason.cancel
            ) {
            }
        });
    };



    const handleChange = (e) => {
        const { value, checked } = e.target;
        let sl = [...selectedPermissions];
        if (checked) {
          sl.push(value.toString());
        } else {
          let ind = sl.lastIndexOf(value.toString());
          sl.splice(ind, 1);
        }
        setSelectedPermissions(sl);
      };

    const obtenerRolPermisos = (id) => {
        axios.post(route('roles.obtenerRolPermisos'), { id_rol: id }).then((response) => {
            global = response.data;
            setSelectedPermissions(global.permisos.map(el => el.permission_id.toString()));
        }).catch((error) => {

        });
    }

    const buscarInfo = (e) => {
        get(route("roles.index"), {
            preserveScroll: true,
            preserveState: true,
        })
    }


    return (
        <>
            <Head title="Roles" />

            <div className="flex flex-col h-full">
                <div className="flex-1">
                    <div className="max-w-full mx-auto sm:px-6 ">
                        <div className="h-8 py px-2 overflow-hidden shadow-sm sm:rounded-md mb-5 border-[#E5E7EB] border">
                            <Link
                                href={route('roles.index')}
                                className="text-[#02558A] hover:text-[#0088be8c] text-lg  italic">Postres</Link>
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
                                                value={data.queryRoles}
                                                onChange={(e) => setData("queryRoles", e.target.value)}
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
                                        Crear Rol
                                    </Link>
                                </div>

                                <div className="overflow-x-auto bg-white rounded shadow">
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
                                            {roles.data.map((rol, i) => (
                                                <tr
                                                    key={rol.id}
                                                    className="hover:bg-gray-50 focus-within:bg-gray-100 border-b"
                                                >
                                                    <td className="whitespace-nowrap border-r px-6 py-4">
                                                        {i + 1}
                                                    </td>
                                                    <th
                                                        scope="row"
                                                        className="px-6 py-4 font-medium border-r  text-blue-900 whitespace-nowrap "
                                                    >
                                                        {rol.name}
                                                    </th>
                                                    <td className="whitespace-nowrap border-r px-6 py-4 font-medium">
                                                        {rol.description}
                                                    </td>
                                                    <td className="whitespace-nowrap border-r px-6 py-4 font-medium">
                                                        {rol.status == true ? (
                                                            <p>Activo</p>
                                                        ) : (
                                                            <p>Inactivo</p>
                                                        )}
                                                    </td>
                                                    <td className="whitespace-nowrap border-r px-3 py-2 space-x-2 centrar">
                                                        <TableButton
                                                            className='bg-[#002f65] hover:bg-[#003442] p-1 '
                                                            onClick={() =>
                                                                openModal(
                                                                    3,
                                                                    rol.id
                                                                )
                                                            }
                                                        >
                                                            <div className='w-6 h-6  '>
                                                                <Icon className="w-6 h-6 text-white fill-current group-hover:text-gray-300 focus:text-gray-600 " name="refresh" />
                                                            </div>
                                                        </TableButton>

                                                        <div className='w-8 h-8'>
                                                            <TableButton
                                                                className='bg-[#026882] hover:bg-[#003442] p-1 '
                                                                onClick={() => openModal(2, rol.id, rol.name, rol.description)}>
                                                                <div className='w-6 h-6  '>
                                                                    <Icon className="w-6 h-6 text-white fill-current group-hover:text-gray-300 focus:text-gray-600 " name="edit" />
                                                                </div>
                                                            </TableButton>
                                                        </div>
                                                        {rol.status == true ? (
                                                            <div className='w-8 h-8'>
                                                                <TableButton
                                                                    className='bg-[#CB0E28] hover:bg-[#AE0C22] p-1 '
                                                                    onClick={() => inactivar(rol.id)}>
                                                                    <div className='w-6 h-6  '>
                                                                        <Icon className="w-6 h-6 text-white fill-current group-hover:text-gray-300 focus:text-gray-600 " name="trash" />
                                                                    </div>
                                                                </TableButton>
                                                            </div>
                                                        ) : (
                                                            <TableButton
                                                                className='bg-[#026882]/10 hover:bg-[#026882]/50 p-1'
                                                                onClick={() => activar(rol.id)}>
                                                                <div className='w-6 h-6'>
                                                                    <Icon className="w-7 h-7 -ml-[0.15rem] -mt-[0.15rem] text-green-400 fill-current group-hover:text-gray-300 focus:text-gray-600" name="comprobado" />
                                                                </div>
                                                            </TableButton>
                                                        )}
                                                    </td>
                                                </tr>
                                            ))}
                                            {roles.length === 0 && (
                                                <tr>
                                                    <td
                                                        className="px-6 py-4 border-t"
                                                        colSpan="4"
                                                    >
                                                        No se encuentran roles.
                                                    </td>
                                                </tr>
                                            )}
                                        </tbody>
                                    </table>
                                    <Pagination className="mt-6" links={roles.links} />
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
                                                <div className="flex flex-col">
                                                    <div className='w-full p-2 grid grid-cols-6 gap-2'>
                                                    
                                                                <p className="hidden">{operation}</p>
                                                        <div className="col-span-6 lg:col-span-3">
                                                            <div>
                                                                <InputLabel
                                                                    forInput="nombre"
                                                                    value="Nombre"
                                                                    className="text-sm font-medium"
                                                                />
                                                                <TextInput
                                                                    id="nombre"
                                                                    type="text"
                                                                    className="mt-1  w-11/12"
                                                                    name="nombre"
                                                                    placeholder="Escriba el rol"
                                                                    value={data.nombre}
                                                                    onChange={(e) => {
                                                                        setData({ ...data, nombre: e.target.value });
                                                                        handleChange(e);
                                                                        console.log(e.target.value); // Agregar este console.log para ver el valor en la consola
                                                                      }}                                         
                                                                />
                                                            </div>
                                                        </div>
                                                        <div className="col-span-6 lg:col-span-3">
                                                            <div>
                                                                <InputLabel
                                                                    forInput="descripcion"
                                                                    value="Descripción"
                                                                    className="text-sm font-medium"
                                                                />
                                                                <TextInput
                                                                    id="description"
                                                                    type="text"
                                                                    className="mt-1 block w-11/12"
                                                                    name="description"
                                                                    value={
                                                                        data.description
                                                                    }
                                                                    onChange={(e) =>
                                                                        setData(
                                                                            "description",
                                                                            e.target
                                                                                .value
                                                                        )
                                                                    }
                                                                    placeholder="Escriba la descripcion"
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>                                                    
                                                </div>
                                            )}
                                        {operation === 3 && (
                                            <div className="flex flex-col mb-2">
                                                <div className="w-full h-12 centrar mb-2">
                                                    <h1 className="text-2xl font-semibold text-[#01356A] italic">
                                                        Asignación de Permisos
                                                    </h1>
                                                </div>
                                                <div className='b-6 mt-2 p-2 grid lg:grid-cols-2 gap-2 grid-cols-1  '>
                                                    {nombre_menu.map((nombre) => (
                                                        <div className="border border-slate-300/90">
                                                            <div className="text-[#008BBF] font-semibold text-lg  mb-2 pl-2 w-full uppercase">{nombre.nombre_menu}
                                                            </div>
                                                            <div className="pl-2">
                                                                {permisos.map((permiso) => (
                                                                    <>
                                                                        {(nombre.nombre_menu === permiso.nombre_menu) && (
                                                                            <div className="flex align-items-center space-x-2">
                                                                                <Checkbox value={permiso.id} onChange={handleChange} checked={selectedPermissions.includes(permiso.id.toString())}
                                                                                    className="mb-1" />
                                                                                <label>
                                                                                    {permiso.name}
                                                                                </label>
                                                                            </div>
                                                                        )}
                                                                    </>

                                                                ))}
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>

                                        )}
                                        <div className="grid justify-items-stretch">
                                            <div className="mt-4 justify-self-end space-x-2">
                                                <button
                                                    type="submit"
                                                    className="btn_principal"
                                                >
                                                    {operation === 1 && (
                                                        <div> Guardar</div>
                                                    )}
                                                    {operation === 2 && (
                                                        <div> Editar</div>
                                                    )}
                                                    {operation === 3 && (
                                                        <div> Editar</div>
                                                    )}
                                                </button>
                                                <Link
                                                    href={route("roles.index")}
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
                        <Pagination className="mt-6" links={roles.links} />
                    )}

                </div>
            </div>
        </>
    );
}
