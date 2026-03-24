import React from 'react';

// ============================================================================
// 1. CLIMATE : Vagues, Montagnes et Volutes de vent
// ============================================================================
export const ClimateBackground = () => (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <svg className="absolute w-full h-full opacity-40 dark:opacity-20" viewBox="0 0 1440 800" preserveAspectRatio="xMidYMid slice">
            <g stroke="currentColor" className="text-slate-400 dark:text-slate-500" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round">
                {/* Lignes d'horizon (Vagues/Montagnes) */}
                <path d="M -10 750 Q 200 650, 450 750 T 950 650 T 1450 750" />
                <path d="M -10 700 Q 200 630, 450 700 T 950 630 T 1450 700" />
                <path d="M -10 650 Q 150 550, 350 650 T 800 550 T 1200 650 T 1450 550" />
                <path d="M 1450 550 L 1470 550 Q 1970 650, 2470 550" />

                {/* Volutes de Vent */}
                <path d="M 50 150 Q 200 50, 350 200 T 650 150 T 950 250" />
                <path d="M 150 200 C 250 150, 350 250, 300 300 C 250 350, 200 300, 250 250" strokeWidth="1" />
                <path d="M 550 180 Q 700 80, 850 230 T 1150 180 T 1450 280" />
                <path d="M 670 230 Q 770 130, 870 280" strokeWidth="1"/>
                <path d="M 1150 100 Q 1300 0, 1450 150 T 1750 100" />
                <path d="M 1270 150 C 1370 100, 1470 200, 1420 250 C 1370 300, 1320 250, 1370 200" strokeWidth="1" />
                <path d="M 80 400 Q 230 300, 380 450 T 630 400" />
                <path d="M 180 450 C 280 400, 380 500, 330 550 C 280 600, 230 550, 280 500" strokeWidth="1" />
                <path d="M 380 300 C 480 250, 580 350, 530 400 C 480 450, 430 400, 480 350 C 530 300, 630 350, 730 300" />
                <path d="M 400 310 Q 500 210, 600 360" strokeWidth="1"/>
                <path d="M 750 450 Q 900 350, 1050 500 T 1300 450" />
                <path d="M 870 500 C 970 450, 1070 550, 1020 600 C 970 650, 920 600, 970 550" strokeWidth="1" />
                <path d="M 1100 350 C 1200 300, 1300 400, 1250 450 C 1200 500, 1150 450, 1200 400" />
                <path d="M 1250 550 Q 1400 450, 1550 600 T 1850 550" />
                <path d="M 1370 600 C 1470 550, 1570 650, 1520 700 C 1470 750, 1420 700, 1470 650" strokeWidth="1" />
            </g>
        </svg>
    </div>
);

// ============================================================================
// 2. CYBERSECURITY : Circuit Imprimé (PCB), Noeuds centraux et lignes à 45°
// ============================================================================
export const CyberBackground = () => (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <svg className="absolute w-full h-full opacity-40 dark:opacity-20" viewBox="0 0 1440 800" preserveAspectRatio="xMidYMid slice">
            <g className="stroke-rose-300 dark:stroke-rose-800" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
                {/* Processeur central / Main Node */}
                <rect x="670" y="350" width="100" height="100" rx="10" className="stroke-rose-400 dark:stroke-rose-600" strokeWidth="3" />
                <rect x="690" y="370" width="60" height="60" rx="5" className="fill-rose-100 dark:fill-rose-900/30" />
                <circle cx="720" cy="400" r="8" className="fill-rose-500 animate-pulse" />

                {/* Micro-processeur 2 (Haut droite) */}
                <rect x="1100" y="150" width="60" height="60" rx="6" className="stroke-rose-400 dark:stroke-rose-600" strokeWidth="2" />
                <circle cx="1130" cy="180" r="5" className="fill-rose-500 animate-pulse" />

                {/* Pistes du circuit imprimé (Traces) */}
                <path d="M 670 380 H 500 L 450 330 H 200" />
                <circle cx="200" cy="330" r="4" className="fill-rose-400" />

                <path d="M 670 420 H 550 L 500 470 V 650" />
                <circle cx="500" cy="650" r="4" className="fill-rose-400" />

                <path d="M 770 380 H 900 L 950 330 H 1100" />

                <path d="M 770 420 H 850 L 900 470 V 700" />
                <circle cx="900" cy="700" r="4" className="fill-rose-400" />

                <path d="M 100 100 H 300 L 350 150 V 250" />
                <circle cx="100" cy="100" r="4" />
                <circle cx="350" cy="250" r="4" />

                <path d="M 1300 600 H 1000 L 950 550 H 800" />
                <circle cx="1300" cy="600" r="4" />
                <circle cx="800" cy="550" r="4" />

                <path d="M 1350 250 V 350 L 1300 400 H 1150" />
                <circle cx="1350" cy="250" r="4" />

                <path d="M 720 350 V 250 L 670 200 H 500" />
                <circle cx="500" cy="200" r="4" className="fill-rose-400 animate-pulse" />
            </g>
        </svg>
    </div>
);

