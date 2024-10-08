import { Link, Head, useForm } from '@inertiajs/react';
import React, { useRef, useState } from 'react';
import emailjs from '@emailjs/browser';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import { MdEmail } from "react-icons/md";
import { FaFacebook, FaInstagram } from "react-icons/fa";
import css from '../../css/Contact.module.css';
import InputError from '@/Components/Buttons/InputError';

export default function Contact({ auth }) {

  const [message, setMessage] = useState(null);
  const [messageType, setMessageType] = useState(null);
  // const [showConfetti, setShowConfetti] = useState(false);
  const [slideOut, setSlideOut] = useState(false);
  const form = useRef();

    const sendEmail = (e) => {
      e.preventDefault();

      const formData = new FormData(form.current);
      const userName = formData.get('user_name').trim();
      const userEmail = formData.get('user_email').trim();
      const userMessage = formData.get('message').trim();

      if (!userName || !userEmail || !userMessage) {
          setMessage('Lūdzu aizpildiet visus laukumus.');
          setMessageType('error');
          return;
      }
  
      emailjs
        .sendForm('service_2cilenj', 'template_70ypyol', form.current, {
          publicKey: 'xh-TzXbEyVm9yeb6P',
        })
        .then(
          () => {
            setMessage('🎉e-pasts veiksmīgi nosūtīts!🎉');
            setMessageType('success');
            setTimeout(() => setMessageType(null), 5000);
            setTimeout(() => setSlideOut(true), 4500);
          },
          (error) => {
            setMessage('Kaut kas nogāja greizi, lūdzu mēģiniet vēlreiz.');
            setMessageType('error');          },
        );
    };

    return (
        <>
            <main id='contact' className='h-auto sm:h-dvh mt-12'>
            <div className='flex w-full justify-center items-center h-full'>
                <div className='flex w-full justify-center items-center flex-col h-full mt-12'>
                <div className='w-full flex items-center justify-center my-24'>
                    <h1 className='font-semibold text-5xl uppercase text-center dark:text-white'>Kontakti</h1>
                </div>
                <div className={`grid sm:grid-cols-2 items-center gap-16 p-8 mx-auto max-w-4xl bg-white shadow-[0_2px_10px_-3px_rgba(6,81,237,0.3)] rounded-md text-[#333] font-[sans-serif] dark:bg-gray-700 dark:text-white`}>
                    <div>
                    <h1 className="text-3xl font-extrabold">Sazinies ar mums!</h1>
                    <p className="text-sm text-gray-400 mt-3">Vai Tev ir kāds īpašs pasūtījums ko vēlies izpildīt? Tad droši sazinies ar mums!</p>
                    <ul className="mt-12">
                        <li className="flex items-center">
                        <div className="bg-[#e6e6e6cf] h-10 w-10 rounded-full flex items-center justify-center dark:bg-gray-700">
                            <MdEmail size={32} color='#007bff' />
                        </div>
                        <a href="mailto:zieduveikalspeonija@gmail.com" className="text-[#007bff] text-sm ml-3">
                            <small className="block">e-pasts</small>
                            <strong>zieduveikalspeonija@gmail.com</strong>
                        </a>
                        </li>
                    </ul>
                    <ul className="flex mt-12 space-x-4">
                        <li className="bg-[#e6e6e6cf] h-10 w-10 rounded-full flex items-center justify-center dark:bg-gray-700">
                        <a href="https://www.facebook.com/Peoniijaa/">
                            <FaFacebook size={32} color='#007bff' />
                        </a>
                        </li>
                        <li className="bg-[#e6e6e6cf] h-10 w-10 rounded-full flex items-center justify-center dark:bg-gray-700">
                        <a href="https://www.instagram.com/ziedu.veikals.peonija/">
                            <FaInstagram size={32} color="#007bff" />
                        </a>
                        </li>
                    </ul>
                    </div>

                    <form ref={form} className="ml-auto space-y-4" onSubmit={sendEmail}>
                    <TextInput
                        className="w-full rounded-md py-2.5 px-4 border text-sm"
                        type="text"
                        name="user_name"
                        id='user_name'
                        placeholder="Vārds"
                    />

                    <TextInput
                        className="w-full rounded-md py-2.5 px-4 border text-sm"
                        type="email"
                        name="user_email"
                        id="user_email"
                        placeholder="e-pasts"
                    />

                    <textarea
                        className={'resize-none w-full h-32 rounded-md px-4 border text-sm pt-2.5 outline-none border-gray-300 dark:bg-gray-900 dark:text-white'} 
                        name="message"
                        id='message'
                        placeholder="Ziņa ..."
                    />

                    <button className={`text-white bg-[#007bff] hover:bg-blue-600 font-semibold rounded-md text-sm px-4 py-2.5 w-full`} type="submit">Sūtīt</button>

                    {message && <div className={`m-2 w-full p-1 rounded flex justify-center items-center text-lg font-semibold transition-opacity duration-500 px-4 border  ${slideOut ? css['slide-out'] : ''} ${messageType === 'success' ? css['bg-green-500'] + ' ' + css['slide-in'] : css['bg-red-500'] + ' ' + css['slide-in']}`}>{message}</div>}
                    </form>
                </div>
                </div>
            </div>
            </main>
        </>
    );
}
