import React, { useEffect } from 'react';
import { X, BookOpen } from '../ui/Icons';

const AcademyModal = ({ isOpen, onClose, activeTheme }) => {
    useEffect(() => {
        if (isOpen) {
            // Bloque le scroll du fond
            document.body.style.overflow = 'hidden';
        } else {
            // Réactive le scroll du fond
            document.body.style.overflow = 'unset';
        }

        // Sécurité : si le composant "meurt", on rend le scroll à la page
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    if (!isOpen) return null;

    const getThemeSpecificContent = () => {
        switch(activeTheme) {
            case 'climate':
                return "Climate & Weather : L'oracle repose sur des sources publiques (ex: NOAA, USGS). L'assureur doit fournir les coordonnées géographiques précises (Lat/Long) du risque couvert lors du déploiement du Vault.";
            case 'cyber':
                return "Cybersecurity : L'oracle repose sur un audit forensique post-mortem. L'assureur doit lier le Vault à un certificat de sécurité ou une preuve on-chain d'interruption de réseau.";
            case 'business':
                return "Business Interruption : Le déclencheur est lié à des flux de trésorerie tokenisés ou des données de chaîne d'approvisionnement vérifiables par des oracles IoT.";
            case 'flight':
                return "Flight Cancellation : Le Vault interroge l'API de l'aviation civile internationale. L'assureur déploie des liquidités ciblées sur des aéroports spécifiques.";
            case 'realestate':
                return "Real Estate Sensors : Utilisation d'Oracles Optimistes couplés à des capteurs IoT physiques (feu, inondation, structure) dans les bâtiments certifiés.";
            case 'maritime':
                return "Maritime Logistics: We use 'Smart Twistlocks' or Computer Vision to detect cargo loss. If stability sensors confirm a sinking event (Hull Loss), the Vault triggers an instant payout.";
            default:
                return "Sélectionnez un thème pour voir les spécificités de l'assurance.";
        }
    };

    return (
        <div
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-8 bg-black/40 backdrop-blur-md animate-fade-in"
            onClick={onClose}
        >

            {/* 2. On ajoute e.stopPropagation() sur la fenêtre blanche pour que les clics à l'intérieur ne ferment pas la modale */}
            <div
                className="w-[80%] h-full bg-white/40 dark:bg-white/5 border border-white/30 dark:border-white/10 rounded-3xl shadow-2xl flex flex-col overflow-hidden relative animate-zoom-in backdrop-blur-2xl"
                onClick={(e) => e.stopPropagation()}
            >

                {/* Header */}
                <div className="flex justify-between items-center p-6 border-b border-white/30 dark:border-white/10 bg-white/20 dark:bg-white/5">
                    <h2 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-3">
                        <BookOpen className="h-6 w-6 text-indigo-500" />
                        Mœba Academy : <span className="text-indigo-600 dark:text-indigo-400 capitalize">{activeTheme}</span>
                    </h2>
                    <button onClick={onClose} className="p-2 bg-black/5 dark:bg-white/10 rounded-full hover:bg-black/10 dark:hover:bg-white/20 transition">
                        <X className="h-5 w-5 text-slate-600 dark:text-slate-300" />
                    </button>
                </div>

                {/* Corps de la page */}
                <div className="flex-1 overflow-y-auto p-6 md:p-10 space-y-12 bg-transparent">

                    <section>
                        <h3 className="text-xl font-bold mb-4 text-slate-800 dark:text-slate-100 font-sans">
                            1. The Waterfall Engine (Soft Default Mechanism)
                        </h3>

                        {/* Box transparente avec un léger liseré blanc */}
                        <div className="bg-white/30 dark:bg-white/5 p-6 rounded-2xl border border-white/40 dark:border-white/10">
                            <p className="mb-6 text-slate-700 dark:text-slate-200">
                                En cas de sinistre validé par l'oracle, les pertes sont absorbées en cascade :
                            </p>

                            <div className="grid gap-3">
                                <div className="flex items-center gap-4 p-4 bg-red-500/10 dark:bg-red-500/10 rounded-xl border border-red-500/20 dark:border-red-400/20">
                                    <span className="flex-shrink-0 w-8 h-8 flex items-center justify-center bg-red-500 text-white rounded-lg font-bold">1</span>
                                    <p className="text-sm text-slate-800 dark:text-slate-200">
                                        <strong>Sponsor First Loss :</strong> Capital de l'assureur consommé en premier.
                                    </p>
                                </div>
                                <div className="flex items-center gap-4 p-4 bg-orange-500/10 dark:bg-orange-500/10 rounded-xl border border-orange-500/20 dark:border-orange-400/20">
                                    <span className="flex-shrink-0 w-8 h-8 flex items-center justify-center bg-orange-500 text-white rounded-lg font-bold">2</span>
                                    <p className="text-sm text-slate-800 dark:text-slate-200">
                                        <strong>Premium Reserve :</strong> Les primes servent de tampon.
                                    </p>
                                </div>
                                <div className="flex items-center gap-4 p-4 bg-yellow-500/10 dark:bg-yellow-500/10 rounded-xl border border-yellow-500/20 dark:border-yellow-400/20">
                                    <span className="flex-shrink-0 w-8 h-8 flex items-center justify-center bg-yellow-500 text-white rounded-lg font-bold">3</span>
                                    <p className="text-sm text-slate-800 dark:text-slate-200">
                                        <strong>Tranche Junior :</strong> Absorption du capital Junior.
                                    </p>
                                </div>
                                <div className="flex items-center gap-4 p-4 bg-green-500/10 dark:bg-green-500/10 rounded-xl border border-green-500/20 dark:border-green-400/20">
                                    <span className="flex-shrink-0 w-8 h-8 flex items-center justify-center bg-green-500 text-white rounded-lg font-bold">4</span>
                                    <p className="text-sm text-slate-800 dark:text-slate-200">
                                        <strong>Tranche Senior :</strong> Capital protégé par le standard ERC-4626.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </section>

                    <section>
                        <h3 className="text-xl font-bold mb-4 text-slate-800 dark:text-slate-100 font-sans">
                            2. Spécificités Assureur ({activeTheme})
                        </h3>
                        <div className="bg-indigo-500/10 dark:bg-indigo-400/10 p-6 rounded-2xl border border-indigo-500/20 dark:border-indigo-400/20">
                            <p className="text-indigo-900 dark:text-indigo-100 leading-relaxed font-medium">
                                {getThemeSpecificContent()}
                            </p>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
};

export default AcademyModal;
