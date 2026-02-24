import React from 'react';
import { formatCurrency } from '../../utils/formatting';

const InsurerVaultCard = ({ vault, isCompact, onInitialize }) => {
    return (
        <div className={`bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl p-6 flex flex-col ${!isCompact ? 'md:flex-row' : ''} items-center justify-between gap-6 hover:shadow-md transition-shadow cursor-pointer`}>
            {/* MODE COMPACT (QUAND LE FORMULAIRE EST OUVERT) */}
            {isCompact ? (
                <div className="flex justify-between items-center w-full">
                    <div className="min-w-0">
                        <h4 className="font-bold text-slate-900 dark:text-white truncate">{vault.name}</h4>
                        <p className="text-xs text-slate-500 dark:text-slate-400 font-mono truncate">{vault.id}</p>
                    </div>
                    <div className="shrink-0 ml-2">
                        {vault.status === 'PENDING' && <span className="px-2.5 py-1 bg-amber-100 dark:bg-amber-900/50 text-amber-700 dark:text-amber-400 text-xs font-bold rounded-md">PENDING</span>}
                        {vault.status === 'OPEN' && <span className="px-2.5 py-1 bg-green-100 dark:bg-green-900/50 text-green-700 dark:text-green-400 text-xs font-bold rounded-md">ACTIVE</span>}
                    </div>
                </div>
            ) : (
            /* MODE NORMAL (QUAND LE FORMULAIRE EST FERMÉ) */
                <>
                    <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                            <h4 className="text-lg font-bold text-slate-900 dark:text-white">{vault.name}</h4>
                            {vault.status === 'PENDING' && <span className="px-2.5 py-1 bg-amber-100 dark:bg-amber-900/50 text-amber-700 dark:text-amber-400 text-xs font-bold rounded-md">PENDING</span>}
                            {vault.status === 'OPEN' && <span className="px-2.5 py-1 bg-green-100 dark:bg-green-900/50 text-green-700 dark:text-green-400 text-xs font-bold rounded-md">ACTIVE</span>}
                            {vault.status === 'MATURED' && <span className="px-2.5 py-1 bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-400 text-xs font-bold rounded-md">ENDED</span>}
                        </div>
                        <div className="flex gap-6 text-sm text-slate-500 dark:text-slate-400">
                            <span>Capacity: <strong>{formatCurrency(vault.totalCapacity)}</strong></span>
                            <span>Junior: <strong>{formatCurrency(vault.juniorCapital)}</strong></span>
                        </div>
                    </div>

                    {vault.status === 'PENDING' ? (
                        <div className="flex flex-col items-end gap-2 w-full md:w-auto">
                            <div className="text-right">
                                <p className="text-xs text-slate-500 dark:text-slate-400 mb-1">Total to fund (Junior + Premium)</p>
                                <p className="font-bold text-slate-900 dark:text-white">{formatCurrency(vault.juniorCapital + vault.premium)}</p>
                            </div>
                            <button
                                onClick={(e) => { e.stopPropagation(); onInitialize(vault.id); }}
                                className="w-full md:w-auto px-6 py-2.5 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg transition-colors shadow-sm"
                            >
                                Fund & Open
                            </button>
                        </div>
                    ) : (
                        <div className="flex items-center gap-4 bg-slate-50 dark:bg-slate-900/50 px-4 py-2 rounded-xl border border-slate-100 dark:border-slate-700">
                            <div className="text-right"><p className="text-xs text-slate-400 dark:text-slate-500">Funds Raised</p><p className="font-bold text-slate-700 dark:text-slate-300">{formatCurrency(vault.currentAssets)}</p></div>
                            <div className="h-8 w-px bg-slate-200 dark:bg-slate-700"></div>
                            <div className="text-right"><p className="text-xs text-slate-400 dark:text-slate-500">Public APR</p><p className="font-bold text-green-600 dark:text-green-400">{vault.apr}%</p></div>
                        </div>
                    )}
                </>
            )}
        </div>
    );
};

export default InsurerVaultCard;
