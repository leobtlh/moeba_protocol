import React, { createContext, useContext, useState, useEffect } from 'react';
import { ethers } from 'ethers';
import { useToast } from './ToastContext.jsx';
import { TOKEN_MAP } from '../constants/mocks.js';
import { ERC20_ABI } from '../constants/abis.js';

const Web3Context = createContext();

export const useWeb3 = () => useContext(Web3Context);

export const Web3Provider = ({ children }) => {
    const { showToast } = useToast();

    // États du Wallet
    const [walletConnected, setWalletConnected] = useState(false);
    const [userAddress, setUserAddress] = useState('');     // Format court (0x12...34)
    const [userFullAddress, setUserFullAddress] = useState(''); // Format long
    const [userBalance, setUserBalance] = useState('0.00'); // Solde NATIF (ETH)

    // Mode Live vs Simulation
    const [isLiveMode, setIsLiveMode] = useState(false);

    // Initialisation des listeners Ethereum
    useEffect(() => {
        if (window.ethereum) {
            window.ethereum.on('accountsChanged', (accounts) => {
                if (accounts.length > 0) {
                    const addr = accounts[0];
                    setUserFullAddress(addr);
                    setUserAddress(`${addr.substring(0, 6)}...${addr.substring(addr.length - 4)}`);
                    showToast("Account change detected", 'info');
                    // On pourrait re-fetcher la balance ici
                } else {
                    disconnectWallet();
                    showToast("Wallet disconnected", 'info');
                }
            });
        }
    }, [showToast]);

    // Fonction principale de connexion
    const connectWallet = async (walletType) => {
        // 1. GESTION SIMULATION
        if (walletType === 'simulation') {
            const simAddress = '0xsimulated000000000000000000000000000000';
            setWalletConnected(true);
            setUserAddress('Simu...Test');
            setUserFullAddress(simAddress);
            setUserBalance('100.0000');
            showToast("Connected with Simulation Wallet (Test Mode)", 'success');
            return;
        }

        // 2. GESTION WEB3 RÉEL
        if (!window.ethereum) {
            showToast("No crypto wallet found. Please install MetaMask or Rabby.", 'error');
            return;
        }

        let providerInput = window.ethereum;

        // Détection du provider selon le type choisi (Logique simplifiée pour v6)
        if (walletType === 'zerion' && window.zerionWallet) providerInput = window.zerionWallet;
        // Pour les autres, on utilise window.ethereum par défaut, la plupart des wallets l'injectent

        try {
            const accounts = await providerInput.request({ method: 'eth_requestAccounts' });
            if (!accounts || accounts.length === 0) {
                showToast("No account selected.", 'error');
                return;
            }

            // --- MIGRATION Ethers v6: BrowserProvider au lieu de providers.Web3Provider ---
            const provider = new ethers.BrowserProvider(providerInput);

            // --- MIGRATION Ethers v6: getSigner est ASYNC ---
            const signer = await provider.getSigner();
            const address = await signer.getAddress();

            // Signature Message
            try {
                const messageToSign = `Mœba Protocol Login\n\nWallet: ${address}\nNonce: ${Date.now()}`;
                showToast("Please sign the request in your wallet...", 'info');
                await signer.signMessage(messageToSign);
                showToast("Valid signature. Authorized login.", 'success');
            } catch (signErr) {
                console.error("Signature error:", signErr);
                showToast("Connection canceled: Signature rejected by user.", 'error');
                return;
            }

            const balanceBig = await provider.getBalance(address);
            // --- MIGRATION Ethers v6: formatEther est à la racine, pas dans utils ---
            const balanceFmt = ethers.formatEther(balanceBig);
            const shortAddress = `${address.substring(0, 6)}...${address.substring(address.length - 4)}`;

            setWalletConnected(true);
            setUserAddress(shortAddress);
            setUserFullAddress(address);
            setUserBalance(parseFloat(balanceFmt).toFixed(4));

            showToast(`Connected successfully`, 'success');

        } catch (error) {
            console.error(error);
            showToast(`Connection failed: ${error.message || error}`, 'error');
        }
    };

    const disconnectWallet = () => {
        setWalletConnected(false);
        setUserAddress('');
        setUserFullAddress('');
        setUserBalance('0.00');
        showToast("Disconnected from the application.", 'info');
    };

    const getAssetBalance = async (vaultChain, vaultAsset) => {
        if (!walletConnected || !window.ethereum) return '0.00';

        // En mode simulation
        if (userFullAddress === '0xsimulated000000000000000000000000000000') {
            return '50000.00';
        }

        try {
            // --- MIGRATION Ethers v6 ---
            const provider = new ethers.BrowserProvider(window.ethereum);
            const tokenAddress = TOKEN_MAP[vaultChain] ? TOKEN_MAP[vaultChain][vaultAsset] : null;

            // v6 utilise des BigInt natifs (0n)
            let balance = 0n;
            let decimals = 18;

            if (tokenAddress) {
                const contract = new ethers.Contract(tokenAddress, ERC20_ABI, provider);
                balance = await contract.balanceOf(userFullAddress);
                try { decimals = await contract.decimals(); } catch(e) {}
            } else if (vaultAsset === 'ETH' && vaultChain === 'Ethereum') {
                balance = await provider.getBalance(userFullAddress);
            }

            // --- MIGRATION Ethers v6 ---
            const formatted = ethers.formatUnits(balance, decimals);
            return parseFloat(formatted);
        } catch (err) {
            console.error("Error fetching asset balance", err);
            return 0;
        }
    };

    return (
        <Web3Context.Provider value={{
            walletConnected,
            userAddress,
            userFullAddress,
            userBalance,
            isLiveMode,
            setIsLiveMode,
            connectWallet,
            disconnectWallet,
            getAssetBalance
        }}>
            {children}
        </Web3Context.Provider>
    );
};
