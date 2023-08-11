import { useState } from 'react';
import { Link, usePage } from '@inertiajs/react';
import Icon from '@/components/Icon';
import NavLinkPrin from '@/components/NavLinkPrin';
import Dropdown from '@/components/Dropdown';
import NavLink from '@/components/NavLink'

const Navbar = () => {
    const { auth } = usePage().props;
    const [menuOpenedCon, setMenuOpenedCon] = useState(false);
    const [menuOpened, setMenuOpened] = useState(false);
    const [menuConfigOpen, setMenuConfigOpen] = useState(false);

    return (
        <>
        <div className="flex items-center justify-end w-full p-4 text-sm fondo_color_right md:py-0 md:px-12 d:text-md shadow-lg space-x-2 border-none">
            <div className="max-md:hidden flex items-center cursor-pointer select-none group space-x-1">
                <Icon className="w-4 h-4 text-white fill-current group-hover:text-gray-300 focus:text-gray-600" name="home" />
                <a className="" href={route('centralizado')}>
                    <span className="mr-1 text-white font-semibold whitespace-nowrap group-hover:text-indigo-50 focus:text-indigo-50">Inicio</span>&nbsp;
                </a>
            </div>
            {(auth.user.roles[0].name === 'super_administrador' || auth.user.roles[0].name === 'administrador') && (
                <div className="flex items-center cursor-pointer select-none group space-x-1" onClick={() => setMenuConfigOpen(true)}>
                    <Icon className="w-4 h-4 text-white fill-current group-hover:text-gray-300 focus:text-gray-600" name="service" />
                    <div className="mr-1 text-white font-semibold whitespace-nowrap group-hover:text-indigo-50 focus:text-indigo-50">
                        <span>Configuración</span>
                        {/* <span className="ml-1 md:inline">{auth.user.usuario}</span> */}
                    </div>
                    <Icon className="w-5 h-5 text-white fill-current group-hover:text-gray-300 focus:text-gray-600" name="cheveron-down"
                    />
                </div>
            )}

            <div className={menuConfigOpen ? '' : 'hidden'}>
                <div className="absolute max-sm:top-[4.5rem] max-sm:right-52 top-5 right-60 z-50 py-2 mt-8 text-sm whitespace-nowrap bg-white rounded shadow-xl">

                    <div className='flex flex-col mx-2'>
                    <NavLink
                        href={route('usuarios.indexClientes')}
                        className="block px-6 py-2 hover:bg-indigo-600 hover:text-white"
                        onClick={() => setMenuConfigOpen(false)}
                    >
                        Usuarios Clientes
                    </NavLink>

                    {(auth.user.roles[0].name === 'super_administrador' || auth.user.roles[0].name === 'administrador' ) && (
                            <>
                        <NavLink
                            href={route('categorias.index')}
                            className="block px-6 py-2 hover:bg-indigo-600 hover:text-white"
                            onClick={() => setMenuConfigOpen(false)}
                        >
                            Categorias 
                        </NavLink>
                                <NavLink
                                    href={route('roles.index')}
                                    className="block px-6 py-2 hover:bg-indigo-600 hover:text-white"
                                    onClick={() => setMenuConfigOpen(false)}
                                >
                                    Postres
                                </NavLink>                               
                            </>
                        )}

                        {(auth.user.roles[0].name === 'super_administrador') && (
                            <>
                        <NavLink
                            href={route('usuarios.index')}
                            className="block px-6 py-2 hover:bg-indigo-600 hover:text-white"
                            onClick={() => setMenuConfigOpen(false)}
                        >
                            Usuarios 
                        </NavLink>
                                <NavLink
                                    href={route('roles.index')}
                                    className="block px-6 py-2 hover:bg-indigo-600 hover:text-white"
                                    onClick={() => setMenuConfigOpen(false)}
                                >
                                    Roles
                                </NavLink>
                                
                                <NavLink
                                    href={route('permisos.index')}
                                    className="block px-6 py-2 hover:bg-indigo-600 hover:text-white"
                                    onClick={() => setMenuConfigOpen(false)}
                                >
                                    Permisos
                                </NavLink>    
                                <NavLink
                                    href={route('menus.index')}
                                    className="block px-6 py-2 hover:bg-indigo-600 hover:text-white"
                                    onClick={() => setMenuConfigOpen(false)}
                                >
                                    Menús
                                </NavLink>
                            </>
                        )}
                    </div>
                </div>
                <div
                    onClick={() => {
                        setMenuConfigOpen(false);
                    }}
                    className="fixed inset-0 z-10 bg-black opacity-25"
                ></div>
            </div>
            <div className="relative">
                <div
                    className="flex items-center cursor-pointer select-none group space-x-1"
                    onClick={() => setMenuOpened(true)}
                >
                    <Icon className="w-4 h-4 text-white fill-current group-hover:text-gray-300 focus:text-gray-600" name="user" />
                    <div className="mr-1 text-white font-semibold whitespace-nowrap group-hover:text-indigo-50 focus:text-indigo-50">
                        <span>{auth.user.usuario}</span>
                    </div>
                    <Icon
                        className="w-5 h-5 text-white fill-current group-hover:text-indigo-50 focus:text-indigo-50"
                        name="cheveron-down"
                    />
                </div>
                <div className={menuOpened ? '' : 'hidden'}>
                    <div className=" absolute top-0 right-0 left-auto z-20 py-2 mt-8 text-sm whitespace-nowrap bg-white rounded shadow-xl">
                        <div className=' flex flex-col'>
                            <NavLink
                                // href={route('usuarios.edit', auth.user.id)}
                                className="block px-6 py-2 hover:bg-indigo-600 hover:text-white"
                                onClick={() => setMenuOpened(false)}
                            >
                                Mi Perfil
                            </NavLink>
                            {(auth.user.roles[0].name === 'super_administrador' || auth.user.roles[0].name === 'administrador') && (
                                <>
                                    <NavLink
                                        // href={route('usuario_global.index')}
                                        className="block px-6 py-2 hover:bg-indigo-600 hover:text-white"
                                        onClick={() => setMenuOpened(false)}
                                    >
                                        Usuarios Globales
                                    </NavLink>
                                </>
                            )}
                            <Link
                                as="button"
                                href={route('logout')}
                                className=
                                'inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium leading-5 text-red-300 hover:text-red-500 hover:border-red-300 focus:outline-none focus:text-red-500 focus:border-red-300 transition duration-150 ease-in-out'
                                method="post"
                            >
                                Cerrar Sesión
                            </Link>
                        </div>
                    </div>
                    <div
                        onClick={() => {
                            setMenuOpened(false);
                        }}
                        className="fixed inset-0 z-10 bg-black opacity-25"
                    ></div>
                </div>
            </div>
        </div>
    </>
    );
};

export default Navbar;
