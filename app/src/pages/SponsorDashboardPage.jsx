import React, { useState } from 'react';
import {
    Shield, Wallet, UserCheck, Activity, X, Plus, Building2, AlertTriangle
} from '../components/ui/Icons';
import { useData } from '../context/DataContext';
import { useWeb3 } from '../context/Web3Context';
import { useToast } from '../context/ToastContext';
import SponsorRegistrationModal from '../components/Modals/SponsorRegistrationModal';
import ConnectWalletModal from '../components/Modals/ConnectWalletModal';
import CreateVaultForm from '../components/Vaults/CreateVaultForm';
import SponsorVaultCard from '../components/Vaults/SponsorVaultCard';

// --- DICTIONNAIRE THEMATIQUE POUR L'INTERFACE SPONSOR ---
const THEME_UI = {
    climate: { label: "Climate & Weather", color: "text-sky-600 dark:text-sky-400", bg: "bg-sky-600 hover:bg-sky-700", lightBg: "bg-sky-50 dark:bg-sky-900/20", border: "border-sky-200 dark:border-sky-800" },
    cyber: { label: "Cyber Risks", color: "text-rose-600 dark:text-rose-400", bg: "bg-rose-600 hover:bg-rose-700", lightBg: "bg-rose-50 dark:bg-rose-900/20", border: "border-rose-200 dark:border-rose-800" },
    business: { label: "Business Interruption", color: "text-amber-600 dark:text-amber-500", bg: "bg-amber-500 hover:bg-amber-600", lightBg: "bg-amber-50 dark:bg-amber-900/20", border: "border-amber-200 dark:border-amber-800" },
    flight: { label: "Aviation & Flights", color: "text-cyan-600 dark:text-cyan-400", bg: "bg-cyan-600 hover:bg-cyan-700", lightBg: "bg-cyan-50 dark:bg-cyan-900/20", border: "border-cyan-200 dark:border-cyan-800" },
    realestate: { label: "Real Estate Sensors", color: "text-orange-600 dark:text-orange-400", bg: "bg-orange-500 hover:bg-orange-600", lightBg: "bg-orange-50 dark:bg-orange-900/20", border: "border-orange-200 dark:border-orange-800" },
    maritime: { label: "Maritime Logistics", color: "text-blue-600 dark:text-blue-400", bg: "bg-blue-600 hover:bg-blue-700", lightBg: "bg-blue-50 dark:bg-blue-900/20", border: "border-blue-200 dark:border-blue-800" },
};

