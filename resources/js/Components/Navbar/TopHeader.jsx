import { usePage, Link } from '@inertiajs/react';
import React, { useState } from 'react';
import NavLinkPrin from '@/Components/NavLinkPrin';
import Icon from '@/Components/Icon';

const TopHeader = () => {
    const [menuOpened, setMenuOpened] = useState(false);
    const {ziggy} = usePage().props;
    return (
        <div className='bg-[#56340E] md:w-72 lg:w-96 flex justify-between p-1 border-none'>
        <div className="items-center px-6 py-2  md:flex-shrink-0 md:justify-center shadow-lg">
            <Link className='mt-0' href='/main'>
            <img src={ziggy.url+"/images/SVG/logo_blanco.svg"} className="fill-current w-20" />
            </Link>
            
        </div>
         <div className="flex items-center cursor-pointer select-none group space-x-2">       
         <Icon className="w-5 h-5 text-white fill-current group-hover:text-gray-300 focus:text-gray-600" name="dashboard" />
         <NavLinkPrin href={route('main')} active={route().current('main')}
             className="font-semibold block px-3 py-2 hover:bg-indigo-600 hover:text-white">
             Principal
         </NavLinkPrin>
     </div>
     </div>
    );
};

export default TopHeader;
