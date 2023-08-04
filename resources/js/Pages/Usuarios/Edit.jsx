import InputLabel from "@/components/InputLabel";
import TextInput from "@/components/TextInput";
import { useState, useEffect } from "react";
import { useForm, Link, usePage, router } from "@inertiajs/react";
import { Head } from "@inertiajs/react";
import Swal from "sweetalert2";
import TableButton from '@/components/TableButton';
import Icon from '@/components/Icon';
import Pagination from '@/components/Pagination'
import DynamicSelect from '@/components/DynamicSelect';

export default function Edit({ errors }) {
    const { usuario, user, tipo_documento } = usePage().props;
    // console.log(user);
    // console.log(usuario);

    let { data, setData, get, post, processing, reset } = useForm({
        id: usuario.id || '',
        nombres: usuario.nombre || '',
        apellidos: usuario.apellidos || '',
        tipo_documento: usuario.tipo_documento || '',
        numero_documento: usuario.numero_documento || '',
        usuario: usuario.usuario || '',
        email: usuario.email || '',
        observaciones: user.observaciones || '',
        id_persona: user.id_persona || '',
        contrasena: '',
        contrasena2:''
    });

    useEffect(() => {
        return () => {
            reset('contrasena', 'contrasena2');
        };
    }, []);

    const getSelectedTipoDocumento = (selectedOption) => {
        setData("tipo_documento", selectedOption.id);
    }
    const save = (e) => {
        e.preventDefault();
        post(route("usuarios.actualizarPerfil"), {
            id: data.id,
            nombres: data.nombres,
            apellidos: data.apellidos,
            tipo_documento: data.tipo_documento,
            numero_documento: data.numero_documento,
            usuario: data.usuario,
            email: data.email,
            password: data.contrasena,
            observaciones: data.observaciones,
            persona_id: data.id_persona,
            preserveState: true,
            preserveScroll: true,
            onSuccess: function (response) {
                Swal.fire({
                    icon: "success",
                    title: "Usuario Actualizado Exitosamente!",
                    showConfirmButton: true,
                }).then(() => {
                    router.push(
                        route("main"),
                        {},
                        { preserveState: true, preserveScroll: true }
                    );
                });
            },
            onError: function (error) {
                Swal.fire({
                    icon: "error",
                    title: "Ocurrió un error!",
                    showConfirmButton: true,
                });
            },
        });
    };


    return (
        <>
            <Head title="Sedes" />
            <div className="flex flex-col h-full">
                <div className="flex-1">

                    <div className="max-w-[97%] mx-auto sm:px-6">
                            <div className="mx-auto my-2 px-4 ">
                                <div className="p-4 rounded shadow">
                                <form name="createForm" onSubmit={save}>
                                <input
                                        id="nombre"
                                        type="text"
                                        className="hidden"
                                        name="nombre"
                                        errors={errors.id_persona}
                                        value={data.id_persona}
                                        onChange={e => setData('id_persona', e.target.value)}
                                        placeholder="id_persona aqui"
                                    />
                                        <div className='w-full p-2 grid grid-cols-6 gap-2'>
                                            <div className="px-3 lg:col-span-3 col-span-6 mb-3">
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
                                                errors={errors.apellidos}
                                                name="apellidos"
                                                value={data.apellidos}
                                                onChange={e => setData('apellidos', e.target.value)}
                                                placeholder="Apellidos"
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
                                            <div className="px-3 lg:col-span-3 col-span-6 mb-3">
                                                <InputLabel
                                                    forInput="email"
                                                    value="Email"
                                                    className="text-sm font-medium"
                                                />
                                                <TextInput
                                                    id="email"
                                                    type="email"
                                                    className="mt-1 block"
                                                    name="email"
                                                    value={data.email}
                                                    errors={errors.email}
                                                    onChange={e => setData('email', e.target.value)}
                                                    placeholder="prueba@prueba"
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
                                                    errors={errors.contrasena}
                                                    name="contrasena"
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
                                                    value={data.contrasena2}
                                                name="contrasena2"
                                                onChange={e => setData('contrasena2', e.target.value)}
                                                placeholder="Contraseña"

                                            />
                                        </div> 
                                        <div className="px-3  lg:col-span-6 col-span-6">
                                            <InputLabel
                                                forInput="Observaciones"
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

                                        <div className="grid justify-items-stretch">
                                            <div className="mt-4 justify-self-end space-x-2">
                                                <button
                                                    type="submit"
                                                    className="px-3 py-2 rounded bg-[#002F65] text-white text-sm font-bold whitespace-nowrap hover:bg-[#001E41] focus:bg-[#001E41]"
                                                >
                                                    <div> Editar</div>
                                                </button>
                                                {/* <Link
                                                    href={route("sedes.index")}
                                                    className="px-3 py-2 rounded bg-[#667379] text-white text-sm font-bold whitespace-nowrap hover:bg-[#595D60] focus:bg-[#6F7477]"
                                                >
                                                    Atrás
                                                </Link> */}
                                            </div>
                                        </div>

                                    </form>
                              
                            </div>
                            </div>
                        {/* Cierre Formulario */}
                    </div>
                </div>
            </div>
        </>
    );
};

