import React from 'react';
import { useState, useRef, useEffect } from 'react';
import { Link, usePage } from '@inertiajs/react';
import classNames from 'classnames';

const Carusel = () => {
   
    const { postres } = usePage().props;
    console.log('postres', postres);

    const maxScrollWidth = useRef(0);
    const [currentIndex, setCurrentIndex] = useState(0);
    const carousel = useRef(null);

    const movePrev = () => {
        if (currentIndex > 0) {
            setCurrentIndex((prevState) => prevState - 1);
        }
    };

    const moveNext = () => {
        if (
            carousel.current !== null &&
            carousel.current.offsetWidth * currentIndex <= maxScrollWidth.current
        ) {
            setCurrentIndex((prevState) => prevState + 1);
        }
    };

    const isDisabled = (direction) => {
        if (direction === 'prev') {
            return currentIndex <= 0;
        }

        if (direction === 'next' && carousel.current !== null) {
            return (
                carousel.current.offsetWidth * currentIndex >= maxScrollWidth.current
            );
        }

        return false;
    };

    useEffect(() => {
        if (carousel !== null && carousel.current !== null) {
            carousel.current.scrollLeft = carousel.current.offsetWidth * currentIndex;
        }
    }, [currentIndex]);

    useEffect(() => {
        maxScrollWidth.current = carousel.current
            ? carousel.current.scrollWidth - carousel.current.offsetWidth
            : 0;
    }, []);

    return (
        <div className="carousel  mx-auto h-full">

            <div className="relative overflow-hidden h-full centrar ">
                <div className="flex justify-between absolute top left w-full h-full">
                    <button
                        onClick={movePrev}
                        className="text-white w-10 h-full max-2xl:w-5 max-2xl:h-full text-center opacity-75 hover:opacity-100 disabled:opacity-25 disabled:cursor-not-allowed z-10 p-0 m-0 transition-all ease-in-out duration-300"
                        disabled={isDisabled('prev')}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-12 w-20 -ml-5 max-2xl:h-10 max-2xl:w-10 max-2xl:-ml-3"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={2}
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M15 19l-7-7 7-7"
                            />
                        </svg>
                        <span className="sr-only">Prev</span>
                    </button>
                    <button
                        onClick={moveNext}
                        className="text-white w-10 h-full max-2xl:w-5 max-2xl:h-full text-center opacity-75 hover:opacity-100 disabled:opacity-25 disabled:cursor-not-allowed z-10 p-0 m-0 transition-all ease-in-out duration-300"
                        disabled={isDisabled('next')}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-12 w-20 -ml-5 max-2xl:h-10 max-2xl:w-10 max-2xl:-ml-3"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={2}
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M9 5l7 7-7 7"
                            />
                        </svg>
                        <span className="sr-only">Next</span>
                    </button>
                </div>
                <div className=' w-11/12 max-md:w-5/6 h-full centrar'>
                    <div
                        ref={carousel} className="relative flex overflow-hidden scroll-smooth snap-x snap-mandatory touch-pan-x z-0 h-5/6 max-2xl:h-full max-2xl:px-8 gap-20 max-sm:gap-10 max-md:gap-10 max-lg:gap-14 max-2xl:gap-9  ">
                        {postres.map((resource) => {
                            return (

                                <div
                                    key={resource.id}
                                    className=" text-center w-64 max-md:w-60 h-96 ml-10 max-sm:ml-1 max-md:-ml-8 max-lg:ml-0 max-2xl:ml-6 max-xl:px-5 max-2xl:px-2 max-sm:px-1"
                                >
                                    <div className="h-full w-full aspect-square  -z-10 ">
                                        <div className=' w-full h-[95%] max-md:h-[75%] max-2xl:h-[70%] rounded-lg shadow-lg cursor-pointer border-b-4 border-[#008BBF] bg-white to-white/40 max-2xl:w-full'>
                                            <h3 className="text-[#00477C] text-3xl max-2xl:text-xl mt-2 font-bold h-10">{resource.nombre}</h3>
                                            <div className='h-[70%] max-2xl:h-[65%] max-2xl:w-full centrar'>
                                                <div className='w-full centrar'>
                                                    <img src={resource.url_logo} className="w-40 h-40 max-2xl:w-32 max-2xl:h-32 mt-4 max-2xl:mt-1 rounded-sm content" />
                                                </div>
                                            </div>
                                            <div className='centrar w-full mt-4 '>
                                                <div className='w-28 h-7 max-2xl:w-16 max-2xl:5 centrar text-white font-bold p-4 max-2xl:p-2 bg-[#002f65] border border-transparent shadow-sm transition-all duration-500 ease-in-out hover:bg-[#001E41] hover:text-indigo-50 transform hover:-translate-y-1 hover:scale-100 dark:text-gray-50 rounded-lg'>
                                                    {/* <a href={item.url_logo} className="underline">
                                                    Ingresar
                                                </a> */}
                                                    <Link className='text-xl max-2xl:text-xs -mt-1' href={route('main', [resource.id])}>
                                                        Ingresar
                                                    </Link>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            );
                        })}

                    </div>
                </div>
            </div>
        </div>
    );
};

export default Carusel;
