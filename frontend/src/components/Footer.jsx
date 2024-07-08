import React from 'react';
import { FaFacebookSquare, FaInstagram } from "react-icons/fa";
import Logo from '../assets/Peonija_logo.png';


function Footer() {
  return (
    <>
        <div className={`flex flex-col w-full h-auto p-16 justify-center items-center bg-gray-900`}>
            <div className={`flex w-full items-center justify-center `}>
                <a href='https://www.facebook.com/Peoniijaa/'><FaFacebookSquare size={36} className={`m-2 text-white transition duration-300 ease-in-out hover:text-sky-600 `} /></a>
                <a href='https://www.instagram.com/ziedu.veikals.peonija/'><FaInstagram size={36} className={`m-2 text-white transition duration-300 ease-in-out hover:text-orange-500 `} /></a>
            </div>
            <div className={`flex w-full items-center justify-center`}>
                <img src={Logo} className={`w-1/12`} />
            </div>  
            <div>
                <p className={`text-slate-300 text-xs m-2`}>Copyright © 2024 KkarliskK</p>
            </div>
            <div>
                <a href='#' className={`my-2 p-2 text-white text-sm`}>Bieži uzdotie jautājumi</a>
                <a href='#' className={`my-2 p-2 text-white text-sm`}>Privātuma politika</a>
                <a href='#' className={`my-2 p-2 text-white text-sm`}>Pārvaldīt sīkdatnes</a>
            </div>
        </div>
    </>
  );
}

export default Footer