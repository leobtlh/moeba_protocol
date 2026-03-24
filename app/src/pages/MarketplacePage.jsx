import React, { useState, useEffect } from 'react';
import { Search, LayoutGrid, List, Globe } from '../components/ui/Icons';
import VaultCard from '../components/Vaults/VaultCard';
import { useData } from '../context/DataContext';
import { AVAILABLE_CHAINS, CHAIN_LOGOS } from '../constants/mocks';
import { parseAppDate } from '../utils/formatting';

const MarketplacePage = ({ onVaultSelect, activeTheme }) => {
    const { vaults } = useData();

    // --- STATES DE FILTRES ---
    const [selectedChains, setSelectedChains] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [aprSort, setAprSort] = useState('neutral');
    const [maturitySort, setMaturitySort] = useState('neutral');
    const [riskSort, setRiskSort] = useState('neutral');
    const [viewMode, setViewMode] = useState('list'); // 'list' | 'grid'

    // ÉTAT RÉACTIVÉ
    const [selectedCategory, setSelectedCategory] = useState('All');

    // --- NOUVEAU : Réinitialiser la catégorie et la recherche si on change de Thème global ---
    useEffect(() => {
        setSelectedCategory('All');
        setSearchQuery('');
    }, [activeTheme]);

    // --- LOGIQUE DE TRI ---
    const toggleChainFilter = (chain) => {
        if (selectedChains.includes(chain)) setSelectedChains(selectedChains.filter(c => c !== chain));
        else setSelectedChains([...selectedChains, chain]);
    };

    const parseDateForSort = (dateStr) => {
        if (!dateStr || dateStr === "Pending") return new Date(9999, 11, 31);
        return parseAppDate(dateStr) || new Date();
    };

    const toggleAprSort = () => {
        setMaturitySort('neutral'); setRiskSort('neutral');
        setAprSort(prev => prev === 'neutral' ? 'desc' : prev === 'desc' ? 'asc' : 'neutral');
    };

    const toggleMaturitySort = () => {
        setAprSort('neutral'); setRiskSort('neutral');
        setMaturitySort(prev => prev === 'neutral' ? 'asc' : prev === 'asc' ? 'desc' : 'neutral');
    };

    const toggleRiskSort = () => {
        setAprSort('neutral'); setMaturitySort('neutral');
        setRiskSort(prev => prev === 'neutral' ? 'asc' : prev === 'asc' ? 'desc' : 'neutral');
    };

    // --- FILTRAGE ET TRI DES VAULTS ---

    // 1. Filtrer D'ABORD les vaults par le Thème actif de la Navbar (ex: 'climate')
    const vaultsOfActiveTheme = vaults.filter(v => (v.theme || 'climate') === activeTheme);

    // 2. Extraire les sous-catégories UNIQUEMENT pour ce Thème
    const availableCategories = ['All', ...new Set(vaultsOfActiveTheme.map(v => v.category).filter(Boolean))];

    // 3. Filtrage final pour l'affichage
    const filteredVaults = vaultsOfActiveTheme.filter(vault => {
        // Filtre par réseau (chaîne)
        if (selectedChains.length > 0 && !selectedChains.includes(vault.chain)) return false;

        // Filtre par le menu déroulant (Ouragan, Séisme, etc.)
        if (selectedCategory !== 'All' && vault.category !== selectedCategory) return false;

        // Filtre par barre de recherche
        if (searchQuery) {
            const q = searchQuery.toLowerCase();
            return vault.asset.toLowerCase().includes(q) || vault.name.toLowerCase().includes(q);
        }
        return true;
    }).sort((a, b) => {
        if (aprSort !== 'neutral') {
            const valA = parseFloat(a.apr);
            const valB = parseFloat(b.apr);
            return aprSort === 'desc' ? valB - valA : valA - valB;
        }
        if (maturitySort !== 'neutral') {
            return maturitySort === 'asc'
                ? parseDateForSort(a.maturityDate) - parseDateForSort(b.maturityDate)
                : parseDateForSort(b.maturityDate) - parseDateForSort(a.maturityDate);
        }
        if (riskSort !== 'neutral') {
            const riskA = parseFloat(a.riskProb);
            const riskB = parseFloat(b.riskProb);
            return riskSort === 'asc' ? riskA - riskB : riskB - riskA;
        }
        return 0;
    });

    return (
        <div className="space-y-6 animate-in fade-in duration-500">
            <div className="flex flex-col gap-6">
                <div>
                    <h2 className="text-4xl font-bold text-slate-900 dark:text-white">Vaults Opportunities</h2>
                    <p className="text-slate-500 dark:text-slate-400 mt-1">Invest in Swiss-compliant parametric risks, secured by a fully funded blockchain infrastructure.</p>
                </div>

                {/* BARRE DE FILTRES */}
                <div className="w-full flex flex-wrap items-center gap-2 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-transparent via-pink-50/30 to-pink-200/50 dark:from-transparent dark:via-pink-900/10 dark:to-pink-800/30 p-2 rounded-xl">
                    <span className="text-xs font-bold text-slate-400 px-2 uppercase tracking-wide flex items-center gap-1"><Globe className="h-4 w-4" /> Network</span>
                    {AVAILABLE_CHAINS.filter(chain => vaultsOfActiveTheme.some(v => v.chain === chain && (selectedCategory === 'All' || v.category === selectedCategory))).map(chain => (
                        <button
                            key={chain}
                            onClick={() => toggleChainFilter(chain)}
                            title={chain}
                            className={`p-2 rounded-lg transition-all border ${
                                selectedChains.includes(chain)
                                ? 'bg-blue-100 dark:bg-blue-900/50 border-blue-500 shadow-sm'
                                : 'bg-white dark:bg-slate-700/50 border-slate-200 dark:border-slate-600 hover:border-blue-300'
                            }`}
                        >
                            <img src={CHAIN_LOGOS[chain]} alt={chain} className="w-6 h-6 object-contain" />
                        </button>
                    ))}

                    <div className="ml-auto flex items-center gap-2">
                        <div className="flex bg-white dark:bg-slate-700 rounded-lg p-1 border border-slate-200 dark:border-slate-600">
                            <button
                                onClick={() => setViewMode('list')}
                                className={`p-1.5 rounded-md transition-all ${viewMode === 'list' ? 'bg-slate-100 dark:bg-slate-600 text-slate-900 dark:text-white shadow-sm' : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-200'}`}
                                title="Vue Liste"
                            >
                                <List className="h-4 w-4" />
                            </button>
                            <button
                                onClick={() => setViewMode('grid')}
                                className={`p-1.5 rounded-md transition-all ${viewMode === 'grid' ? 'bg-slate-100 dark:bg-slate-600 text-slate-900 dark:text-white shadow-sm' : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-200'}`}
                                title="Vue Grille"
                            >
                                <LayoutGrid className="h-4 w-4" />
                            </button>
                        </div>

                        {(selectedChains.length > 0 || searchQuery || aprSort !== 'neutral' || maturitySort !== 'neutral') && (
                            <button onClick={() => { setSelectedChains([]); setSearchQuery(''); setAprSort('neutral'); setMaturitySort('neutral'); }} className="px-2 py-1 text-xs text-slate-400 hover:text-slate-600 dark:hover:text-slate-200">
                                Reset Filtres
                            </button>
                        )}
                    </div>
                </div>

                {/* TRI ET RECHERCHE */}
                <div className="flex flex-wrap items-center gap-3">
                    {/* BOUTON TRI APR */}
                    <button
                        onClick={toggleAprSort}
                        className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all border select-none ${
                            aprSort !== 'neutral'
                            ? 'bg-blue-50 dark:bg-blue-900/30 border-blue-200 dark:border-blue-800 text-blue-700 dark:text-blue-300 shadow-sm'
                            : 'bg-white dark:bg-slate-800/30 border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-700'
                        }`}
                    >
                        <span className="font-bold text-sm">APR</span>
                        {aprSort === 'neutral' && <span className="text-slate-300">⇅</span>}
                        {aprSort === 'desc' && <span>↓</span>}
                        {aprSort === 'asc' && <span>↑</span>}
                    </button>

                    {/* BOUTON TRI MATURITE */}
                    <button
                        onClick={toggleMaturitySort}
                        className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all border select-none ${
                            maturitySort !== 'neutral'
                            ? 'bg-indigo-50 dark:bg-indigo-900/30 border-indigo-200 dark:border-indigo-800 text-indigo-700 dark:text-indigo-300 shadow-sm'
                            : 'bg-white dark:bg-slate-800/30 border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-700'
                        }`}
                    >
                        <span className="font-bold text-sm">Maturity</span>
                        {maturitySort === 'neutral' && <span className="text-slate-300">⇅</span>}
                        {maturitySort === 'asc' && <span>→</span>}
                        {maturitySort === 'desc' && <span>←</span>}
                    </button>

                    {/* BOUTON TRI RISK */}
                    <button
                        onClick={toggleRiskSort}
                        className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all border select-none ${
                            riskSort !== 'neutral'
                            ? 'bg-indigo-50 dark:bg-indigo-900/30 border-indigo-200 dark:border-indigo-800 text-indigo-700 dark:text-indigo-300 shadow-sm'
                            : 'bg-white dark:bg-slate-800/30 border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-700'
                        }`}
                    >
                        <span className="font-bold text-sm">Risk</span>
                        {riskSort === 'neutral' && <span className="text-slate-300">⇅</span>}
                        {riskSort === 'asc' && <span>↓</span>}
                        {riskSort === 'desc' && <span>↑</span>}
                    </button>

                    {/* CONTENEUR DROITE : FILTRE CATEGORIE + RECHERCHE */}
                    <div className="ml-auto flex items-center gap-3 flex-1 justify-end max-w-[500px]">

                        {/* MENU DEROULANT CATEGORIE (STYLE BOUTON) */}
                        <div className="relative shrink-0">
                            <select
                                value={selectedCategory}
                                onChange={(e) => setSelectedCategory(e.target.value)}
                                className={`appearance-none pl-4 pr-8 py-2 rounded-xl transition-all border outline-none font-bold text-sm cursor-pointer ${
                                    selectedCategory !== 'All'
                                    ? 'bg-purple-50 dark:bg-purple-900/30 border-purple-200 dark:border-purple-800 text-purple-700 dark:text-purple-300 shadow-sm'
                                    : 'bg-white dark:bg-slate-800/30 border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-700'
                                }`}
                            >
                                {availableCategories.map(cat => (
                                    <option key={cat} value={cat} className="text-slate-900 dark:text-slate-100 bg-white dark:bg-slate-800">
                                        {cat === 'All' ? 'Categories' : cat}
                                    </option>
                                ))}
                            </select>
                            {/* Petite flèche personnalisée pour ressembler aux flèches des boutons de tri */}
                            <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                            </div>
                        </div>

                        {/* CHAMP RECHERCHE */}
                        <div className="relative flex-1 min-w-[200px]">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <Search className="h-4 w-4 text-slate-400" />
                            </div>
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="block w-full pl-10 pr-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-sm"
                                placeholder="Search (e.g., USDC...)"
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* LISTE DES VAULTS (Utilisation du composant extrait) */}
            <div className={`grid gap-6 ${viewMode === 'grid' ? 'grid-cols-1 lg:grid-cols-2' : 'grid-cols-1'}`}>
                {filteredVaults.length === 0 ? (
                    <div className="col-span-full py-12 text-center text-slate-400 bg-slate-50 dark:bg-slate-900/50 rounded-2xl border border-dashed border-slate-200 dark:border-slate-700">
                        No vault found with these criteria.
                    </div>
                ) : (
                    filteredVaults.map((vault) => (
                        <VaultCard
                            key={vault.id}
                            vault={vault}
                            viewMode={viewMode}
                            onClick={() => onVaultSelect(vault.id)}
                        />
                    ))
                )}
            </div>
        </div>
    );
};

export default MarketplacePage;
