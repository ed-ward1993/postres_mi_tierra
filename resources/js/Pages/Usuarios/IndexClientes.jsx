import DangerButton from '@/Components/DangerButton';
import InputLabel from '@/Components/InputLabel';
import TableButton from '@/Components/TableButton';
import TextInput from '@/Components/TextInput';
import { useState } from 'react';
import { useForm, Link, usePage, router } from '@inertiajs/react';
import { Head } from '@inertiajs/react';
import Swal from 'sweetalert2';
import DynamicSelect from '@/Components/DynamicSelect';
import Icon from '@/Components/Icon';
import Pagination from '@/Components/Pagination'

export default function Usuario({ errors }) {

    const { usuarios, tipo_documento, roles } = usePage().props;
    console.log(usuarios);
    let global = '';

    const [formulario, setFormulario] = useState(false);
    const [listado, setListado] = useState(true);
    let [listadoSedes, setListadoSedes] = useState([]);

    const [operation, setOperation] = useState(1);

    const { data, setData, get, post, processing } = useForm({
        nombres: '',
        apellidos: '',
        tipo_documento: 0,
        numero_documento: '',
        usuario: '',
        roles: 0,
        email: '',
        telefono: '',
        direccion:'',
        contrasena: '',
        contrasena2: '',
        observaciones: '',
    });


    const openModal = (op, id, nombres,apellidos, roles,  tipo_documento, numero_documento, usuario, email,telefono,direccion, contrasena, observaciones, persona_id) => {
        setFormulario(true);
        setListado(false);
        setOperation(op);
        setData({
            nombres: '', apellidos: '', tipo_documento: 0, numero_documento: '', usuario: '', roles: 0,   email: '', telefono:'',direccion:'', contrasena: '', observaciones: ''
        });
        if (op === 1) {
        }
        else {
            setData({
                id: id, 
                nombres: nombres, 
                apellidos: apellidos,
                roles: roles, 
                tipo_documento: tipo_documento,
                numero_documento: numero_documento, 
                usuario: usuario,
                email: email, 
                telefono:telefono,
                direccion:direccion, 
                contrasena: '', 
                observaciones: observaciones,
                persona_id: persona_id
            });
        }
    }

    const save = (e) => {
        e.preventDefault();
        if (operation === 1) {
            post(route("usuarios.store"), {
                preserveState: true, preserveScroll: true, onSuccess: function (response) {
                    Swal.fire({
                        icon: "success",
                        title: "Usuario guardado Exitosamente!",
                        showConfirmButton: true,
                    }).then(() => {
                        setFormulario(false);
                        setListado(true);
                        router.get(
                            route("usuarios.indexClientes"),
                            {},
                            { preserveState: true, preserveScroll: true }
                        );
                    });
                }, onError: function (error) {
                    Swal.fire({
                        icon: 'error',
                        title: error.response.data.errorBag.default[0],
                        showConfirmButton: true,
                    });
                },
            });
        }
        else {
            post(route("usuarios.update"), {
                id: data.id,
                nombres: data.nombres,
                apellidos: data.apellidos,
                tipo_documento: data.tipo_documento,
                numero_documento: data.numero_documento,
                usuario: data.usuario,
                rol: data.roles,
                email: data.email,
                telefono: data.telefono,
                direccion: data.direccion,
                password: data.contrasena,
                observaciones: data.observaciones,
                persona_id: data.persona_id,
                preserveState: true, preserveScroll: true, onSuccess: function (response) {
                    Swal.fire({
                        icon: "success",
                        title: "Usuario Actualizado Exitosamente!",
                        showConfirmButton: true,
                    }).then(() => {
                        setFormulario(false);
                        setListado(true);
                        router.get(
                            route("usuarios.indexClientes"),
                            {},
                            { preserveState: true, preserveScroll: true }
                        );
                    });
                }, onError: function (error) {
                    Swal.fire({
                        icon: "error",
                        title: "Ocurrió un error!",
                        showConfirmButton: true,
                    });
                }
            });
        }
    }

    const inactivar = (id) => {
        Swal.fire({
            title: 'Esta Seguro de inactivar este Usuario?',
            type: 'warning',
            showCancelButton: true,
            showConfirmButton: true,
            confirmButtonColor: '#026882',
            cancelButtonColor: '#AE0C22',
            confirmButtonText: 'Aceptar',
            cancelButtonText: 'Cancelar',
        }).then((result) => {
            if (result.value) {
                axios.put(route('usuarios.inactivar'), {
                    'id': id
                }).then((response) => {
                    router.get(route('usuarios.indexClientes'), {}, { preserveState: true, preserveScroll: true });
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
            title: 'Esta Seguro de activar este Usuario?',
            type: 'warning',
            showCancelButton: true,
            showConfirmButton: true,
            confirmButtonColor: '#026882',
            cancelButtonColor: '#AE0C22',
            confirmButtonText: 'Aceptar',
            cancelButtonText: 'Cancelar',
        }).then((result) => {
            if (result.value) {
                axios.put(route('usuarios.activar'), {
                    'id': id
                }).then((response) => {
                    router.get(route('usuarios.indexClientes'), {}, { preserveState: true, preserveScroll: true });
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

    const getSelectedTipoDocumento = (selectedOption) => {
        setData("tipo_documento", selectedOption.id);
    }

    const getSelectedRoles = (selectedOption) => {
        setData("roles", selectedOption.id);
    }


    return (
        <>
            <Head title="Usuarios" />

            <div className="flex flex-col h-full">
                <div className="flex-1">
                    <div className="max-w-full mx-auto sm:px-6 ">
                        <div className="h-8 py px-2 overflow-hidden shadow-sm sm:rounded-md mb-5 border-[#E5E7EB] border">
                            <Link
                                href={route('usuarios.indexClientes')}
                                className="text-[#02558A] hover:text-[#0088be8c] text-lg  italic">Usuarios </Link>
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
                            <div className="flex-col overflow-hidden shadow-sm sm:rounded-lg mb-5">
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
                                        Crear Usuario
                                    </Link>
                                </div>

                                <div className="overflow-x-auto bg-white rounded shadow">
                                    <table className="w-full border text-center text-base font-semibold table-auto whitespace-nowrap mb-5">
                                        <thead className="border-t font-medium border-2 border-grey-900">
                                            <tr className="font-bold text-left bg-gray-100">
                                                <th scope="col" className="border-r px-6 pt-5 pb-4">
                                                    #
                                                </th>
                                                <th scope="col" className="border-r px-6 pt-5 pb-4">
                                                    Nombres
                                                </th>
                                                <th scope="col" className="border-r px-6 pt-5 pb-4">
                                                    Apellidos
                                                </th>
                                               
                                                <th scope="col" className="border-r px-6 pt-5 pb-4">
                                                    Usuario
                                                </th>                                               
                                                <th scope="col" className="border-r px-6 pt-5 pb-4">
                                                    Correo
                                                </th>
                                                <th scope="col" className="border-r px-6 pt-5 pb-4">
                                                    Telefono
                                                </th>
                                                <th scope="col" className="border-r px-6 pt-5 pb-4">
                                                    Dirección
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
                                            {usuarios.data.map((usuario, i) => (
                                                <tr key={usuario.id} className="hover:bg-gray-50 focus-within:bg-gray-100 border-b">
                                                    <td className="whitespace-nowrap border-r px-6 py-4">
                                                        {(i + 1)}
                                                    </td>
                                                    <th scope="row" className="px-6 py-4 font-medium border-r  text-blue-900 whitespace-nowrap ">
                                                        {usuario.nombre} 
                                                    </th>
                                                    <td className="whitespace-nowrap border-r px-6 py-4">
                                                        {usuario.apellidos}
                                                    </td>
                                                   
                                                    <td className="whitespace-nowrap border-r px-6 py-4">
                                                        {usuario.usuario}
                                                    </td>                                                  
                                                    <td className="whitespace-nowrap border-r px-6 py-4">
                                                        {usuario.email}
                                                    </td>
                                                    <td className="whitespace-nowrap border-r px-6 py-4">
                                                        {usuario.telefono}
                                                    </td>
                                                    <td className="whitespace-nowrap border-r px-6 py-4">
                                                        {usuario.direccion}
                                                    </td>
                                                    <td className="whitespace-nowrap border-r px-6 py-4">
                                                        {usuario.estado == true ? <p>Activo</p> : <p>Inactivo</p>}
                                                    </td>
                                                    <td className="whitespace-nowrap border-r px-3 py-2 space-x-2 centrar">
                                                        <div className='w-8 h-8'>
                                                        {/* id, nombres,apellidos, roles,  tipo_documento, numero_documento, usuario, email,telefono,direccion, contrasena, observaciones, persona_id) */}
                                                            <TableButton
                                                                className='bg-[#026882] hover:bg-[#003442] p-1 '
                                                                onClick={() => openModal(2, usuario.id,
                                                                usuario.nombre,
                                                                usuario.apellidos,
                                                                usuario.idrol, 
                                                                usuario.tipo_documento,
                                                                usuario.numero_documento, 
                                                                usuario.usuario,
                                                                usuario.email, 
                                                                usuario.telefono, 
                                                                usuario.direccion,
                                                                '',
                                                                usuario.observaciones,
                                                                usuario.persona_id)}>
                                                                <div className='w-6 h-6  '>
                                                                    <Icon className="w-6 h-6 text-white fill-current group-hover:text-gray-300 focus:text-gray-600 " name="edit" />
                                                                </div>
                                                            </TableButton>
                                                        </div>


                                                        {usuario.estado == true ?
                                                            <div className='w-8 h-8'>
                                                                <TableButton
                                                                    className='bg-[#CB0E28] hover:bg-[#AE0C22] p-1 '
                                                                    onClick={() => inactivar(usuario.id)}>
                                                                    <div className='w-6 h-6  '>
                                                                        <Icon className="w-6 h-6 text-white fill-current group-hover:text-gray-300 focus:text-gray-600 " name="trash" />
                                                                    </div>
                                                                </TableButton>
                                                            </div>
                                                            :
                                                            <div className='w-8 h-8'>
                                                                <TableButton
                                                                    className='bg-[#026882]/10 hover:bg-[#026882]/50 p-1'
                                                                    onClick={() => activar(usuario.id)}>
                                                                    <div className='w-6 h-6'>
                                                                        <Icon className="w-7 h-7 -ml-[0.15rem] -mt-[0.15rem] text-green-400 fill-current group-hover:text-gray-300 focus:text-gray-600" name="comprobado" />
                                                                    </div>
                                                                </TableButton>
                                                            </div>
                                                        }
                                                    </td>
                                                </tr>
                                            ))}
                                            {usuarios.length === 0 && (
                                                <tr>
                                                    <td className="px-6 py-4 border-t" colSpan="4">
                                                        No se encuentran usuarios.
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
                            <>
                                <div className="mx-auto my-2">
                                    <div className="p-4 rounded shadow">
                                        <form name="createForm" onSubmit={save}>
                                            <div className='w-full p-2 grid grid-cols-6 gap-2'>
                                                <div className="px-3 lg:col-span-3 col-span-6">
                                                    <InputLabel
                                                        forInput="nombres"
                                                        value="Nombres"
                                                        className="text-sm font-medium"
                                                    />
                                                    <TextInput
                                                        id="nombres"
                                                        type="text"
                                                        className="mt-1 block"
                                                        name="nombres"
                                                        errors={errors.nombres}
                                                        value={data.nombres}
                                                        onChange={e => setData('nombres', e.target.value)}
                                                        placeholder="Nombres"

                                                    />
                                                </div>
                                                <div className="px-3  lg:col-span-3 col-span-6">
                                            <InputLabel
                                                forInput="apellido"
                                                value="Apellidos"
                                                className="text-sm font-medium"
                                            />
                                            <TextInput
                                                id="apellios"
                                                type="text"
                                                className="mt-1 block"
                                                name="apellidos"
                                                errors={errors.apellidos}
                                                value={data.apellidos}
                                                onChange={e => setData('apellidos', e.target.value)}
                                                placeholder="Apellidos"
                                            />
                                        </div>

                                                <div className="px-3  lg:col-span-3 col-span-6">
                                                    <InputLabel
                                                        forInput="rol"
                                                        value="Rol"
                                                        className="text-sm font-medium"
                                                    />
                                                    <DynamicSelect
                                                        multiple={false}
                                                        withIcons={true}
                                                        options={roles}
                                                        errors={errors.roles}
                                                        value={data.roles}
                                                        valueKey="id"
                                                        labelKey="name"
                                                        onChange={getSelectedRoles}
                                                    />
                                                </div>                                   

                                                <div className="px-3  lg:col-span-3 col-span-6">
                                                    <InputLabel
                                                        forInput="tipo_documento"
                                                        value="Tipo de Documento"
                                                        className="text-sm font-medium"
                                                    />
                                                    <DynamicSelect
                                                        multiple={false}
                                                        withIcons={true}
                                                        options={tipo_documento}
                                                        errors={errors.tipo_documento}
                                                        value={data.tipo_documento}
                                                        valueKey="id"
                                                        labelKey="nombre"
                                                        onChange={getSelectedTipoDocumento}
                                                    />
                                                </div>
                                                <div className="px-3  lg:col-span-3 col-span-6">
                                                    <InputLabel
                                                        forInput="documento"
                                                        value="Número de documento"
                                                        className="text-sm font-medium"
                                                    />
                                                    <TextInput
                                                        id="numero_documento"
                                                        type="text"
                                                        className="mt-1 block"
                                                        name="numero_documento"
                                                        errors={errors.numero_documento}
                                                        value={data.numero_documento}
                                                        onChange={e => setData('numero_documento', e.target.value)}
                                                        placeholder="Numero de documento"

                                                    />
                                                </div>
                                                <div className="px-3  lg:col-span-3 col-span-6">
                                                    <InputLabel
                                                        forInput="usuario"
                                                        value="Nombre de usuario"
                                                        className="text-sm font-medium"
                                                    />
                                                    <TextInput
                                                        id="usuario"
                                                        type="text"
                                                        className="mt-1 block"
                                                        name="usuario"
                                                        errors={errors.usuario}
                                                        value={data.usuario}
                                                        onChange={e => setData('usuario', e.target.value)}
                                                        placeholder="Usuario"

                                                    />
                                                </div>

                                                <div className="px-3  lg:col-span-3 col-span-6">
                                                    <InputLabel
                                                        forInput="email"
                                                        value="Email"
                                                        className="text-sm font-medium"
                                                    />
                                                    <TextInput
                                                        id="email"
                                                        type="text"
                                                        className="mt-1 block"
                                                        name="email"
                                                        errors={errors.email}
                                                        value={data.email}
                                                        onChange={e => setData('email', e.target.value)}
                                                        placeholder="Email"
                                                    />
                                                </div>

                                                <div className="px-3  lg:col-span-3 col-span-6">
                                                    <InputLabel
                                                        forInput="telefono"
                                                        value="Telefono"
                                                        className="text-sm font-medium"
                                                    />
                                                    <TextInput
                                                        id="telefono"
                                                        type="text"
                                                        className="mt-1 block"
                                                        name="telefono"
                                                        errors={errors.telefono}
                                                        value={data.telefono}
                                                        onChange={e => setData('telefono', e.target.value)}
                                                        placeholder="Telefono"

                                                    />
                                                </div>
                                                <div className="px-3  lg:col-span-3 col-span-6">
                                                    <InputLabel
                                                        forInput="Direccion"
                                                        value="Direccion"
                                                        className="text-sm font-medium"
                                                    />
                                                    <TextInput
                                                        id="direccion"
                                                        type="text"
                                                        className="mt-1 block"
                                                        name="direccion"
                                                        errors={errors.direccion}
                                                        value={data.direccion}
                                                        onChange={e => setData('direccion', e.target.value)}
                                                        placeholder="Direccion"

                                                    />
                                                </div>
                                                <div className="px-3  lg:col-span-3 col-span-6">
                                                    <InputLabel
                                                        forInput="contrasena"
                                                        value="Contraseña"
                                                        className="text-sm font-medium"
                                                    />
                                                    <TextInput
                                                        id="contrasena"
                                                        type="password"
                                                        className="mt-1 block"
                                                        name="contrasena"
                                                        errors={errors.contrasena}
                                                        value={data.contrasena}
                                                        onChange={e => setData('contrasena', e.target.value)}
                                                        placeholder="Contraseña"

                                                    />
                                                </div>
                                                <div className="px-3  lg:col-span-3 col-span-6">
                                                    <InputLabel
                                                        forInput="contrasena2"
                                                        value="Confirmar Contraseña"
                                                        className="text-sm font-medium"
                                                    />
                                                    <TextInput
                                                        id="contrasena2"
                                                        type="password"
                                                        className="mt-1 block"
                                                        errors={errors.contrasena2}
                                                        name="contrasena2"
                                                        onChange={e => setData('contrasena2', e.target.value)}
                                                        placeholder="Contraseña"

                                                    />
                                                </div>
                                                <div className="px-3  lg:col-span-6 col-span-6">
                                                    <InputLabel
                                                        forInput="observaciones"
                                                        value="Observaciones"
                                                        className="text-sm font-medium"
                                                    />
                                                    <textarea
                                                        id="observaciones"
                                                        name="observaciones"
                                                        value={data.observaciones}
                                                        onChange={e => setData('observaciones', e.target.value)}
                                                        rows="4"
                                                        className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                                                        placeholder="Observaciones...">
                                                    </textarea>
                                                </div>
                                            </div>
                                            <div className="grid justify-items-stretch px-8 py-4 border-t border-gray-200">

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
                                                        href={route("usuarios.indexClientes")}
                                                        className="px-3 py-2 rounded bg-[#667379] text-white text-sm font-bold whitespace-nowrap hover:bg-[#595D60] focus:bg-[#6F7477]"
                                                    >
                                                        Atrás
                                                    </Link>
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </>
                        )}
                        {/* Cierre Formulario */}
                    </div>
                    {listado && (
                        <Pagination className="mt-6 mb-5" links={usuarios.links} />
                    )}
                </div>
            </div>
        </>
    );
}
