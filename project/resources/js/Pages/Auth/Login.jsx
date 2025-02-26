import Checkbox from '@/Components/Buttons/Checkbox';
import InputError from '@/Components/Input/InputError';
import InputLabel from '@/Components/Input/InputLabel';
import PrimaryButton from '@/Components/Buttons/PrimaryButton';
import TextInput from '@/Components/Input/TextInput';
import { Head, Link, useForm } from '@inertiajs/react';
import background from '../../../assets/PEONIJA-5-dark.webp';
import logo from '../../../assets/Peonija_logo.webp';
import { FaFacebook, FaInstagram } from "react-icons/fa";

export default function Login({ status, canResetPassword }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    const submit = (e) => { 
        e.preventDefault();

        post(route('login'), {
            onFinish: () => reset('password'),
        });
    };


    return (
        <>
            <Head title="Pieslēgties" />

            {status && <div className="mb-4 text-sm font-medium text-green-600">{status}</div>}

            <div className='flex items-center justify-center w-full h-screen bg-gray-100'>
                <div className='flex flex-col w-11/12 h-auto bg-white rounded-md shadow-md sm:flex-row sm:w-3/6 sm:h-3/6 '>
                    <div className='flex flex-col items-center justify-between w-full p-2 bg-center bg-no-repeat bg-cover rounded-l-md' style={{ backgroundImage: `url(${background})` }}>
                        <h1 className='mt-2 text-4xl font-semibold text-center text-white sm:mt-40 sm:text-5xl'>Sveicināts atpakaļ!</h1>
                        <div className='flex flex-col w-full my-4 sm:flex-row'>
                            <a className='flex items-center justify-center text-white' href='https://www.facebook.com/Peoniijaa/'><FaFacebook className='mx-2' size={32} />facebook</a>
                            <Link className="flex items-center justify-center" href='/'>
                                <img className='w-3/5 sm:h-18 sm:w-18' src={logo} alt="Peonija logotips" />
                            </Link>
                            <a className='flex items-center justify-center text-white' href='https://www.instagram.com/ziedu.veikals.peonija/'><FaInstagram className='mx-2' size={32} />instagram</a>
                        </div>
                    </div>

                    <form className='flex flex-col justify-center w-full p-8' onSubmit={submit}>
                        <div>
                            <InputLabel htmlFor="email" value="E-pasta adrese" />
                            <TextInput
                                id="email"
                                type="email"
                                name="email"
                                value={data.email}
                                className="block w-full mt-1"
                                autoComplete="username"
                                isFocused={true}
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
                                className="block w-full mt-1"
                                autoComplete="current-password"
                                onChange={(e) => setData('password', e.target.value)}
                            />
                            <InputError message={errors.password} className="mt-2" />
                        </div>

                        <div className="block mt-4">
                            <label className="flex items-center">
                                <Checkbox
                                    name="remember"
                                    checked={data.remember}
                                    onChange={(e) => setData('remember', e.target.checked)}
                                />
                                <span className="text-sm text-gray-600 ms-2 dark:text-gray-400">Atcerēties mani</span>
                            </label>
                        </div>

                        <div className="flex items-center justify-start mt-4">
                            <div className='flex flex-col items-start justify-center w-3/5'>
                                {canResetPassword && (
                                    <Link
                                        href={route('password.request')}
                                        className="text-sm text-gray-600 underline rounded-md dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-offset-gray-800"
                                    >
                                        Aizmirsi paroli?
                                    </Link>
                                )}
                                <Link
                                    href={route('register')}
                                    className="text-sm text-gray-600 underline rounded-md dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-offset-gray-800"
                                >
                                    Vai Tev vēl nav profila?
                                </Link>
                            </div>
                            <PrimaryButton type="submit" className="justify-center w-auto ms-4 sm:w-2/5" disabled={processing}>
                                Pieslēgties
                            </PrimaryButton>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}