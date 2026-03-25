import React, { useState, useEffect } from 'react';
import { Plus, Minimize2, Calendar, ShieldCheck } from '../ui/Icons';
import { AVAILABLE_CHAINS, AVAILABLE_ASSETS, MONTHS } from '../../constants/mocks';
import { formatCurrency, getMaxDays } from '../../utils/formatting';
import { updateJunior } from '../../utils/finance';
import { generateMockHistory } from '../../utils/generators';

// --- DICTIONNAIRE DES CATÉGORIES SPÉCIFIQUES ---
const THEME_CATEGORIES = {
    climate: ['Hurricane', 'Earthquake', 'Wildfire', 'Flood', 'Avalanche', 'Landslide'],
    cyber: ['Smart Contract Exploit', 'IT System Outage'],
    business: ['Revenue Drop', 'Supply Chain Delay'],
    flight: ['Mass Cancellation', 'Airspace Closure', 'Airport Strike'],
    realestate: ['Flood', 'Earthquake', 'Fire'],
    maritime: ['Vessel Sinking (IoT Tilt)', 'Cargo Spoilage (IoT Temp)'],
    default: ['Custom Protocol']
};

const CreateVaultForm = ({ isExpanded, onToggle, onCreate, userAddress, activeTheme = 'climate' }) => {

    const availableCategories = THEME_CATEGORIES[activeTheme] || THEME_CATEGORIES.default;

    // --- LOCAL STATE DU FORMULAIRE ---
    const [newVaultData, setNewVaultData] = useState({
        name: '',
        category: availableCategories[0],

        // Localisation
        country: '',
        region: '',
        city: '',
        radius: 50,

        // Paramètres dynamiques
        triggerParams: {
            windSpeed: 180, hurricaneCategory: 3, magnitude: 6.0, acresBurned: 10000, avalancheSize: 4, soilDisplacement: 50000, // Climate
            fundsStolenUSD: 1000000, downtimeHours: 12, // Cyber
            revenueDropPercent: 30, daysDelayed: 10, // Business
            flightsCanceled: 50, hoursClosed: 24, daysDuration: 2, // Flight
            waterLevelCm: 15, sensorMagnitude: 5.5, temperature: 60, duration: 30, // Real Estate (Sensors IoT)
            tiltAngle: 30, // Maritime (Sensors IoT)
            customMetric: 'Specific condition', customThreshold: 'Threshold value' // Generic
        },

        cap: 40000000, coverage: 40000000, juniorPercent: 10, junior: 4000000, premium: 330000,
        startDay: '', startMonth: 'January', startYear: new Date().getFullYear(),
        day: '', month: 'January', year: new Date().getFullYear(),
        chain: 'Base', asset: 'USDC'
    });

    const [isOvercollateralized, setIsOvercollateralized] = useState(false);

    // --- CHANGER DE CATÉGORIE SI LE THÈME CHANGE ---
    useEffect(() => {
        const categoriesForTheme = THEME_CATEGORIES[activeTheme] || THEME_CATEGORIES.default;
        setNewVaultData(prev => ({
            ...prev,
            category: categoriesForTheme[0]
        }));
    }, [activeTheme]);

    // --- GENERATEUR DE CONDITION UMA ORACLE (VERSION JSX STYLISEE) ---
    const generateOracleDescription = (data) => {
        const { category, country, region, city, radius, triggerParams: p } = data;
        const locParts = [city, region, country].filter(Boolean);
        const locationStr = locParts.length > 0 ? locParts.join(', ') : 'Global / Unspecified';
        const assetName = data.name || "TBD (Asset)";

        const companyIdentity = "Simulation SA";
        const companyUid = "CHE-114.123.456";

        const coverageStart = `${data.startDay || '?'} ${data.startMonth} ${data.startYear}`;
        const coverageEnd = `${data.day || '?'} ${data.month} ${data.year}`;

        // Composant interne pour créer une belle ligne de donnée
        const ConditionRow = ({ label, value, subtext }) => (
            <div className="flex flex-col sm:flex-row sm:items-baseline sm:gap-2 border-b border-slate-100 dark:border-slate-700/50 pb-1.5 mb-1.5 last:border-0 last:pb-0 last:mb-0">
                <span className="text-slate-500 dark:text-slate-400 text-sm font-medium sm:min-w-[220px]">{label} :</span>
                <div>
                    <span className="font-bold text-slate-900 dark:text-white">{value}</span>
                    {subtext && <span className="text-xs text-slate-400 dark:text-slate-500 font-normal ml-2">({subtext})</span>}
                </div>
            </div>
        );

        let conditionsJsx = null;

        if (activeTheme === 'realestate') {
            if (category === 'Fire') conditionsJsx = <><ConditionRow label="Event Type" value="Fire" /><ConditionRow label="Continuous Temperature" value={`> ${p.temperature}°C`} /><ConditionRow label="Duration" value={p.duration} subtext="mins" /></>;
            else if (category === 'Flood') conditionsJsx = <><ConditionRow label="Event Type" value="Indoor Flooding" /><ConditionRow label="Water Level" value={`> ${p.waterLevelCm}`} subtext="cm on wall sensor" /></>;
            else if (category === 'Earthquake') conditionsJsx = <><ConditionRow label="Event Type" value="Seismic Damage" /><ConditionRow label="Vibration Magnitude" value={`≥ ${p.sensorMagnitude}`} subtext="Mw eq." /></>;
        } else if (activeTheme === 'maritime') {
            if (category === 'Vessel Sinking (IoT Tilt)') conditionsJsx = <><ConditionRow label="Event Type" value="Critical Maritime Incident" /><ConditionRow label="Sustained Tilt Angle" value={`> ${p.tiltAngle}°`} /><ConditionRow label="Continuous Duration" value={p.duration} subtext="hours" /></>;
            else if (category === 'Cargo Spoilage (IoT Temp)') conditionsJsx = <><ConditionRow label="Event Type" value="Cargo Spoilage" /><ConditionRow label="Temperature Exceeded" value={`> ${p.temperature}°C`} /><ConditionRow label="Duration" value={p.duration} subtext="hours" /></>;
        } else if (activeTheme === 'cyber') {
            if (category === 'Smart Contract Exploit') conditionsJsx = <><ConditionRow label="Event Type" value="Smart Contract Exploit" /><ConditionRow label="Illicitly Drained Funds" value={`> $${p.fundsStolenUSD}`} /></>;
            else if (category === 'IT System Outage') conditionsJsx = <><ConditionRow label="Event Type" value="IT System Outage" /><ConditionRow label="Continuous API Downtime" value={`> ${p.downtimeHours}`} subtext="hours" /></>;
        } else if (activeTheme === 'business') {
            if (category === 'Revenue Drop') conditionsJsx = <><ConditionRow label="Event Type" value="Business Interruption" /><ConditionRow label="Revenue Drop" value={`> ${p.revenueDropPercent}%`} subtext="vs 30d avg" /></>;
            else if (category === 'Supply Chain Delay') conditionsJsx = <><ConditionRow label="Event Type" value="Supply Chain Disruption" /><ConditionRow label="Delivery Delay" value={`> ${p.daysDelayed}`} subtext="days, critical materials" /></>;
        } else if (activeTheme === 'flight') {
            if (category === 'Mass Cancellation') conditionsJsx = <><ConditionRow label="Event Type" value="Mass Cancellation" /><ConditionRow label="Canceled Flights" value={`> ${p.flightsCanceled}`} subtext="within 24h window" /></>;
            else if (category === 'Airspace Closure') conditionsJsx = <><ConditionRow label="Event Type" value="Airspace Closure" /><ConditionRow label="Official Closure Duration" value={`> ${p.hoursClosed}`} subtext="hours" /></>;
            else if (category === 'Airport Strike') conditionsJsx = <><ConditionRow label="Event Type" value="Airport Strike" /><ConditionRow label="Strike Duration" value={`≥ ${p.daysDuration}`} subtext="days" /></>;
        } else {
            // CLIMATE & Default
            if (category === 'Hurricane') conditionsJsx = <><ConditionRow label="Event Type" value="Hurricane" /><ConditionRow label="Min. Wind Speed" value={p.windSpeed} subtext="km/h" /><ConditionRow label="Category" value={`${p.hurricaneCategory}+`} subtext="Saffir-Simpson" /></>;
            else if (category === 'Earthquake') conditionsJsx = <><ConditionRow label="Event Type" value="Earthquake" /><ConditionRow label="Moment Magnitude" value={`≥ ${p.magnitude}`} subtext="Mw" /></>;
            else if (category === 'Wildfire') conditionsJsx = <><ConditionRow label="Event Type" value="Wildfire" /><ConditionRow label="Contiguous Area Burned" value={`> ${p.acresBurned}`} subtext="acres" /></>;
            else if (category === 'Flood') conditionsJsx = <><ConditionRow label="Event Type" value="Flood" /><ConditionRow label="Water Level Above Baseline" value={`> ${p.waterLevelCm}`} subtext="meters" /><ConditionRow label="Measurement Duration" value={p.duration} subtext="hours" /></>;
            else if (category === 'Avalanche') conditionsJsx = <><ConditionRow label="Event Type" value="Avalanche" /><ConditionRow label="Destructive Scale Size" value={`≥ ${p.avalancheSize}`} /></>;
            else if (category === 'Landslide') conditionsJsx = <><ConditionRow label="Event Type" value="Landslide" /><ConditionRow label="Soil Displacement" value={`> ${p.soilDisplacement}`} subtext="m³" /><ConditionRow label="Timeframe" value={p.duration} subtext="hours" /></>;
            else conditionsJsx = <><ConditionRow label="Event Type" value="Custom Event" /><ConditionRow label="Metric" value={p.customMetric} /><ConditionRow label="Threshold" value={`> ${p.customThreshold}`} /></>;
        }

        return (
            <div className="flex flex-col gap-5 font-sans">
                {/* General Info */}
                <div className="bg-white dark:bg-slate-900/40 p-5 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm">
                    <h4 className="font-extrabold text-slate-900 dark:text-white uppercase tracking-wider text-xs mb-4 pb-2 border-b border-slate-100 dark:border-slate-700/50 flex items-center gap-2">
                        Target & Coverage
                    </h4>
                    <ConditionRow label="Insured Entity" value={companyIdentity} subtext={`UID: ${companyUid}`} />
                    <ConditionRow label="Protected Asset" value={assetName} />
                    <ConditionRow label="Target Scope" value={locationStr} subtext={radius && activeTheme === 'climate' ? `Radius: ${radius} km` : null} />
                    <ConditionRow label="Coverage Period" value={`${coverageStart} to ${coverageEnd}`} />
                </div>

                {/* Trigger Thresholds */}
                <div className="bg-indigo-50/40 dark:bg-indigo-900/10 p-5 rounded-xl border border-indigo-100 dark:border-indigo-800/30 shadow-sm">
                    <h4 className="font-extrabold text-indigo-800 dark:text-indigo-300 uppercase tracking-wider text-xs mb-4 pb-2 border-b border-indigo-100 dark:border-indigo-800/30 flex items-center gap-2">
                        Trigger Thresholds
                    </h4>
                    <div>
                        {conditionsJsx}
                    </div>
                </div>

                {/* Footer Oracle */}
                <div className="text-xs text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800/50 p-3 rounded-lg border border-slate-200 dark:border-slate-700 flex items-start gap-2">
                    <span className="font-bold mt-0.5">INFO</span>
                    <p className="leading-relaxed">This vault requires an event satisfying the above conditions, as asserted and verified by the <span className="font-bold text-slate-700 dark:text-slate-300">UMA Optimistic Oracle</span> on-chain.</p>
                </div>
            </div>
        );
    };

    const handleTriggerParamChange = (key, value) => {
        setNewVaultData(prev => ({ ...prev, triggerParams: { ...prev.triggerParams, [key]: value } }));
    };

    // --- HELPERS DATES ET CAP (Inchangés) ---
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

        const finalDescription = generateOracleDescription(newVaultData);

        const mIndexStart = MONTHS.findIndex(m => m.name === newVaultData.startMonth);
        const safeStartDay = parseInt(newVaultData.startDay) || new Date().getDate();
        const safeStartYear = parseInt(newVaultData.startYear) || new Date().getFullYear();
        const startDate = new Date(safeStartYear, mIndexStart, safeStartDay);

        const mIndexEnd = MONTHS.findIndex(m => m.name === newVaultData.month);
        const safeEndDay = parseInt(newVaultData.day) || 1;
        const safeEndYear = parseInt(newVaultData.year) || new Date().getFullYear();
        const endDate = new Date(safeEndYear, mIndexEnd, safeEndDay);

        const formatDateStr = (date) => `${date.getDate()} ${MONTHS[date.getMonth()].name} ${date.getFullYear()}`;
        const diffTime = Math.abs(endDate - startDate);
        const durationInDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) || 365;
        const juniorVal = parseFloat(newVaultData.junior || 0);

        const newVault = {
            name: newVaultData.name || "New Cat Bond",
            theme: activeTheme,
            category: newVaultData.category,
            sponsor: "Simulation SA", // On utilise l'entité vérifiée du KYB de simulation
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
            status: 'PENDING',
            history: generateMockHistory('WIND')
        };

        onCreate(newVault);

        const today = new Date();
        setNewVaultData(prev => ({
            ...prev,
            name: '', country: '', region: '', city: '', cap: 40000000,
            startDay: today.getDate(), startMonth: MONTHS[today.getMonth()].name, startYear: today.getFullYear()
        }));
    };

    // --- GESTION DE L'AFFICHAGE DES SECTIONS SELON LE THÈME ---
    const showLocation = ['climate', 'flight', 'realestate'].includes(activeTheme);

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
                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                            {activeTheme === 'cyber' ? "Contract or Protocol Name" : activeTheme === 'maritime' ? "Vessel or Fleet Name" : "Risk Name"}
                        </label>
                        <input type="text" value={newVaultData.name} onChange={e => setNewVaultData({ ...newVaultData, name: e.target.value })} className="w-full p-3 border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-900 dark:text-white rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all" placeholder="Ex: Main Factory 2026..." />
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
                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Specific Category</label>
                        <select value={newVaultData.category} onChange={e => setNewVaultData({ ...newVaultData, category: e.target.value })} className="w-full p-3 border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-900 dark:text-white rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none font-bold">
                            {availableCategories.map(cat => (<option key={cat} value={cat}>{cat}</option>))}
                        </select>
                    </div>

                    {/* --- IDENTITÉ ONCHAINID (Lecture seule, affichée pour TOUTES les catégories) --- */}
                    <div className={isExpanded ? "col-span-2 p-4 bg-green-50 dark:bg-green-900/20 rounded-xl border border-green-200 dark:border-green-800" : "hidden"}>
                        <div className="flex items-start gap-3">
                            <ShieldCheck className="h-6 w-6 text-green-600 dark:text-green-400 mt-0.5 shrink-0" />
                            <div className="w-full">
                                <h3 className="text-sm font-bold text-green-800 dark:text-green-300 mb-1">ERC-3643 Verified Corporate Identity</h3>
                                <p className="text-xs text-green-700 dark:text-green-400 mb-3 leading-relaxed">
                                    The smart contract extracts the legal entity details directly from your authenticated ONCHAINID wallet.
                                </p>
                                <div className="bg-white/60 dark:bg-black/20 p-3 rounded-lg border border-green-200/50 dark:border-green-800/50 flex flex-col gap-1.5 w-full">
                                    <div className="flex justify-between text-xs font-mono"><span className="text-slate-500">Legal Entity:</span> <span className="font-bold text-slate-800 dark:text-slate-200">Simulation SA</span></div>
                                    <div className="flex justify-between text-xs font-mono"><span className="text-slate-500">Headquarters:</span> <span className="font-bold text-slate-800 dark:text-slate-200">Av. Claude-Nobs 5, 1820 Montreux</span></div>
                                    <div className="flex justify-between text-xs font-mono"><span className="text-slate-500">Connected Wallet:</span> <span className="font-bold text-slate-800 dark:text-slate-200">{userAddress || "0x..."}</span></div>
                                    <div className="flex justify-between text-xs font-mono"><span className="text-slate-500">KYB Status:</span> <span className="font-bold text-green-600 dark:text-green-400">VALIDATED</span></div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* --- LOCALISATION DYNAMIQUE (Climate, Flight, Real Estate) --- */}
                    <div className={isExpanded && showLocation ? "col-span-2 p-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700" : "hidden"}>
                        <h3 className="text-sm font-bold text-slate-800 dark:text-slate-200 mb-3">Target Scope & Location</h3>
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                            <div>
                                <label className="block text-xs font-medium text-slate-700 dark:text-slate-400 mb-1">Country</label>
                                <input type="text" value={newVaultData.country} onChange={e => setNewVaultData({...newVaultData, country: e.target.value})} className="w-full p-2 text-sm border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-900 dark:text-white rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none" placeholder="Ex: Switzerland" />
                            </div>

                            {/* Region / City (Labels adaptatifs) */}
                            {activeTheme === 'climate' && (
                                <>
                                    <div><label className="block text-xs font-medium text-slate-700 dark:text-slate-400 mb-1">Region / State</label><input type="text" value={newVaultData.region} onChange={e => setNewVaultData({...newVaultData, region: e.target.value})} className="w-full p-2 text-sm border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-900 dark:text-white rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none" placeholder="Ex: Vaud" /></div>
                                    <div><label className="block text-xs font-medium text-slate-700 dark:text-slate-400 mb-1">City / Epicenter</label><input type="text" value={newVaultData.city} onChange={e => setNewVaultData({...newVaultData, city: e.target.value})} className="w-full p-2 text-sm border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-900 dark:text-white rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none" placeholder="Ex: Lausanne" /></div>
                                    <div><label className="block text-xs font-medium text-slate-700 dark:text-slate-400 mb-1">Radius (km)</label><input type="number" min="0" value={newVaultData.radius} onChange={e => setNewVaultData({...newVaultData, radius: e.target.value})} className="w-full p-2 text-sm border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-900 dark:text-white rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none" placeholder="50" /></div>
                                </>
                            )}

                            {activeTheme === 'flight' && (
                                <>
                                    <div><label className="block text-xs font-medium text-slate-700 dark:text-slate-400 mb-1">Region</label><input type="text" value={newVaultData.region} onChange={e => setNewVaultData({...newVaultData, region: e.target.value})} className="w-full p-2 text-sm border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-900 dark:text-white rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none" placeholder="Ex: Ile-de-France" /></div>
                                    <div className="md:col-span-2"><label className="block text-xs font-medium text-slate-700 dark:text-slate-400 mb-1">Airport Code (IATA / ICAO)</label><input type="text" value={newVaultData.city} onChange={e => setNewVaultData({...newVaultData, city: e.target.value})} className="w-full p-2 text-sm border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-900 dark:text-white rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none font-bold uppercase" placeholder="Ex: CDG or LFPG" /></div>
                                </>
                            )}

                            {activeTheme === 'realestate' && (
                                <>
                                    <div><label className="block text-xs font-medium text-slate-700 dark:text-slate-400 mb-1">City</label><input type="text" value={newVaultData.region} onChange={e => setNewVaultData({...newVaultData, region: e.target.value})} className="w-full p-2 text-sm border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-900 dark:text-white rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none" placeholder="Ex: Zurich" /></div>
                                    <div className="md:col-span-2"><label className="block text-xs font-medium text-slate-700 dark:text-slate-400 mb-1">Exact Property Address</label><input type="text" value={newVaultData.city} onChange={e => setNewVaultData({...newVaultData, city: e.target.value})} className="w-full p-2 text-sm border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-900 dark:text-white rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none" placeholder="Ex: Bahnhofstrasse 45" /></div>
                                </>
                            )}
                        </div>
                    </div>

                    {/* --- CONDITIONS DYNAMIQUES SELON CATÉGORIE --- */}
                    <div className={isExpanded ? "col-span-2 p-4 bg-indigo-50/50 dark:bg-indigo-900/20 rounded-xl border border-indigo-100 dark:border-indigo-800/30" : "hidden"}>
                        <h3 className="text-sm font-bold text-indigo-800 dark:text-indigo-300 mb-3">IoT & Trigger Parameters ({newVaultData.category})</h3>

                        <div className="grid grid-cols-2 gap-4 mb-4">
                            {/* CLIMATE */}
                            {newVaultData.category === 'Hurricane' && (
                                <>
                                    <div><label className="block text-xs font-medium text-slate-700 dark:text-slate-400 mb-1">Min. Wind Speed (km/h)</label><input type="number" value={newVaultData.triggerParams.windSpeed} onChange={e => handleTriggerParamChange('windSpeed', e.target.value)} className="w-full p-2 text-sm border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-900 rounded-lg" /></div>
                                    <div><label className="block text-xs font-medium text-slate-700 dark:text-slate-400 mb-1">Min. Category (Saffir-Simpson)</label><input type="number" min="1" max="5" value={newVaultData.triggerParams.hurricaneCategory} onChange={e => handleTriggerParamChange('hurricaneCategory', e.target.value)} className="w-full p-2 text-sm border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-900 rounded-lg" /></div>
                                </>
                            )}
                            {/* ... (Autres climats existants) ... */}

                            {/* REAL ESTATE (IoT Murs) */}
                            {newVaultData.category === 'Flood' && activeTheme === 'realestate' && (
                                <div><label className="block text-xs font-medium text-slate-700 dark:text-slate-400 mb-1">Water Level on Wall Sensor (cm)</label><input type="number" value={newVaultData.triggerParams.waterLevelCm} onChange={e => handleTriggerParamChange('waterLevelCm', e.target.value)} className="w-full p-2 text-sm border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-900 rounded-lg" /></div>
                            )}
                            {newVaultData.category === 'Earthquake' && activeTheme === 'realestate' && (
                                <div><label className="block text-xs font-medium text-slate-700 dark:text-slate-400 mb-1">Min. Sensor Vibration (Mw eq.)</label><input type="number" step="0.1" value={newVaultData.triggerParams.sensorMagnitude} onChange={e => handleTriggerParamChange('sensorMagnitude', e.target.value)} className="w-full p-2 text-sm border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-900 rounded-lg" /></div>
                            )}
                            {newVaultData.category === 'Fire' && activeTheme === 'realestate' && (
                                <>
                                    <div><label className="block text-xs font-medium text-slate-700 dark:text-slate-400 mb-1">Min. Temperature (°C)</label><input type="number" value={newVaultData.triggerParams.temperature} onChange={e => handleTriggerParamChange('temperature', e.target.value)} className="w-full p-2 text-sm border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-900 rounded-lg" /></div>
                                    <div><label className="block text-xs font-medium text-slate-700 dark:text-slate-400 mb-1">Continuous Duration (mins)</label><input type="number" value={newVaultData.triggerParams.duration} onChange={e => handleTriggerParamChange('duration', e.target.value)} className="w-full p-2 text-sm border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-900 rounded-lg" /></div>
                                </>
                            )}

                            {/* MARITIME (IoT Embarqué) */}
                            {newVaultData.category === 'Vessel Sinking (IoT Tilt)' && (
                                <>
                                    <div><label className="block text-xs font-medium text-slate-700 dark:text-slate-400 mb-1">Min. Tilt Angle (°)</label><input type="number" value={newVaultData.triggerParams.tiltAngle} onChange={e => handleTriggerParamChange('tiltAngle', e.target.value)} className="w-full p-2 text-sm border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-900 rounded-lg" /></div>
                                    <div><label className="block text-xs font-medium text-slate-700 dark:text-slate-400 mb-1">Continuous Duration (hours)</label><input type="number" value={newVaultData.triggerParams.duration} onChange={e => handleTriggerParamChange('duration', e.target.value)} className="w-full p-2 text-sm border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-900 rounded-lg" /></div>
                                </>
                            )}
                            {newVaultData.category === 'Cargo Spoilage (IoT Temp)' && (
                                <>
                                    <div><label className="block text-xs font-medium text-slate-700 dark:text-slate-400 mb-1">Max Temperature Allowed (°C)</label><input type="number" value={newVaultData.triggerParams.temperature} onChange={e => handleTriggerParamChange('temperature', e.target.value)} className="w-full p-2 text-sm border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-900 rounded-lg" /></div>
                                    <div><label className="block text-xs font-medium text-slate-700 dark:text-slate-400 mb-1">Duration Exceeded (hours)</label><input type="number" value={newVaultData.triggerParams.duration} onChange={e => handleTriggerParamChange('duration', e.target.value)} className="w-full p-2 text-sm border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-900 rounded-lg" /></div>
                                </>
                            )}

                            {/* CYBER */}
                            {newVaultData.category === 'Smart Contract Exploit' && (
                                <div><label className="block text-xs font-medium text-slate-700 dark:text-slate-400 mb-1">Min. Funds Stolen (USD)</label><input type="number" value={newVaultData.triggerParams.fundsStolenUSD} onChange={e => handleTriggerParamChange('fundsStolenUSD', e.target.value)} className="w-full p-2 text-sm border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-900 rounded-lg" /></div>
                            )}
                            {newVaultData.category === 'IT System Outage' && (
                                <div><label className="block text-xs font-medium text-slate-700 dark:text-slate-400 mb-1">Continuous Downtime (hours)</label><input type="number" value={newVaultData.triggerParams.downtimeHours} onChange={e => handleTriggerParamChange('downtimeHours', e.target.value)} className="w-full p-2 text-sm border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-900 rounded-lg" /></div>
                            )}

                            {/* BUSINESS */}
                            {newVaultData.category === 'Revenue Drop' && (
                                <div><label className="block text-xs font-medium text-slate-700 dark:text-slate-400 mb-1">Revenue Drop (%) vs 30d Avg</label><input type="number" value={newVaultData.triggerParams.revenueDropPercent} onChange={e => handleTriggerParamChange('revenueDropPercent', e.target.value)} className="w-full p-2 text-sm border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-900 rounded-lg" /></div>
                            )}
                            {newVaultData.category === 'Supply Chain Delay' && (
                                <div><label className="block text-xs font-medium text-slate-700 dark:text-slate-400 mb-1">Min. Days Delayed</label><input type="number" value={newVaultData.triggerParams.daysDelayed} onChange={e => handleTriggerParamChange('daysDelayed', e.target.value)} className="w-full p-2 text-sm border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-900 rounded-lg" /></div>
                            )}

                        </div>

                        {/* Aperçu UMA en temps réel (Modification vers <div>) */}
                        <div className="p-3 bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-700">
                            <span className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-3 block">UMA Oracle Final Condition (Preview)</span>
                            <div className="text-sm text-slate-800 dark:text-slate-200 bg-slate-50 dark:bg-slate-800 p-4 rounded-md border border-slate-100 dark:border-slate-600">
                                {generateOracleDescription(newVaultData)}
                            </div>
                        </div>
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
