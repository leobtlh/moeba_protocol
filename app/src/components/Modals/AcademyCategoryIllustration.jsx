import React from 'react';

// --- DESSIN DU RADAR (CLIMAT) ---
export const RadarDrawing = () => (
    <svg viewBox="0 0 200 200" className="w-full max-w-[200px] h-auto drop-shadow-md mx-auto flex-shrink-0">
        {/* Fond du Radar */}
        <circle cx="100" cy="100" r="90" className="fill-slate-900 dark:fill-slate-800 stroke-indigo-500/50" strokeWidth="2" />
        <circle cx="100" cy="100" r="60" className="fill-transparent stroke-indigo-500/30" strokeWidth="2" strokeDasharray="4 4" />
        <circle cx="100" cy="100" r="30" className="fill-transparent stroke-indigo-500/30" strokeWidth="2" strokeDasharray="4 4" />

        {/* Axes de coordonnées */}
        <line x1="10" y1="100" x2="190" y2="100" className="stroke-indigo-500/30" strokeWidth="2" />
        <line x1="100" y1="10" x2="100" y2="190" className="stroke-indigo-500/30" strokeWidth="2" />

        {/* Faisceau de balayage */}
        <path d="M 100 100 L 100 10 A 90 90 0 0 1 190 100 Z" className="fill-indigo-500/20" />

        {/* Point GPS Central (Cible) */}
        <circle cx="100" cy="100" r="4" className="fill-indigo-400" />
        <circle cx="100" cy="100" r="12" className="fill-transparent stroke-indigo-400 animate-ping" strokeWidth="1" />

        {/* Nuage de Tempête (Menace) */}
        <g transform="translate(30, 30)">
            <path d="M 20 25 Q 20 10 35 10 Q 50 10 50 20 Q 65 15 70 30 Q 75 45 60 45 L 25 45 Q 10 45 10 35 Q 10 25 20 25 Z" className="fill-slate-300 dark:fill-slate-500" />
            <path d="M 30 45 L 25 60 M 45 45 L 40 60 M 60 45 L 55 60" className="stroke-sky-500" strokeWidth="2" strokeLinecap="round" />
        </g>

        {/* Badge UMA Oracle */}
        <g transform="translate(100, 140)">
            <rect x="0" y="0" width="90" height="28" rx="4" className="fill-emerald-100 dark:fill-emerald-900/90 stroke-emerald-500" strokeWidth="2" />
            <text x="45" y="18" fontSize="10" fontWeight="bold" textAnchor="middle" className="fill-emerald-700 dark:fill-emerald-400 tracking-wider">UMA VERIFIED</text>
        </g>
    </svg>
);

// --- DESSIN CYBER (SERVEUR & AUDIT) ---
export const CyberDrawing = () => (
    <svg viewBox="0 0 200 200" className="w-full max-w-[200px] h-auto drop-shadow-md mx-auto flex-shrink-0">
        {/* Fond et lueur d'alerte */}
        <circle cx="100" cy="100" r="80" className="fill-rose-500/10 dark:fill-rose-900/20" />

        {/* Baie de Serveurs */}
        <g transform="translate(60, 40)">
            <rect x="0" y="0" width="80" height="25" rx="4" className="fill-slate-700 dark:fill-slate-800 stroke-slate-500" strokeWidth="2" />
            <circle cx="15" cy="12.5" r="3" className="fill-emerald-400" />
            <line x1="30" y1="12.5" x2="65" y2="12.5" className="stroke-slate-500" strokeWidth="2" strokeLinecap="round" />

            {/* Serveur compromis (Rouge) */}
            <rect x="0" y="35" width="80" height="25" rx="4" className="fill-rose-900/80 stroke-rose-500" strokeWidth="2" />
            <circle cx="15" cy="47.5" r="3" className="fill-rose-500 animate-pulse" />
            <line x1="30" y1="47.5" x2="65" y2="47.5" className="stroke-rose-500" strokeWidth="2" strokeLinecap="round" />

            <rect x="0" y="70" width="80" height="25" rx="4" className="fill-slate-700 dark:fill-slate-800 stroke-slate-500" strokeWidth="2" />
            <circle cx="15" cy="82.5" r="3" className="fill-emerald-400" />
            <line x1="30" y1="82.5" x2="65" y2="82.5" className="stroke-slate-500" strokeWidth="2" strokeLinecap="round" />
        </g>

        {/* Bouclier / Cadenas Brisé */}
        <g transform="translate(110, 75)">
            <path d="M 15 0 L 30 10 L 30 25 Q 15 40 0 25 L 0 10 Z" className="fill-slate-900 dark:fill-slate-950 stroke-rose-500" strokeWidth="2" />
            <path d="M 0 0 L 20 25" className="stroke-rose-500" strokeWidth="2" />
        </g>

        {/* Loupe d'Audit Forensique (UMA) */}
        <g transform="translate(45, 95)">
            <circle cx="15" cy="15" r="12" className="fill-indigo-500/20 stroke-indigo-400" strokeWidth="3" />
            <line x1="24" y1="24" x2="35" y2="35" className="stroke-indigo-400" strokeWidth="4" strokeLinecap="round" />
            <path d="M 8 15 L 13 20 L 22 10" className="stroke-indigo-400" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </g>

        {/* Badge UMA Oracle */}
        <g transform="translate(100, 155)">
            <rect x="-45" y="0" width="90" height="28" rx="4" className="fill-indigo-100 dark:fill-indigo-900/90 stroke-indigo-500" strokeWidth="2" />
            <text x="0" y="18" fontSize="10" fontWeight="bold" textAnchor="middle" className="fill-indigo-700 dark:fill-indigo-400 tracking-wider">AUDIT VERIFIED</text>
        </g>
    </svg>
);

