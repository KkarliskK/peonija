import Checkbox from '@/Components/Buttons/Checkbox';
import InputError from '@/Components/Input/InputError';
import InputLabel from '@/Components/Input/InputLabel';
import PrimaryButton from '@/Components/Buttons/PrimaryButton';
import TextInput from '@/Components/Input/TextInput';
import { Head, Link, useForm } from '@inertiajs/react';
import background from '../../../assets/PEONIJA-5-dark.webp';

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

            {status && <div className="mb-4 font-medium text-sm text-green-600">{status}</div>}

            <div className='flex justify-center items-center w-full h-screen bg-gray-100'>
                <div className='flex bg-white rounded-md w-2/5 h-2/5 shadow-md bg-cover bg-no-repeat'>
                    <div className='flex justify-center p-2 w-full rounded-l-md' style={{ backgroundImage: `url(${background})` }}>
                        <h1 className='mt-8 font-semibold text-2xl text-white'>Sveicināts atpakaļ!</h1>
                    </div>

                    <form className='flex flex-col w-full p-8' onSubmit={submit}>
                        <div>
                            <InputLabel htmlFor="email" value="e-pasts" />

                            <TextInput
                                id="email"
                                type="email"
                                name="email"
                                value={data.email}
                                className="mt-1 block w-full"
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
                                className="mt-1 block w-full"
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
                                <span className="ms-2 text-sm text-gray-600 dark:text-gray-400">Atcerēties mani</span>
                            </label>
                        </div>

                        <div className="flex items-center justify-start mt-4">
                            <div className='flex flex-col justify-center items-start w-3/5'>
                            {canResetPassword && (
                                <Link
                                    href={route('password.request')}
                                    className="underline text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-offset-gray-800"
                                >
                                    Aizmirsi paroli?
                                </Link>
                            )}
                                <Link
                                    href={route('register')}
                                    className="underline text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-offset-gray-800"
                                >
                                    Vai Tev vēl nav profila?
                                </Link>
                            </div>
                            <PrimaryButton type="submit" className="ms-4 w-2/5 justify-center" disabled={processing}>
                                Pieslēgties
                            </PrimaryButton>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}
