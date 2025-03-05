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
            
            <div className="flex items-center justify-center min-h-screen p-4 bg-gray-100">
                <div className="flex flex-col w-full max-w-5xl overflow-hidden transition-all duration-300 ease-in-out bg-white shadow-xl rounded-2xl md:flex-row">
                    {/* Left side with background */}
                    <div 
                        className="relative flex flex-col items-center justify-between w-full py-8 bg-center bg-no-repeat bg-cover md:w-1/2 md:py-0"
                        style={{ backgroundImage: `url(${background})` }}
                    >
                        <div className="absolute inset-0 bg-black/30 md:bg-black/20"></div>
                        
                        <h1 className="relative z-10 px-4 mt-4 text-3xl font-bold text-center text-white md:text-4xl lg:text-5xl md:mt-32">
                            Reģistrējies vietnē Peonija!
                        </h1>
                        
                        <div className="relative z-10 flex items-center justify-between w-full px-4 mt-4 md:px-8 md:mt-0">
                            <a 
                                className="flex flex-col items-center text-white transition-colors md:flex-row hover:text-gray-200" 
                                href="https://www.facebook.com/Peoniijaa/"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <FaFacebook className="mb-1 md:mb-0 md:mr-2" size={28} />
                                <span className="text-sm md:text-base">facebook</span>
                            </a>
                            
                            <Link className="flex items-center justify-center" href="/">
                                <img 
                                    className="w-32 h-auto md:w-36" 
                                    src={logo} 
                                    alt="Peonija logotips" 
                                />
                            </Link>
                            
                            <a 
                                className="flex flex-col items-center text-white transition-colors md:flex-row hover:text-gray-200" 
                                href="https://www.instagram.com/ziedu.veikals.peonija/"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <FaInstagram className="mb-1 md:mb-0 md:mr-2" size={28} />
                                <span className="text-sm md:text-base">instagram</span>
                            </a>
                        </div>
                    </div>

                    {/* Right side with form */}
                    <div className="w-full p-6 md:w-1/2 md:p-10 lg:p-12">
                        <div className="max-w-md mx-auto">
                            <h2 className="mb-6 text-2xl font-semibold text-gray-800">Reģistrēties</h2>
                            
                            <form onSubmit={submit}>
                                <div className="mb-4">
                                    <InputLabel htmlFor="name" value="Vārds" className="text-gray-700" />
                                    <TextInput
                                        id="name"
                                        name="name"
                                        value={data.name}
                                        className="block w-full mt-1 rounded-lg focus:ring-2 focus:ring-indigo-500"
                                        autoComplete="name"
                                        isFocused={true}
                                        onChange={(e) => setData('name', e.target.value)}
                                    />
                                    <InputError message={errors.name} className="mt-2" />
                                </div>

                                <div className="mb-4">
                                    <InputLabel htmlFor="email" value="E-pasta adrese" className="text-gray-700" />
                                    <TextInput
                                        id="email"
                                        type="email"
                                        name="email"
                                        value={data.email}
                                        className="block w-full mt-1 rounded-lg focus:ring-2 focus:ring-indigo-500"
                                        autoComplete="email"
                                        onChange={(e) => setData('email', e.target.value)}
                                    />
                                    <InputError message={errors.email} className="mt-2" />
                                </div>

                                <div className="mb-4">
                                    <InputLabel htmlFor="password" value="Parole" className="text-gray-700" />
                                    <TextInput
                                        id="password"
                                        type="password"
                                        name="password"
                                        value={data.password}
                                        className="block w-full mt-1 rounded-lg focus:ring-2 focus:ring-indigo-500"
                                        autoComplete="new-password"
                                        onChange={(e) => setData('password', e.target.value)}
                                    />
                                    <InputError message={errors.password} className="mt-2" />
                                </div>

                                <div className="mb-6">
                                    <InputLabel htmlFor="password_confirmation" value="Apstiprini paroli" className="text-gray-700" />
                                    <TextInput
                                        id="password_confirmation"
                                        type="password"
                                        name="password_confirmation"
                                        value={data.password_confirmation}
                                        className="block w-full mt-1 rounded-lg focus:ring-2 focus:ring-indigo-500"
                                        autoComplete="new-password"
                                        onChange={(e) => setData('password_confirmation', e.target.value)}
                                    />
                                    <InputError message={errors.password_confirmation} className="mt-2" />
                                </div>

                                <div className="flex flex-col space-y-4">
                                    <PrimaryButton 
                                        type="submit" 
                                        className="justify-center w-full py-3 text-base font-medium transition-all rounded-lg" 
                                        disabled={processing}
                                    >
                                        Reģistrēties
                                    </PrimaryButton>
                                    
                                    <div className="text-center">
                                        <Link
                                            href={route('login')}
                                            className="text-sm text-indigo-600 transition-colors hover:text-indigo-800"
                                        >
                                            Vai Tev jau ir profils?
                                        </Link>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}