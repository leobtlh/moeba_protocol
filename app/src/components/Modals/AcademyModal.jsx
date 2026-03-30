import React, { useEffect, useState } from 'react';
import { X, BookOpen, Sun, Zap } from '../ui/Icons';
import AcademySponsorSpec from './AcademySponsorSpec';
import {
    PendingCylinderDrawing,
    ActiveCylinderDrawing,
    SuccessCylinderDrawing,
    CatastropheCylinderDrawing,
    LeverageDrawing
} from './AcademyDrawings';


const AcademyModal = ({ isOpen, onClose, activeTheme }) => {
    const [shouldRender, setShouldRender] = useState(isOpen);
    const [scenario, setScenario] = useState('success');
    const [vaultState, setVaultState] = useState('pending');

    useEffect(() => {
        let timeoutId;
        if (isOpen) {
            setShouldRender(true);
            document.body.style.overflow = 'hidden';
            setScenario('success');
            setVaultState('pending');
        } else {
            document.body.style.overflow = 'unset';
            timeoutId = setTimeout(() => {
                setShouldRender(false);
            }, 300);
        }

        return () => {
            document.body.style.overflow = 'unset';
            if (timeoutId) clearTimeout(timeoutId);
        };
    }, [isOpen]);

    if (!shouldRender) return null;

    return (
        <div
            className={`fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-8 bg-black/40 backdrop-blur-md transition-all duration-300 ${isOpen ? 'animate-fade-in opacity-100' : 'animate-fade-out opacity-0'}`}
            onClick={onClose}
        >
            <div
                className={`w-[95%] md:w-[85%] lg:w-[75%] max-h-[95vh] bg-white/40 dark:bg-white/5 border border-white/30 dark:border-white/10 rounded-3xl shadow-2xl flex flex-col overflow-hidden relative backdrop-blur-2xl transition-all duration-300 ${isOpen ? 'animate-zoom-in scale-100' : 'animate-zoom-out scale-95'}`}
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header */}
                <div className="flex justify-between items-center p-6 border-b border-white/30 dark:border-white/10 bg-white/20 dark:bg-white/5 shrink-0">
                    <h2 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-3">
                        <BookOpen className="h-6 w-6 text-indigo-500" />
                        Mœba Academy: <span className="text-indigo-600 dark:text-indigo-400 capitalize">{activeTheme}</span>
                    </h2>
                    <button onClick={onClose} className="p-2 bg-black/5 dark:bg-white/10 rounded-full hover:bg-black/10 dark:hover:bg-white/20 transition">
                        <X className="h-5 w-5 text-slate-600 dark:text-slate-300" />
                    </button>
                </div>

                {/* Corps de la page */}
                <div className="flex-1 overflow-y-auto p-6 md:p-10 space-y-10 bg-transparent">

                    {/* SECTION 0 : PRE-LAUNCH VS ACTIVE */}
                    <section>
                        <div className="flex justify-between items-end mb-6">
                            <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100 font-sans">
                                0. Vault Lifecycle
                            </h3>

                            <div className="flex items-center gap-1 bg-white/50 dark:bg-black/30 p-1 rounded-xl border border-white/40 dark:border-white/10 shadow-inner">
                                <button
                                    onClick={() => setVaultState('pending')}
                                    className={`px-4 py-2 text-sm font-bold rounded-lg transition-all flex items-center gap-2 ${vaultState === 'pending' ? 'bg-white dark:bg-slate-700 shadow-md text-blue-600 dark:text-blue-400' : 'text-slate-500 hover:text-slate-700 dark:text-slate-400'}`}
                                >
                                    Funding Phase
                                </button>
                                <button
                                    onClick={() => setVaultState('active')}
                                    className={`px-4 py-2 text-sm font-bold rounded-lg transition-all flex items-center gap-2 ${vaultState === 'active' ? 'bg-slate-800 shadow-md text-white' : 'text-slate-500 hover:text-slate-700 dark:text-slate-400'}`}
                                >
                                    Active Vault (Locked)
                                </button>
                            </div>
                        </div>

                        <div className="flex flex-col xl:flex-row gap-8 items-center bg-white/30 dark:bg-white/5 p-6 md:p-8 rounded-2xl border border-white/40 dark:border-white/10">
                            {/* Dessin SVG Dynamique */}
                            <div className="w-full xl:w-1/2 flex justify-center items-center bg-white/40 dark:bg-black/20 rounded-xl p-4 border border-white/50 dark:border-white/5">
                                {vaultState === 'pending' ? <PendingCylinderDrawing /> : <ActiveCylinderDrawing />}
                            </div>

                            <div className="w-full xl:w-1/2">
                                {vaultState === 'pending' ? (
                                    <>
                                        <h4 className="text-lg font-bold text-blue-600 dark:text-blue-400 mb-4 flex items-center gap-2">
                                            Open Deposits (Before start date)
                                        </h4>
                                        <p className="mb-6 text-slate-700 dark:text-slate-200">
                                            As long as the start date has not been reached, the Vault is open. Security is already guaranteed because:
                                        </p>
                                        <ul className="space-y-4">
                                            <li className="flex gap-3">
                                                <span className="text-blue-500">✓</span>
                                                <p className="text-sm text-slate-800 dark:text-slate-300"><strong>Pre-committed Insurer:</strong> The First Loss and Premium capital are already deposited at the bottom of the cylinder.</p>
                                            </li>
                                            <li className="flex gap-3">
                                                <span className="text-blue-500">✓</span>
                                                <p className="text-sm text-slate-800 dark:text-slate-300"><strong>Investor Deposits:</strong> You can freely add capital to the Senior or Junior tranche.</p>
                                            </li>
                                        </ul>
                                    </>
                                ) : (
                                    <>
                                        <h4 className="text-lg font-bold text-slate-800 dark:text-slate-200 mb-4 flex items-center gap-2">
                                            Active Risk (Locked Cylinder)
                                        </h4>
                                        <p className="mb-6 text-slate-700 dark:text-slate-200">
                                            Once the start date is reached, the rules change to protect everyone:
                                        </p>
                                        <ul className="space-y-4">
                                            <li className="flex gap-3">
                                                <span className="text-slate-500">🔒</span>
                                                <p className="text-sm text-slate-800 dark:text-slate-300"><strong>Hermetic Seal:</strong> The cylinder is closed with a lid. It is now impossible to add or withdraw capital (neither Senior, Junior, nor Sponsor).</p>
                                            </li>
                                            <li className="flex gap-3 items-center">
                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-violet-500 flex-shrink-0">
                                                    <path fillRule="evenodd" d="M14.615 1.595a.75.75 0 0 1 .359.852L12.982 9.75h7.268a.75.75 0 0 1 .548 1.262l-10.5 11.25a.75.75 0 0 1-1.272-.71l1.992-7.302H3.75a.75.75 0 0 1-.548-1.262l10.5-11.25a.75.75 0 0 1 .913-.143Z" clipRule="evenodd" />
                                                </svg>
                                                <p className="text-sm text-slate-800 dark:text-slate-300">
                                                    <strong>The Oracle is watching:</strong> The risk is officially transferred. Everyone waits for the end of the coverage period.
                                                </p>
                                            </li>
                                        </ul>
                                    </>
                                )}
                            </div>
                        </div>
                    </section>

                    {/* SECTION 1 : WATERFALL (Métaphore du Cylindre de Densité) */}
                    <section>
                        <div className="flex justify-between items-end mb-6">
                            <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100 font-sans">
                                1. The Mœba Capital Stack (Density Cylinder)
                            </h3>

                            <div className="flex items-center gap-1 bg-white/50 dark:bg-black/30 p-1 rounded-xl border border-white/40 dark:border-white/10 shadow-inner">
                                <button
                                    onClick={() => setScenario('success')}
                                    className={`px-4 py-2 text-sm font-bold rounded-lg transition-all flex items-center gap-2 ${scenario === 'success' ? 'bg-white dark:bg-slate-700 shadow-md text-emerald-600 dark:text-emerald-400' : 'text-slate-500 hover:text-slate-700 dark:text-slate-400'}`}
                                >
                                    <Sun className="h-4 w-4" /> No Claim
                                </button>
                                <button
                                    onClick={() => setScenario('catastrophe')}
                                    className={`px-4 py-2 text-sm font-bold rounded-lg transition-all flex items-center gap-2 ${scenario === 'catastrophe' ? 'bg-red-500 shadow-md text-white' : 'text-slate-500 hover:text-slate-700 dark:text-slate-400'}`}
                                >
                                    <Zap className="h-4 w-4" /> Catastrophe
                                </button>
                            </div>
                        </div>

                        <div className="flex flex-col xl:flex-row gap-8 items-center bg-white/30 dark:bg-white/5 p-6 md:p-8 rounded-2xl border border-white/40 dark:border-white/10">
                            {/* Cylindre SVG Dynamique */}
                            <div className="w-full xl:w-1/2 flex justify-center items-center bg-white/40 dark:bg-black/20 rounded-xl p-4 border border-white/50 dark:border-white/5">
                                {scenario === 'success' ? <SuccessCylinderDrawing /> : <CatastropheCylinderDrawing />}
                            </div>

                            <div className="w-full xl:w-1/2">
                                {scenario === 'success' ? (
                                    <>
                                        <h4 className="text-lg font-bold text-emerald-700 dark:text-emerald-400 mb-4 flex items-center gap-2">
                                            Sealed Valve & Yield Splitting
                                        </h4>
                                        <p className="mb-6 text-slate-700 dark:text-slate-200">
                                            Imagine capital as liquids of different densities in a cylinder. The insurer's capital is the heaviest at the bottom, and the Senior capital (the safest) floats on top. If no claim opens the valve, <strong>the Premium layer is redistributed as Yield</strong>:
                                        </p>
                                        <ul className="space-y-4">
                                            <li className="flex gap-3">
                                                <span className="text-emerald-500">✓</span>
                                                <p className="text-sm text-slate-800 dark:text-slate-300"><strong>Sponsor:</strong> Recovers its First Loss capital.</p>
                                            </li>
                                            <li className="flex gap-3">
                                                <span className="text-emerald-500">✓</span>
                                                <p className="text-sm text-slate-800 dark:text-slate-300"><strong>Senior (Security):</strong> Recovers its capital and earns a base yield from the Premium (e.g., 70% of the overall APR).</p>
                                            </li>
                                            <li className="flex gap-3">
                                                <span className="text-emerald-500">✓</span>
                                                <p className="text-sm text-slate-800 dark:text-slate-300"><strong>Junior (Yield Seekers):</strong> Through leverage, absorbs the remainder of the Premium (Yield) left by the Senior tranche, resulting in an outperforming APR.</p>
                                            </li>
                                        </ul>
                                    </>
                                ) : (
                                    <>
                                        <h4 className="text-lg font-bold text-red-600 dark:text-red-400 mb-4 flex items-center gap-2">
                                            The Waterfall Engine (Open Valve)
                                        </h4>
                                        <p className="mb-6 text-slate-700 dark:text-slate-200">
                                            In the event of a validated claim, the valve opens and funds are withdrawn only against verified invoices. By gravity, the "heaviest" tranches at the bottom flow out first:
                                        </p>
                                        <div className="grid gap-3">
                                            <div className="flex items-center gap-4 p-3 bg-red-500/10 rounded-xl border border-red-500/20">
                                                <span className="flex-shrink-0 w-6 h-6 flex items-center justify-center bg-red-500 text-white rounded-md font-bold text-xs">1</span>
                                                <p className="text-sm text-slate-800 dark:text-slate-200"><strong>First Loss:</strong> The Sponsor's capital is destroyed first.</p>
                                            </div>
                                            <div className="flex items-center gap-4 p-3 bg-orange-500/10 rounded-xl border border-orange-500/20">
                                                <span className="flex-shrink-0 w-6 h-6 flex items-center justify-center bg-orange-500 text-white rounded-md font-bold text-xs">2</span>
                                                <p className="text-sm text-slate-800 dark:text-slate-200"><strong>Premium Buffer:</strong> Undistributed premiums absorb the loss.</p>
                                            </div>
                                            <div className="flex items-center gap-4 p-3 bg-yellow-500/10 rounded-xl border border-yellow-500/20">
                                                <span className="flex-shrink-0 w-6 h-6 flex items-center justify-center bg-yellow-500 text-white rounded-md font-bold text-xs">3</span>
                                                <p className="text-sm text-slate-800 dark:text-slate-200"><strong>Junior Tranche:</strong> Absorbs the loss until depleted.</p>
                                            </div>
                                            <div className="flex items-center gap-4 p-3 bg-green-500/10 rounded-xl border border-green-500/20">
                                                <span className="flex-shrink-0 w-6 h-6 flex items-center justify-center bg-green-500 text-white rounded-md font-bold text-xs">4</span>
                                                <p className="text-sm text-slate-800 dark:text-slate-200"><strong>Senior Tranche:</strong> Only affected as a last resort.</p>
                                            </div>
                                        </div>
                                    </>
                                )}
                            </div>
                        </div>
                    </section>

                    {/* SECTION 2 : YIELD SPLITTING & LEVIER */}
                    <section>
                        <h3 className="text-xl font-bold mb-6 text-slate-800 dark:text-slate-100 font-sans">
                            2. Yield Leverage (Yield Splitting)
                        </h3>

                        <div className="flex flex-col xl:flex-row gap-8 items-center bg-white/30 dark:bg-white/5 p-6 md:p-8 rounded-2xl border border-white/40 dark:border-white/10">

                            {/* Dessin Levier SVG */}
                            <div className="w-full xl:w-1/2 flex justify-center items-center bg-white/40 dark:bg-black/20 rounded-xl p-4 border border-white/50 dark:border-white/5">
                                <LeverageDrawing />
                            </div>

                            {/* Explication & Formules Mathématiques */}
                            <div className="w-full xl:w-1/2 space-y-5">
                                <p className="text-slate-700 dark:text-slate-200 leading-relaxed">
                                    The Junior tranche captures the remainder of the premiums. Since the Senior tranche only takes 70% of the yield generated by its own capital, the remaining 30% is redirected to the Junior tranche. This creates a mechanical leverage effect.
                                </p>

                                {/* Bloc Formules (Style Code Terminal) */}
                                <div className="bg-slate-900 rounded-xl p-5 shadow-inner border border-slate-700 font-mono text-sm overflow-x-auto text-emerald-400">
                                    <div className="mb-2 text-slate-400">// 1. The Senior tranche takes 70% of the base APR</div>
                                    <div className="mb-4 text-white">APR_Senior = APR_Base * 0.7</div>

                                    <div className="mb-2 text-slate-400">// 2. The rest of the generated yield goes to the Junior</div>
                                    <div className="mb-1 text-white">Yield_Total = (Capital_Senior + Capital_Junior) * APR_Base</div>
                                    <div className="mb-4 text-white">Yield_Junior = Yield_Total - (Capital_Senior * APR_Senior)</div>

                                    <div className="mb-2 text-slate-400">// 3. The final Junior APR is proportional to its smaller capital base</div>
                                    <div className="text-white font-bold text-yellow-400">APR_Junior = Yield_Junior / Capital_Junior</div>
                                </div>

                                {/* Exemple Chiffré */}
                                <div className="bg-indigo-50 dark:bg-indigo-900/30 p-5 rounded-xl border border-indigo-100 dark:border-indigo-800/50">
                                    <h4 className="font-bold text-indigo-900 dark:text-indigo-200 mb-2">📊 Concrete Example:</h4>
                                    <ul className="text-sm space-y-2 text-indigo-800 dark:text-indigo-300">
                                        <li>• <strong>Total Capital:</strong> $10M ($8M Senior + $2M Junior)</li>
                                        <li>• <strong>Base APR:</strong> 10% (Generates $1M in total Yield)</li>
                                        <li>• <strong>Senior APR:</strong> 7% (Seniors receive $560,000)</li>
                                        <li className="pt-2 border-t border-indigo-200 dark:border-indigo-700/50">
                                            <span className="font-bold text-yellow-600 dark:text-yellow-400">
                                                ➔ Remaining for Junior: $440,000
                                            </span>
                                        </li>
                                        <li>
                                            <span className="font-bold text-emerald-600 dark:text-emerald-400 text-base">
                                                ➔ Final Junior APR = 22%
                                            </span> <br/>
                                            <span className="text-xs italic">($440k divided by their $2M capital)</span>
                                        </li>
                                    </ul>
                                </div>

                            </div>
                        </div>
                    </section>

                    {/* SECTION 3 : SPÉCIFICITÉS ASSUREUR (Dynamique) */}
                    <AcademySponsorSpec activeTheme={activeTheme} />

                </div>
            </div>
        </div>
    );
};

export default AcademyModal;
