import { useRef, useState } from 'react';
import DangerButton from '@/Components/Buttons/DangerButton';
import InputError from '@/Components/Input/InputError';
import InputLabel from '@/Components/Input/InputLabel';
import Modal from '@/Components/Modals/Modal';
import SecondaryButton from '@/Components/Buttons/SecondaryButton';
import TextInput from '@/Components/Input/TextInput';
import { useForm } from '@inertiajs/react';

export default function DeleteUserForm({ className = '' }) {
    const [confirmingUserDeletion, setConfirmingUserDeletion] = useState(false);
    const passwordInput = useRef();

    const {
        data,
        setData,
        delete: destroy,
        processing,
        reset,
        errors,
    } = useForm({
        password: '',
    });

    const confirmUserDeletion = () => {
        setConfirmingUserDeletion(true);
    };

    const deleteUser = (e) => {
        e.preventDefault();

        destroy(route('profile.destroy'), {
            preserveScroll: true,
            onSuccess: () => closeModal(),
            onError: () => passwordInput.current.focus(),
            onFinish: () => reset(),
        });
    };

    const closeModal = () => {
        setConfirmingUserDeletion(false);

        reset();
    };

    return (
        <section className={`space-y-6 ${className}`}>
            <header>
                <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100">Dzēst profilu</h2>

                <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                    Tiklīdz kā tavs profils tiks dzēsts, visi profila dati tiks izdzēsti. Pirms izdzēsiet savu kontu, 
                    lūdzu saglabājiet sev jebkādu informāciju, ko jūs vēlaties saglabāt.
                </p>
            </header>

            <DangerButton onClick={confirmUserDeletion}>Dzēst Profilu</DangerButton>

            <Modal show={confirmingUserDeletion} onClose={closeModal}>
                <form onSubmit={deleteUser} className="p-6">
                    <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100">
                        Vai esi pārliecināts, ka vēlies dzēst savu profilu?
                    </h2>

                    <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                        Tiklīdz kā tavs profils tiks dzēsts, visi profila dati tiks izdzēsti. Lūdzu
                        ievadi paroli, lai apstiprinātu, ka jūs vēlaties dzēst savu kontu.
                    </p>

                    <div className="mt-6">
                        <InputLabel htmlFor="password" value="Password" className="sr-only" />

                        <TextInput
                            id="password"
                            type="password"
                            name="password"
                            ref={passwordInput}
                            value={data.password}
                            onChange={(e) => setData('password', e.target.value)}
                            className="mt-1 block w-3/4"
                            isFocused
                            placeholder="Parole"
                        />

                        <InputError message={errors.password} className="mt-2" />
                    </div>

                    <div className="mt-6 flex justify-end">
                        <SecondaryButton onClick={closeModal}>Atcelt</SecondaryButton>

                        <DangerButton className="ms-3" disabled={processing}>
                            Dzēst Profilu
                        </DangerButton>
                    </div>
                </form>
            </Modal>
        </section>
    );
}
