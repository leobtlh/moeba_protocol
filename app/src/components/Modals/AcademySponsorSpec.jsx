import React from 'react';
import {
    RadarDrawing,
    CyberDrawing,
    BusinessDrawing,
    FlightDrawing,
    RealEstateDrawing,
    MaritimeDrawing
} from './AcademyCategoryIllustration';

const AcademySponsorSpec = ({ activeTheme }) => {

    // Fallback pour les thèmes non développés
    const getThemeSpecificContent = () => {
        switch(activeTheme) {
            case 'cyber': return "Cybersecurity: The oracle relies on a post-mortem forensic audit. The insurer must link the Vault to a security certificate or on-chain proof of network interruption.";
            case 'business': return "Business Interruption: The trigger is linked to tokenized cash flows or supply chain data verifiable by IoT oracles.";
            case 'flight': return "Flight Cancellation: The Vault queries the international civil aviation API. The insurer deploys targeted liquidity to specific airports.";
            case 'realestate': return "Real Estate Sensors: Use of Optimistic Oracles coupled with physical IoT sensors (fire, flood, structure) in certified buildings.";
            case 'maritime': return "Maritime Logistics: We use 'Smart Twistlocks' or Computer Vision to detect cargo loss. If stability sensors confirm a sinking event (Hull Loss), the Vault triggers an instant payout.";
            default: return "Select a theme to see the specific insurance details.";
        }
    };

    return (
        <section>
            <h3 className="text-xl font-bold mb-4 text-slate-800 dark:text-slate-100 font-sans">
                3. Sponsor Specifics ({activeTheme})
            </h3>

            {activeTheme === 'climate' ? (
                <div className="flex flex-col lg:flex-row gap-8 items-center bg-indigo-500/10 dark:bg-indigo-400/10 p-6 md:p-8 rounded-2xl border border-indigo-500/20 dark:border-indigo-400/20">
                    {/* SVG Radar à Gauche */}
                    <div className="w-full lg:w-1/4 flex justify-center">
                        <RadarDrawing />
                    </div>

                    {/* Chronologie à Droite */}
                    <div className="w-full lg:w-3/4 space-y-6 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-indigo-500/30 before:to-transparent">
                        {/* Étape 1 */}
                        <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                            <div className="flex items-center justify-center w-10 h-10 rounded-full border border-white bg-indigo-100 dark:bg-indigo-900 text-indigo-500 dark:text-indigo-400 shadow shrink-0 z-10">1</div>
                            <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-4 rounded-xl border border-indigo-200 dark:border-indigo-800 bg-white/50 dark:bg-slate-800/50 shadow-sm ml-4 md:ml-0">
                                <h4 className="font-bold text-slate-900 dark:text-white mb-1">Parameters (GPS)</h4>
                                <p className="text-sm text-slate-700 dark:text-slate-300">The insurer defines parameters based on indisputable public data (e.g., wind {'>'} 250km/h according to NOAA). Geographical coordinates are engraved in the Smart Contract.</p>
                            </div>
                        </div>
                        {/* Étape 2 */}
                        <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                            <div className="flex items-center justify-center w-10 h-10 rounded-full border border-white bg-indigo-100 dark:bg-indigo-900 text-indigo-500 dark:text-indigo-400 shadow shrink-0 z-10">2</div>
                            <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-4 rounded-xl border border-indigo-200 dark:border-indigo-800 bg-white/50 dark:bg-slate-800/50 shadow-sm ml-4 md:ml-0">
                                <h4 className="font-bold text-slate-900 dark:text-white mb-1">The UMA Oracle</h4>
                                <p className="text-sm text-slate-700 dark:text-slate-300">We use the UMA Optimistic Oracle. If a storm hits, an assertion is submitted. A dispute period opens to verify the authenticity of the public data.</p>
                            </div>
                        </div>
                        {/* Étape 3 */}
                        <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                            <div className="flex items-center justify-center w-10 h-10 rounded-full border border-white bg-indigo-100 dark:bg-indigo-900 text-indigo-500 dark:text-indigo-400 shadow shrink-0 z-10">3</div>
                            <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-4 rounded-xl border border-indigo-200 dark:border-indigo-800 bg-white/50 dark:bg-slate-800/50 shadow-sm ml-4 md:ml-0">
                                <h4 className="font-bold text-slate-900 dark:text-white mb-1">Trigger & Lockdown</h4>
                                <p className="text-sm text-slate-700 dark:text-slate-300">Upon Oracle validation, the state changes to `TRIGGERED`. The Vault locks down completely, preventing any withdrawals by investors.</p>
                            </div>
                        </div>
                        {/* Étape 4 */}
                        <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                            <div className="flex items-center justify-center w-10 h-10 rounded-full border border-white bg-indigo-100 dark:bg-indigo-900 text-indigo-500 dark:text-indigo-400 shadow shrink-0 z-10">4</div>
                            <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-4 rounded-xl border border-indigo-200 dark:border-indigo-800 bg-white/50 dark:bg-slate-800/50 shadow-sm ml-4 md:ml-0">
                                <h4 className="font-bold text-slate-900 dark:text-white mb-1">Resolution (Soft Default)</h4>
                                <p className="text-sm text-slate-700 dark:text-slate-300">Waterfall Execution: The insurer's capital is destroyed first, followed by premiums, then the Junior tranche, protecting the Senior.</p>
                            </div>
                        </div>
                    </div>
                </div>

            ) : activeTheme === 'cyber' ? (

                <div className="flex flex-col lg:flex-row gap-8 items-center bg-rose-500/5 dark:bg-rose-400/5 p-6 md:p-8 rounded-2xl border border-rose-500/20 dark:border-rose-400/20">


                    {/* Chronologie à Droite */}
                    <div className="w-full lg:w-4/5 space-y-6 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-rose-500/30 before:to-transparent">
                        {/* Étape 1 */}
                        <div className="relative flex items-center justify-between md:justify-normal md:even:flex-row-reverse group is-active">
                            <div className="flex items-center justify-center w-10 h-10 rounded-full border border-white bg-rose-100 dark:bg-rose-900 text-rose-500 dark:text-rose-400 shadow shrink-0 z-10">1</div>
                            <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-4 rounded-xl border border-rose-200 dark:border-rose-800 bg-white/50 dark:bg-slate-800/50 shadow-sm ml-4 md:ml-0">
                                <h4 className="font-bold text-slate-900 dark:text-white mb-1">Audit Parameters</h4>
                                <p className="text-sm text-slate-700 dark:text-slate-300">The Vault defines what constitutes a hack (e.g., ransomware, smart contract exploit) and requires specific proof, such as a post-mortem forensic audit by a recognized firm (e.g., CrowdStrike).</p>
                            </div>
                        </div>
                        {/* Étape 2 */}
                        <div className="relative flex items-center justify-between md:justify-normal md:even:flex-row-reverse group is-active">
                            <div className="flex items-center justify-center w-10 h-10 rounded-full border border-white bg-rose-100 dark:bg-rose-900 text-rose-500 dark:text-rose-400 shadow shrink-0 z-10">2</div>
                            <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-4 rounded-xl border border-rose-200 dark:border-rose-800 bg-white/50 dark:bg-slate-800/50 shadow-sm ml-4 md:ml-0">
                                <h4 className="font-bold text-slate-900 dark:text-white mb-1">The Incident & The Proof</h4>
                                <p className="text-sm text-slate-700 dark:text-slate-300">The company suffers an attack and mandates an audit. Once the report is published (or the On-Chain proof of theft validated), an actor submits this document to the UMA network as a legitimate claim.</p>
                            </div>
                        </div>
                        {/* Étape 3 */}
                        <div className="relative flex items-center justify-between md:justify-normal md:even:flex-row-reverse group is-active">
                            <div className="flex items-center justify-center w-10 h-10 rounded-full border border-white bg-rose-100 dark:bg-rose-900 text-rose-500 dark:text-rose-400 shadow shrink-0 z-10">3</div>
                            <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-4 rounded-xl border border-rose-200 dark:border-rose-800 bg-white/50 dark:bg-slate-800/50 shadow-sm ml-4 md:ml-0">
                                <h4 className="font-bold text-slate-900 dark:text-white mb-1">Decentralized Tribunal</h4>
                                <p className="text-sm text-slate-700 dark:text-slate-300">Unlike a binary API, the UMA Optimistic Oracle reads the report. If the report is authentic and undisputed during the dispute window, the hack is formally validated and the Vault locks down (`TRIGGERED`).</p>
                            </div>
                        </div>
                        {/* Étape 4 */}
                        <div className="relative flex items-center justify-between md:justify-normal md:even:flex-row-reverse group is-active">
                            <div className="flex items-center justify-center w-10 h-10 rounded-full border border-white bg-rose-100 dark:bg-rose-900 text-rose-500 dark:text-rose-400 shadow shrink-0 z-10">4</div>
                            <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-4 rounded-xl border border-rose-200 dark:border-rose-800 bg-white/50 dark:bg-slate-800/50 shadow-sm ml-4 md:ml-0">
                                <h4 className="font-bold text-slate-900 dark:text-white mb-1">Waterfall Compensation</h4>
                                <p className="text-sm text-slate-700 dark:text-slate-300">Rescue funds are released. The financial loss first absorbs the Insurer's capital (First Loss), thereby preserving the rest of the "Capital Stack" (Junior and Senior).</p>
                            </div>
                        </div>
                    </div>
                    {/* SVG Cyber à Gauche */}
                    <div className="w-full lg:w-1/5 flex justify-center">
                        <CyberDrawing />
                    </div>
                </div>

            ) : activeTheme === 'business' ? (

                <div className="flex flex-col lg:flex-row gap-8 items-center bg-amber-500/5 dark:bg-amber-400/5 p-6 md:p-8 rounded-2xl border border-amber-500/20 dark:border-amber-400/20">
                    {/* SVG Business à Gauche */}
                    <div className="w-full lg:w-1/4 flex justify-center">
                        <BusinessDrawing />
                    </div>
                    {/* Chronologie à Droite */}
                    <div className="w-full lg:w-3/4 space-y-6 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-amber-500/30 before:to-transparent">
                        {/* Étape 1 */}
                        <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                            <div className="flex items-center justify-center w-10 h-10 rounded-full border border-white bg-amber-100 dark:bg-amber-900 text-amber-600 dark:text-amber-400 shadow shrink-0 z-10">1</div>
                            <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-4 rounded-xl border border-amber-200 dark:border-amber-800 bg-white/50 dark:bg-slate-800/50 shadow-sm ml-4 md:ml-0">
                                <h4 className="font-bold text-slate-900 dark:text-white mb-1">The Parameters (KPIs)</h4>
                                <p className="text-sm text-slate-700 dark:text-slate-300">The Vault is linked to tokenized cash flows or supply chain sensors (IoT). The critical threshold is defined (e.g., 40% volume drop).</p>
                            </div>
                        </div>
                        {/* Étape 2 */}
                        <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                            <div className="flex items-center justify-center w-10 h-10 rounded-full border border-white bg-amber-100 dark:bg-amber-900 text-amber-600 dark:text-amber-400 shadow shrink-0 z-10">2</div>
                            <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-4 rounded-xl border border-amber-200 dark:border-amber-800 bg-white/50 dark:bg-slate-800/50 shadow-sm ml-4 md:ml-0">
                                <h4 className="font-bold text-slate-900 dark:text-white mb-1">Business Interruption</h4>
                                <p className="text-sm text-slate-700 dark:text-slate-300">An event blocks operations (supplier rupture, port strike). The on-chain revenue stream drops sharply below the initially defined critical threshold.</p>
                            </div>
                        </div>
                        {/* Étape 3 */}
                        <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                            <div className="flex items-center justify-center w-10 h-10 rounded-full border border-white bg-amber-100 dark:bg-amber-900 text-amber-600 dark:text-amber-400 shadow shrink-0 z-10">3</div>
                            <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-4 rounded-xl border border-amber-200 dark:border-amber-800 bg-white/50 dark:bg-slate-800/50 shadow-sm ml-4 md:ml-0">
                                <h4 className="font-bold text-slate-900 dark:text-white mb-1">UMA Verification</h4>
                                <p className="text-sm text-slate-700 dark:text-slate-300">The Oracle analyzes sensor data or the revenue drop. If the fall is mathematically proven on the blockchain, the interruption is validated without a human expert.</p>
                            </div>
                        </div>
                        {/* Étape 4 */}
                        <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                            <div className="flex items-center justify-center w-10 h-10 rounded-full border border-white bg-amber-100 dark:bg-amber-900 text-amber-600 dark:text-amber-400 shadow shrink-0 z-10">4</div>
                            <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-4 rounded-xl border border-amber-200 dark:border-amber-800 bg-white/50 dark:bg-slate-800/50 shadow-sm ml-4 md:ml-0">
                                <h4 className="font-bold text-slate-900 dark:text-white mb-1">Rescue Injection</h4>
                                <p className="text-sm text-slate-700 dark:text-slate-300">The Vault triggers (`TRIGGERED`). The Waterfall activates: the insurer's capital is released to compensate for the operating loss and save the company's cash flow.</p>
                            </div>
                        </div>
                    </div>
                </div>
            ) : activeTheme === 'flight' ? (

                <div className="flex flex-col lg:flex-row gap-8 items-center bg-cyan-500/5 dark:bg-cyan-400/5 p-6 md:p-8 rounded-2xl border border-cyan-500/20 dark:border-cyan-400/20">

                    {/* Chronologie à Droite */}
                    <div className="w-full lg:w-4/5 space-y-6 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-cyan-500/30 before:to-transparent">
                        {/* Étape 1 */}
                        <div className="relative flex items-center justify-between md:justify-normal md:even:flex-row-reverse group is-active">
                            <div className="flex items-center justify-center w-10 h-10 rounded-full border border-white bg-cyan-100 dark:bg-cyan-900 text-cyan-600 dark:text-cyan-400 shadow shrink-0 z-10">1</div>
                            <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-4 rounded-xl border border-cyan-200 dark:border-cyan-800 bg-white/50 dark:bg-slate-800/50 shadow-sm ml-4 md:ml-0">
                                <h4 className="font-bold text-slate-900 dark:text-white mb-1">Targeting & Liquidity</h4>
                                <p className="text-sm text-slate-700 dark:text-slate-300">The insurer deploys targeted liquidity to specific airports or flight numbers. The trigger threshold (cancellation or delay of X hours) is defined.</p>
                            </div>
                        </div>
                        {/* Étape 2 */}
                        <div className="relative flex items-center justify-between md:justify-normal md:even:flex-row-reverse group is-active">
                            <div className="flex items-center justify-center w-10 h-10 rounded-full border border-white bg-cyan-100 dark:bg-cyan-900 text-cyan-600 dark:text-cyan-400 shadow shrink-0 z-10">2</div>
                            <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-4 rounded-xl border border-cyan-200 dark:border-cyan-800 bg-white/50 dark:bg-slate-800/50 shadow-sm ml-4 md:ml-0">
                                <h4 className="font-bold text-slate-900 dark:text-white mb-1">The Cancellation (The Event)</h4>
                                <p className="text-sm text-slate-700 dark:text-slate-300">The flight is canceled due to weather or a technical issue. Passengers suffer immediate financial and logistical harm.</p>
                            </div>
                        </div>
                        {/* Étape 3 */}
                        <div className="relative flex items-center justify-between md:justify-normal md:even:flex-row-reverse group is-active">
                            <div className="flex items-center justify-center w-10 h-10 rounded-full border border-white bg-cyan-100 dark:bg-cyan-900 text-cyan-600 dark:text-cyan-400 shadow shrink-0 z-10">3</div>
                            <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-4 rounded-xl border border-cyan-200 dark:border-cyan-800 bg-white/50 dark:bg-slate-800/50 shadow-sm ml-4 md:ml-0">
                                <h4 className="font-bold text-slate-900 dark:text-white mb-1">The API Oracle</h4>
                                <p className="text-sm text-slate-700 dark:text-slate-300">The Vault instantly queries the international civil aviation API (e.g., FlightAware, Eurocontrol). The cancellation is confirmed deterministically.</p>
                            </div>
                        </div>
                        {/* Étape 4 */}
                        <div className="relative flex items-center justify-between md:justify-normal md:even:flex-row-reverse group is-active">
                            <div className="flex items-center justify-center w-10 h-10 rounded-full border border-white bg-cyan-100 dark:bg-cyan-900 text-cyan-600 dark:text-cyan-400 shadow shrink-0 z-10">4</div>
                            <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-4 rounded-xl border border-cyan-200 dark:border-cyan-800 bg-white/50 dark:bg-slate-800/50 shadow-sm ml-4 md:ml-0">
                                <h4 className="font-bold text-slate-900 dark:text-white mb-1">Automatic Compensation</h4>
                                <p className="text-sm text-slate-700 dark:text-slate-300">The Vault triggers. Without any paperwork or human intervention, the First Loss capital is liquidated to instantly compensate the insured.</p>
                            </div>
                        </div>
                    </div>
                    {/* SVG Flight à Gauche */}
                    <div className="w-full lg:w-1/5 flex justify-center">
                        <FlightDrawing />
                    </div>
                </div>

            ) : activeTheme === 'realestate' ? (

                <div className="flex flex-col lg:flex-row gap-8 items-center bg-rose-500/5 dark:bg-rose-400/5 p-6 md:p-8 rounded-2xl border border-rose-500/20 dark:border-rose-400/20">
                    {/* SVG Real Estate à Gauche */}
                    <div className="w-full lg:w-1/4 flex justify-center">
                        <RealEstateDrawing />
                    </div>

                    {/* Chronologie à Droite */}
                    <div className="w-full lg:w-3/4 space-y-6 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-rose-500/30 before:to-transparent">
                        {/* Étape 1 */}
                        <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                            <div className="flex items-center justify-center w-10 h-10 rounded-full border border-white bg-rose-100 dark:bg-rose-900 text-rose-600 dark:text-rose-400 shadow shrink-0 z-10">1</div>
                            <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-4 rounded-xl border border-rose-200 dark:border-rose-800 bg-white/50 dark:bg-slate-800/50 shadow-sm ml-4 md:ml-0">
                                <h4 className="font-bold text-slate-900 dark:text-white mb-1">Certified Sensors (IoT)</h4>
                                <p className="text-sm text-slate-700 dark:text-slate-300">The building is equipped with certified physical IoT sensors (fire, flood, structure) linked to the Smart Contract. Trigger thresholds are engraved on-chain.</p>
                            </div>
                        </div>
                        {/* Étape 2 */}
                        <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                            <div className="flex items-center justify-center w-10 h-10 rounded-full border border-white bg-rose-100 dark:bg-rose-900 text-rose-600 dark:text-rose-400 shadow shrink-0 z-10">2</div>
                            <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-4 rounded-xl border border-rose-200 dark:border-rose-800 bg-white/50 dark:bg-slate-800/50 shadow-sm ml-4 md:ml-0">
                                <h4 className="font-bold text-slate-900 dark:text-white mb-1">Physical Claim</h4>
                                <p className="text-sm text-slate-700 dark:text-slate-300">An incident occurs (massive water leak, fire outbreak). The sensors instantly record the threshold being exceeded (e.g., humidity {'>'} 90%).</p>
                            </div>
                        </div>
                        {/* Étape 3 */}
                        <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                            <div className="flex items-center justify-center w-10 h-10 rounded-full border border-white bg-rose-100 dark:bg-rose-900 text-rose-600 dark:text-rose-400 shadow shrink-0 z-10">3</div>
                            <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-4 rounded-xl border border-rose-200 dark:border-rose-800 bg-white/50 dark:bg-slate-800/50 shadow-sm ml-4 md:ml-0">
                                <h4 className="font-bold text-slate-900 dark:text-white mb-1">Optimistic Validation</h4>
                                <p className="text-sm text-slate-700 dark:text-slate-300">Data is pushed to the UMA Optimistic Oracle. A dispute window opens. If no cheating is proven (e.g., sensor false positive), the claim is validated mathematically.</p>
                            </div>
                        </div>
                        {/* Étape 4 */}
                        <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                            <div className="flex items-center justify-center w-10 h-10 rounded-full border border-white bg-rose-100 dark:bg-rose-900 text-rose-600 dark:text-rose-400 shadow shrink-0 z-10">4</div>
                            <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-4 rounded-xl border border-rose-200 dark:border-rose-800 bg-white/50 dark:bg-slate-800/50 shadow-sm ml-4 md:ml-0">
                                <h4 className="font-bold text-slate-900 dark:text-white mb-1">Immediate Liquidation</h4>
                                <p className="text-sm text-slate-700 dark:text-slate-300">The Vault triggers (`TRIGGERED`). The First Loss capital instantly compensates the owner to launch urgent repairs without waiting for the insurance expert.</p>
                            </div>
                        </div>
                    </div>
                </div>

            ) : activeTheme === 'maritime' ? (

                <div className="flex flex-col lg:flex-row gap-8 items-center bg-blue-500/5 dark:bg-blue-400/5 p-6 md:p-8 rounded-2xl border border-blue-500/20 dark:border-blue-400/20">
                    {/* SVG Maritime à Gauche */}
                    <div className="w-full lg:w-1/4 flex justify-center">
                        <MaritimeDrawing />
                    </div>

                    {/* Chronologie à Droite */}
                    <div className="w-full lg:w-3/4 space-y-6 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-blue-500/30 before:to-transparent">
                        {/* Étape 1 */}
                        <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                            <div className="flex items-center justify-center w-10 h-10 rounded-full border border-white bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400 shadow shrink-0 z-10">1</div>
                            <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-4 rounded-xl border border-blue-200 dark:border-blue-800 bg-white/50 dark:bg-slate-800/50 shadow-sm ml-4 md:ml-0">
                                <h4 className="font-bold text-slate-900 dark:text-white mb-1">Cargo Parameters</h4>
                                <p className="text-sm text-slate-700 dark:text-slate-300">The contract is linked to a container ship. It precisely defines the compensation price indexed to the exact weight or the number of TEUs (Twenty-foot Equivalent Units) lost at sea.</p>
                            </div>
                        </div>
                        {/* Étape 2 */}
                        <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                            <div className="flex items-center justify-center w-10 h-10 rounded-full border border-white bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400 shadow shrink-0 z-10">2</div>
                            <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-4 rounded-xl border border-blue-200 dark:border-blue-800 bg-white/50 dark:bg-slate-800/50 shadow-sm ml-4 md:ml-0">
                                <h4 className="font-bold text-slate-900 dark:text-white mb-1">The Damage (Loss at Sea)</h4>
                                <p className="text-sm text-slate-700 dark:text-slate-300">The ship faces a violent storm or heavy rolling. Several containers detach from their moorings and fall overboard.</p>
                            </div>
                        </div>
                        {/* Étape 3 */}
                        <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                            <div className="flex items-center justify-center w-10 h-10 rounded-full border border-white bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400 shadow shrink-0 z-10">3</div>
                            <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-4 rounded-xl border border-blue-200 dark:border-blue-800 bg-white/50 dark:bg-slate-800/50 shadow-sm ml-4 md:ml-0">
                                <h4 className="font-bold text-slate-900 dark:text-white mb-1">Computer Vision & Twistlocks</h4>
                                <p className="text-sm text-slate-700 dark:text-slate-300">Locking sensors (Smart Twistlocks) and cameras detect the rupture. The UMA Oracle validates the exact quantity and weight of the missing boxes.</p>
                            </div>
                        </div>
                        {/* Étape 4 */}
                        <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                            <div className="flex items-center justify-center w-10 h-10 rounded-full border border-white bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400 shadow shrink-0 z-10">4</div>
                            <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-4 rounded-xl border border-blue-200 dark:border-blue-800 bg-white/50 dark:bg-slate-800/50 shadow-sm ml-4 md:ml-0">
                                <h4 className="font-bold text-slate-900 dark:text-white mb-1">Pro Rata Compensation</h4>
                                <p className="text-sm text-slate-700 dark:text-slate-300">The Vault releases the funds. The First Loss capital compensates the owner to the cent, proportional to the verified loss (weight/units), avoiding long traditional insurance disputes.</p>
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

export default AcademySponsorSpec;
