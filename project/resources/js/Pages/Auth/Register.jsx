import GuestLayout from '@/Layouts/GuestLayout';
import InputError from '@/Components/Input/InputError';
import InputLabel from '@/Components/Input/InputLabel';
import PrimaryButton from '@/Components/Buttons/PrimaryButton';
import TextInput from '@/Components/Input/TextInput';
import { Head, Link, useForm } from '@inertiajs/react';
import background from '../../../assets/PEONIJA-5-dark.webp';
import logo from '../../../assets/Peonija_logo.webp';
import { FaFacebook, FaInstagram } from "react-icons/fa";


export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    const submit = (e) => {
        e.preventDefault();

        post(route('register'), {
            onFinish: () => reset('password', 'password_confirmation'),
        });
    };

    return (
        <>
            <Head title="Reģistrēties" />
            <div className='flex justify-center items-center w-full h-screen bg-gray-100'>
                <div className='flex sm:flex-row flex-col bg-white rounded-md sm:w-3/6 sm:h-3/6 w-11/12 h-auto shadow-md '>
                    <div className='flex flex-col justify-between items-center p-2 w-full rounded-l-md bg-cover bg-center bg-no-repeat' style={{ backgroundImage: `url(${background})` }}>
                        <h1 className='sm:mt-40 mt-8 font-semibold text-5xl text-white text-center'>Reģistrējies vietnē Peonija!</h1>
                        <div className='flex sm:flex-row flex-col w-full my-4'>{/* social media links box */}
                            <a className='flex items-center justify-center text-white' href='https://www.facebook.com/Peoniijaa/'><FaFacebook className='mx-2' size={32} />facebook</a>
                            <Link href='/'>
                                <img className='h-18 w-18' src={logo} alt="Peonija logotips" />
                            </Link>
                            <a className='flex items-center justify-center text-white' href='https://www.instagram.com/ziedu.veikals.peonija/'><FaInstagram className='mx-2' size={32} />instagram</a>
                        </div>
                    </div>

                    <form className='flex flex-col justify-center w-full p-8' onSubmit={submit}>
                        <div>
                            <InputLabel htmlFor="name" value="Vārds" />

                            <TextInput
                                id="name"
                                name="name"
                                value={data.name}
                                className="mt-1 block w-full"
                                autoComplete="name"
                                isFocused={true}
                                onChange={(e) => setData('name', e.target.value)}
                            />

                            <InputError message={errors.name} className="mt-2" />
                        </div>

                        <div className="mt-4">
                            <InputLabel htmlFor="email" value="E-pasta adrese" />

                            <TextInput
                                id="email"
                                type="email"
                                name="email"
                                value={data.email}
                                className="mt-1 block w-full"
                                autoComplete="email"
                                onChange={(e) => setData('email', e.target.value)}
                            />

                            <InputError message={errors.email} className="mt-2" />
                        </div>

                        <div className="mt-4">
                            <InputLabel htmlFor="password" value="Parole" />

                            <TextInput
                                id="password"
                                type="password"
                                name="password"
                                value={data.password}
                                className="mt-1 block w-full"
                                autoComplete="new-password"
                                onChange={(e) => setData('password', e.target.value)}
                            />

                            <InputError message={errors.password} className="mt-2" />
                        </div>

                        <div className="mt-4">
                            <InputLabel htmlFor="password_confirmation" value="Apstiprini paroli" />

                            <TextInput
                                id="password_confirmation"
                                type="password"
                                name="password_confirmation"
                                value={data.password_confirmation}
                                className="mt-1 block w-full"
                                autoComplete="new-password"
                                onChange={(e) => setData('password_confirmation', e.target.value)}
                            />

                            <InputError message={errors.password_confirmation} className="mt-2" />
                        </div>

                        <div className="flex items-center justify-end mt-4">
                            <Link
                                href={route('login')}
                                className="underline text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-offset-gray-800"
                            >
                                Vai Tev jau ir profils?
                            </Link>

                            <PrimaryButton className="ms-4" disabled={processing}>
                                Reģistrēties
                            </PrimaryButton>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}
