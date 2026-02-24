import React from 'react';

// Importation directe via Vite (génère les chemins parfaits pour Vercel)
import rabbyLogo from '../../assets/img/wallet-rb.png';
import zerionLogo from '../../assets/img/wallet-zc.png';
import metamaskLogo from '../../assets/img/wallet-mm.png';
import walletConnectLogo from '../../assets/img/wallet-cn.png';

export const RabbyIcon = () => (
    <img
        src={rabbyLogo}
        alt="Rabby Wallet"
        className="w-8 h-8 rounded-lg shadow-sm bg-white"
    />
);

export const ZerionIcon = () => (
    <img
        src={zerionLogo}
        alt="Zerion Wallet"
        className="w-8 h-8 rounded-lg shadow-sm bg-white"
    />
);

export const MetaMaskIcon = () => (
    <img
        src={metamaskLogo}
        alt="MetaMask"
        className="w-8 h-8 rounded-lg shadow-sm bg-white"
    />
);

export const WalletConnectIcon = () => (
     <img
        src={walletConnectLogo}
        alt="WalletConnect"
        className="w-8 h-8 rounded-lg shadow-sm bg-white"
    />
);

export const SimulationIcon = () => (
     <svg viewBox="0 0 32 32" className="w-8 h-8 rounded-lg" fill="none">
        <rect width="32" height="32" rx="8" fill="#475569"/>
        <path d="M16 6v20M6 16h20" stroke="white" strokeWidth="4" strokeLinecap="round"/>
     </svg>
);
