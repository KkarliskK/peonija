import { Link, Head } from '@inertiajs/react';
import offer1 from '../../assets/PEONIJA-17.jpg';
import offer2 from '../../assets/PEONIJA-18.jpg';
import offer3 from '../../assets/PEONIJA-19.jpg';

export default function Special({ auth }) {
    return (
        <>
            <main id='special_orders' className='h-dvh mt-12'>
                <div className='flex w-full justify-center items-center'>
                    <h1 className='font-semibold text-5xl uppercase'>Populāri Piedāvājumi</h1>
                </div>
                <div className='flex w-full justify-center items-center h-full '>
                    <div className='flex w-full flex-col justify-center items-center h-full sm:flex-row'>
                        {/** 3 boxes in this div **/}
                        <div className='flex justify-center items-center w-full h-3/6 shadow-xl m-4 p-4 rounded-tl-[100px] rounded-br-[100px] sm:w-3/12'>
                            <img className='w-full h-auto' src={offer1} alt="offer1" />
                        </div>
                        <div className='flex justify-center items-center w-full h-3/6 shadow-xl m-4 p-4 rounded-tl-[100px] rounded-br-[100px] sm:w-3/12'>
                            <img className='w-full h-auto' src={offer2} alt="offer2" />  
                        </div>
                        <div className='flex justify-center items-center w-full h-3/6 shadow-xl m-4 p-4 rounded-tl-[100px] rounded-br-[100px] sm:w-3/12'>
                            <img className='w-full h-auto' src={offer3} alt="offer3" />
                        </div>
                    </div> 
                </div>
            </main>
        </>
    );
}
