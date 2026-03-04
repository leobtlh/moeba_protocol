import React, { useState } from 'react';
import { X, UserCheck, Shield } from '../ui/Icons';
// import { useData } from '../../context/DataContext'; // Kept for when you connect the backend

const InvestorKYCModal = ({ isOpen, onClose }) => {
    const [acceptedTerms, setAcceptedTerms] = useState(false);
    const [acceptedKID, setAcceptedKID] = useState(false); // Key Information Document (FIB in Swiss law)
    const [isSubmitting, setIsSubmitting] = useState(false);

    if (!isOpen) return null;

    const startWeb2KYC = async () => {
        if (!acceptedTerms || !acceptedKID) return;
        setIsSubmitting(true);
        // Trigger Sumsub / Onfido SDK here
        console.log("Launching Web2 KYC Partner (Sumsub/Onfido)...");
        setTimeout(() => setIsSubmitting(false), 2000); // Mock timeout
    };

    const verifyWeb3Passport = async () => {
        if (!acceptedTerms || !acceptedKID) return;
        setIsSubmitting(true);
        // Trigger Fractal ID / Quadrata wallet signature here
        console.log("Verifying Web3 Passport (Fractal ID) via wallet signature...");
        setTimeout(() => setIsSubmitting(false), 2000); // Mock timeout
    };

    return (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fade-in" onClick={onClose}>
            <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-2xl w-full max-w-lg border border-slate-200 dark:border-slate-700 overflow-hidden animate-zoom-in" onClick={e => e.stopPropagation()}>

                 {/* HEADER */}
                 <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center">
                    <h3 className="font-bold text-lg text-slate-900 dark:text-white flex items-center gap-2">
                        <Shield className="h-5 w-5 text-blue-600" /> Regulatory Compliance
                    </h3>
                    <button onClick={onClose} className="p-1 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors">
                        <X className="h-5 w-5 text-slate-500" />
                    </button>
                </div>

                {/* BODY */}
                <div className="p-6">
                    <div className="mb-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl border border-blue-100 dark:border-blue-800/50 text-sm text-blue-800 dark:text-blue-300">
                        Mœba Protocol operates under Swiss law (AMLA). To deposit into compliant Vaults, you must verify your identity via our secure partners. Mœba does not store your personal data.
                    </div>

                    {/* LEGAL CHECKBOXES (FinSA / LSFin Requirements) */}
                    <div className="space-y-4 mb-8">
                        <label className="flex items-start gap-3 cursor-pointer">
                            <input
                                type="checkbox"
                                className="mt-1 w-4 h-4 text-blue-600 bg-slate-100 border-slate-300 rounded focus:ring-blue-500 dark:bg-slate-800 dark:border-slate-600"
                                checked={acceptedKID}
                                onChange={(e) => setAcceptedKID(e.target.checked)}
                            />
                            <span className="text-sm text-slate-700 dark:text-slate-300">
                                I have read and understood the <a href="/kid.pdf" target="_blank" className="text-blue-600 dark:text-blue-400 hover:underline">Key Information Document (KID)</a> regarding the risks of total capital loss.
                            </span>
                        </label>
                        <label className="flex items-start gap-3 cursor-pointer">
                            <input
                                type="checkbox"
                                className="mt-1 w-4 h-4 text-blue-600 bg-slate-100 border-slate-300 rounded focus:ring-blue-500 dark:bg-slate-800 dark:border-slate-600"
                                checked={acceptedTerms}
                                onChange={(e) => setAcceptedTerms(e.target.checked)}
                            />
                            <span className="text-sm text-slate-700 dark:text-slate-300">
                                I accept the Registration Agreement and the Terms of Service of Mœba Protocol.
                            </span>
                        </label>
                    </div>

                    {/* ACTION BUTTONS */}
                    <div className="space-y-3">
                        <button
                            onClick={startWeb2KYC}
                            disabled={!acceptedTerms || !acceptedKID || isSubmitting}
                            className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold shadow-lg shadow-blue-200 dark:shadow-none transition-all flex justify-center items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isSubmitting ? "Processing..." : "Verify Identity (New User)"}
                        </button>

                        <div className="relative flex items-center py-2">
                            <div className="flex-grow border-t border-slate-200 dark:border-slate-700"></div>
                            <span className="flex-shrink-0 mx-4 text-xs text-slate-400 dark:text-slate-500 font-medium uppercase">Or</span>
                            <div className="flex-grow border-t border-slate-200 dark:border-slate-700"></div>
                        </div>

                        <button
                            onClick={verifyWeb3Passport}
                            disabled={!acceptedTerms || !acceptedKID || isSubmitting}
                            className="w-full py-3 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-xl font-bold transition-all flex justify-center items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            <UserCheck className="h-5 w-5" />
                            Connect Web3 Passport (Fractal/Quadrata)
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default InvestorKYCModal;