// ============================================================================
// 3. BUSINESS INTERRUPTION : Grilles, courbes boursières et engrenages
// ============================================================================
export const BusinessBackground = () => (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <svg className="absolute w-full h-full opacity-40 dark:opacity-20" viewBox="0 0 1440 800" preserveAspectRatio="xMidYMid slice">
            {/* Grille de fond */}
            <g className="stroke-slate-300 dark:stroke-slate-800" strokeWidth="0.5" opacity="0.5">
                <path d="M 0 100 H 1440 M 0 200 H 1440 M 0 300 H 1440 M 0 400 H 1440 M 0 500 H 1440 M 0 600 H 1440 M 0 700 H 1440" />
                <path d="M 200 0 V 800 M 400 0 V 800 M 600 0 V 800 M 800 0 V 800 M 1000 0 V 800 M 1200 0 V 800" />
            </g>

            {/* Courbes de performance avec interruptions */}
            <g fill="none" className="stroke-amber-400/80 dark:stroke-amber-600/60 text-amber-500" strokeWidth="2" strokeLinecap="round">
                <path d="M 50 300 L 150 250 L 250 270 L 350 150" />
                <path d="M 380 180 L 450 300 L 550 280" strokeDasharray="4 6" />
                <circle cx="350" cy="150" r="4" fill="currentColor" className="animate-pulse" />

                <path d="M 600 700 L 700 630 L 850 670 L 1000 550 L 1100 580 L 1250 450" />
                <circle cx="1000" cy="550" r="4" fill="currentColor" />
            </g>

            {/* Engrenages et mécanique */}
            <g fill="none" className="stroke-slate-400 dark:stroke-slate-700" strokeWidth="1.5">
                <g transform="translate(1250, 150)">
                    <circle cx="0" cy="0" r="50" strokeDasharray="10 10" />
                    <circle cx="0" cy="0" r="20" />
                    <path d="M -60 0 H 60 M 0 -60 V 60" opacity="0.3" />
                </g>
                <g transform="translate(200, 600)">
                    <circle cx="0" cy="0" r="70" strokeDasharray="15 15" />
                    <circle cx="0" cy="0" r="25" />
                    <path d="M -50 -50 L 50 50 M -50 50 L 50 -50" opacity="0.3" />
                </g>
            </g>
        </svg>
    </div>
);

// ============================================================================
// 4. FLIGHT CANCELLATION : Faisceaux radar et routes aériennes
// ============================================================================
export const FlightBackground = () => (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <svg className="absolute w-full h-full opacity-40 dark:opacity-20" viewBox="0 0 1440 800" preserveAspectRatio="xMidYMid slice">
            <g className="stroke-cyan-300 dark:stroke-cyan-800/60" fill="none" strokeWidth="1.5">
                {/* Cercles Radars */}
                <circle cx="720" cy="400" r="150" strokeDasharray="4 8" />
                <circle cx="720" cy="400" r="300" strokeDasharray="4 8" />
                <circle cx="720" cy="400" r="450" strokeDasharray="4 8" />

                {/* Réticule Radar */}
                <line x1="720" y1="0" x2="720" y2="800" strokeDasharray="10 10" />
                <line x1="0" y1="400" x2="1440" y2="400" strokeDasharray="10 10" />

                {/* Routes Aériennes (Courbes) */}
                <path d="M 150 650 Q 400 200 720 400 T 1350 350" className="stroke-cyan-400 dark:stroke-cyan-600" strokeWidth="2" strokeDasharray="6 6" />
                <path d="M 300 150 Q 600 50 800 300 T 1200 650" className="stroke-cyan-400 dark:stroke-cyan-600" strokeWidth="2" strokeDasharray="6 6" />

                {/* Balises et Avions */}
                <circle cx="150" cy="650" r="5" className="fill-cyan-400 animate-pulse" />
                <circle cx="720" cy="400" r="8" className="fill-cyan-500 animate-ping" />
                <circle cx="1350" cy="350" r="5" className="fill-cyan-400" />
                <circle cx="300" cy="150" r="5" className="fill-cyan-400" />
                <circle cx="1200" cy="650" r="5" className="fill-cyan-400 animate-pulse" />
            </g>
        </svg>
    </div>
);

