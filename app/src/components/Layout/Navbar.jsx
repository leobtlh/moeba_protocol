import React, { useState, useRef, useEffect } from 'react';
import {
    Sun, Moon, Wallet, LogOut, Zap, Globe
} from '../ui/Icons';
import { useTheme } from '../../context/ThemeContext';
import { useWeb3 } from '../../context/Web3Context';
import ConnectWalletModal from '../Modals/ConnectWalletModal';
import moebaLogo from '../../assets/img/IconTest04.png';

// --- THEMES ---
const THEMES = [
    { id: 'climate', label: 'Climate & Weather', color: 'text-violet-600 dark:text-violet-400' },
    { id: 'cyber', label: 'Cybersecurity', color: 'text-red-600 dark:text-red-500' },
    { id: 'business', label: 'Business Interruption', color: 'text-yellow-500 dark:text-yellow-500' },
    { id: 'flight', label: 'Flight Cancellation', color: 'text-teal-500 dark:text-teal-500' },
    { id: 'realestate', label: 'Real Estate Sensors', color: 'text-orange-500 dark:text-orange-500' },
    { id: 'maritime', label: 'Maritime Logistics', color: 'text-cyan-500 dark:text-cyan-400' },
];

const Navbar = ({ activeView, setActiveView, activeTheme, setActiveTheme, isLearnMode, setIsLearnMode }) => {
    const { isDarkMode, toggleTheme } = useTheme();
    const { walletConnected, userAddress, userFullAddress, disconnectWallet, isLiveMode, setIsLiveMode } = useWeb3();

    const [isWalletModalOpen, setIsWalletModalOpen] = useState(false);
    const [showWalletMenu, setShowWalletMenu] = useState(false);
    const [showThemeMenu, setShowThemeMenu] = useState(false);

    const themeMenuRef = useRef(null);
    const walletMenuRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            // Si le menu thème est ouvert et qu'on clique en dehors de sa zone
            if (themeMenuRef.current && !themeMenuRef.current.contains(event.target)) {
                setShowThemeMenu(false);
            }
            // Si le menu wallet est ouvert et qu'on clique en dehors de sa zone
            if (walletMenuRef.current && !walletMenuRef.current.contains(event.target)) {
                setShowWalletMenu(false);
            }
        };

        // Ajoute l'écouteur d'événement au montage
        document.addEventListener('mousedown', handleClickOutside);

        // Nettoie l'écouteur au démontage
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const handleNav = (view) => {
        setActiveView(view);
    };

    return (
        <nav className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 sticky top-0 z-50 shadow-sm transition-colors duration-300">
            <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16 items-center">

                    {/* --- GAUCHE : LOGO, THEMES & TOGGLE ACADEMY/APP --- */}
                    <div className="flex items-center gap-4">
                        <a href="#" className="flex items-center gap-2" onClick={(e) => { e.preventDefault(); handleNav('marketplace'); setIsLearnMode(false); }}>
                            <img
                                src={moebaLogo}
                                alt="MOEBA"
                                className="h-12 w-auto transition-all duration-300 filter drop-shadow-[0_2px_4px_rgba(100,108,255,0.3)] brightness-110 dark:drop-shadow-[0_2px_6px_rgba(100,108,255,0.6)] dark:brightness-110"
                            />
                        </a>

                        {/* TOGGLE : ACADEMY / MARKETPLACE */}
                        <div className="hidden md:flex items-center gap-1 bg-slate-100 dark:bg-slate-800 p-1 rounded-full ml-2 border border-slate-200 dark:border-slate-700 shadow-inner">
                            <button
                                onClick={() => { setIsLearnMode(true); handleNav('marketplace'); }}
                                className={`px-5 py-1.5 text-xs font-bold rounded-full transition-all flex items-center gap-2 ${isLearnMode ? 'bg-green-500 shadow-md text-white' : 'text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200'}`}
                            >
                                Academy
                            </button>
                            <button
                                onClick={() => { setIsLearnMode(false); handleNav('marketplace'); }}
                                className={`px-5 py-1.5 text-xs font-bold rounded-full transition-all flex items-center gap-2 ${!isLearnMode ? 'bg-white dark:bg-slate-700 shadow-md text-green-700 dark:text-green-400' : 'text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200'}`}
                            >
                                Marketplace
                            </button>
                        </div>
                    </div>

                    {/* --- DROITE : NAVIGATION & WALLET --- */}
                    <div className="flex items-center gap-4">

                        {/* MENUS CATEGORY */}
                        <div className="relative hidden lg:block mr-2" ref={themeMenuRef}>
                            <button
                                onClick={() => setShowThemeMenu(!showThemeMenu)}
                                className="flex items-center gap-2 px-3 py-1.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm font-medium hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors shadow-sm"
                            >
                                <span className={THEMES.find(t => t.id === activeTheme)?.color}>
                                    {THEMES.find(t => t.id === activeTheme)?.label}
                                </span>
                                <span className="text-xs text-slate-400 dark:text-slate-500">▼</span>
                            </button>

                            {showThemeMenu && (
                                <div className="absolute top-full left-0 mt-2 w-56 bg-white dark:bg-slate-800 rounded-xl shadow-xl border border-slate-200 dark:border-slate-700 p-2 z-50 flex flex-col gap-1">
                                    {THEMES.map(theme => (
                                        <button
                                            key={theme.id}
                                            onClick={() => {
                                                setActiveTheme(theme.id);
                                                setShowThemeMenu(false);
                                            }}
                                            className={`w-full text-left px-3 py-2 text-sm rounded-lg transition-colors ${activeTheme === theme.id ? 'bg-slate-50 dark:bg-slate-700 font-bold ' + theme.color : 'text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700'}`}
                                        >
                                            {theme.label}
                                        </button>
                                    ))}

                                    <div className="my-1 border-t border-slate-100 dark:border-slate-700"></div>

                                    <div className="flex items-center justify-between gap-1 bg-slate-100 dark:bg-slate-900 p-1 rounded-lg">
                                        <button
                                            onClick={() => setIsLiveMode(false)}
                                            className={`flex-1 px-2 py-1.5 text-xs font-bold rounded-md transition-all text-center ${!isLiveMode ? 'bg-white dark:bg-slate-700 shadow-sm text-slate-900 dark:text-white' : 'text-slate-500 hover:text-slate-700 dark:text-slate-400'}`}
                                        >
                                            Simulation
                                        </button>
                                        <button
                                            onClick={() => setIsLiveMode(true)}
                                            className={`flex-1 px-2 py-1.5 text-xs font-bold rounded-md transition-all flex items-center justify-center gap-1 ${isLiveMode ? 'bg-red-500 shadow-sm text-white' : 'text-slate-500 hover:text-slate-700 dark:text-slate-400'}`}
                                        >
                                            <Zap className="h-3 w-3" /> Live
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Les boutons restent toujours affichés ! */}
                        <div className="hidden md:flex bg-slate-100 dark:bg-slate-800 rounded-lg p-1 transition-colors">
                            <button onClick={() => handleNav('marketplace')} className={`px-4 py-1.5 rounded-md text-sm font-medium transition-all ${activeView === 'marketplace' ? 'bg-white dark:bg-slate-700 shadow-sm text-blue-700 dark:text-blue-400' : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200'}`}>Investor</button>
                            <button onClick={() => handleNav('insurer')} className={`px-4 py-1.5 rounded-md text-sm font-medium transition-all ${activeView === 'insurer' ? 'bg-white dark:bg-slate-700 shadow-sm text-indigo-700 dark:text-indigo-400' : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200'}`}>Insurer</button>
                            <button onClick={() => handleNav('portfolio')} className={`px-4 py-1.5 rounded-md text-sm font-medium transition-all ${activeView === 'portfolio' ? 'bg-white dark:bg-slate-700 shadow-sm text-green-600 dark:text-green-400' : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200'}`}>Dashboard</button>
                        </div>

                        <div className="h-6 w-px bg-slate-200 dark:bg-slate-700 mx-1"></div>

                        <button onClick={toggleTheme} className="p-2 text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-white transition-colors rounded-full hover:bg-slate-100 dark:hover:bg-slate-800">
                            {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
                        </button>

                        <div className="relative">
                            <button
                                onClick={() => walletConnected ? setShowWalletMenu(!showWalletMenu) : setIsWalletModalOpen(true)}
                                className={`flex items-center gap-2 px-4 py-2 rounded-full font-medium transition-colors border ${walletConnected ? 'bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-400 border-green-200 dark:border-green-800' : 'bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 hover:bg-slate-800 dark:hover:bg-slate-200 border-transparent'}`}
                            >
                                <Wallet className="h-4 w-4" />
                                {walletConnected ? (
                                    <span className="text-xs font-bold">{userAddress}</span>
                                ) : (
                                    <span>Connect Wallet</span>
                                )}
                            </button>

                            {walletConnected && showWalletMenu && (
                                <div className="absolute right-0 top-full mt-2 w-56 bg-white dark:bg-slate-800 rounded-xl shadow-xl border border-slate-200 dark:border-slate-700 p-2 z-50 flex flex-col gap-1">
                                    <a
                                        href={`https://etherscan.io/address/${userFullAddress || userAddress}`}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="flex items-center gap-2 px-3 py-2 text-sm text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 rounded-lg transition-colors"
                                    >
                                        <Globe className="h-4 w-4" /> <span>Etherscan</span>
                                    </a>
                                    <button
                                        onClick={() => { disconnectWallet(); setShowWalletMenu(false); }}
                                        className="flex items-center gap-2 px-3 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors w-full text-left"
                                    >
                                        <LogOut className="h-4 w-4" /> <span>Disconnect</span>
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            <ConnectWalletModal
                isOpen={isWalletModalOpen}
                onClose={() => setIsWalletModalOpen(false)}
            />
        </nav>
    );
};

export default Navbar;
