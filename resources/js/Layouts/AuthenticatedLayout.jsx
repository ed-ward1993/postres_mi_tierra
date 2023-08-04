import { useState, useEffect } from 'react';
import Navbar from '../Components/Navbar/Navbar';
import SimNet from '@/public/images/SVG/logo_cafe.svg';
import Dropdown from '@/Components/Dropdown';
import ResponsiveNavLink from '@/Components/ResponsiveNavLink';
import LogoBlanco from '@/public/images/SVG/logo_blanco.svg';
import TopHeader from '../Components/Navbar/TopHeader';
import Sidebar from '../Components/Navbar/Sidebar';
import NavPrin from '../Components/Navbar/NavPrin';
import {usePage} from "@inertiajs/react";
import Swal from "sweetalert2";

export default function Authenticated({children }) {

    let {auth, ziggy, flash} = usePage().props;

    let [menuParent,setMenuParent] = useState(null);

    useEffect(() => {
        if(flash.message){
            Swal.fire({title: 'Mensaje',html: flash.message,icon: 'success'});
        }
        if(flash.error){
            Swal.fire({title: 'Error',html: flash.error,icon: 'error'});
        }
    }, [flash]);

    const changeMenuParent = (parent) => {
        console.log(parent);
        setMenuParent(parent);
    }


    return (
        <div className="flex flex-col">
            <div className="flex flex-col h-screen">
            <div className="md:flex shadow-md">
                <TopHeader/>
                <Navbar/>
            </div>
            <div className="md:flex shadow-md z-10 centrar">
               <NavPrin onChange={changeMenuParent}/>
            </div>
            <div className="flex flex-grow overflow-hidden">
           <Sidebar parent={menuParent}/>
            {/* To reset scroll region (https://inertiajs.com/pages#scroll-regions) add `scroll-region="true"` to div below */}
            <div className="w-full px-4 py-8 overflow-hidden overflow-y-auto md:p-12 ">
              {children}
            </div>
          </div>
            </div>
        </div>
    );
}