// --- DESSIN BUSINESS (USINE & FLUX DE TRÉSORERIE) ---
export const BusinessDrawing = () => (
    <svg viewBox="0 0 200 200" className="w-full max-w-[200px] h-auto drop-shadow-md mx-auto flex-shrink-0">
        {/* Fond et lueur (Ambre/Orange) */}
        <circle cx="100" cy="100" r="80" className="fill-amber-500/10 dark:fill-amber-900/20" />

        {/* Usine / Entrepôt */}
        <g transform="translate(40, 60)">
            <rect x="0" y="30" width="120" height="50" className="fill-slate-700 dark:fill-slate-800 stroke-slate-500" strokeWidth="2" />
            {/* Toits en dents de scie */}
            <path d="M 0 30 L 30 0 L 30 30 Z" className="fill-slate-600 dark:fill-slate-700 stroke-slate-500" strokeWidth="2" strokeLinejoin="round" />
            <path d="M 30 30 L 60 0 L 60 30 Z" className="fill-slate-600 dark:fill-slate-700 stroke-slate-500" strokeWidth="2" strokeLinejoin="round" />
            <path d="M 60 30 L 90 0 L 90 30 Z" className="fill-slate-600 dark:fill-slate-700 stroke-slate-500" strokeWidth="2" strokeLinejoin="round" />
            <path d="M 90 30 L 120 0 L 120 30 Z" className="fill-slate-600 dark:fill-slate-700 stroke-slate-500" strokeWidth="2" strokeLinejoin="round" />
            {/* Porte */}
            <rect x="50" y="50" width="20" height="30" className="fill-slate-800 dark:fill-slate-900 stroke-slate-500" strokeWidth="2" />
        </g>

        {/* Engrenage brisé (Symbole de l'interruption) */}
        <g transform="translate(130, 40)">
            <circle cx="20" cy="20" r="15" className="fill-amber-500/20 stroke-amber-500" strokeWidth="3" strokeDasharray="10 4" />
            <circle cx="20" cy="20" r="5" className="fill-transparent stroke-amber-500" strokeWidth="3" />
            <path d="M 10 10 L 30 30 M 10 30 L 30 10" className="stroke-slate-900 dark:stroke-slate-950" strokeWidth="4" />
            <path d="M 10 10 L 30 30 M 10 30 L 30 10" className="stroke-rose-500" strokeWidth="2" />
        </g>

        {/* Graphique de trésorerie qui chute */}
        <g transform="translate(45, 100)">
            <rect x="0" y="0" width="110" height="50" rx="4" className="fill-slate-900/90 stroke-slate-600" strokeWidth="2" />
            {/* Ligne verte (Normal) */}
            <polyline points="10,40 30,20 50,25 60,15" className="stroke-emerald-400" fill="none" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
            {/* Ligne rouge (Chute brutale) */}
            <polyline points="60,15 70,35 90,45" className="stroke-rose-500" fill="none" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="4 2" />
            {/* Point de rupture */}
            <circle cx="60" cy="15" r="4" className="fill-rose-500 animate-pulse" />
        </g>

        {/* Badge UMA Oracle */}
        <g transform="translate(100, 165)">
            <rect x="-55" y="0" width="110" height="28" rx="4" className="fill-amber-100 dark:fill-amber-900/90 stroke-amber-500" strokeWidth="2" />
            <text x="0" y="18" fontSize="10" fontWeight="bold" textAnchor="middle" className="fill-amber-700 dark:fill-amber-400 tracking-wider">KPI VERIFIED</text>
        </g>
    </svg>
);

