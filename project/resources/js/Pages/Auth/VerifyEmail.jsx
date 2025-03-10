import GuestLayout from '@/Layouts/GuestLayout';
import PrimaryButton from '@/Components/Buttons/PrimaryButton';
import { Head, Link, useForm } from '@inertiajs/react';

export default function VerifyEmail({ status }) {
    const { post, processing } = useForm({});

    const submit = (e) => {
        e.preventDefault();

        post(route('verification.send'));
    };

    return (
        <GuestLayout>
            <Head title="Email Verification" />

            <div className="mb-4 text-sm text-gray-600 dark:text-gray-400">
                Paldies, ka pieslēdzies! Pirms turpinam, vai jūs varētu verificēt savu e-pasta adresi nospiežot uz adreses, ko aizsūtījām e-pastā?
                Ja nesaņēmāt e-pastu tad mēs varam nosūtīt jaunu.
            </div>

            {status === 'verification-link-sent' && (
                <div className="mb-4 text-sm font-medium text-green-600 dark:text-green-400">
                    Jauna adrese e-pasta verificēšanai tika nosūtīta uz jūsu e-pastu.
                </div>
            )}

            <form onSubmit={submit}>
                <div className="flex items-center justify-between mt-4">
                    <PrimaryButton disabled={processing}>Sūtīt jaunu verifikācijas adresi</PrimaryButton>

                    <Link
                        href={route('logout')}
                        method="post"
                        as="button"
                        className="text-sm text-gray-600 underline rounded-md dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-offset-gray-800"
                    >
                        Izrakstīties
                    </Link>
                </div>
            </form>
        </GuestLayout>
    );
}
