import React from 'react';
import { Head } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

export default function PrivateRules({ auth }) {
  return (
    <>
      <AuthenticatedLayout auth={auth}>
        <div className="container max-w-4xl px-4 py-8 mx-auto">
          <Head title="Privātuma Politika" />
          
          <div className="p-6 bg-white rounded-lg shadow-md dark:bg-gray-800">
            <h1 className="mb-6 text-3xl font-bold text-gray-900 dark:text-gray-100">
              Privātuma Politika
            </h1>

            {/* Disclaimer Section */}
            <section className="p-4 mb-6 bg-gray-100 rounded-lg dark:bg-gray-700">
              <h2 className="mb-4 text-xl font-bold dark:text-gray-200">
                PIRMS TURPINI DARBĪBAS peonija.lv ŅEM VĒRĀ!
              </h2>
              <p className="mb-4 text-gray-600 dark:text-gray-300">
                Šī vietne ir izstrādāta kā kvalifikācijas darbs programmēšanas tehniķa profesijas iegūšanai.
              </p>
              <h3 className="font-semibold text-gray-600 dark:text-gray-300">Svarīga informācija:</h3>
              <ul className="pl-5 mb-4 list-disc">
                <li className="text-gray-600 dark:text-gray-300">Interneta veikals darbojas tikai testa vidē</li>
                <li className="text-gray-600 dark:text-gray-300">Vietnē nav iespējams veikt reālus pirkumus vai maksājumus</li>
                <li className="text-gray-600 dark:text-gray-300">Visi dati un produkti ir paredzēti tikai demonstrācijas nolūkiem</li>
              </ul>
              <p className="mb-4 text-gray-600 dark:text-gray-300">
                Jūs varat brīvi apskatīt veikala funkcijas un pieejamos produktus demonstrācijas režīmā, taču ņemat vērā, ka vietne var būt nestabila.
              </p>
              <p className="mb-4 text-gray-600 dark:text-gray-300">
                Lūdzu, ņemiet vērā, ka vietnes izstrādātāji neuzņemas nekādu atbildību par šī testa veikala izmantošanu.
              </p>
              <p className="mb-4 text-gray-600 dark:text-gray-300">
                <em>Šis projekts ir izstrādāts tikai mācību nolūkiem programmēšanas tehniķa kvalifikācijas iegūšanai.</em>
              </p>
            </section>

            <section className="mb-6">
              <h2 className="mb-4 text-2xl font-semibold text-gray-800 dark:text-gray-200">
                1. Ievads
              </h2>
              <p className="mb-4 text-gray-600 dark:text-gray-300">
                Peonija ("mēs", "mūsu") ir apņēmusies aizsargāt jūsu privātumu. 
                Šī privātuma politika skaidro, kā mēs vācam, izmantojam, izpaužam un aizsargājam jūsu personas informāciju.
              </p>
            </section>

            <section className="mb-6">
              <h2 className="mb-4 text-2xl font-semibold text-gray-800 dark:text-gray-200">
                2. Informācijas Vākšana
              </h2>
              <div className="space-y-4">
                <div>
                  <h3 className="mb-2 text-lg font-semibold dark:text-gray-200">2.1 Personas Dati</h3>
                  <ul className="text-gray-600 list-disc list-inside dark:text-gray-300">
                    <li>Vārds un uzvārds</li>
                    <li>Kontakta informācija (e-pasts, telefona numurs)</li>
                    <li>Piegādes adrese</li>
                    <li>Maksājuma informācija</li>
                    <li>Pasūtījumu vēsture</li>
                  </ul>
                </div>

                <div>
                  <h3 className="mb-2 text-lg font-semibold dark:text-gray-200">2.2 Automātiski Vāktā Informācija</h3>
                  <ul className="text-gray-600 list-disc list-inside dark:text-gray-300">
                    <li>IP adrese</li>
                    <li>Pārlūkprogrammas tips</li>
                    <li>Ierīces informācija</li>
                  </ul>
                </div>
              </div>
            </section>

            <section className="mb-6">
              <h2 className="mb-4 text-2xl font-semibold text-gray-800 dark:text-gray-200">
                3. Datu Izmantošanas Mērķi
              </h2>
              <ul className="space-y-2 text-gray-600 list-disc list-inside dark:text-gray-300">
                <li>Pasūtījumu apstrādei un piegādei</li>
                <li>Klientu apkalpošanai</li>
                <li>Mājas lapas uzlabošanai</li>
                <li>Personalizētu piedāvājumu sūtīšanai</li>
                <li>Statistikas un analīzes veikšanai</li>
              </ul>
            </section>

            <section className="mb-6">
              <h2 className="mb-4 text-2xl font-semibold text-gray-800 dark:text-gray-200">
                4. Sīkdatnes (Cookies)
              </h2>
              <p className="mb-4 text-gray-600 dark:text-gray-300">
                Mūsu mājas lapa izmanto sīkdatnes lai:
              </p>
              <ul className="space-y-2 text-gray-600 list-disc list-inside dark:text-gray-300">
                <li>Uzlabotu lietotāja pieredzi</li>
                <li>Atcerētos jūsu preferences</li>
                <li>Veiktu mājas lapas apmeklējuma analīzi</li>
              </ul>
            </section>

            <section className="mb-6">
              <h2 className="mb-4 text-2xl font-semibold text-gray-800 dark:text-gray-200">
                5. Datu Aizsardzība
              </h2>
              <ul className="space-y-2 text-gray-600 list-disc list-inside dark:text-gray-300">
                <li>Šifrēta savienojuma izmantošana</li>
                <li>Ierobežota piekļuve datiem</li>
                <li>Regulāras drošības pārbaudes</li>
              </ul>
            </section>

            <div className="mt-8 text-center">
              <p className="italic text-gray-500 dark:text-gray-400">
                Pēdējo reizi atjaunots: {new Date().toLocaleDateString()}
              </p>
            </div>
          </div>
        </div>
      </AuthenticatedLayout>
    </>
  );
}