// --- DESSIN FLIGHT (PANNEAU D'AFFICHAGE & API) ---
export const FlightDrawing = () => (
    <svg viewBox="0 0 200 200" className="w-full max-w-[200px] h-auto drop-shadow-md mx-auto flex-shrink-0">
        {/* Fond et lueur (Cyan) */}
        <circle cx="100" cy="100" r="80" className="fill-cyan-500/10 dark:fill-cyan-900/20" />

        {/* Panneau d'affichage des départs */}
        <g transform="translate(40, 40)">
            <rect x="0" y="0" width="120" height="80" rx="4" className="fill-slate-800 dark:fill-slate-900 stroke-slate-600" strokeWidth="2" />

            {/* Ligne 1 : Vol normal */}
            <rect x="10" y="15" width="80" height="8" rx="2" className="fill-slate-700" />
            <circle cx="105" cy="19" r="3" className="fill-emerald-400" />

            {/* Ligne 2 : Vol Annulé (Rouge/Alerte) */}
            <rect x="10" y="35" width="80" height="10" rx="2" className="fill-rose-900/80 stroke-rose-500" strokeWidth="1" />
            <line x1="15" y1="40" x2="40" y2="40" className="stroke-rose-500" strokeWidth="2" strokeLinecap="round" />
            <circle cx="105" cy="40" r="4" className="fill-rose-500 animate-pulse" />

            {/* Ligne 3 : Vol normal */}
            <rect x="10" y="55" width="80" height="8" rx="2" className="fill-slate-700" />
            <circle cx="105" cy="59" r="3" className="fill-emerald-400" />
        </g>

        {/* Symbole de l'avion annulé / Signal coupé */}
        <g transform="translate(130, 90)">
            <circle cx="20" cy="20" r="16" className="fill-cyan-500/10 stroke-cyan-500/50" strokeWidth="2" strokeDasharray="4 4" />
            <path d="M 5 20 Q 20 0 35 20" className="stroke-cyan-400 fill-none" strokeWidth="2" strokeLinecap="round" />
            {/* Croix d'annulation */}
            <path d="M 12 12 L 28 28 M 12 28 L 28 12" className="stroke-rose-500" strokeWidth="3" strokeLinecap="round" />
        </g>

        {/* Badge API Oracle */}
        <g transform="translate(100, 160)">
            <rect x="-50" y="0" width="100" height="28" rx="4" className="fill-cyan-100 dark:fill-cyan-900/90 stroke-cyan-500" strokeWidth="2" />
            <text x="0" y="18" fontSize="10" fontWeight="bold" textAnchor="middle" className="fill-cyan-700 dark:fill-cyan-400 tracking-wider">API VERIFIED</text>
        </g>
    </svg>
);

