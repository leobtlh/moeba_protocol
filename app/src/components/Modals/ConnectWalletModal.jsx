import React, { useState } from 'react';
import { X, ChevronDown } from '../ui/Icons';
import { SimulationIcon } from '../ui/WalletIcons';
import { useWeb3 } from '../../context/Web3Context';

const ConnectWalletModal = ({ isOpen, onClose }) => {
    // On récupère connectWallet ET la liste des wallets détectés
    const { connectWallet, detectedWallets } = useWeb3();
    const [showOtherWallets, setShowOtherWallets] = useState(false);

    if (!isOpen) return null;

    const handleSelect = (wallet) => {
        connectWallet(wallet);
        onClose();
    };

    return (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fade-in" onClick={onClose}>
            <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-2xl w-full max-w-sm border border-slate-200 dark:border-slate-700 overflow-hidden animate-zoom-in" onClick={e => e.stopPropagation()}>
                <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center">
                    <h3 className="font-bold text-lg text-slate-900 dark:text-white">Connect Wallet</h3>
                    <button onClick={onClose} className="p-1 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors">
                        <X className="h-5 w-5 text-slate-500" />
                    </button>
                </div>

                <div className="p-4 space-y-3">
                    {/* AFFICHAGE DYNAMIQUE DES WALLETS RÉELS (EIP-6963) */}
                    {detectedWallets.length > 0 ? (
                        detectedWallets.map((wallet) => (
                            <button
                                key={wallet.info.uuid}
                                onClick={() => handleSelect(wallet)}
                                className="w-full flex items-center gap-4 p-4 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors border border-transparent hover:border-slate-200 dark:hover:border-slate-700 group"
                            >
                                <img src={wallet.info.icon} alt={wallet.info.name} className="h-8 w-8 object-contain" />
                                <span className="font-bold text-slate-700 dark:text-slate-200 group-hover:text-blue-600 dark:group-hover:text-blue-400">
                                    {wallet.info.name}
                                </span>
                            </button>
                        ))
                    ) : (
                        <p className="text-xs text-center text-slate-500 p-2">No browser wallet detected</p>
                    )}

                    {/* SECTION SIMULATION & OPTIONS */}
                    <div className="border-t border-slate-100 dark:border-slate-800 pt-2 mt-2">
                        <button onClick={() => setShowOtherWallets(!showOtherWallets)} className="w-full flex items-center justify-between p-3 rounded-lg text-sm font-medium text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200 transition-colors">
                            <span>More options</span>
                            <ChevronDown className={`h-4 w-4 transition-transform duration-300 ${showOtherWallets ? 'rotate-180' : ''}`} />
                        </button>

                        {showOtherWallets && (
                            <div className="space-y-2 mt-2 animate-slide-up">
                                <button onClick={() => handleSelect('simulation')} className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors group">
                                    <SimulationIcon />
                                    <span className="font-medium text-slate-700 dark:text-slate-300">Simulation Wallet</span>
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ConnectWalletModal;
