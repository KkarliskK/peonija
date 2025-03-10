import { Link, Head, useForm } from '@inertiajs/react';
import React, { useRef, useState } from 'react';
import emailjs from '@emailjs/browser';
import InputLabel from '@/Components/Input/InputLabel';
import TextInput from '@/Components/Input/TextInput';
import { MdEmail, MdLocationOn, MdPhone, MdAccessTime } from "react-icons/md";
import { FaFacebook, FaInstagram } from "react-icons/fa";
import { AiFillLike } from "react-icons/ai";


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
          <main id='contact' className='h-auto py-12 bg-gradient-to-b from-primary-pink to-accent dark:bg-gradient-to-t dark:from-gray-800 dark:to-gray-900'>
            <div className='container px-4 py-16 mx-auto'>
              <div className='flex flex-col items-center justify-center w-full mb-16 text-white dark:text-gray-200'>
                <div className='mb-8 text-center'>
                  <h1 className='relative inline-block mb-2 text-4xl font-bold tracking-wider uppercase md:text-5xl dark:text-white'>
                    Kontakti
                    <span className='absolute left-0 w-full h-1 bg-gray-800 -bottom-2 dark:bg-white opacity-20'></span>
                  </h1>
                </div>
              <p className='max-w-2xl text-lg text-center'>Mēs priecājamies par katru klientu un esam gatavi palīdzēt izveidot Jūsu sapņu ziedu pušķi!</p>
              </div>

              <div className='grid items-start grid-cols-1 gap-8 mx-auto lg:grid-cols-3 max-w-7xl'>
                <div className='space-y-3'>
                  {/* Location Card */}
                  <div className='flex-1 p-5 rounded-lg shadow-lg bg-white/95 dark:bg-gray-700'>
                    <div className='flex items-center gap-4 mb-4'>
                      <div className='p-3 rounded-full bg-primary-pink/20 dark:bg-gray-600'>
                        <MdLocationOn size={24} className='text-accent dark:text-gray-300' />
                      </div>
                      <h3 className='text-lg font-bold dark:text-gray-200'>Atrašanās vieta</h3>
                    </div>
                    <p className='text-gray-600 dark:text-gray-300'>Uzvaras Bulvāris 1B, Cēsis</p>
                  </div>

                  {/* Working Hours Card */}
                  <div className='flex-1 p-5 rounded-lg shadow-lg bg-white/95 dark:bg-gray-700'>
                    <div className='flex items-center gap-4 mb-4'>
                      <div className='p-3 rounded-full bg-primary-pink/20 dark:bg-gray-600'>
                        <AiFillLike size={24} className='text-accent dark:text-gray-300' />
                      </div>
                      <h3 className='text-lg font-bold dark:text-gray-200'>Sociālie tīkli</h3>
                    </div>
                    <div className='flex flex-col'>
                      <div className='mx-3 my-1'>
                        <a href='https://www.facebook.com/Peoniijaa/' className='flex flex-row text-accent hover:text-primary-pink dark:text-gray-300 dark:hover:text-gray-100'>
                          <FaFacebook size={24} />
                          <p className='mx-3'>Peonija Facebook</p>
                        </a>
                      </div>
                      <div className='mx-3 my-1'>
                        <a href='https://www.instagram.com/ziedu.veikals.peonija/' className='flex flex-row text-accent hover:text-primary-pink dark:text-gray-300 dark:hover:text-gray-100'>
                          <FaInstagram size={24} />
                          <p className='mx-3'>Peonija Instagram</p>
                        </a>
                      </div>
                    </div>
                  </div>

                  {/* Contact Info Card */}
                  <div className='flex-1 p-5 rounded-lg shadow-lg bg-white/95 dark:bg-gray-700'>
                    <div className='flex items-center gap-4 mb-4'>
                      <div className='p-3 rounded-full bg-primary-pink/20 dark:bg-gray-600'>
                        <MdPhone size={24} className='text-accent dark:text-gray-300' />
                      </div>
                      <h3 className='text-lg font-bold dark:text-gray-200'>Kontakti</h3>
                    </div>
                    <div className='space-y-4'>
                      <a href="tel:+37129484017" className='block text-accent hover:text-primary-pink dark:text-gray-300 dark:hover:text-gray-100'>
                        +371 29484071
                      </a>
                      <a href="mailto:zieduveikalspeonija@gmail.com" className='block text-accent hover:text-primary-pink dark:text-gray-300 dark:hover:text-gray-100'>
                        zieduveikalspeonija@gmail.com
                      </a>
                    </div>
                  </div>
                </div>

                {/* Contact Form */}
                <div className='w-full lg:col-span-2'>
                  <div className='h-full p-8 rounded-lg shadow-lg bg-white/95 dark:bg-gray-700'>
                    <h2 className='mb-6 text-3xl font-bold dark:text-gray-200'>Sazinies ar mums!</h2>
                    <p className='mb-8 text-gray-500 dark:text-gray-400'>
                      Vai Tev ir kāds īpašs pasūtījums ko vēlies izpildīt? Tad droši sazinies ar mums!
                    </p>

                    <form ref={form} className='space-y-6' onSubmit={sendEmail}>
                      <div className='grid gap-6 sm:grid-cols-2'>
                        <TextInput
                          className='w-full px-4 py-3 text-sm border rounded-lg dark:bg-gray-800 dark:text-white dark:border-gray-600'
                          type='text'
                          name='user_name'
                          id='user_name'
                          placeholder='Vārds'
                        />
                        <TextInput
                          className='w-full px-4 py-3 text-sm border rounded-lg dark:bg-gray-800 dark:text-white dark:border-gray-600'
                          type='email'
                          name='user_email'
                          id='user_email'
                          placeholder='e-pasts'
                        />
                      </div>

                      <textarea
                        className='w-full h-40 px-4 pt-3 text-sm border rounded-lg resize-none dark:bg-gray-800 dark:text-white dark:border-gray-600'
                        name='message'
                        id='message'
                        placeholder='Ziņa ...'
                      />

                      <div className='flex items-center justify-between'>
                        <button className='px-8 py-3 text-sm font-semibold text-white transition-colors rounded-lg bg-accent hover:bg-primary-pink dark:bg-gray-600 dark:hover:bg-gray-500' type='submit'>
                          Sūtīt
                        </button>
                      </div>
                    </form>

                    {message && (
                      <div className={`mt-6 p-4 rounded-lg text-center text-white font-semibold transition-all duration-500 ${
                        slideOut ? 'opacity-0 transform translate-y-2' : 'opacity-100'
                      } ${messageType === 'success' ? 'bg-green-500' : 'bg-red-500'}`}>
                        {message}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </main>
        </>
    );
}