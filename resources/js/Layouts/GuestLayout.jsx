import ApplicationLogo from '@/Components/ApplicationLogo';
// /public/images/SVG/muñeco2.svg';

export default function Guest({ children }) {
    return (
        <div className="w-full h-screen flex items-center justify-center bg-dunes bg-cover bg-left-bottom fondo_color md:bg-[url('../../images/SVG/fondo.svg')] ">
            <div className='w-5/6 h-5/6 rounded-[20px] drop-shadow bg-white items-center justify-center grid grid-cols-2 gap-2 max-lg:grid-cols-1'>

                <div className='max-w-full h-full ml-12 max-lg:hidden'>
                    <div className='h-[90%]'>
                        <img src="images/SVG/muñeco2.svg" alt="" className='object-contain h-full mt-5' />
                    </div>
                </div>

                <div className='w-11/12 h-full ml-1 max-sm:ml-3 max-lg:ml-7 p-3'>
                    {children}
                </div>
            </div>
        </div>
    );
}
