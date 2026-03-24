import React from 'react';
import {
    RadarDrawing,
    CyberDrawing,
    BusinessDrawing,
    FlightDrawing,
    RealEstateDrawing,
    MaritimeDrawing
} from './AcademyCategoryIllustration';

const AcademyCompanySpec = ({ activeTheme }) => {

    // Fallback pour les thèmes non développés
    const getThemeSpecificContent = () => {
        switch(activeTheme) {
            case 'cyber': return "Cybersecurity : L'oracle repose sur un audit forensique post-mortem. L'assureur doit lier le Vault à un certificat de sécurité ou une preuve on-chain d'interruption de réseau.";
            case 'business': return "Business Interruption : Le déclencheur est lié à des flux de trésorerie tokenisés ou des données de chaîne d'approvisionnement vérifiables par des oracles IoT.";
            case 'flight': return "Flight Cancellation : Le Vault interroge l'API de l'aviation civile internationale. L'assureur déploie des liquidités ciblées sur des aéroports spécifiques.";
            case 'realestate': return "Real Estate Sensors : Utilisation d'Oracles Optimistes couplés à des capteurs IoT physiques (feu, inondation, structure) dans les bâtiments certifiés.";
            case 'maritime': return "Maritime Logistics: We use 'Smart Twistlocks' or Computer Vision to detect cargo loss. If stability sensors confirm a sinking event (Hull Loss), the Vault triggers an instant payout.";
            default: return "Sélectionnez un thème pour voir les spécificités de l'assurance.";
        }
    };

    return (
        <section>
            <h3 className="text-xl font-bold mb-4 text-slate-800 dark:text-slate-100 font-sans">
                3. Spécificités Assureur ({activeTheme})
            </h3>

            {activeTheme === 'climate' ? (
                <div className="flex flex-col lg:flex-row gap-8 items-center bg-indigo-500/10 dark:bg-indigo-400/10 p-6 md:p-8 rounded-2xl border border-indigo-500/20 dark:border-indigo-400/20">
                    {/* SVG Radar à Gauche */}
                    <div className="w-full lg:w-1/3 flex justify-center">
                        <RadarDrawing />
                    </div>

                    {/* Chronologie à Droite */}
                    <div className="w-full lg:w-2/3 space-y-6 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-indigo-500/30 before:to-transparent">
                        {/* Étape 1 */}
                        <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                            <div className="flex items-center justify-center w-10 h-10 rounded-full border border-white bg-indigo-100 dark:bg-indigo-900 text-indigo-500 dark:text-indigo-400 shadow shrink-0 z-10">1</div>
                            <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-4 rounded-xl border border-indigo-200 dark:border-indigo-800 bg-white/50 dark:bg-slate-800/50 shadow-sm ml-4 md:ml-0">
                                <h4 className="font-bold text-slate-900 dark:text-white mb-1">Les Paramètres (GPS)</h4>
                                <p className="text-sm text-slate-700 dark:text-slate-300">L'assureur définit des paramètres basés sur des données publiques incontestables (ex: vent {'>'} 250km/h selon la NOAA). Les coordonnées géographiques sont gravées dans le Smart Contract.</p>
                            </div>
                        </div>
                        {/* Étape 2 */}
                        <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                            <div className="flex items-center justify-center w-10 h-10 rounded-full border border-white bg-indigo-100 dark:bg-indigo-900 text-indigo-500 dark:text-indigo-400 shadow shrink-0 z-10">2</div>
                            <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-4 rounded-xl border border-indigo-200 dark:border-indigo-800 bg-white/50 dark:bg-slate-800/50 shadow-sm ml-4 md:ml-0">
                                <h4 className="font-bold text-slate-900 dark:text-white mb-1">L'Oracle UMA</h4>
                                <p className="text-sm text-slate-700 dark:text-slate-300">Nous utilisons l'Oracle Optimiste UMA. Si une tempête frappe, une affirmation est soumise. Une période de contestation s'ouvre pour vérifier l'authenticité des données publiques.</p>
                            </div>
                        </div>
                        {/* Étape 3 */}
                        <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                            <div className="flex items-center justify-center w-10 h-10 rounded-full border border-white bg-indigo-100 dark:bg-indigo-900 text-indigo-500 dark:text-indigo-400 shadow shrink-0 z-10">3</div>
                            <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-4 rounded-xl border border-indigo-200 dark:border-indigo-800 bg-white/50 dark:bg-slate-800/50 shadow-sm ml-4 md:ml-0">
                                <h4 className="font-bold text-slate-900 dark:text-white mb-1">Trigger & Verrouillage</h4>
                                <p className="text-sm text-slate-700 dark:text-slate-300">Dès validation de l'Oracle, l'état passe à `TRIGGERED`. Le Vault se verrouille totalement, interdisant tout retrait par les investisseurs.</p>
                            </div>
                        </div>
                        {/* Étape 4 */}
                        <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                            <div className="flex items-center justify-center w-10 h-10 rounded-full border border-white bg-indigo-100 dark:bg-indigo-900 text-indigo-500 dark:text-indigo-400 shadow shrink-0 z-10">4</div>
                            <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-4 rounded-xl border border-indigo-200 dark:border-indigo-800 bg-white/50 dark:bg-slate-800/50 shadow-sm ml-4 md:ml-0">
                                <h4 className="font-bold text-slate-900 dark:text-white mb-1">Résolution (Soft Default)</h4>
                                <p className="text-sm text-slate-700 dark:text-slate-300">Exécution du Waterfall : Le capital de l'assureur est détruit en premier, suivi des primes, puis de la tranche Junior, protégeant le Senior.</p>
                            </div>
                        </div>
                    </div>
                </div>

            ) : activeTheme === 'cyber' ? (

                <div className="flex flex-col lg:flex-row gap-8 items-center bg-rose-500/5 dark:bg-rose-400/5 p-6 md:p-8 rounded-2xl border border-rose-500/20 dark:border-rose-400/20">
                    {/* SVG Cyber à Gauche */}
                    <div className="w-full lg:w-1/3 flex justify-center">
                        <CyberDrawing />
                    </div>

                    {/* Chronologie à Droite */}
                    <div className="w-full lg:w-2/3 space-y-6 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-rose-500/30 before:to-transparent">
                        {/* Étape 1 */}
                        <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                            <div className="flex items-center justify-center w-10 h-10 rounded-full border border-white bg-rose-100 dark:bg-rose-900 text-rose-500 dark:text-rose-400 shadow shrink-0 z-10">1</div>
                            <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-4 rounded-xl border border-rose-200 dark:border-rose-800 bg-white/50 dark:bg-slate-800/50 shadow-sm ml-4 md:ml-0">
                                <h4 className="font-bold text-slate-900 dark:text-white mb-1">Paramètres d'Audit</h4>
                                <p className="text-sm text-slate-700 dark:text-slate-300">Le Vault définit ce qui constitue un hack (ex: ransomware, smart contract exploit) et exige une preuve spécifique, comme un audit forensique post-mortem par une firme reconnue (ex: CrowdStrike).</p>
                            </div>
                        </div>
                        {/* Étape 2 */}
                        <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                            <div className="flex items-center justify-center w-10 h-10 rounded-full border border-white bg-rose-100 dark:bg-rose-900 text-rose-500 dark:text-rose-400 shadow shrink-0 z-10">2</div>
                            <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-4 rounded-xl border border-rose-200 dark:border-rose-800 bg-white/50 dark:bg-slate-800/50 shadow-sm ml-4 md:ml-0">
                                <h4 className="font-bold text-slate-900 dark:text-white mb-1">L'Incident & La Preuve</h4>
                                <p className="text-sm text-slate-700 dark:text-slate-300">L'entreprise subit une attaque et mandate un audit. Une fois le rapport publié (ou la preuve On-Chain du vol validée), un acteur soumet ce document au réseau UMA en tant que réclamation légitime.</p>
                            </div>
                        </div>
                        {/* Étape 3 */}
                        <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                            <div className="flex items-center justify-center w-10 h-10 rounded-full border border-white bg-rose-100 dark:bg-rose-900 text-rose-500 dark:text-rose-400 shadow shrink-0 z-10">3</div>
                            <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-4 rounded-xl border border-rose-200 dark:border-rose-800 bg-white/50 dark:bg-slate-800/50 shadow-sm ml-4 md:ml-0">
                                <h4 className="font-bold text-slate-900 dark:text-white mb-1">Tribunal Décentralisé</h4>
                                <p className="text-sm text-slate-700 dark:text-slate-300">Contrairement à une API binaire, l'Oracle Optimiste UMA lit le rapport. Si le rapport est authentique et incontesté durant la fenêtre de litige, le piratage est validé formellement et le Vault se verrouille (`TRIGGERED`).</p>
                            </div>
                        </div>
                        {/* Étape 4 */}
                        <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                            <div className="flex items-center justify-center w-10 h-10 rounded-full border border-white bg-rose-100 dark:bg-rose-900 text-rose-500 dark:text-rose-400 shadow shrink-0 z-10">4</div>
                            <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-4 rounded-xl border border-rose-200 dark:border-rose-800 bg-white/50 dark:bg-slate-800/50 shadow-sm ml-4 md:ml-0">
                                <h4 className="font-bold text-slate-900 dark:text-white mb-1">Indemnisation Waterfall</h4>
                                <p className="text-sm text-slate-700 dark:text-slate-300">Les fonds de sauvetage sont libérés. La perte financière absorbe d'abord le capital Assureur (First Loss), préservant ainsi le reste de la "Capital Stack" (Junior et Senior).</p>
                            </div>
                        </div>
                    </div>
                </div>

            ) : activeTheme === 'business' ? (

                <div className="flex flex-col lg:flex-row gap-8 items-center bg-amber-500/5 dark:bg-amber-400/5 p-6 md:p-8 rounded-2xl border border-amber-500/20 dark:border-amber-400/20">
                    {/* SVG Business à Gauche */}
                    <div className="w-full lg:w-1/3 flex justify-center">
                        <BusinessDrawing />
                    </div>
                    {/* Chronologie à Droite */}
                    <div className="w-full lg:w-2/3 space-y-6 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-amber-500/30 before:to-transparent">
                        {/* Étape 1 */}
                        <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                            <div className="flex items-center justify-center w-10 h-10 rounded-full border border-white bg-amber-100 dark:bg-amber-900 text-amber-600 dark:text-amber-400 shadow shrink-0 z-10">1</div>
                            <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-4 rounded-xl border border-amber-200 dark:border-amber-800 bg-white/50 dark:bg-slate-800/50 shadow-sm ml-4 md:ml-0">
                                <h4 className="font-bold text-slate-900 dark:text-white mb-1">Les Paramètres (KPIs)</h4>
                                <p className="text-sm text-slate-700 dark:text-slate-300">Le Vault est lié à des flux de trésorerie tokenisés ou des capteurs de chaîne d'approvisionnement (IoT). Le seuil critique est défini (ex: baisse de volume de 40%).</p>
                            </div>
                        </div>
                        {/* Étape 2 */}
                        <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                            <div className="flex items-center justify-center w-10 h-10 rounded-full border border-white bg-amber-100 dark:bg-amber-900 text-amber-600 dark:text-amber-400 shadow shrink-0 z-10">2</div>
                            <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-4 rounded-xl border border-amber-200 dark:border-amber-800 bg-white/50 dark:bg-slate-800/50 shadow-sm ml-4 md:ml-0">
                                <h4 className="font-bold text-slate-900 dark:text-white mb-1">L'Interruption d'Activité</h4>
                                <p className="text-sm text-slate-700 dark:text-slate-300">Un événement bloque l'activité (rupture fournisseur, grève portuaire). Le flux de revenus on-chain chute brutalement sous le seuil critique défini au départ.</p>
                            </div>
                        </div>
                        {/* Étape 3 */}
                        <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                            <div className="flex items-center justify-center w-10 h-10 rounded-full border border-white bg-amber-100 dark:bg-amber-900 text-amber-600 dark:text-amber-400 shadow shrink-0 z-10">3</div>
                            <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-4 rounded-xl border border-amber-200 dark:border-amber-800 bg-white/50 dark:bg-slate-800/50 shadow-sm ml-4 md:ml-0">
                                <h4 className="font-bold text-slate-900 dark:text-white mb-1">Vérification UMA</h4>
                                <p className="text-sm text-slate-700 dark:text-slate-300">L'Oracle analyse les données des capteurs ou la baisse des revenus. Si la chute est mathématiquement prouvée sur la blockchain, l'interruption est validée sans expert humain.</p>
                            </div>
                        </div>
                        {/* Étape 4 */}
                        <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                            <div className="flex items-center justify-center w-10 h-10 rounded-full border border-white bg-amber-100 dark:bg-amber-900 text-amber-600 dark:text-amber-400 shadow shrink-0 z-10">4</div>
                            <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-4 rounded-xl border border-amber-200 dark:border-amber-800 bg-white/50 dark:bg-slate-800/50 shadow-sm ml-4 md:ml-0">
                                <h4 className="font-bold text-slate-900 dark:text-white mb-1">Injection de Sauvetage</h4>
                                <p className="text-sm text-slate-700 dark:text-slate-300">Le Vault se déclenche (`TRIGGERED`). Le Waterfall s'active : le capital de l'assureur est libéré pour compenser la perte d'exploitation et sauver la trésorerie de l'entreprise.</p>
                            </div>
                        </div>
                    </div>
                </div>
            ) : activeTheme === 'flight' ? (

                <div className="flex flex-col lg:flex-row gap-8 items-center bg-cyan-500/5 dark:bg-cyan-400/5 p-6 md:p-8 rounded-2xl border border-cyan-500/20 dark:border-cyan-400/20">
                    {/* SVG Flight à Gauche */}
                    <div className="w-full lg:w-1/3 flex justify-center">
                        <FlightDrawing />
                    </div>

                    {/* Chronologie à Droite */}
                    <div className="w-full lg:w-2/3 space-y-6 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-cyan-500/30 before:to-transparent">
                        {/* Étape 1 */}
                        <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                            <div className="flex items-center justify-center w-10 h-10 rounded-full border border-white bg-cyan-100 dark:bg-cyan-900 text-cyan-600 dark:text-cyan-400 shadow shrink-0 z-10">1</div>
                            <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-4 rounded-xl border border-cyan-200 dark:border-cyan-800 bg-white/50 dark:bg-slate-800/50 shadow-sm ml-4 md:ml-0">
                                <h4 className="font-bold text-slate-900 dark:text-white mb-1">Ciblage & Liquidité</h4>
                                <p className="text-sm text-slate-700 dark:text-slate-300">L'assureur déploie des liquidités ciblées sur des aéroports ou des numéros de vols spécifiques. Le seuil de déclenchement (annulation ou retard de X heures) est défini.</p>
                            </div>
                        </div>
                        {/* Étape 2 */}
                        <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                            <div className="flex items-center justify-center w-10 h-10 rounded-full border border-white bg-cyan-100 dark:bg-cyan-900 text-cyan-600 dark:text-cyan-400 shadow shrink-0 z-10">2</div>
                            <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-4 rounded-xl border border-cyan-200 dark:border-cyan-800 bg-white/50 dark:bg-slate-800/50 shadow-sm ml-4 md:ml-0">
                                <h4 className="font-bold text-slate-900 dark:text-white mb-1">L'Annulation (L'Événement)</h4>
                                <p className="text-sm text-slate-700 dark:text-slate-300">Le vol est annulé à cause de la météo ou d'un problème technique. Les passagers subissent un préjudice financier et logistique immédiat.</p>
                            </div>
                        </div>
                        {/* Étape 3 */}
                        <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                            <div className="flex items-center justify-center w-10 h-10 rounded-full border border-white bg-cyan-100 dark:bg-cyan-900 text-cyan-600 dark:text-cyan-400 shadow shrink-0 z-10">3</div>
                            <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-4 rounded-xl border border-cyan-200 dark:border-cyan-800 bg-white/50 dark:bg-slate-800/50 shadow-sm ml-4 md:ml-0">
                                <h4 className="font-bold text-slate-900 dark:text-white mb-1">L'Oracle API</h4>
                                <p className="text-sm text-slate-700 dark:text-slate-300">Le Vault interroge instantanément l'API de l'aviation civile internationale (ex: FlightAware, Eurocontrol). L'annulation est confirmée de manière déterministe.</p>
                            </div>
                        </div>
                        {/* Étape 4 */}
                        <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                            <div className="flex items-center justify-center w-10 h-10 rounded-full border border-white bg-cyan-100 dark:bg-cyan-900 text-cyan-600 dark:text-cyan-400 shadow shrink-0 z-10">4</div>
                            <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-4 rounded-xl border border-cyan-200 dark:border-cyan-800 bg-white/50 dark:bg-slate-800/50 shadow-sm ml-4 md:ml-0">
                                <h4 className="font-bold text-slate-900 dark:text-white mb-1">Indemnisation Automatique</h4>
                                <p className="text-sm text-slate-700 dark:text-slate-300">Le Vault se déclenche. Sans aucune paperasse ni intervention humaine, le capital First Loss est liquidé pour indemniser instantanément les assurés.</p>
                            </div>
                        </div>
                    </div>
                </div>

            ) : activeTheme === 'realestate' ? (

                <div className="flex flex-col lg:flex-row gap-8 items-center bg-rose-500/5 dark:bg-rose-400/5 p-6 md:p-8 rounded-2xl border border-rose-500/20 dark:border-rose-400/20">
                    {/* SVG Real Estate à Gauche */}
                    <div className="w-full lg:w-1/3 flex justify-center">
                        <RealEstateDrawing />
                    </div>

                    {/* Chronologie à Droite */}
                    <div className="w-full lg:w-2/3 space-y-6 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-rose-500/30 before:to-transparent">
                        {/* Étape 1 */}
                        <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                            <div className="flex items-center justify-center w-10 h-10 rounded-full border border-white bg-rose-100 dark:bg-rose-900 text-rose-600 dark:text-rose-400 shadow shrink-0 z-10">1</div>
                            <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-4 rounded-xl border border-rose-200 dark:border-rose-800 bg-white/50 dark:bg-slate-800/50 shadow-sm ml-4 md:ml-0">
                                <h4 className="font-bold text-slate-900 dark:text-white mb-1">Capteurs Certifiés (IoT)</h4>
                                <p className="text-sm text-slate-700 dark:text-slate-300">L'immeuble est équipé de capteurs IoT physiques certifiés (feu, inondation, structure) liés au Smart Contract. Les seuils de déclenchement sont gravés on-chain.</p>
                            </div>
                        </div>
                        {/* Étape 2 */}
                        <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                            <div className="flex items-center justify-center w-10 h-10 rounded-full border border-white bg-rose-100 dark:bg-rose-900 text-rose-600 dark:text-rose-400 shadow shrink-0 z-10">2</div>
                            <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-4 rounded-xl border border-rose-200 dark:border-rose-800 bg-white/50 dark:bg-slate-800/50 shadow-sm ml-4 md:ml-0">
                                <h4 className="font-bold text-slate-900 dark:text-white mb-1">Sinistre Physique</h4>
                                <p className="text-sm text-slate-700 dark:text-slate-300">Un incident survient (fuite d'eau massive, départ de feu). Les capteurs enregistrent instantanément le dépassement de seuil (ex: humidité {'>'} 90%).</p>
                            </div>
                        </div>
                        {/* Étape 3 */}
                        <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                            <div className="flex items-center justify-center w-10 h-10 rounded-full border border-white bg-rose-100 dark:bg-rose-900 text-rose-600 dark:text-rose-400 shadow shrink-0 z-10">3</div>
                            <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-4 rounded-xl border border-rose-200 dark:border-rose-800 bg-white/50 dark:bg-slate-800/50 shadow-sm ml-4 md:ml-0">
                                <h4 className="font-bold text-slate-900 dark:text-white mb-1">Validation Optimiste</h4>
                                <p className="text-sm text-slate-700 dark:text-slate-300">Les données sont poussées vers l'Oracle Optimiste UMA. Une fenêtre de litige s'ouvre. Si aucune triche n'est prouvée (ex: faux positif du capteur), le sinistre est validé mathématiquement.</p>
                            </div>
                        </div>
                        {/* Étape 4 */}
                        <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                            <div className="flex items-center justify-center w-10 h-10 rounded-full border border-white bg-rose-100 dark:bg-rose-900 text-rose-600 dark:text-rose-400 shadow shrink-0 z-10">4</div>
                            <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-4 rounded-xl border border-rose-200 dark:border-rose-800 bg-white/50 dark:bg-slate-800/50 shadow-sm ml-4 md:ml-0">
                                <h4 className="font-bold text-slate-900 dark:text-white mb-1">Liquidation Immédiate</h4>
                                <p className="text-sm text-slate-700 dark:text-slate-300">Le Vault se déclenche (`TRIGGERED`). Le capital First Loss indemnise instantanément le propriétaire pour lancer les réparations urgentes sans attendre l'expert d'assurance.</p>
                            </div>
                        </div>
                    </div>
                </div>

            ) : activeTheme === 'maritime' ? (

                <div className="flex flex-col lg:flex-row gap-8 items-center bg-blue-500/5 dark:bg-blue-400/5 p-6 md:p-8 rounded-2xl border border-blue-500/20 dark:border-blue-400/20">
                    {/* SVG Maritime à Gauche */}
                    <div className="w-full lg:w-1/3 flex justify-center">
                        <MaritimeDrawing />
                    </div>

                    {/* Chronologie à Droite */}
                    <div className="w-full lg:w-2/3 space-y-6 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-blue-500/30 before:to-transparent">
                        {/* Étape 1 */}
                        <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                            <div className="flex items-center justify-center w-10 h-10 rounded-full border border-white bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400 shadow shrink-0 z-10">1</div>
                            <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-4 rounded-xl border border-blue-200 dark:border-blue-800 bg-white/50 dark:bg-slate-800/50 shadow-sm ml-4 md:ml-0">
                                <h4 className="font-bold text-slate-900 dark:text-white mb-1">Paramètres de Cargaison</h4>
                                <p className="text-sm text-slate-700 dark:text-slate-300">Le contrat est lié à un porte-conteneurs. Il définit précisément le prix d'indemnisation indexé au poids exact ou au nombre d'EVP (Équivalent Vingt Pieds) perdus en mer.</p>
                            </div>
                        </div>
                        {/* Étape 2 */}
                        <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                            <div className="flex items-center justify-center w-10 h-10 rounded-full border border-white bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400 shadow shrink-0 z-10">2</div>
                            <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-4 rounded-xl border border-blue-200 dark:border-blue-800 bg-white/50 dark:bg-slate-800/50 shadow-sm ml-4 md:ml-0">
                                <h4 className="font-bold text-slate-900 dark:text-white mb-1">L'Avarie (Perte en mer)</h4>
                                <p className="text-sm text-slate-700 dark:text-slate-300">Le navire affronte une violente tempête ou un fort roulis. Plusieurs conteneurs se détachent de leurs ancrages et tombent par-dessus bord.</p>
                            </div>
                        </div>
                        {/* Étape 3 */}
                        <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                            <div className="flex items-center justify-center w-10 h-10 rounded-full border border-white bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400 shadow shrink-0 z-10">3</div>
                            <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-4 rounded-xl border border-blue-200 dark:border-blue-800 bg-white/50 dark:bg-slate-800/50 shadow-sm ml-4 md:ml-0">
                                <h4 className="font-bold text-slate-900 dark:text-white mb-1">Computer Vision & Twistlocks</h4>
                                <p className="text-sm text-slate-700 dark:text-slate-300">Les capteurs de verrouillage (Smart Twistlocks) et les caméras détectent la rupture. L'Oracle UMA valide la quantité exacte et le poids des boîtes manquantes à l'appel.</p>
                            </div>
                        </div>
                        {/* Étape 4 */}
                        <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                            <div className="flex items-center justify-center w-10 h-10 rounded-full border border-white bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400 shadow shrink-0 z-10">4</div>
                            <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-4 rounded-xl border border-blue-200 dark:border-blue-800 bg-white/50 dark:bg-slate-800/50 shadow-sm ml-4 md:ml-0">
                                <h4 className="font-bold text-slate-900 dark:text-white mb-1">Indemnisation au Prorata</h4>
                                <p className="text-sm text-slate-700 dark:text-slate-300">Le Vault libère les fonds. Le capital First Loss indemnise le propriétaire au centime près, proportionnellement à la perte vérifiée (poids/unités), évitant les longs litiges d'assurance traditionnels.</p>
                            </div>
                        </div>
                    </div>
                </div>

            ) : (
                <div className="bg-slate-500/10 p-6 rounded-2xl border border-slate-500/20">
                    <p className="text-slate-700 dark:text-slate-300 leading-relaxed font-medium">
                        {getThemeSpecificContent()}
                    </p>
                </div>
            )}
        </section>
    );
};

export default AcademyCompanySpec;
