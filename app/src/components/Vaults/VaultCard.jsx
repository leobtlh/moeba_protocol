import React from 'react';
import {
    ArrowRight, CheckCircle2, Lock, Activity, AlertTriangle, Building2
} from '../ui/Icons';
import { formatCurrency } from '../../utils/formatting';
import { isVaultStarted } from '../../utils/finance';

const VaultCard = ({ vault, viewMode = 'grid', onClick }) => {
    const isFull = vault.currentAssets >= vault.totalCapacity;
    const started = isVaultStarted(vault);

    // --- LOGIQUE BARRE DE PROGRESSION ---
    const ProgressBar = ({ heightClass }) => (
        <div className={`w-full bg-slate-100 dark:bg-slate-700 rounded-full ${heightClass} mb-4 overflow-hidden`}>
            <div
                className={`h-full rounded-full transition-all duration-1000 ${
                    vault.status === 'TRIGGERED' ? 'bg-red-500' :
                    vault.status === 'MATURED' ? 'bg-green-500' :
                    isFull ? 'bg-slate-500' : 'bg-blue-600'
                }`}
                style={{ width: `${(vault.currentAssets / vault.totalCapacity) * 100}%` }}
            ></div>
        </div>
    );

    // --- RENDER : MODE LISTE ---
    if (viewMode === 'list') {
        return (
            <div
                onClick={onClick}
                className={`group relative rounded-xl border transition-all cursor-pointer hover:shadow-md
                    ${vault.status === 'TRIGGERED' ? 'bg-red-50/50 dark:bg-red-900/10 border-red-200 dark:border-red-900' :
                    vault.status === 'MATURED' ? 'bg-green-50/50 dark:bg-green-900/10 border-green-200 dark:border-green-900' :
                    isFull && vault.status === 'OPEN' ? 'bg-slate-100/50 dark:bg-slate-800/50 border-slate-300 dark:border-slate-600 opacity-90' :
                    'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 hover:border-blue-300 dark:hover:border-blue-500'}`}
            >
                <div className="p-4 relative flex flex-col md:flex-row md:items-center gap-6">

                    {/* MAIN INFO & BADGES */}
                    <div className="flex-1 min-w-0">
                        <div className="flex flex-wrap items-center gap-2 mb-2">
                            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-slate-100 dark:bg-slate-700 text-slate-500 dark:text-slate-300 border border-slate-200 dark:border-slate-600 uppercase tracking-wider">
                                {vault.chain}
                            </span>
                            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-300 border border-blue-100 dark:border-blue-800 uppercase tracking-wider">
                                {vault.asset}
                            </span>
                            {vault.category && (
                                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-purple-50 dark:bg-purple-900/30 text-purple-600 dark:text-purple-300 border border-purple-100 dark:border-purple-800 uppercase tracking-wider">
                                    {vault.category}
                                </span>
                            )}
                            {/* Badges */}
                            {vault.status === 'OPEN' && !started && !isFull && <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-green-100 dark:bg-green-900/50 text-green-700 dark:text-green-400 flex items-center gap-1"><CheckCircle2 className="h-3 w-3" /> OPEN</span>}
                            {vault.status === 'OPEN' && started && <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-400 flex items-center gap-1"><Lock className="h-3 w-3" /> LOCKED</span>}
                            {vault.status === 'OPEN' && isFull && !started && <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300 flex items-center gap-1"><Lock className="h-3 w-3" /> SOLD OUT</span>}
                            {vault.status === 'MATURED' && <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-green-100 dark:bg-green-900/50 text-green-700 dark:text-green-400 flex items-center gap-1"><CheckCircle2 className="h-3 w-3" /> COMPLETED</span>}
                            {vault.status === 'PENDING' && <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 dark:bg-amber-900/50 text-amber-700 dark:text-amber-400 flex items-center gap-1"><Activity className="h-3 w-3" /> PENDING</span>}
                            {vault.status === 'TRIGGERED' && <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-red-100 dark:bg-red-900/50 text-red-700 dark:text-red-400 flex items-center gap-1"><AlertTriangle className="h-3 w-3" /> DISASTER</span>}
                        </div>
                        <h3 className="text-xl font-bold text-slate-900 dark:text-white truncate group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">{vault.name}</h3>
                        <p className="text-sm text-slate-500 dark:text-slate-400 truncate flex items-center gap-1 mt-1">
                            <Building2 className="h-3 w-3" /> {vault.sponsor}
                        </p>
                    </div>

                    <div className="w-full max-w-[500px] grid grid-cols-[auto_0.5fr_auto_0.5fr_auto_1.6fr] items-center gap-4">
                        {/* SEPARATEUR */}
                        <div className="h-8 w-px bg-slate-200 dark:bg-slate-700 mx-auto"></div>

                        {/* BLOC 1 : RISQUE */}
                        <div className="flex flex-col items-start">
                            <span className="text-sm text-slate-400 dark:text-slate-500">Risk</span>
                            <span className={`text-ml font-bold ${vault.riskProb > 10 ? 'text-red-600 dark:text-red-400' : 'text-orange-500 dark:text-orange-400'}`}>
                                {vault.riskProb}%
                            </span>
                        </div>

                        {/* SEPARATEUR */}
                        <div className="h-8 w-px bg-slate-200 dark:bg-slate-700 mx-auto"></div>

                        {/* BLOC 2 : APR */}
                        <div className="flex flex-col items-start">
                            <span className="text-sm text-slate-400 dark:text-slate-500">APR</span>
                            <span className={`text-ml font-bold leading-none ${
                                vault.status === 'OPEN' || vault.status === 'MATURED'
                                ? 'text-green-600 dark:text-green-400'
                                : 'text-slate-400 dark:text-slate-500'
                            }`}>
                                {vault.apr}%
                            </span>
                        </div>

                        {/* SEPARATEUR */}
                        <div className="h-8 w-px bg-slate-200 dark:bg-slate-700 mx-auto"></div>

                        {/* BLOC 3 : LEVÉE */}
                        <div className="flex flex-col items-start">
                            <span className="text-sm text-slate-400 dark:text-slate-500">Funds raised</span>
                            <span className="text-ml font-bold text-slate-700 dark:text-slate-300">
                                {formatCurrency(vault.currentAssets)}
                                <span className="text-slate-400 dark:text-slate-500 text-sm font-normal ml-1">
                                    / {formatCurrency(vault.totalCapacity)}
                                </span>
                            </span>
                        </div>
                    </div>

                    {/* DÉBUT ET MATURITÉ */}
                    <div className="flex flex-wrap items-center gap-14 justify-end pr-[74px] relative">
                        {/* BOXES */}
                        <div className="flex flex-col gap-4">
                            <div className="w-[350px] h-[70px] relative flex items-center gap-4 bg-slate-50 dark:bg-slate-900/50 px-4 py-4 rounded-xl border border-slate-100 dark:border-slate-700 shrink-0">
                                <div>
                                    <p className="text-sm text-slate-400 dark:text-slate-500">Beginning</p>
                                    <p className="text-sm font-bold text-slate-700 dark:text-slate-300">{vault.startDate || 'N/A'}</p>
                                </div>

                                {/* Barre centrale */}
                                <div
                                className="absolute top-1/2 -translate-y-1/2 flex items-center gap-10 pointer-events-none"
                                style={{ left: '50%' }}
                                >
                                    <div className="h-8 w-px bg-slate-200 dark:bg-slate-700"></div>
                                </div>

                                <div className="absolute top-1/2 -translate-y-1/2 right-4 flex items-center gap-10 pointer-events-none">
                                    <div className="text-right">
                                        <p className="text-sm text-slate-400 dark:text-slate-500">Maturity</p>
                                        <p className="text-sm font-bold text-slate-700 dark:text-slate-300">{vault.maturityDate}</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* ARROW */}
                        <div className="absolute right-0 top-1/2 -translate-y-1/2 text-slate-300 dark:text-slate-600 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors hidden md:block">
                            <ArrowRight className="h-5 w-5" />
                        </div>
                    </div>
                </div>

                <div className="pl-4 pr-[90px]">
                    <ProgressBar heightClass="h-2" />
                </div>
            </div>
        );
    }

    // --- RENDER : MODE GRILLE (Par défaut) ---
    return (
        <div
            onClick={onClick}
            className={`group relative bg-white dark:bg-slate-800 rounded-2xl border transition-all cursor-pointer
                ${vault.status === 'TRIGGERED' ? 'border-red-200 dark:border-red-900 bg-red-50/50 dark:bg-red-900/20' :
                vault.status === 'MATURED' ? 'border-green-200 dark:border-green-900 bg-green-50/50 dark:bg-green-900/20' :
                isFull && vault.status === 'OPEN' ? 'border-slate-300 dark:border-slate-600 bg-slate-100/50 dark:bg-slate-800/50 opacity-90' :
                'border-slate-200 dark:border-slate-700 hover:border-blue-300 dark:hover:border-blue-500 hover:shadow-lg'}`}
        >
            <div className="absolute top-6 right-6 flex flex-col items-end gap-2">
                {/* BADGES GRILLE */}
                {vault.status === 'OPEN' && !started && !isFull && <span className="px-3 py-1 rounded-full text-xs font-bold bg-green-100 dark:bg-green-900/50 text-green-700 dark:text-green-400 flex items-center gap-1"><CheckCircle2 className="h-3 w-3" /> OPEN</span>}
                {vault.status === 'OPEN' && started && <span className="px-3 py-1 rounded-full text-xs font-bold bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-400 flex items-center gap-1"><Lock className="h-3 w-3" /> LOCKED</span>}
                {vault.status === 'OPEN' && isFull && !started && <span className="px-3 py-1 rounded-full text-xs font-bold bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300 flex items-center gap-1"><Lock className="h-3 w-3" /> SOLD OUT</span>}
                {vault.status === 'MATURED' && <span className="px-3 py-1 rounded-full text-xs font-bold bg-green-100 dark:bg-green-900/50 text-green-700 dark:text-green-400 flex items-center gap-1"><CheckCircle2 className="h-3 w-3" /> OVER</span>}
                {vault.status === 'PENDING' && <span className="px-3 py-1 rounded-full text-xs font-bold bg-amber-100 dark:bg-amber-900/50 text-amber-700 dark:text-amber-400 flex items-center gap-1"><Activity className="h-3 w-3" /> PENDING</span>}
                {vault.status === 'TRIGGERED' && <span className="px-3 py-1 rounded-full text-xs font-bold bg-red-100 dark:bg-red-900/50 text-red-700 dark:text-red-400 flex items-center gap-1"><AlertTriangle className="h-3 w-3" /> DISASTER</span>}
            </div>

            <div className="p-6">
                <div className="mb-6">
                    <div className="flex gap-2 mb-3">
                        <span className="px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-700 text-[10px] font-bold text-slate-500 dark:text-slate-300 border border-slate-200 dark:border-slate-600 uppercase tracking-wider">
                            {vault.chain}
                        </span>
                        <span className="px-2 py-0.5 rounded-md bg-blue-50 dark:bg-blue-900/30 text-[10px] font-bold text-blue-600 dark:text-blue-300 border border-blue-100 dark:border-blue-800 uppercase tracking-wider">
                            {vault.asset}
                        </span>
                        {vault.category && (
                            <span className="px-2 py-0.5 rounded-md bg-purple-50 dark:bg-purple-900/30 text-[10px] font-bold text-purple-600 dark:text-purple-300 border border-purple-100 dark:border-purple-800 uppercase tracking-wider">
                                {vault.category}
                            </span>
                        )}
                    </div>

                    <h3 className="text-xl font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">{vault.name}</h3>
                    <p className="text-sm text-slate-500 dark:text-slate-400 mt-1 flex items-center gap-2">
                        <Building2 className="h-3 w-3" /> Sponsor: {vault.sponsor}
                    </p>
                </div>

                <div className="flex justify-between items-end mb-6">
                    <div>
                        <p className="text-sm text-slate-500 dark:text-slate-400 mb-1">Yield (APR)</p>
                        <p className={`text-4xl font-bold ${vault.status === 'OPEN' ? 'text-green-600 dark:text-green-400' : 'text-slate-400 dark:text-slate-500'}`}>
                            {vault.apr}%
                        </p>
                    </div>
                    <div className="text-right">
                        <p className="text-sm text-slate-500 dark:text-slate-400 mb-1">Funds raised</p>
                        <p className="text-lg font-semibold text-slate-900 dark:text-white">
                            {formatCurrency(vault.currentAssets)} <span className="text-slate-400 dark:text-slate-500 text-sm font-normal">/ {formatCurrency(vault.totalCapacity)}</span>
                        </p>
                    </div>
                </div>

                <div className="flex justify-between items-center mb-3">
                    <span className="text-sm font-medium text-slate-500 dark:text-slate-400 flex items-center gap-1">
                        <AlertTriangle className="h-3 w-3 text-orange-500" /> Probability of loss
                    </span>
                    <span className={`text-sm font-bold ${vault.riskProb > 10 ? 'text-red-600 dark:text-red-400' : 'text-orange-500 dark:text-orange-400'}`}>
                        {vault.riskProb}%
                    </span>
                </div>

                <ProgressBar heightClass="h-3" />

                <div className="grid grid-cols-2 gap-4 mb-6 text-sm">
                    <div className="bg-slate-50 dark:bg-slate-900/50 p-3 rounded-lg border border-slate-100 dark:border-slate-700">
                        <p className="text-slate-500 dark:text-slate-400 text-xs uppercase tracking-wider mb-1">Inception Date (Lock)</p>
                        <p className="font-semibold text-slate-900 dark:text-white">{vault.startDate || 'N/A'}</p>
                    </div>
                    <div className="bg-slate-50 dark:bg-slate-900/50 p-3 rounded-lg border border-slate-100 dark:border-slate-700">
                        <p className="text-slate-500 dark:text-slate-400 text-xs uppercase tracking-wider mb-1">Maturity (Unlock)</p>
                        <p className="font-semibold text-slate-900 dark:text-white">{vault.maturityDate}</p>
                    </div>
                </div>

                <div className="flex justify-center items-center gap-2 text-blue-600 dark:text-blue-400 text-sm font-medium">
                    <span>View details {vault.status === 'OPEN' && !isFull ? '& Invest' : ''}</span> <ArrowRight className="h-4 w-4" />
                </div>
            </div>
        </div>
    );
};

export default VaultCard;
