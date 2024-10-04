import { Link, Head } from '@inertiajs/react';
import React, { useRef } from 'react';
import emailjs from '@emailjs/browser';

export default function Contact({ auth }) {

    const form = useRef();

    const sendEmail = (e) => {
      e.preventDefault();
  
      emailjs
        .sendForm('service_2cilenj', 'template_70ypyol', form.current, {
          publicKey: 'xh-TzXbEyVm9yeb6P',
        })
        .then(
          () => {
            console.log('SUCCESS!');
          },
          (error) => {
            console.log('FAILED...', error.text);
          },
        );
    };

    return (
        <>
            <main id='contact' className='h-auto sm:h-dvh mt-12'>
                <div className='flex w-full justify-center items-center h-full'>
                    <div className='flex w-full flex-col h-full mt-12'>
                        <div className='w-full flex items-center justify-center'>
                            <h1 className='font-semibold text-5xl uppercase text-center'>Kontakti</h1>
                        </div>
                        <div className='w-full flex justify-center items-center'>
                            <form ref={form} onSubmit={sendEmail}>
                                <label>Name</label>
                                <input type="text" name="user_name" />
                                <label>Email</label>
                                <input type="email" name="user_email" />
                                <label>Message</label>
                                <textarea name="message" />
                                <input type="submit" value="Send" />
                            </form>
                        </div>
                    </div> 
                </div>
            </main>
        </>
    );
}
