import { useState,useEffect } from "react";
import { Link, usePage } from '@inertiajs/react';
import classNames from 'classnames'
import Icon from '@/Components/Icon';

const Sidebar = ({ parent }) => {
    let [menus,setMenus] = useState([]);
    const [open, setOpen] = useState(true);
    const {ziggy} = usePage().props;

    useEffect(() => {
        setMenuItems();
    }, [parent]);


    const setMenuItems = async () => {
        if(parent)
            await axios.get(route('menus.all')+'?parent='+parent.id).then((data)=>{
                setMenus(data.data);
            });
        else
            setMenus([]);
    }

    return (
        <div className={` ${open ? "w-56 max-2xl:w-56 max-lg:w-48 max-sm:w-32" : "w-20 max-sm:w-14 "}  flex flex-col bg-[#EEE4C9] duration-300 rounded-sm shadow-md`}>
            <div className={` ${open ? "w-56 max-2xl:w-56 max-lg:w-48 max-sm:w-32" : "w-20 max-sm:w-14 "}  h-full  p-5  pt-8 relative duration-300 rounded-sm shadow-md`}>
                <img src={ziggy.url+"/images/assets/control.png"} className={`absolute cursor-pointer -right-3 top-9 w-7 border-[#E1B869] border-2 rounded-full  ${!open && "rotate-180"}`}
                    onClick={() => setOpen(!open)} />
                <div className="centrar gap-x-4 items-center w-full mb-1">
                    {/* <img
                            src={User}
                            className={`cursor-pointer duration-500 ${open && "rotate-[360deg]"
                                }`}
                        /> */}
                    {parent && (
                        <h1 className={`centrar w-full  letra_principal origin-left font-bold text-xl max-sm:text-sm
                                         + duration-200  ${!open && "scale-0"}`}>
                            {parent.title}
                        </h1>
                    )}
                </div>
                <div className="w-full mb-2">
                    <div className="mb-3 flex flex-col ">
                        {menus.map((menu) => (

                            <Link href={menu.type === 1?route(menu.uri):menu.uri} active={route().current(menu.uri)}
                                key={menu.id}
                                preserveState
                                preserveScroll
                                as="button"
                                className={`flex rounded-md p-2 max-sm:p-1 cursor-pointer hover:bg-light-white letra_principal text-base max-sm:text-xs font-semibold items-center gap-x-2 max-sm:gap-1`}>
                                {menu.icon &&(
                                    <div className={ `${!open && "ml-2 w-9 h-6 px-2 "}`}>
                                        <i className={menu.icon}></i>
                                    </div>
                                )}
                                <div className={"text-[#002F65] group-hover:text-[#001E41] font-semibold"}>
                                    <span className={`${!open && "hidden"} origin-left duration-200`}>
                                        {menu.title}
                                    </span>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>

            </div>
            <footer className="centrar max-w-full h-12 bottom-0 border-t-2 border-gray-50">
                <img src={ziggy.url+"/images/SVG/logo_cafe.svg"} className="object-contain w-16" />
            </footer>
        </div>
    );
};

export default Sidebar;
