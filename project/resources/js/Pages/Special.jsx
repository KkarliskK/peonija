import { Link, Head } from '@inertiajs/react';
import offer1 from '../../assets/PEONIJA-17.jpg';
import offer2 from '../../assets/PEONIJA-18.jpg';
import offer3 from '../../assets/PEONIJA-19.jpg';
import BuyButton from '@/Components/BuyButton';

export default function Special({ auth }) {
    return (
        <>
            <main id='special_orders' className='h-auto sm:h-dvh mt-12'>
                <div className='flex mt-8 w-full justify-center items-center'>
                    <h1 className='font-semibold text-5xl uppercase text-center'>Populāri Piedāvājumi</h1>
                </div>
                <div className='flex w-full justify-center items-center h-full '>
                    <div className='flex w-full flex-col justify-center items-center h-full sm:flex-row'>
                        {/* 3 boxes in this div */}
                        <div className='flex justify-center items-center flex-col w-full h-3/6 shadow-xl m-4 p-4 rounded-br-[100px] sm:w-3/12'>
                            <img className='w-full h-auto' src={offer1} alt="offer1" />
                            <p className='mt-8 text-black bg-white border-2 border-accent rounded-3xl p-3 shadow-lg font-semibold uppercase sm:my-4'>Ziedu pušķis</p>
                            <div className='p-2 m-4'>
                                <p>Apraksts par šo pušķi, ļoti skaists, krāsains! Iepriecinās gan jaunus, gan vecus!</p>
                            </div>
                            <div className='flex w-full justify-center items-center p-2 m-4'>
                                <h1 className='m-2 p-2 font-semibold text-2xl mr-4'>49 EUR</h1>
                                <BuyButton disabled={false}>Pirkt </BuyButton>                          
                            </div>
                        </div>
                        <div className='flex justify-center items-center flex-col w-full h-3/6 shadow-xl m-4 p-4 rounded-br-[100px] sm:w-3/12'>
                            <img className='w-full h-auto' src={offer2} alt="offer2" />  
                            <p className='mt-8 text-black bg-white border-2 border-accent rounded-3xl p-3 shadow-lg font-semibold uppercase sm:my-4'>Ziedu pušķis</p>
                            <div className='p-2 m-4'>
                                <p>Apraksts par šo pušķi, ļoti skaists, krāsains! Iepriecinās gan jaunus, gan vecus!</p>
                            </div>
                            <div className='flex w-full justify-center items-center p-2 m-4'>
                                <h1 className='m-2 p-2 font-semibold text-2xl mr-4'>49 EUR</h1>
                                <BuyButton disabled={false}>Pirkt </BuyButton>
                            </div>
                        </div>
                        <div className='flex justify-center items-center flex-col w-full h-3/6 shadow-xl m-4 p-4 rounded-br-[100px] sm:w-3/12'>
                            <img className='w-full h-auto' src={offer3} alt="offer3" />
                            <p className='mt-8 text-black bg-white border-2 border-accent rounded-3xl p-3 shadow-lg font-semibold uppercase sm:my-4'>Ziedu pušķis</p>
                            <div className='p-2 m-4'>
                                <p>Apraksts par šo pušķi, ļoti skaists, krāsains! Iepriecinās gan jaunus, gan vecus!</p>
                            </div>
                            <div className='flex w-full justify-center items-center p-2 m-4'>
                                <h1 className='m-2 p-2 font-semibold text-2xl mr-4'>49 EUR</h1>
                                <BuyButton disabled={false}>Pirkt </BuyButton>
                            </div>
                        </div>
                    </div> 
                </div>
            </main>
        </>
    );
}
