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

// Dictionnaire des fonds dynamiques selon la catégorie (Couleurs)
const themeBackgrounds = {
    climate: "bg-sky-50 dark:bg-sky-900",
    cyber: "bg-rose-50 dark:bg-rose-950",
    business: "bg-amber-50 dark:bg-amber-500",
    flight: "bg-cyan-50 dark:bg-blue-300",
    realestate: "bg-pink-50 dark:bg-pink-400",
    maritime: "bg-blue-50 dark:bg-cyan-400",
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
