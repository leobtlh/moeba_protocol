import React, { useState } from 'react';
import {
    Shield, Wallet, UserCheck, Activity, X, Plus
} from '../components/ui/Icons.jsx';
import { useData } from '../context/DataContext.jsx';
import { useWeb3 } from '../context/Web3Context.jsx';
import { useToast } from '../context/ToastContext.jsx';
import InsurerRegistrationModal from '../components/Modals/InsurerRegistrationModal.jsx';
import ConnectWalletModal from '../components/Modals/ConnectWalletModal.jsx';
import CreateVaultForm from '../components/Vaults/CreateVaultForm.jsx';
import InsurerVaultCard from '../components/Vaults/InsurerVaultCard.jsx';

const InsurerDashboardPage = ({ activeTheme }) => {
    const {
        isInsurerWhitelisted, registrationStatus, createVault, vaults, initializeVault
    } = useData();
    const { walletConnected, userFullAddress, userAddress, disconnectWallet } = useWeb3();
    const { showToast } = useToast();

    // --- STATES UI ---
    const [isRegModalOpen, setIsRegModalOpen] = useState(false);
    const [isWalletModalOpen, setIsWalletModalOpen] = useState(false);
    const [isFormExpanded, setIsFormExpanded] = useState(false);
    const [isRegistering, setIsRegistering] = useState(false);

    // --- ACTIONS ---
    const handleCreateVault = (newVault) => {
        // Optionnel : On peut forcer le thème du nouveau vault ici
        createVault({ ...newVault, theme: activeTheme });
        setIsFormExpanded(false);
    };

    const handleInsurerRegistration = async () => {
        // La logique réelle est dans le composant Modal ou DataContext,
        // ici on simule juste le feedback UI local si besoin,
        // mais idéalement tout est géré dans le Context.
        // On garde juste le toast de succès ici par cohérence avec l'ancien code.
        setIsRegistering(true);
        setTimeout(() => {
            showToast("Simulated request sent successfully", 'success');
            setIsRegistering(false);
            setIsRegModalOpen(false);
        }, 1500);
    };

    // Filter Vaults
    const myVaults = vaults.filter(vault =>
        vault.insurerAddress &&
        vault.insurerAddress.toLowerCase() === userFullAddress?.toLowerCase() &&
        (vault.theme || 'climate') === activeTheme
    );

    // --- RENDER STATES ---

    // 1. NOT CONNECTED
    if (!walletConnected) {
        return (
            <>
                <div className="flex flex-col items-center justify-center min-h-[60vh] text-center space-y-6 animate-in fade-in max-w-2xl mx-auto">
                    <div className="p-6 bg-slate-100 dark:bg-slate-800 rounded-full mb-2">
                        <Shield className="h-20 w-20 text-slate-400 dark:text-slate-500" />
                    </div>
                    <h2 className="text-3xl font-bold text-slate-900 dark:text-white">Insurer Access Only</h2>
                    <p className="text-lg text-slate-500 dark:text-slate-400">
                        The insurer space is restricted to VUSA accredited entities. Please connect your wallet to verify your access rights.
                    </p>
                    <button onClick={() => setIsWalletModalOpen(true)} className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold transition-all shadow-lg hover:shadow-blue-200 dark:hover:shadow-none flex items-center gap-2">
                        <Wallet className="h-5 w-5" /> Connect Wallet
                    </button>
                </div>
                <ConnectWalletModal isOpen={isWalletModalOpen} onClose={() => setIsWalletModalOpen(false)} />
            </>
        );
    }

    // 2. CONNECTED BUT NOT WHITELISTED
    if (!isInsurerWhitelisted) {
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
                            <button onClick={() => setIsRegModalOpen(true)} className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold transition-all shadow-lg hover:shadow-indigo-200 dark:shadow-none">Register as Insurer</button>
                        )}
                    </div>
                </div>
                <InsurerRegistrationModal
                    isOpen={isRegModalOpen}
                    onClose={() => setIsRegModalOpen(false)}
                    onSubmit={handleInsurerRegistration} // Note: This uses local simulation handler
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

                <CreateVaultForm
                    isExpanded={isFormExpanded}
                    onToggle={(state) => setIsFormExpanded(state)} // Note: Le bouton collapse est géré dans le composant via props aussi
                    onCreate={handleCreateVault}
                    userAddress={userAddress}
                />

                <div className="bg-indigo-600 dark:bg-indigo-700 rounded-2xl p-6 text-white shadow-lg shadow-indigo-200 dark:shadow-none">
                    <div className="flex items-center gap-3 mb-4"><Shield className="h-6 w-6 opacity-80" /><h3 className="font-bold">VUSA Space</h3></div>
                    <p className="text-indigo-100 text-sm mb-4 leading-relaxed">Your insurer status is verified.</p>
                    <div className="bg-white/10 p-3 rounded-lg backdrop-blur-sm border border-white/10">
                        <div className="flex justify-between text-xs font-mono mb-1"><span className="opacity-70">STATUS</span><span className="text-green-300">VERIFIED</span></div>
                        <div className="flex justify-between text-xs font-mono"><span className="opacity-70">ENTITY</span><span>State Farm Re</span></div>
                    </div>
                </div>
            </div>

            {/* DROITE : LISTE VAULTS GÉRÉS */}
            <div className={`transition-all duration-500 ease-in-out min-w-0 ${isFormExpanded ? 'lg:flex-1' : 'lg:flex-[2]'}`} onClick={() => setIsFormExpanded(false)}>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-6">Your Managed Vaults</h3>
                <div className="space-y-4">
                    {myVaults.length === 0 ? (
                        <div className="flex flex-col items-center justify-center py-12 px-4 border-2 border-dashed border-slate-200 dark:border-slate-700 rounded-2xl bg-slate-50/50 dark:bg-slate-900/30 text-center animate-fade-in group cursor-pointer hover:border-indigo-300 dark:hover:border-indigo-700 transition-colors" onClick={(e) => { e.stopPropagation(); setIsFormExpanded(true); }}>
                            <div className="bg-white dark:bg-slate-800 p-4 rounded-full shadow-sm mb-4 group-hover:scale-110 transition-transform duration-300">
                                <Shield className="h-8 w-8 text-slate-400 dark:text-slate-500 group-hover:text-indigo-500" />
                            </div>
                            <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-2">No Active Vaults</h4>
                            <p className="text-sm text-slate-500 dark:text-slate-400 max-w-sm mx-auto mb-6">
                                You have not deployed an insurance contract yet. Use the form to configure your first parametric product.
                            </p>
                            <button
                                onClick={(e) => { e.stopPropagation(); setIsFormExpanded(true); }}
                                className="px-4 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 rounded-lg text-sm font-bold shadow-sm hover:text-indigo-600 dark:hover:text-indigo-400 hover:border-indigo-200 dark:hover:border-indigo-800 transition-all flex items-center gap-2"
                            >
                                <Plus className="h-4 w-4" /> Start Deployment
                            </button>
                        </div>
                    ) : (
                        myVaults.map((vault) => (
                            <InsurerVaultCard
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

export default InsurerDashboardPage;
