import React, { useState } from 'react';
import { Wallet, Activity } from '../components/ui/Icons.jsx';
import PortfolioCard from '../components/Vaults/PortfolioCard.jsx';
import { useData } from '../context/DataContext.jsx';
import { useWeb3 } from '../context/Web3Context.jsx';
import ConnectWalletModal from '../components/Modals/ConnectWalletModal.jsx';

const PortfolioPage = ({ onVaultSelect }) => {
    // --- GLOBAL CONTEXT ---
    const { vaults, claimFromVault } = useData();
    const { walletConnected, userFullAddress } = useWeb3();

    // --- LOCAL STATE ---
    const [isWalletModalOpen, setIsWalletModalOpen] = useState(false);

    // --- HANDLE CLAIM ---
    const handleClaim = (vault) => {
        claimFromVault(vault.id);
    };

    // --- NOT CONNECTED STATE ---
    if (!walletConnected) {
        return (
            <>
                <div className="flex flex-col items-center justify-center min-h-[60vh] text-center space-y-6 animate-in fade-in max-w-2xl mx-auto">
                    <div className="p-6 bg-slate-100 dark:bg-slate-800 rounded-full mb-2">
                        <Wallet className="h-20 w-20 text-slate-400 dark:text-slate-500" />
                    </div>
                    <h2 className="text-3xl font-bold text-slate-900 dark:text-white">Dashboard Access</h2>
                    <p className="text-lg text-slate-500 dark:text-slate-400">
                        Connect your wallet to view your positions and manage your investments.
                    </p>
                    <button
                        onClick={() => setIsWalletModalOpen(true)}
                        className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold transition-all shadow-lg hover:shadow-blue-200 dark:hover:shadow-none flex items-center gap-2"
                    >
                        <Wallet className="h-5 w-5" /> Connect Wallet
                    </button>
                </div>
                <ConnectWalletModal isOpen={isWalletModalOpen} onClose={() => setIsWalletModalOpen(false)} />
            </>
        );
    }

    // --- CONNECTED DASHBOARD ---
    // Filter vaults where user has a balance > 0
    const myVaults = vaults.filter(v => v.userBalance > 0);

    return (
        <div className="max-w-full mx-auto animate-in fade-in duration-500">
            <div className="text-center mb-10">
                <div className="w-20 h-20 bg-green-50 dark:bg-green-900/20 rounded-full flex items-center justify-center mx-auto mb-6 border border-green-100 dark:border-green-800">
                    <Wallet className="h-10 w-10 text-green-600 dark:text-green-400" />
                </div>
                <h2 className="text-3xl font-bold text-slate-900 dark:text-white">Portfolio Dashboard</h2>
                <p className="text-slate-500 dark:text-slate-400 mt-2">Monitor your active investment positions</p>
            </div>

            <div className="bg-white dark:bg-slate-800/80 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm overflow-hidden">
                <div className="p-4 bg-slate-50 dark:bg-slate-900/50 border-b border-slate-200 dark:border-slate-700 flex justify-between items-center">
                    <h3 className="font-bold text-slate-800 dark:text-slate-300 flex items-center gap-2">
                        <Activity className="h-4 w-4" /> Active Positions
                    </h3>
                    <span className="flex h-3 w-3 relative">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                    </span>
                </div>

                <div className="divide-y divide-slate-100 dark:divide-slate-700">
                    {myVaults.map(vault => (
                        <PortfolioCard
                            key={vault.id}
                            vault={vault}
                            userFullAddress={userFullAddress}
                            onClaim={handleClaim}
                            onManage={onVaultSelect}
                        />
                    ))}

                    {myVaults.length === 0 && (
                        <div className="p-12 text-center">
                            <p className="text-slate-400 dark:text-slate-500 mb-2">No active investments.</p>
                            <button
                                onClick={() => onVaultSelect(null)}
                                className="text-green-600 dark:text-green-400 hover:underline text-sm"
                            >
                                Explore opportunities
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default PortfolioPage;
