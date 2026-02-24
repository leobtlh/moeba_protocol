import React, { useState } from 'react';
import { Plus, Minimize2, Calendar } from '../ui/Icons';
import { AVAILABLE_CHAINS, AVAILABLE_ASSETS, MONTHS } from '../../constants/mocks';
import { formatCurrency, getMaxDays } from '../../utils/formatting';
import { updateJunior } from '../../utils/finance';
import { generateMockHistory } from '../../utils/generators';

const CreateVaultForm = ({ isExpanded, onToggle, onCreate, userAddress }) => {
    // --- LOCAL STATE DU FORMULAIRE ---
    const [newVaultData, setNewVaultData] = useState({
        name: '',
        description: '',
        cap: 40000000,
        coverage: 40000000,
        juniorPercent: 10,
        junior: 4000000,
        premium: 330000,
        startDay: '',
        startMonth: 'January',
        startYear: new Date().getFullYear(),
        day: '',
        month: 'January',
        year: new Date().getFullYear(),
        chain: 'Base',
        asset: 'USDC'
    });
    const [isOvercollateralized, setIsOvercollateralized] = useState(false);

    // --- HELPERS LOGIQUES ---
    const handleDateBlur = () => {
        setNewVaultData(current => {
            const today = new Date();
            today.setHours(0, 0, 0, 0);
            const currentYear = today.getFullYear();

            const getValidDateObj = (d, mName, y) => {
                const mIndex = MONTHS.findIndex(m => m.name === mName);
                const safeY = Math.max(parseInt(y) || currentYear, currentYear);
                const daysInMonth = new Date(safeY, mIndex + 1, 0).getDate();
                const safeD = Math.min(Math.max(1, parseInt(d) || 1), daysInMonth);
                return new Date(safeY, mIndex, safeD);
            };

            let sDate = getValidDateObj(current.startDay, current.startMonth, current.startYear);
            if (sDate < today) {
                const targetDay = sDate.getDate();
                let nextM = sDate.getMonth() + 1;
                let nextY = sDate.getFullYear();
                if (nextM > 11) { nextM = 0; nextY++; }
                const daysInNextMonth = new Date(nextY, nextM + 1, 0).getDate();
                sDate = new Date(nextY, nextM, Math.min(targetDay, daysInNextMonth));
            }
            if (sDate <= today) {
                sDate = new Date(today);
                sDate.setDate(today.getDate() + 1);
            }

            let eDate = getValidDateObj(current.day, current.month, current.year);
            if (eDate.getMonth() === sDate.getMonth() && eDate.getFullYear() === sDate.getFullYear() && eDate.getDate() < sDate.getDate()) {
                eDate.setMonth(eDate.getMonth() + 1);
            }
            if (eDate <= sDate) {
                eDate = new Date(sDate);
                eDate.setDate(sDate.getDate() + 1);
            }

            return {
                ...current,
                startDay: sDate.getDate(),
                startMonth: MONTHS[sDate.getMonth()].name,
                startYear: sDate.getFullYear(),
                day: eDate.getDate(),
                month: MONTHS[eDate.getMonth()].name,
                year: eDate.getFullYear()
            };
        });
    };

    const handleCapBlur = () => {
        setNewVaultData(prev => {
            let val = parseFloat(prev.cap);
            if (isNaN(val) || val <= 0) val = 1000;
            const updatedJunior = updateJunior(val, prev.juniorPercent);
            return { ...prev, cap: val, junior: updatedJunior };
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        let capVal = parseFloat(newVaultData.cap);
        if (isNaN(capVal) || capVal <= 0) capVal = 1000;
        let premiumVal = parseFloat(newVaultData.premium) || 0;
        if (premiumVal < 0) premiumVal = 0;
        let claimVal = isOvercollateralized ? (parseFloat(newVaultData.coverage) || capVal) : capVal;

        const finalDescription = newVaultData.description && newVaultData.description.trim() !== ""
            ? newVaultData.description
            : "Parametric Protection (auto-generated)";

        // FIX DATES : Sécurisation avec un fallback si le champ est resté vide
        const mIndexStart = MONTHS.findIndex(m => m.name === newVaultData.startMonth);
        const safeStartDay = parseInt(newVaultData.startDay) || new Date().getDate();
        const safeStartYear = parseInt(newVaultData.startYear) || new Date().getFullYear();
        const startDate = new Date(safeStartYear, mIndexStart, safeStartDay);

        const mIndexEnd = MONTHS.findIndex(m => m.name === newVaultData.month);
        const safeEndDay = parseInt(newVaultData.day) || 1;
        const safeEndYear = parseInt(newVaultData.year) || new Date().getFullYear();
        const endDate = new Date(safeEndYear, mIndexEnd, safeEndDay);

        const formatDateStr = (date) => `${date.getDate()} ${MONTHS[date.getMonth()].name} ${date.getFullYear()}`;

        // Calcul APR
        const diffTime = Math.abs(endDate - startDate);
        const durationInDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) || 365;
        const juniorVal = parseFloat(newVaultData.junior || 0);

        const newVault = {
            name: newVaultData.name || "New Cat Bond",
            insurer: newVaultData.companyName || `Insurer (${userAddress})`,
            description: finalDescription,
            totalCapacity: capVal + premiumVal,
            claimAmount: claimVal,
            juniorCapital: juniorVal,
            premium: premiumVal,
            startDate: formatDateStr(startDate),
            maturityDate: formatDateStr(endDate),
            apr: ((capVal - juniorVal) > 0 ? ((premiumVal * 100 * 365) / ((capVal - juniorVal) * durationInDays)).toFixed(2) : "0.00"),
            chain: newVaultData.chain,
            asset: newVaultData.asset,
            status: 'PENDING', // FIX INITIALISATION : Ajout du status PENDING
            history: generateMockHistory('WIND')
        };

        onCreate(newVault);

        // Reset
        const today = new Date();
        setNewVaultData(prev => ({
            ...prev,
            name: '',
            description: '',
            cap: 40000000,
            startDay: today.getDate(),
            startMonth: MONTHS[today.getMonth()].name,
            startYear: today.getFullYear()
        }));
    };

    return (
        <div
            className={`bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-6 shadow-sm transition-all ${isExpanded ? 'ring-2 ring-indigo-500/20' : ''}`}
            onClick={() => onToggle(true)}
            onFocus={() => onToggle(true)}
        >
            <div className="flex items-center gap-3 mb-6 pb-6 border-b border-slate-100 dark:border-slate-700">
                <div className="p-2 bg-indigo-50 dark:bg-indigo-900/30 rounded-lg text-indigo-600 dark:text-indigo-400"><Plus className="h-5 w-5" /></div>
                <div><h2 className="text-lg font-bold text-slate-900 dark:text-white">New Vault</h2><p className="text-xs text-slate-500 dark:text-slate-400">Factory Deployment</p></div>
                {isExpanded && (
                    <button type="button" onClick={(e) => { e.stopPropagation(); onToggle(false); }} className="ml-auto text-xs bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 px-3 py-1.5 rounded-lg text-slate-500 dark:text-slate-400 font-bold flex items-center gap-1 transition-colors"><Minimize2 className="h-3 w-3" /> Collapse</button>
                )}
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
                <div className={isExpanded ? "grid grid-cols-2 gap-4" : "space-y-4"}>
                    <div className={isExpanded ? "col-span-2" : ""}>
                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Risk Name</label>
                        <input type="text" value={newVaultData.name} onChange={e => setNewVaultData({ ...newVaultData, name: e.target.value })} className="w-full p-3 border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-900 dark:text-white rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all" placeholder="Ex: Florida Wind 2026" />
                    </div>

                    <div className={isExpanded ? "grid grid-cols-2 gap-4 col-span-2" : "grid grid-cols-2 gap-4"}>
                        <div>
                            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Blockchain</label>
                            <select value={newVaultData.chain} onChange={e => setNewVaultData({ ...newVaultData, chain: e.target.value })} className="w-full p-3 border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-900 dark:text-white rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none">
                                {AVAILABLE_CHAINS.map(chain => (<option key={chain} value={chain}>{chain}</option>))}
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Asset (Payment)</label>
                            <select value={newVaultData.asset} onChange={e => setNewVaultData({ ...newVaultData, asset: e.target.value })} className="w-full p-3 border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-900 dark:text-white rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none">
                                {AVAILABLE_ASSETS.map(asset => (<option key={asset} value={asset}>{asset}</option>))}
                            </select>
                        </div>
                    </div>

                    <div className={isExpanded ? "col-span-2" : ""}>
                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Trigger Conditions</label>
                        <textarea value={newVaultData.description} onChange={e => setNewVaultData({ ...newVaultData, description: e.target.value })} className="w-full p-3 border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-900 dark:text-white rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all h-24 resize-none text-sm" placeholder="Conditions..."></textarea>
                    </div>

                    <div className={isExpanded ? "col-span-2 p-3 bg-blue-50 dark:bg-blue-900/10 rounded-xl border border-blue-100 dark:border-blue-800" : "p-3 bg-blue-50 dark:bg-blue-900/10 rounded-xl border border-blue-100 dark:border-blue-800"}>
                        <label className="block text-sm font-bold text-blue-800 dark:text-blue-300 mb-2 flex items-center gap-2"><Calendar className="h-4 w-4" /> Inception Date (Lock)</label>
                        <div className="grid grid-cols-3 gap-2">
                            <input type="number" min="1" max="31" value={newVaultData.startDay} onBlur={handleDateBlur} onChange={e => setNewVaultData({ ...newVaultData, startDay: e.target.value })} className="p-2 rounded-lg border dark:bg-slate-900 dark:border-slate-600" placeholder="DD" />
                            <select value={newVaultData.startMonth} onBlur={handleDateBlur} onChange={e => setNewVaultData({ ...newVaultData, startMonth: e.target.value })} className="p-2 rounded-lg border dark:bg-slate-900 dark:border-slate-600">
                                {MONTHS.map(m => <option key={m.name} value={m.name}>{m.name}</option>)}
                            </select>
                            <input type="number" min="2024" value={newVaultData.startYear} onBlur={handleDateBlur} onChange={e => setNewVaultData({ ...newVaultData, startYear: e.target.value })} className="p-2 rounded-lg border dark:bg-slate-900 dark:border-slate-600" placeholder="YYYY" />
                        </div>
                    </div>

                    <div className={isExpanded ? "grid grid-cols-3 gap-4 col-span-2" : "grid grid-cols-3 gap-4"}>
                        <div><label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">End Day</label><input type="number" min="1" max={getMaxDays(newVaultData.month)} value={newVaultData.day} onBlur={handleDateBlur} onChange={e => setNewVaultData({ ...newVaultData, day: e.target.value })} className="w-full p-3 border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-900 dark:text-white rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none" placeholder="DD" /></div>
                        <div><label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">End Month</label><select value={newVaultData.month} onBlur={handleDateBlur} onChange={e => setNewVaultData({ ...newVaultData, month: e.target.value })} className="w-full p-3 border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-900 dark:text-white rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all">{MONTHS.map(m => (<option key={m.name} value={m.name}>{m.name}</option>))}</select></div>
                        <div><label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">End Year</label><input type="number" min={new Date().getFullYear()} value={newVaultData.year} onBlur={handleDateBlur} onChange={e => setNewVaultData({ ...newVaultData, year: e.target.value })} className="w-full p-3 border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-900 dark:text-white rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none" placeholder="YYYY" /></div>
                    </div>

                    <div className={isExpanded ? "grid grid-cols-2 gap-4 col-span-2" : "grid grid-cols-2 gap-4"}>
                        <div><label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Capacity</label><input type="number" min="0" value={newVaultData.cap} onBlur={handleCapBlur} onChange={e => { const val = e.target.value; setNewVaultData({ ...newVaultData, cap: val, junior: updateJunior(val, newVaultData.juniorPercent) }); }} className="w-full p-3 border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-900 dark:text-white rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none" /></div>
                        <div><label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Junior (%)</label><div className="relative"><input type="number" min="0" max="100" value={newVaultData.juniorPercent} onChange={e => { const val = e.target.value; setNewVaultData({ ...newVaultData, juniorPercent: val, junior: updateJunior(newVaultData.cap, val) }); }} className="w-full p-3 border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-900 dark:text-white rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none" /><span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500 font-bold">%</span></div></div>
                    </div>

                    <div className={isExpanded ? "col-span-2" : ""}>
                        <div className="flex items-center gap-2 mb-2 mt-2">
                            <input type="checkbox" id="overcollat" checked={isOvercollateralized} onChange={(e) => setIsOvercollateralized(e.target.checked)} className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500 border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-900 cursor-pointer" />
                            <label htmlFor="overcollat" className="text-sm text-slate-600 dark:text-slate-400 cursor-pointer select-none font-medium">Enable Over-collateralization</label>
                        </div>
                        {isOvercollateralized && (
                            <div className="mb-4 animate-fade-in p-3 bg-blue-50 dark:bg-blue-900/20 rounded-xl border border-blue-100 dark:border-blue-900">
                                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Insured Amount</label>
                                <div className="relative"><input type="number" min="0" value={newVaultData.coverage} onChange={e => setNewVaultData({ ...newVaultData, coverage: e.target.value })} className="w-full p-3 border border-blue-200 dark:border-blue-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-white rounded-xl focus:ring-2 focus:ring-blue-500 outline-none" /><span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500 font-bold">{newVaultData.asset}</span></div>
                            </div>
                        )}
                    </div>

                    <div className={isExpanded ? "col-span-2" : ""}>
                        <div className="bg-slate-50 dark:bg-slate-900/50 p-3 rounded-xl border border-slate-200 dark:border-slate-700 flex justify-between items-center text-sm">
                            <span className="text-slate-500 dark:text-slate-400">Junior Amount Required:</span>
                            <span className="font-bold text-slate-900 dark:text-white">{formatCurrency(newVaultData.junior)}</span>
                        </div>
                    </div>

                    <div className={isExpanded ? "col-span-2" : ""}>
                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Premium to Pay</label>
                        <div className="relative"><input type="number" min="0" value={newVaultData.premium} onChange={e => setNewVaultData({ ...newVaultData, premium: e.target.value })} className="w-full p-3 pl-3 pr-16 border border-green-200 dark:border-green-800 bg-green-50/30 dark:bg-green-900/20 rounded-xl focus:ring-2 focus:ring-green-500 outline-none text-green-800 dark:text-green-400 font-medium" /><span className="absolute right-4 top-1/2 -translate-y-1/2 text-green-600 dark:text-green-400 text-xs font-bold">{newVaultData.asset}</span></div>
                    </div>
                </div>
                <button type="submit" className="w-full mt-4 bg-slate-900 dark:bg-white text-white dark:text-slate-900 py-3.5 rounded-xl font-bold hover:bg-slate-800 dark:hover:bg-slate-200 transition-all shadow-lg shadow-slate-200 dark:shadow-none">Deploy Contract</button>
            </form>
        </div>
    );
};

export default CreateVaultForm;