// --- DESSIN REAL ESTATE (IMMEUBLE BRIQUES & CAPTEURS IoT) ---
export const RealEstateDrawing = () => (
    <svg viewBox="0 0 200 200" className="w-full max-w-[200px] h-auto drop-shadow-md mx-auto flex-shrink-0">
        {/* Fond et lueur (Rouge/Brique) */}
        <circle cx="100" cy="100" r="80" className="fill-rose-500/10 dark:fill-rose-900/20" />

        {/* Définition du motif de briques */}
        <defs>
            <pattern id="brickPattern" x="0" y="0" width="20" height="10" patternUnits="userSpaceOnWrite">
                <rect width="20" height="10" className="fill-rose-900/90" />
                <line x1="0" y1="0" x2="20" y2="0" className="stroke-rose-950/50" strokeWidth="1" />
                <line x1="0" y1="10" x2="20" y2="10" className="stroke-rose-950/50" strokeWidth="1" />
                <line x1="0" y1="0" x2="0" y2="10" className="stroke-rose-950/50" strokeWidth="1" />
                <line x1="10" y1="0" x2="10" y2="10" className="stroke-rose-950/50" strokeWidth="1" />
            </pattern>
        </defs>

        {/* Corps de l'immeuble en briques */}
        <rect x="50" y="30" width="100" height="120" rx="2" fill="url(#brickPattern)" className="stroke-rose-950" strokeWidth="2" />

        {/* Toit */}
        <path d="M 45 30 L 100 0 L 155 30 Z" className="fill-slate-700 dark:fill-slate-800 stroke-rose-950" strokeWidth="2" strokeLinejoin="round" />

        {/* Fenêtres */}
        <g transform="translate(65, 45)">
            <rect x="0" y="0" width="15" height="15" className="fill-sky-100 dark:fill-sky-900/50 stroke-rose-950" strokeWidth="1" />
            <rect x="25" y="0" width="15" height="15" className="fill-sky-100 dark:fill-sky-900/50 stroke-rose-950" strokeWidth="1" />
            <rect x="50" y="0" width="15" height="15" className="fill-sky-100 dark:fill-sky-900/50 stroke-rose-950" strokeWidth="1" />

            <rect x="0" y="25" width="15" height="15" className="fill-sky-100 dark:fill-sky-900/50 stroke-rose-950" strokeWidth="1" />
            <rect x="25" y="25" width="15" height="15" className="fill-sky-100 dark:fill-sky-900/50 stroke-rose-950" strokeWidth="1" />
            <rect x="50" y="25" width="15" height="15" className="fill-sky-100 dark:fill-sky-900/50 stroke-rose-950" strokeWidth="1" />

            <rect x="0" y="50" width="15" height="15" className="fill-sky-100 dark:fill-sky-900/50 stroke-rose-950" strokeWidth="1" />
            <rect x="25" y="50" width="15" height="15" className="fill-sky-100 dark:fill-sky-900/50 stroke-rose-950" strokeWidth="1" />
            <rect x="50" y="50" width="15" height="15" className="fill-sky-100 dark:fill-sky-900/50 stroke-rose-950" strokeWidth="1" />
        </g>

        {/* Capteurs IoT (Intégrés sur la façade) */}
        {/* Capteur 1 : Inondation (Eau) au sous-sol */}
        <g transform="translate(60, 130)">
            <circle cx="0" cy="0" r="8" className="fill-slate-900/80 stroke-sky-500 animate-pulse" strokeWidth="2" />
            <path d="M -3 0 Q 0 -5 3 0 T 0 5 Q -3 0 -3 0" className="fill-sky-500" />
        </g>

        {/* Capteur 2 : Incendie (Fumée/Feu) au 2ème étage */}
        <g transform="translate(140, 80)">
            <circle cx="0" cy="0" r="8" className="fill-slate-900/80 stroke-orange-500 animate-pulse" strokeWidth="2" />
            <path d="M 0 -4 L 3 2 L -3 2 Z" className="fill-orange-500" />
        </g>

        {/* Lignes de connexion sans fil (Ondes) */}
        <path d="M 68 130 Q 80 120 100 130 Q 120 140 132 130" className="stroke-sky-500/50" fill="none" strokeWidth="1" strokeDasharray="2 2" />
        <path d="M 132 80 Q 120 90 100 80 Q 80 70 68 80" className="stroke-orange-500/50" fill="none" strokeWidth="1" strokeDasharray="2 2" />

        {/* Badge SENSOR UMA Oracle */}
        <g transform="translate(100, 165)">
            <rect x="-55" y="0" width="110" height="28" rx="4" className="fill-rose-100 dark:fill-rose-900/90 stroke-rose-500" strokeWidth="2" />
            <text x="0" y="18" fontSize="10" fontWeight="bold" textAnchor="middle" className="fill-rose-700 dark:fill-rose-400 tracking-wider">SENSOR VERIFIED</text>
        </g>
    </svg>
);

