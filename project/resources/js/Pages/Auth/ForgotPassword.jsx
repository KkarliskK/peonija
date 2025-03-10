import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import InputError from '@/Components/Input/InputError';
import PrimaryButton from '@/Components/Buttons/PrimaryButton';
import TextInput from '@/Components/Input/TextInput';
import { Head, useForm } from '@inertiajs/react';

export default function ForgotPassword({ status }) {
    const { data, setData, post, processing, errors } = useForm({
        email: '',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('password.email'));
    };

    return (
        <AuthenticatedLayout>
            <Head title="Forgot Password" />
            
            <div className="flex flex-col items-center min-h-screen pt-6 sm:justify-center sm:pt-0 bg-gray-50 dark:bg-gray-900">
                <div className="w-full px-6 py-8 mt-6 overflow-hidden bg-white shadow-md sm:max-w-md dark:bg-gray-800 sm:rounded-lg">
                    <h2 className="mb-6 text-2xl font-bold text-center text-gray-800 dark:text-gray-200">
                        Atjaunot paroli
                    </h2>
                    
                    <div className="mb-6 text-sm text-gray-600 dark:text-gray-400">
                        Aizmirsi paroli? Nav problēmu. Vienkārši norādi savu e-pasta adresi zemāk un mēs tev nosūtīsim e-pastu ar paroles atjaunošanas adresi, kur varēsi izvēlēties jaunu paroli.
                    </div>

                    {status && (
                        <div className="p-4 mb-6 text-sm font-medium text-green-600 rounded-md bg-green-50 dark:bg-green-900/30 dark:text-green-400">
                            {status}
                        </div>
                    )}

                    <form onSubmit={submit}>
                        <div className="mb-6">
                            <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                                E-pasta adrese
                            </label>
                            
                            <TextInput
                                id="email"
                                type="email"
                                name="email"
                                value={data.email}
                                className="block w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-600 dark:border-gray-700"
                                isFocused={true}
                                onChange={(e) => setData('email', e.target.value)}
                                placeholder="lietotajs@paraudzins.lv"
                            />

                            <InputError message={errors.email} className="mt-2" />
                        </div>

                        <div className="flex items-center justify-end">
                            <PrimaryButton 
                                className="justify-center w-full py-3 transition duration-150 ease-in-out bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-700 dark:hover:bg-indigo-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-offset-gray-800" 
                                disabled={processing}
                            >
                                {processing ? 'Nosūta...' : 'Nosūtīt e-pastu'}
                            </PrimaryButton>
                        </div>
                    </form>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}