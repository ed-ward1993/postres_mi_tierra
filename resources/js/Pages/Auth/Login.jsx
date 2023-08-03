import {useEffect, useRef, useState} from 'react';
import Checkbox from '@/Components/Checkbox';
import GuestLayout from '@/Layouts/GuestLayout';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Head, Link, useForm } from '@inertiajs/react';
import { Toast } from 'primereact/toast';

export default function Login({ status, canResetPassword }) {

    const toast = useRef(null);
    const { data, setData, post, processing, reset, errors } = useForm({
        usuario: '',
        password: '',
        remember: '',
    });

    const [inputErrors, setInputErrors] = useState({
        usuario: false,
        password: false
    });

    useEffect(() => {
        return () => {
            reset('password');
        };
    }, []);

    const onHandleChange = (event) => {
        setInputErrors(event.target.name,false);
        setData(event.target.name, event.target.type === 'checkbox' ? event.target.checked : event.target.value);
    };

    const submit = (e) => {
        e.preventDefault();
        post(route('login2'),{
            preserveScroll: true,
            preserveState: true,
            onSuccess: function(response){
                let err = response.props.flash.error;
                if(err)
                    toast.current.show({ severity: 'error', summary: 'Error', detail: err });
            },
            onError: (errs)=>{
                let errMsgs = []
                if(errs) {
                    setInputErrors({
                        usuario: !!errs.usuario,
                        password: !!errs.password,
                    });
                    for(let x in errs){
                        errMsgs.push({severity: 'error', summary: 'Error', detail: errs[x]});
                    }
                    toast.current.show(errMsgs);
                }
            }
        });
    };

    return (
        <>
        <Toast ref={toast} />
            <Head title="Inicio" />

            {status && <div className="mb-4 font-medium text-sm text-green-600">{status}</div>}
            <div>

            </div>
            <div className='flex-col w-full h-[90%]'>
                <div className='centrar '>
                    <img src="images/SVG/logo.svg" className="hidden max-lg:flex h-28 max-lg:h-16 mt-7 max-lg:mt-4" />
                </div>

                <div className='w-full centrar flex-col mt-20 max-lg:mt-5 max-2xl:mt-8 min-2xl:mt-16'>
                    <div className='text-4xl max-md:text-lg max-xl:text-2xl max-2xl:text-3xl font-bold text-[#002F65]'>Iniciar Sesión</div>
                    <div className='text-2xl max-sm:text-xs max-md:text-base max-xl:text-xl  mt-8 max-lg:mt-2 max-2xl:mt-4 font-semibold text-[#002F65]'>Sistema de Información Médico</div>
                </div>

                <form onSubmit={submit}>
                    <div className='centrar flex-col mt-12 max-lg:mt-4 max-2xl:mt-6'>
                        <div className='w-11/12 max-2xl:w-3/4 2xl:w-3/5'>
                            <InputLabel forInput="usuario" value="Usuario" className="max-md:text-xs max-lg:text-base max-2xl:text-lg"/>
                            <TextInput
                                id="usuario"
                                type="text"
                                name="usuario"
                                value={data.usuario}
                                errors={errors.usuario}
                                className="mt-1 block w-full"
                                autoComplete="usuario"
                                isFocused={true}
                                handleChange={onHandleChange}
                                error={inputErrors.usuario}
                                placeholder="Escriba su usuario"
                            />
                        </div>
                        <div className="w-11/12 max-2xl:w-3/4 2xl:w-3/5 mt-8 max-2xl:mt-3 ">
                            <InputLabel forInput="password" value="Contraseña" className="max-md:text-xs max-lg:text-base max-2xl:text-lg" />
                            <TextInput
                                id="password"
                                type="password"
                                name="password"
                                errors={errors.password}
                                value={data.password}
                                className="mt-1 block w-full"
                                autoComplete="current-password"
                                handleChange={onHandleChange}
                                error={inputErrors.password}
                                placeholder="Contraseña"
                            />
                        </div>
                    </div>
                    {/* Seccion olvidaste tu contraseña */}
                    <div className="centrar block mt-4 2xl:mt-8 max-lg:mt-2 max-sm:mt-3">
                        <Link // href={route('password.request')}
                            className="underline text-gray-600 hover:text-gray-900 rounded-md font-semibold focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 text-xl max-md:text-sm max-2xl:text-lg">
                            ¿Olvidaste tu contraseña?
                        </Link>
                    </div>

                    {/* Seccion boton ingresar */}
                    <div className='centrar flex-col mt-20 max-md:mt-12 max-2xl:mt-4'>
                        <PrimaryButton className="centrar ml-3 w-3/6 h-12 max-2xl:w-3/6 max-md:h-8 max-2xl:h-10 " processing={processing}>
                            Ingresa
                        </PrimaryButton>
                    </div>
                </form>
                {/* logo turrisystem */}
                <div className='centrar w-full h-6 mt-3'>
                    <div className='absolute bottom-1 max-md:bottom-2 max-2xl:bottom-6'>
                        <img src="images/SVG/logo_azul.svg" alt="" className='object-cover h-8 max-2xl:h-6'/>
                    </div>
                </div>
            </div>
        </>
    );
}
