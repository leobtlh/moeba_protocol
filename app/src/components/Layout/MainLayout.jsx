import React from 'react';
import Navbar from './Navbar';
import {
    ClimateBackground,
    CyberBackground,
    BusinessBackground,
    FlightBackground,
    RealEstateBackground,
    MaritimeBackground
} from './MainLayoutBackground';


// Dictionnaire des fonds principaux basés sur le "Dictionary of Color Combinations"
const themeBackgrounds = {
    // Climate (Hint of Iron Blue) : Un blanc glacé très pur
    climate: "bg-[#F4F7F8] dark:bg-[#24333C]",
    // Cyber (Hint of Plum) : Un blanc avec un infime soupçon poudré
    cyber: "bg-[#F8F5F6] dark:bg-[#2C1721]",
    // Business (Hint of Sepia) : Un blanc ivoire très léger
    business: "bg-[#F9F7F5] dark:bg-[#33251B]",
    // Flight (Hint of Prussian Blue) : Un blanc atmosphérique
    flight: "bg-[#F3F7F9] dark:bg-[#152A3B]",
    // Real Estate (Hint of Maroon) : Un blanc chaud, presque plâtre
    realestate: "bg-[#FDF7F8] dark:bg-[#4E2028]",
    // Maritime (Hint of Midnight Blue) : Un blanc écume d'eau
    maritime: "bg-[#F2F7F7] dark:bg-[#11232D]",
};


// ============================================================================
// COMPOSANT PRINCIPAL MAIN LAYOUT
// ============================================================================
const MainLayout = ({ children, activeView, setActiveView, activeTheme, setActiveTheme, isLearnMode, setIsLearnMode }) => {

    // Fallback de sécurité si le thème n'est pas trouvé
    const bgClass = themeBackgrounds[activeTheme] || "bg-slate-50 dark:bg-slate-950";

    return (
        <div className={`min-h-screen transition-colors duration-500 font-sans text-slate-900 dark:text-slate-100 relative ${bgClass}`}>

            {/* Injections conditionnelles des fonds animés pour chaque thème */}
            {activeTheme === 'climate' && <ClimateBackground />}
            {activeTheme === 'cyber' && <CyberBackground />}
            {activeTheme === 'business' && <BusinessBackground />}
            {activeTheme === 'flight' && <FlightBackground />}
            {activeTheme === 'realestate' && <RealEstateBackground />}
            {activeTheme === 'maritime' && <MaritimeBackground />}

            {/* Conteneur principal (z-10) pour s'assurer que l'UI passe AU-DESSUS des fonds animés (z-0) */}
            <div className="relative z-10">
                <Navbar
                    activeView={activeView}
                    setActiveView={setActiveView}
                    activeTheme={activeTheme}
                    setActiveTheme={setActiveTheme}
                    isLearnMode={isLearnMode}
                    setIsLearnMode={setIsLearnMode}
                />

                <main className="max-w-[89%] mx-auto px-6 py-10">
                    {children}
                </main>

                <footer className="max-w-7xl mx-auto px-6 py-8 text-center text-slate-400 dark:text-slate-600 text-sm">
                    <p>© 2026 Mœba Protocol. Decentralized Insurance Infrastructure.</p>
                </footer>
            </div>
        </div>
    );
};

export default MainLayout;
