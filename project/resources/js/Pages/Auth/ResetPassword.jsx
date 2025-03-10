import GuestLayout from '@/Layouts/GuestLayout';
import InputError from '@/Components/Input/InputError';
import InputLabel from '@/Components/Input/InputLabel';
import PrimaryButton from '@/Components/Buttons/PrimaryButton';
import TextInput from '@/Components/Input/TextInput';
import { Head, useForm } from '@inertiajs/react';

export default function ResetPassword({ token, email }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        token: token,
        email: email,
        password: '',
        password_confirmation: '',
    });

    const submit = (e) => {
        e.preventDefault();

        post(route('password.store'), {
            onFinish: () => reset('password', 'password_confirmation'),
        });
    };

    return (
        <GuestLayout>
            <Head title="Reset Password" />
            
            <div className="w-full px-6 mx-auto sm:max-w-md md:max-w-lg">
                <div className="p-6 bg-white shadow-lg dark:bg-gray-800 rounded-xl md:p-8">
                    <h1 className="mb-6 text-2xl font-bold text-center text-gray-900 dark:text-white">
                        Atjaunot paroli
                    </h1>
                    
                    <p className="mb-6 text-sm text-center text-gray-600 dark:text-gray-400">
                        Lūdzu, izveidojiet jaunu, drošu paroli savam profilam!
                    </p>

                    <form onSubmit={submit} className="space-y-6">
                        <div>
                            <InputLabel 
                                htmlFor="email" 
                                value="E-pasts" 
                                className="font-medium text-gray-700 dark:text-gray-300"
                            />

                            <TextInput
                                id="email"
                                type="email"
                                name="email"
                                value={data.email}
                                className="block w-full mt-1 border-gray-300 rounded-lg shadow-sm dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
                                autoComplete="username"
                                onChange={(e) => setData('email', e.target.value)}
                                disabled={email}
                            />

                            <InputError message={errors.email} className="mt-2" />
                        </div>

                        <div>
                            <InputLabel 
                                htmlFor="password" 
                                value="Jaunā parole" 
                                className="font-medium text-gray-700 dark:text-gray-300"
                            />

                            <TextInput
                                id="password"
                                type="password"
                                name="password"
                                value={data.password}
                                className="block w-full mt-1 border-gray-300 rounded-lg shadow-sm dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
                                autoComplete="new-password"
                                isFocused={true}
                                onChange={(e) => setData('password', e.target.value)}
                            />

                            <InputError message={errors.password} className="mt-2" />
                        </div>

                        <div>
                            <InputLabel 
                                htmlFor="password_confirmation" 
                                value="Atkārto jauno paroli" 
                                className="font-medium text-gray-700 dark:text-gray-300"
                            />

                            <TextInput
                                type="password"
                                id="password_confirmation"
                                name="password_confirmation"
                                value={data.password_confirmation}
                                className="block w-full mt-1 border-gray-300 rounded-lg shadow-sm dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
                                autoComplete="new-password"
                                onChange={(e) => setData('password_confirmation', e.target.value)}
                            />

                            <InputError message={errors.password_confirmation} className="mt-2" />
                        </div>

                        <div className="flex items-center justify-center mt-8">
                            <PrimaryButton 
                                className="justify-center w-full py-3 text-sm font-medium text-gray-800 transition-colors duration-200 ease-in-out bg-indigo-600 rounded-lg dark:text-white hover:bg-indigo-700 focus:ring-4 focus:ring-indigo-300"
                                disabled={processing}
                            >
                                {processing ? 'Atjauno...' : 'Atjaunot paroli'}
                            </PrimaryButton>
                        </div>
                    </form>
                </div>
                
                <div className="mt-6 text-center">
                    <a 
                        href={route('login')} 
                        className="text-sm text-indigo-600 underline transition-colors duration-200 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300"
                    >
                        Atpakaļ uz pieslēgšanos
                    </a>
                </div>
            </div>
        </GuestLayout>
    );
}