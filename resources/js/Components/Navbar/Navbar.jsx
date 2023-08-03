import { useState } from 'react';
import ApplicationLogo from '@/Components/ApplicationLogo';
import Dropdown from '@/Components/Dropdown';
import NavLink from '@/Components/NavLink';
import ResponsiveNavLink from '@/Components/ResponsiveNavLink';
import { Link, usePage } from '@inertiajs/react';
import SimNet from '../../../../public/images/SVG/logo_blanco.svg';
import Icon from '@/Components/Icon';
import { InertiaLink } from '@inertiajs/inertia-react';
import NavLinkPrin from '../NavLinkPrin';

const Navbar = () => {
    const { auth } = usePage().props;
    const [menuOpened, setMenuOpened] = useState(false);

    return (
        <div className="fondo_color_right flex items-center justify-between w-full p-4 text-sm md:py-0 md:px-12 d:text-md shadow-lg">
            <div className="flex items-center cursor-pointer select-none group space-x-2">
            <Icon className="w-5 h-5 text-white fill-current group-hover:text-gray-300 focus:text-gray-600" name="dashboard" />
                <NavLinkPrin href={route('dashboard')} active={route().current('dashboard')} >
                    Principal
                </NavLinkPrin>
            </div>
            <div className="flex space-x-3">
                <div className="flex items-center cursor-pointer select-none group space-x-1">
                    <Icon className="w-4 h-4 text-white fill-current group-hover:text-gray-300 focus:text-gray-600" name="home" />
                    <a className="" href="http://127.0.0.1:8000/centralizadoRedirect">
                        <span className="text-sm font-medium leading-5 text-white focus:outline-none focus:border-white transition duration-150 ease-in-out">Inicio</span>&nbsp;
                    </a>
                </div>
                <div className="flex items-center cursor-pointer select-none group space-x-1">
                    <Dropdown>
                        <Dropdown.Trigger>
                            <span className="rounded-md">
                                <button
                                    type="button"
                                    className="border border-transparent leading-4 font-medium text-white bg-transparent hover:text-gray-300 focus:outline-none transition ease-in-out duration-150"
                                >
                                    <i className={"fa-solid fa-gears"}></i>&nbsp;Configuraci&oacute;n&nbsp;<i className={"fa-solid fa-caret-down"}></i>
                                </button>
                            </span>
                        </Dropdown.Trigger>
                        <Dropdown.Content>
                            <Dropdown.Link href={route('menus.index')}><i className={"fa-solid fa-bars"}></i>&nbsp;Men&uacute;s</Dropdown.Link>
                        </Dropdown.Content>
                    </Dropdown>
                </div>
                <div className="flex items-center cursor-pointer select-none group space-x-1" onClick={() => setMenuOpened(true)}>
                    <Icon className="w-4 h-4 text-white fill-current group-hover:text-gray-300 focus:text-gray-600" name="user" />
                    <div className="mr-1 text-white font-semibold whitespace-nowrap group-hover:text-indigo-50 focus:text-indigo-50">
                        <span>{auth.user.usuario}</span>
                        {/* <span className="ml-1 md:inline">{auth.user.usuario}</span> */}
                    </div>
                    <Icon className="w-5 h-5 text-white fill-current group-hover:text-gray-300 focus:text-gray-600" name="cheveron-down"
                    />
                </div>
                <div className={menuOpened ? '' : 'hidden'}>
                    <div className="absolute top-0 right-0 left-auto z-20 py-2 mt-8 text-sm whitespace-nowrap bg-white rounded shadow-xl">
                        {/*<Link
                            href={route('users.edit', auth.user.id)}
                            className="block px-6 py-2 hover:bg-indigo-600 hover:text-white"
                            onClick={() => setMenuOpened(false)}
                        >
                            My Profile
                        </Link>*/}
                        {/*<Link
                             href={route('users')}
                            className="block px-6 py-2 hover:bg-indigo-600 hover:text-white"
                            onClick={() => setMenuOpened(false)}
                        >
                            Manage Users
                        </Link>*/}
                        <Link
                            as="button"
                            href={route('logout')}
                            className="block w-full px-6 py-2 text-left focus:outline-none hover:bg-indigo-600 hover:text-white"
                            method="post"
                        >
                            Logout
                        </Link>
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
    );
};

export default Navbar;
