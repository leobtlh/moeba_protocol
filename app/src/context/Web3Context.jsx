import React, { createContext, useContext, useState, useEffect } from 'react';
import { ethers } from 'ethers';
import { useToast } from './ToastContext.jsx';
import { TOKEN_MAP } from '../constants/mocks.js';
import { ERC20_ABI } from '../constants/abis.js';

const Web3Context = createContext();

export const useWeb3 = () => useContext(Web3Context);

export const Web3Provider = ({ children }) => {
    const { showToast } = useToast();
    const [walletConnected, setWalletConnected] = useState(false);
    const [userAddress, setUserAddress] = useState('');
    const [userFullAddress, setUserFullAddress] = useState('');
    const [userBalance, setUserBalance] = useState('0.00');
    const [isLiveMode, setIsLiveMode] = useState(false);

    // NOUVEAU : Liste des portefeuilles détectés
    const [detectedWallets, setDetectedWallets] = useState([]);

    useEffect(() => {
        // Standard EIP-6963 : Détecte les wallets au chargement
        const wallets = [];
        window.addEventListener("eip6963:announceProvider", (event) => {
            wallets.push(event.detail);
            setDetectedWallets([...wallets]);
        });
        window.dispatchEvent(new Event("eip6963:requestProvider"));
    }, []);

    // Fonction principale de connexion
    const connectWallet = async (selectedWallet) => {
        // GESTION SIMULATION (inchangée)
        if (selectedWallet === 'simulation') {
            setUserFullAddress('0xsimulated000000000000000000000000000000');
            setUserAddress('Simu...Test');
            setWalletConnected(true);
            return;
        }

        // GESTION WEB3 RÉEL
        // selectedWallet contient maintenant l'info du wallet (MM ou Rabby)
        const providerInput = selectedWallet?.provider || window.ethereum;

        try {
            const provider = new ethers.BrowserProvider(providerInput);
            const accounts = await providerInput.request({ method: 'eth_requestAccounts' });
            const address = accounts[0];

            const network = await provider.getNetwork();
            if (network.chainId !== 11155111n) {
                showToast("Veuillez passer sur Sepolia", "info");
            }

            const balance = await provider.getBalance(address);

            setUserFullAddress(address);
            setUserAddress(`${address.substring(0, 6)}...${address.substring(address.length - 4)}`);
            setUserBalance(parseFloat(ethers.formatEther(balance)).toFixed(4));
            setWalletConnected(true);

            showToast(`Connecté avec ${selectedWallet?.info?.name || 'Wallet'}`, 'success');
        } catch (error) {
            console.error(error);
            showToast("Échec de la connexion", 'error');
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
            getAssetBalance,
            detectedWallets // <--- AJOUTEZ CETTE LIGNE ICI
        }}>
            {children}
        </Web3Context.Provider>
    );
};
