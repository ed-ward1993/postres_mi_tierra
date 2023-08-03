import { InertiaLink } from '@inertiajs/inertia-react';
import React, { useState } from 'react';
import LogoBlanco from '../../../../public/images/SVG/logo_blanco.svg';

const TopHeader = () => {
    const [menuOpened, setMenuOpened] = useState(false);
    return (
        <div className="flex items-center justify-between px-6 py-2 bg-[#003066] md:flex-shrink-0 md:w-56 md:justify-center shadow-lg">
            <InertiaLink className='mt-0' href='/'>
            <img src={LogoBlanco} className="fill-current" width="40" height="20" />
            </InertiaLink>
        </div>
    );
};

export default TopHeader;
