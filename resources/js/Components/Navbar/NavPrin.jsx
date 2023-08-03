import {useEffect, useState} from "react";
import {usePage, Link} from "@inertiajs/react";
import NavLink from '../NavLink';

const NavPrin = ({onChange}) => {

    let {auth, ziggy} = usePage().props;

    let [menuActive, setMenuActive] = useState(false);
    let [menus,setMenus] = useState([]);
    let [selectedMenu, setSelectedMenu] = useState([]);

    useEffect(()=> {
        setMainMenus();
    },[auth]);

    const setMainMenus = async () => {
        await axios.get(route('menus.all')+'?parent=0').then((data)=>{
            setMenus(data.data);
        });
    }

    const setActiveParent = (menu) => {
        console.warn(menu);
        setSelectedMenu(menu);
        onChange(menu);
        return true;
    }

    return (
        <nav>
                <div className="centrar h-10">
                    <ul className="flex flex-row mt- space-x-8">
                        {menus.map((menu)=>(
                            <li key={menu.id}>
                                <NavLink active={menu.type === 1?route().current(menu.uri):false} href={menu.type === 1?route(menu.uri):menu.uri} method={menu.method} target={menu.target} onClick={(e)=>setActiveParent(menu)}>
                                    {menu.icon && (
                                        <>
                                            <i className={menu.icon}></i> &nbsp;&nbsp;
                                        </>
                                    )}
                                    {menu.title}
                                </NavLink>
                            </li>
                        ))}
                    </ul>
                </div>
        </nav>
    );
};

export default NavPrin;