// ============================================================================
// 5. REAL ESTATE SENSORS : Plan d'architecte (Blueprint), bâtiments et capteurs
// ============================================================================
export const RealEstateBackground = () => (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <svg className="absolute w-full h-full opacity-40 dark:opacity-20" viewBox="0 0 1440 800" preserveAspectRatio="xMidYMid slice">
            {/* Grille millimétrée de plan */}
            <defs>
                <pattern id="blueprint" width="40" height="40" patternUnits="userSpaceOnWrite">
                    <path d="M 40 0 L 0 0 0 40" fill="none" className="stroke-orange-200 dark:stroke-orange-900/30" strokeWidth="1" />
                </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#blueprint)" />

            <g className="stroke-orange-400 dark:stroke-orange-700" fill="none" strokeWidth="2" strokeLinejoin="round">
                {/* Silhouettes de Bâtiments Architecturaux */}
                <path d="M 120 800 V 520 H 280 V 440 H 400 V 800" />
                <path d="M 900 800 V 360 H 1050 V 480 H 1200 V 800" />
                <path d="M 500 800 V 600 H 750 V 800" />

                {/* Annotations de Plan (Cotes) */}
                <line x1="120" y1="400" x2="400" y2="400" strokeDasharray="5 5" />
                <line x1="900" y1="320" x2="1200" y2="320" strokeDasharray="5 5" />

                {/* Capteurs IoT intelligents (Points lumineux) */}
                <circle cx="200" cy="600" r="5" className="fill-orange-500 stroke-none animate-pulse" />
                <circle cx="340" cy="500" r="5" className="fill-orange-500 stroke-none animate-pulse" />
                <circle cx="980" cy="420" r="5" className="fill-orange-500 stroke-none animate-pulse" />
                <circle cx="1120" cy="560" r="5" className="fill-orange-500 stroke-none animate-pulse" />
                <circle cx="625" cy="680" r="5" className="fill-orange-500 stroke-none animate-pulse" />
            </g>
        </svg>
    </div>
);

// ============================================================================
// 6. MARITIME LOGISTICS : Rose des vents, isobares océaniques et fret
// ============================================================================
export const MaritimeBackground = () => (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <svg className="absolute w-full h-full opacity-40 dark:opacity-20" viewBox="0 0 1440 800" preserveAspectRatio="xMidYMid slice">
            <g className="stroke-blue-300 dark:stroke-blue-800/60" fill="none" strokeWidth="1.5">
                {/* Lignes Topographiques Sous-marines (Bathymétrie) */}
                <path d="M -100 200 Q 200 300 500 150 T 1100 250 T 1600 100" />
                <path d="M -100 300 Q 200 400 500 250 T 1100 350 T 1600 200" />
                <path d="M -100 400 Q 200 500 500 350 T 1100 450 T 1600 300" />
                <path d="M -100 500 Q 200 600 500 450 T 1100 550 T 1600 400" />
                <path d="M -100 600 Q 200 700 500 550 T 1100 650 T 1600 500" />
                <path d="M -100 700 Q 200 800 500 650 T 1100 750 T 1600 600" />

                {/* Grande Rose des Vents (Style carte marine ancienne) */}
                <g transform="translate(1200, 250)">
                    <circle cx="0" cy="0" r="80" strokeDasharray="10 10" />
                    <circle cx="0" cy="0" r="60" />
                    <path d="M 0 -70 L 15 -15 L 70 0 L 15 15 L 0 70 L -15 15 L -70 0 L -15 -15 Z" className="stroke-blue-400 dark:stroke-blue-600" strokeWidth="2" strokeLinejoin="round" />
                </g>

                {/* Routes Maritimes (Navires de Fret) */}
                <path d="M 100 650 L 450 500 L 800 600 L 1300 400" className="stroke-blue-500 dark:stroke-blue-500" strokeWidth="3" strokeDasharray="10 15" strokeLinecap="round" />

                {/* Trackers GPS des Navires */}
                <circle cx="450" cy="500" r="6" className="fill-blue-500 stroke-none animate-pulse" />
                <circle cx="800" cy="600" r="6" className="fill-blue-500 stroke-none animate-pulse" />
            </g>
        </svg>
    </div>
);
