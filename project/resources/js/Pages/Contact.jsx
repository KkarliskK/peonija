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
            <main id='contact' className='min-h-dvh bg-gradient-to-b from-primary-pink to-accent'>
  <div className='container mx-auto px-4 py-16'>
    {/* Hero Section */}
    <div className='w-full flex flex-col items-center justify-center mb-16 text-white'>
      <h1 className='font-semibold text-5xl uppercase text-center mb-4'>Kontakti</h1>
      <p className='text-lg text-center max-w-2xl'>Mēs priecājamies par katru klientu un esam gatavi palīdzēt izveidot Jūsu sapņu ziedu pušķi!</p>
    </div>

    {/* Main Content */}
    <div className='grid lg:grid-cols-3 gap-8 items-start max-w-7xl mx-auto' style={{ display: 'flex', alignItems: 'stretch' }}>
      {/* Info Cards */}
      <div className='space-y-6'>
        {/* Location Card */}
        <div className='bg-white/95 p-6 rounded-lg shadow-lg dark:bg-gray-700 flex-1'>
          <div className='flex items-center gap-4 mb-4'>
            <div className='bg-primary-pink/20 p-3 rounded-full'>
              <MdLocationOn size={24} className='text-accent' />
            </div>
            <h3 className='font-bold text-lg'>Atrašanās vieta</h3>
          </div>
          <p className='text-gray-600 dark:text-gray-300'>Uzvaras Bulvāris 1B, Cēsis</p>
        </div>

        {/* Working Hours Card */}
        <div className='bg-white/95 p-6 rounded-lg shadow-lg dark:bg-gray-700 flex-1'>
          <div className='flex items-center gap-4 mb-4'>
            <div className='bg-primary-pink/20 p-3 rounded-full'>
              <AiFillLike size={24} className='text-accent' />
            </div>
            <h3 className='font-bold text-lg'>Sociālie tīkli</h3>
          </div>
          <div className='flex flex-col'>
            <div className='mx-3 my-1'>
              <a href='https://www.facebook.com/Peoniijaa/' className='text-accent hover:text-primary-pink flex flex-row'>
                <FaFacebook size={24} />
                <p className='mx-3'>Peonija Facebook</p>
              </a>
            </div>
            <div className='mx-3 my-1'>
              <a href='https://www.instagram.com/ziedu.veikals.peonija/' className='text-accent hover:text-primary-pink flex flex-row'>
                <FaInstagram size={24} />
                <p className='mx-3'>Peonija Instagram</p>
              </a>
            </div>
          </div>
        </div>

        {/* Contact Info Card */}
        <div className='bg-white/95 p-6 rounded-lg shadow-lg dark:bg-gray-700 flex-1'>
          <div className='flex items-center gap-4 mb-4'>
            <div className='bg-primary-pink/20 p-3 rounded-full'>
              <MdPhone size={24} className='text-accent' />
            </div>
            <h3 className='font-bold text-lg'>Kontakti</h3>
          </div>
          <div className='space-y-4'>
            <a href="tel:+37129484017" className='block text-accent hover:text-primary-pink'>
              +371 29484071
            </a>
            <a href="mailto:zieduveikalspeonija@gmail.com" className='block text-accent hover:text-primary-pink'>
              zieduveikalspeonija@gmail.com
            </a>
          </div>
        </div>
      </div>

      {/* Contact Form */}
      <div className='lg:col-span-2 flex-1'>
        <div className='bg-white/95 p-8 rounded-lg shadow-lg dark:bg-gray-700 h-full'>
          <h2 className='text-3xl font-bold mb-6'>Sazinies ar mums!</h2>
          <p className='text-gray-500 dark:text-gray-400 mb-8'>
            Vai Tev ir kāds īpašs pasūtījums ko vēlies izpildīt? Tad droši sazinies ar mums!
          </p>

          <form ref={form} className='space-y-6' onSubmit={sendEmail}>
            <div className='grid sm:grid-cols-2 gap-6'>
              <TextInput
                className='w-full rounded-lg py-3 px-4 border text-sm'
                type='text'
                name='user_name'
                id='user_name'
                placeholder='Vārds'
              />
              <TextInput
                className='w-full rounded-lg py-3 px-4 border text-sm'
                type='email'
                name='user_email'
                id='user_email'
                placeholder='e-pasts'
              />
            </div>

            <textarea
              className='w-full h-40 rounded-lg px-4 border text-sm pt-3 resize-none dark:bg-gray-900 dark:text-white'
              name='message'
              id='message'
              placeholder='Ziņa ...'
            />

            <div className='flex items-center justify-between'>
              <button className='text-white bg-accent hover:bg-primary-pink transition-colors font-semibold rounded-lg text-sm px-8 py-3' type='submit'>
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

    {/* Decorative Elements */}
    <div className='absolute top-20 left-10 w-24 h-24 bg-white/10 rounded-full blur-xl' />
    <div className='absolute bottom-20 right-10 w-32 h-32 bg-accent/20 rounded-full blur-xl' />
  </div>
</main>

        </>
    );
}
