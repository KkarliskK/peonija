import { Link, Head } from '@inertiajs/react';
import offer1 from '../../assets/PEONIJA-17.jpg';
import offer2 from '../../assets/PEONIJA-18.jpg';
import offer3 from '../../assets/PEONIJA-19.jpg';

export default function Special({ auth }) {
    return (
        <>
            <main id='special_orders' className='h-dvh mt-12'>
                <div className='flex mt-8 w-full justify-center items-center'>
                    <h1 className='font-semibold text-5xl uppercase'>Populāri Piedāvājumi</h1>
                </div>
                <div className='flex w-full justify-center items-center h-full '>
                    <div className='flex w-full flex-col justify-center items-center h-full sm:flex-row'>
                        {/* 3 boxes in this div */}
                        <div className='flex justify-center items-center flex-col w-full h-3/6 shadow-xl m-4 p-4 rounded-br-[100px] sm:w-3/12'>
                            <img className='w-full h-auto' src={offer1} alt="offer1" />
                            <div className='border-2 border-accent p-2 m-4'>
                                <h1>Pušķis</h1>
                            </div>
                            <div className='p-2 m-4'>
                                <p>Apraksts par šo pušķi, ļoti skaists, krāsains! Iepriecinās gan jaunus, gan vecus!</p>
                            </div>
                            <div className='flex w-full justify-center items-center p-2 m-4'>
                                <h1 className='m-2 p-2 font-semibold text-xl'>49 EUR</h1>
                                <button className="before:ease relative h-12 w-40 overflow-hidden border border-green-500 bg-green-500 text-white rounded transition-all before:absolute before:right-0 before:top-0 before:h-12 before:w-6 before:translate-x-12 before:rotate-6 before:bg-white before:opacity-10 before:duration-700 hover:shadow-green-500 hover:before:-translate-x-40 rounded-br-[100px]">
                                    <span relative="relative z-10">Pirkt!</span>
                                </button>                                
                            </div>
                        </div>
                        <div className='flex justify-center items-center flex-col w-full h-3/6 shadow-xl m-4 p-4 rounded-br-[100px] sm:w-3/12'>
                            <img className='w-full h-auto' src={offer2} alt="offer2" />  
                            <div className='border-2 border-accent p-2 m-4'>
                                <h1>Pušķis</h1>
                            </div>
                            <div className='p-2 m-4'>
                                <p>Apraksts par šo pušķi, ļoti skaists, krāsains! Iepriecinās gan jaunus, gan vecus!</p>
                            </div>
                            <div className='flex w-full justify-center items-center p-2 m-4'>
                                <h1 className='m-2 p-2 font-semibold text-xl'>49 EUR</h1>
                                <button className="before:ease relative h-12 w-40 overflow-hidden border border-green-500 bg-green-500 text-white rounded transition-all before:absolute before:right-0 before:top-0 before:h-12 before:w-6 before:translate-x-12 before:rotate-6 before:bg-white before:opacity-10 before:duration-700 hover:shadow-green-500 hover:before:-translate-x-40 rounded-br-[100px]">
                                    <span relative="relative z-10">Pirkt!</span>
                                </button>                                
                            </div>
                        </div>
                        <div className='flex justify-center items-center flex-col w-full h-3/6 shadow-xl m-4 p-4 rounded-br-[100px] sm:w-3/12'>
                            <img className='w-full h-auto' src={offer3} alt="offer3" />
                            <div className='border-2 border-accent p-2 m-4'>
                                <h1>Pušķis</h1>
                            </div>
                            <div className='p-2 m-4'>
                                <p>Apraksts par šo pušķi, ļoti skaists, krāsains! Iepriecinās gan jaunus, gan vecus!</p>
                            </div>
                            <div className='flex w-full justify-center items-center p-2 m-4'>
                                <h1 className='m-2 p-2 font-semibold text-xl'>49 EUR</h1>
                                <button className="before:ease relative h-12 w-40 overflow-hidden border border-green-500 bg-green-500 text-white rounded transition-all before:absolute before:right-0 before:top-0 before:h-12 before:w-6 before:translate-x-12 before:rotate-6 before:bg-white before:opacity-10 before:duration-700 hover:shadow-green-500 hover:before:-translate-x-40 rounded-br-[100px]">
                                    <span relative="relative z-10">Pirkt!</span>
                                </button>
                            </div>
                        </div>
                    </div> 
                </div>
            </main>
        </>
    );
}