// --- DESSIN MARITIME (CARGO & CONTENEURS) ---
export const MaritimeDrawing = () => (
    <svg viewBox="0 0 200 200" className="w-full max-w-[200px] h-auto drop-shadow-md mx-auto flex-shrink-0">
        {/* Fond et lueur (Bleu Océan) */}
        <circle cx="100" cy="100" r="80" className="fill-blue-500/10 dark:fill-blue-900/20" />

        {/* Vagues / Océan en arrière plan */}
        <path d="M 10 130 Q 30 120 50 130 T 90 130 T 130 130 T 170 130 T 190 130 L 190 180 L 10 180 Z" className="fill-blue-500/20" />

        {/* Bateau Cargo (Coque et Cabine) */}
        <path d="M 20 100 L 160 100 L 150 140 L 40 140 Z" className="fill-slate-800 dark:fill-slate-900 stroke-slate-600" strokeWidth="2" strokeLinejoin="round" />
        <rect x="30" y="70" width="30" height="30" className="fill-slate-700 stroke-slate-500" strokeWidth="2" />
        <rect x="40" y="60" width="10" height="10" className="fill-slate-600 stroke-slate-500" strokeWidth="2" />

        {/* Conteneurs sécurisés sur le pont */}
        <g transform="translate(70, 70)">
            {/* Pile 1 */}
            <rect x="0" y="15" width="20" height="15" className="fill-emerald-500 stroke-emerald-700" strokeWidth="1" />
            <rect x="0" y="0" width="20" height="15" className="fill-sky-500 stroke-sky-700" strokeWidth="1" />
            {/* Smart Twistlocks (Points lumineux connectés) */}
            <circle cx="0" cy="15" r="1.5" className="fill-emerald-200 animate-pulse" />
            <circle cx="20" cy="15" r="1.5" className="fill-emerald-200 animate-pulse" />
            <circle cx="0" cy="0" r="1.5" className="fill-sky-200 animate-pulse" />
            <circle cx="20" cy="0" r="1.5" className="fill-sky-200 animate-pulse" />

            {/* Pile 2 */}
            <rect x="25" y="15" width="20" height="15" className="fill-amber-500 stroke-amber-700" strokeWidth="1" />
            <rect x="25" y="0" width="20" height="15" className="fill-indigo-500 stroke-indigo-700" strokeWidth="1" />
            <circle cx="25" cy="15" r="1.5" className="fill-amber-200 animate-pulse" />
            <circle cx="45" cy="15" r="1.5" className="fill-amber-200 animate-pulse" />
        </g>

        {/* Conteneurs tombant à l'eau (Perte de cargaison) */}
        <g transform="translate(145, 60)">
            {/* Conteneur 1 (En chute) */}
            <g transform="rotate(15)">
                <rect x="0" y="0" width="20" height="15" className="fill-rose-500 stroke-rose-700" strokeWidth="1" />
                {/* Alerte Twistlock déconnecté (Signal rouge) */}
                <circle cx="0" cy="0" r="3" className="fill-rose-300 stroke-rose-500 animate-ping" strokeWidth="1" />
            </g>
            {/* Conteneur 2 (Dans l'eau) */}
            <g transform="translate(15, 60) rotate(-20)">
                <rect x="0" y="0" width="20" height="15" className="fill-rose-600 stroke-rose-800" strokeWidth="1" />
                <circle cx="0" cy="0" r="3" className="fill-rose-300 stroke-rose-500 animate-ping" strokeWidth="1" />
            </g>
        </g>

        {/* Vagues de premier plan */}
        <path d="M 10 140 Q 30 130 50 140 T 90 140 T 130 140 T 170 140 T 190 140 L 190 180 L 10 180 Z" className="fill-blue-500/40" />
        {/* Éclaboussure */}
        <path d="M 150 120 Q 160 110 170 120 T 190 120" className="stroke-white/50 fill-none" strokeWidth="2" strokeLinecap="round" />

        {/* Radar / Caméra pointé sur les conteneurs (Computer Vision) */}
        <path d="M 100 20 L 140 80 L 180 80 Z" className="fill-blue-400/20" />
        <circle cx="100" cy="20" r="5" className="fill-blue-400" />

        {/* Badge CARGO UMA Oracle */}
        <g transform="translate(100, 165)">
            <rect x="-55" y="0" width="110" height="28" rx="4" className="fill-blue-100 dark:fill-blue-900/90 stroke-blue-500" strokeWidth="2" />
            <text x="0" y="18" fontSize="10" fontWeight="bold" textAnchor="middle" className="fill-blue-700 dark:fill-blue-400 tracking-wider">CARGO VERIFIED</text>
        </g>
    </svg>
);