const SponsorDashboardPage = ({ activeTheme }) => {
    const {
        isSponsorWhitelisted, registrationStatus, createVault, vaults, initializeVault, registerSponsor
    } = useData();
    const { walletConnected, userFullAddress, userAddress, disconnectWallet } = useWeb3();
    const { showToast } = useToast();

    // --- STATES UI ---
    const [isRegModalOpen, setIsRegModalOpen] = useState(false);
    const [isWalletModalOpen, setIsWalletModalOpen] = useState(false);
    const [isFormExpanded, setIsFormExpanded] = useState(false);
    const [isRegistering, setIsRegistering] = useState(false);

    // Récupération des styles du thème actuel
    const themeStyle = THEME_UI[activeTheme] || THEME_UI.climate;

    // --- ACTIONS ---
    const handleCreateVault = (newVault) => {
        createVault({ ...newVault, theme: activeTheme });
        setIsFormExpanded(false);
        showToast(`${themeStyle.label} vault deployed successfully`, 'success');
    };

    const handleSponsorRegistration = async (formData) => {
        setIsRegistering(true);
        await registerSponsor(formData);
        setIsRegistering(false);
        setIsRegModalOpen(false);
        showToast("Registration request submitted", 'success');
    };

    // Filter Vaults
    const myVaults = vaults.filter(vault =>
        vault.sponsorAddress &&
        vault.sponsorAddress.toLowerCase() === userFullAddress?.toLowerCase() &&
        (vault.theme || 'climate') === activeTheme
    );

    // --- RENDER STATES ---

    // 1. NOT CONNECTED
    if (!walletConnected) {
        return (
            <>
                <div className="flex flex-col items-center justify-center min-h-[60vh] text-center space-y-6 animate-in fade-in max-w-2xl mx-auto">
                    <div className={`p-6 rounded-full mb-2 ${themeStyle.lightBg}`}>
                        <Building2 className={`h-20 w-20 ${themeStyle.color}`} />
                    </div>
                    <h2 className="text-3xl font-bold text-slate-900 dark:text-white">Corporate Sponsor Access</h2>
                    <p className="text-lg text-slate-500 dark:text-slate-400">
                        The {themeStyle.label.toLowerCase()} sponsor space is restricted to VUSA accredited entities. Please connect your wallet to verify your access rights.
                    </p>
                    <button onClick={() => setIsWalletModalOpen(true)} className={`px-8 py-4 text-white rounded-xl font-bold transition-all shadow-lg flex items-center gap-2 ${themeStyle.bg}`}>
                        <Wallet className="h-5 w-5" /> Connect Wallet
                    </button>
                </div>
                <ConnectWalletModal isOpen={isWalletModalOpen} onClose={() => setIsWalletModalOpen(false)} />
            </>
        );
    }

    // 2. CONNECTED BUT NOT WHITELISTED
    if (!isSponsorWhitelisted) {
        return (
            <>
                <div className="flex flex-col items-center justify-center min-h-[60vh] text-center space-y-6 animate-in fade-in max-w-2xl mx-auto">
                    <div className="p-6 bg-red-50 dark:bg-red-900/20 rounded-full mb-2 border border-red-100 dark:border-red-900">
                        <UserCheck className="h-20 w-20 text-red-500 dark:text-red-400" />
                    </div>
                    <h2 className="text-3xl font-bold text-slate-900 dark:text-white">Unauthorized Access</h2>

                    {registrationStatus === 'pending' ? (
                        <div className="mt-4 p-4 bg-amber-50 dark:bg-amber-900/30 rounded-xl border border-amber-200 dark:border-amber-800 text-amber-800 dark:text-amber-200 max-w-md">
                            <div className="flex items-center gap-2 font-bold mb-1"><Activity className="h-5 w-5" /> Application under review</div>
                            <p className="text-sm">Your KYB file has been received and is currently being processed by the protocol team.</p>
                        </div>
                    ) : registrationStatus === 'rejected' ? (
                        <div className="mt-4 p-4 bg-red-50 dark:bg-red-900/30 rounded-xl border border-red-200 dark:border-red-800 text-red-800 dark:text-red-200 max-w-md">
                            <div className="flex items-center gap-2 font-bold mb-1"><X className="h-5 w-5" /> Application Rejected</div>
                            <p className="text-sm">Your application has been rejected.</p>
                        </div>
                    ) : (
                        <p className="text-lg text-slate-500 dark:text-slate-400">The address <span className="font-mono font-bold bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded">{userAddress}</span> is not certified.</p>
                    )}

                    <div className="flex gap-4 mt-6">
                        <button onClick={disconnectWallet} className="px-6 py-3 border border-slate-300 dark:border-slate-600 text-slate-600 dark:text-slate-300 rounded-xl font-bold hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">Switch Wallet</button>
                        {registrationStatus !== 'pending' && (
                            <button onClick={() => setIsRegModalOpen(true)} className={`px-6 py-3 text-white rounded-xl font-bold transition-all shadow-lg ${themeStyle.bg}`}>
                                Register as Sponsor
                            </button>
                        )}
                    </div>
                </div>
                <SponsorRegistrationModal
                    isOpen={isRegModalOpen}
                    onClose={() => setIsRegModalOpen(false)}
                    onSubmit={handleSponsorRegistration}
                    isSubmitting={isRegistering}
                />
            </>
        );
    }

    // 3. DASHBOARD (CONNECTED & WHITELISTED)
    return (
        <div className="flex flex-col lg:flex-row gap-8 animate-in fade-in duration-500">
            {/* GAUCHE : FORMULAIRE CRÉATION */}
            <div className={`transition-all duration-500 ease-in-out min-w-0 ${isFormExpanded ? 'lg:flex-[2]' : 'lg:flex-1'} space-y-6`}>

                {/* --- ICI : LES PROPS SONT CORRIGEES --- */}
                <CreateVaultForm
                    isExpanded={isFormExpanded}
                    onToggle={(state) => setIsFormExpanded(state)}
                    onCreate={handleCreateVault}
                    userAddress={userAddress}
                    activeTheme={activeTheme}
                />

                {/* Bloc d'informations VUSA (Affiche la couleur du thème) */}
                <div className={`rounded-2xl p-6 text-white shadow-lg ${themeStyle.bg}`}>
                    <div className="flex items-center gap-3 mb-4"><Shield className="h-6 w-6 opacity-80" /><h3 className="font-bold">VUSA {themeStyle.label} Space</h3></div>
                    <p className="text-white/80 text-sm mb-4 leading-relaxed">Your corporate sponsor status is verified.</p>
                    <div className="bg-black/10 p-3 rounded-lg backdrop-blur-sm border border-white/10">
                        <div className="flex justify-between text-xs font-mono mb-1"><span className="opacity-70">STATUS</span><span className="text-green-300">VERIFIED</span></div>
                        <div className="flex justify-between text-xs font-mono"><span className="opacity-70">ENTITY</span><span>{userAddress.slice(0, 6)}...{userAddress.slice(-4)}</span></div>
                    </div>
                </div>
            </div>

            {/* DROITE : LISTE VAULTS GÉRÉS */}
            <div className={`transition-all duration-500 ease-in-out min-w-0 ${isFormExpanded ? 'lg:flex-1' : 'lg:flex-[2]'}`} onClick={() => setIsFormExpanded(false)}>
                <div className="flex items-center justify-between mb-6">
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                        <Activity className={`h-5 w-5 ${themeStyle.color}`} /> Your Managed Vaults
                    </h3>
                </div>

                <div className="space-y-4">
                    {myVaults.length === 0 ? (
                        <div className="flex flex-col items-center justify-center py-12 px-4 border-2 border-dashed border-slate-200 dark:border-slate-700 rounded-2xl bg-slate-50/50 dark:bg-slate-900/30 text-center animate-fade-in group cursor-pointer hover:border-indigo-300 dark:hover:border-indigo-700 transition-colors" onClick={(e) => { e.stopPropagation(); setIsFormExpanded(true); }}>
                            <div className={`p-4 rounded-full shadow-sm mb-4 group-hover:scale-110 transition-transform duration-300 ${themeStyle.lightBg}`}>
                                <Shield className={`h-8 w-8 ${themeStyle.color}`} />
                            </div>
                            <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-2">No Active Vaults</h4>
                            <p className="text-sm text-slate-500 dark:text-slate-400 max-w-sm mx-auto mb-6">
                                You have not deployed any {themeStyle.label.toLowerCase()} contract yet. Use the form to configure your first parametric product.
                            </p>
                            <button
                                onClick={(e) => { e.stopPropagation(); setIsFormExpanded(true); }}
                                className={`px-4 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 rounded-lg text-sm font-bold shadow-sm transition-all flex items-center gap-2 ${themeStyle.color}`}
                            >
                                <Plus className="h-4 w-4" /> Start Deployment
                            </button>
                        </div>
                    ) : (
                        myVaults.map((vault) => (
                            <SponsorVaultCard
                                key={vault.id}
                                vault={vault}
                                isCompact={isFormExpanded}
                                onInitialize={initializeVault}
                            />
                        ))
                    )}
                </div>
            </div>
        </div>
    );
};

export default SponsorDashboardPage;
