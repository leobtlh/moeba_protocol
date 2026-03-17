import React from 'react';

// --- COMPOSANTS DE DESSIN ---
export const SketchFilter = () => (
    <defs>
        <filter id="sketch" x="-10%" y="-10%" width="120%" height="120%">
            <feTurbulence type="fractalNoise" baseFrequency="0.02" numOctaves="2" result="noise" />
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="1.5" xChannelSelector="R" yChannelSelector="G" />
        </filter>
    </defs>
);

// 0A. Scénario : Phase de Financement (Pending)
export const PendingCylinderDrawing = () => (
    <svg viewBox="0 0 410 420" className="w-full h-auto max-w-sm mx-auto font-sans drop-shadow-sm">
        <SketchFilter />
        <g filter="url(#sketch)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">

            {/* Liquides dans le cylindre (Empilés de haut en bas pour un chevauchement parfait) */}

            {/* 4. Petite couche Senior (Verte) - Nouvellement déposée */}
            <path d="M 140 180 Q 170 185 200 180 T 260 180 L 260 330 a 10 10 0 0 1 -10 10 h -100 a 10 10 0 0 1 -10 -10 Z" className="fill-green-500/30 dark:fill-green-900/40" stroke="none" />
            <path d="M 140 180 Q 170 185 200 180 T 260 180" className="stroke-green-500" fill="none" />

            {/* 3. Petite couche Junior (Jaune) - Nouvellement déposée */}
            <path d="M 140 210 Q 170 205 200 210 T 260 210 L 260 330 a 10 10 0 0 1 -10 10 h -100 a 10 10 0 0 1 -10 -10 Z" className="fill-yellow-500/30 dark:fill-yellow-900/50" stroke="none" />
            <path d="M 140 210 Q 170 205 200 210 T 260 210" className="stroke-yellow-500" fill="none" />

            {/* 2. Premium (Déjà présent au fond) */}
            <path d="M 140 230 Q 170 235 200 230 T 260 230 L 260 330 a 10 10 0 0 1 -10 10 h -100 a 10 10 0 0 1 -10 -10 Z" className="fill-orange-500/30 dark:fill-orange-900/50" stroke="none" />
            <path d="M 140 230 Q 170 235 200 230 T 260 230" className="stroke-orange-500" fill="none" />

            {/* 1. Sponsor (Déjà présent au fond) */}
            <path d="M 140 280 Q 170 275 200 280 T 260 280 L 260 330 a 10 10 0 0 1 -10 10 h -100 a 10 10 0 0 1 -10 -10 Z" className="fill-red-500/30 dark:fill-red-900/50" stroke="none" />
            <path d="M 140 280 Q 170 275 200 280 T 260 280" className="stroke-red-500" fill="none" />

            {/* Contours du Cylindre (Trait plein pour le dessus) */}
            <path d="M 140 50 v 280 a 10 10 0 0 0 10 10 h 100 a 10 10 0 0 0 10 -10 v -280" className="stroke-slate-600 dark:stroke-slate-300" fill="none" strokeWidth="3" />
            <ellipse cx="200" cy="50" rx="60" ry="10" className="stroke-slate-600 dark:stroke-slate-300" fill="none" strokeWidth="3" />

            {/* --- Verre Senior (Gauche) --- */}
            {/* Corps du verre (Long, évasé et incliné sans toucher le cylindre) */}
            <path d="M 135 30 L 65 15 L 50 95 L 100 110 Z" className="stroke-slate-400 fill-white/20 dark:fill-slate-800/50" />
            {/* Liquide vert à l'intérieur avec ligne de niveau horizontale */}
            <path d="M 135 30 L 62 30 L 50 95 L 100 110 Z" className="fill-green-500/70" stroke="none" />
            {/* Écoulement principal (Courbe de Bézier) */}
            <path d="M 135 30 Q 165 30 160 180" className="stroke-green-500/80 dark:stroke-green-400/80" fill="none" strokeWidth="5" strokeLinecap="round" />
            {/* Reflet de l'écoulement */}
            <path d="M 137 33 Q 162 33 158 175" className="stroke-green-300 dark:stroke-green-200" fill="none" strokeWidth="1.5" strokeLinecap="round" />
            {/* Gouttelettes et éclaboussures */}
            <circle cx="160" cy="180" r="2.5" className="fill-green-500/80 stroke-none" />
            <circle cx="154" cy="187" r="1.5" className="fill-green-500/80 stroke-none" />
            <circle cx="166" cy="183" r="2" className="fill-green-400/80 stroke-none" />

            {/* --- Verre Junior (Droite) --- */}
            {/* Corps du verre (Long, évasé et incliné sans toucher le cylindre) */}
            <path d="M 265 30 L 335 15 L 350 95 L 300 110 Z" className="stroke-slate-400 fill-white/20 dark:fill-slate-800/50" />
            {/* Liquide jaune à l'intérieur avec ligne de niveau horizontale */}
            <path d="M 265 30 L 338 30 L 350 95 L 300 110 Z" className="fill-yellow-500/70" stroke="none" />
            {/* Écoulement principal (Courbe de Bézier) */}
            <path d="M 265 30 Q 235 30 240 210" className="stroke-yellow-500/80 dark:stroke-yellow-400/80" fill="none" strokeWidth="5" strokeLinecap="round" />
            {/* Reflet de l'écoulement */}
            <path d="M 263 33 Q 238 33 242 205" className="stroke-yellow-300 dark:stroke-yellow-200" fill="none" strokeWidth="1.5" strokeLinecap="round" />
            {/* Gouttelettes et éclaboussures */}
            <circle cx="240" cy="210" r="2.5" className="fill-yellow-500/80 stroke-none" />
            <circle cx="234" cy="217" r="1.5" className="fill-yellow-500/80 stroke-none" />
            <circle cx="246" cy="213" r="2" className="fill-yellow-400/80 stroke-none" />

            {/* Reflets sur le verre du cylindre */}
            <path d="M 150 70 v 240" className="stroke-white/50 dark:stroke-white/10" fill="none" strokeWidth="4" />

            {/* Robinet détaillé (Fermé) */}
            <path d="M 260 300 h 10 v 20 h -10 Z" className="stroke-slate-600 fill-slate-200 dark:fill-slate-800" />
            <path d="M 270 305 h 25 Q 315 305 315 325" className="stroke-slate-500" fill="none" strokeWidth="12" />
            <rect x="280" y="295" width="15" height="30" className="stroke-slate-600 fill-slate-300" />
            <path d="M 275 285 h 25" className="stroke-slate-700 dark:stroke-slate-200" fill="none" strokeWidth="5" />
            <circle cx="287.5" cy="285" r="4" className="fill-slate-800 stroke-none" />
        </g>

        {/* Textes (Nets, hors filtre) */}
        <g textAnchor="middle" className="font-bold">
            {/* Labels décalés proprement sous chaque verre */}
            <text x="85" y="135" fontSize="12" className="fill-green-600 dark:fill-green-400">+ Dépôt Senior</text>
            <text x="315" y="135" fontSize="12" className="fill-yellow-600 dark:fill-yellow-400">+ Dépôt Junior</text>

            {/* Labels des couches au sein du cylindre */}
            <text x="200" y="198" fontSize="11" className="fill-green-800 dark:fill-green-200">Senior</text>
            <text x="200" y="225" fontSize="11" className="fill-yellow-800 dark:fill-yellow-200">Junior</text>
            <text x="200" y="260" fontSize="12" className="fill-orange-800 dark:fill-orange-200">Premium (Déjà là)</text>
            <text x="200" y="310" fontSize="12" className="fill-red-800 dark:fill-red-200">First Loss (Déjà là)</text>

            <text x="200" y="380" fontSize="14" className="fill-slate-600 dark:fill-slate-300">Phase de Financement (Ouvert)</text>
        </g>
    </svg>
);

// 0B. Scénario : Phase Active (Started - Couvercle fermé)
export const ActiveCylinderDrawing = () => (
    <svg viewBox="0 0 410 420" className="w-full h-auto max-w-sm mx-auto font-sans drop-shadow-sm">
        <SketchFilter />
        <g filter="url(#sketch)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            {/* 4. Senior */}
            <path d="M 140 70 Q 170 75 200 70 T 260 70 L 260 330 a 10 10 0 0 1 -10 10 h -100 a 10 10 0 0 1 -10 -10 Z" className="fill-green-500/30 dark:fill-green-900/40" stroke="none" />
            <path d="M 140 70 Q 170 75 200 70 T 260 70" className="stroke-green-500" fill="none" />
            {/* 3. Junior */}
            <path d="M 140 170 Q 170 165 200 170 T 260 170 L 260 330 a 10 10 0 0 1 -10 10 h -100 a 10 10 0 0 1 -10 -10 Z" className="fill-yellow-500/30 dark:fill-yellow-900/50" stroke="none" />
            <path d="M 140 170 Q 170 165 200 170 T 260 170" className="stroke-yellow-500" fill="none" />
            {/* 2. Premium */}
            <path d="M 140 230 Q 170 235 200 230 T 260 230 L 260 330 a 10 10 0 0 1 -10 10 h -100 a 10 10 0 0 1 -10 -10 Z" className="fill-orange-500/30 dark:fill-orange-900/50" stroke="none" />
            <path d="M 140 230 Q 170 235 200 230 T 260 230" className="stroke-orange-500" fill="none" />
            {/* 1. Sponsor */}
            <path d="M 140 280 Q 170 275 200 280 T 260 280 L 260 330 a 10 10 0 0 1 -10 10 h -100 a 10 10 0 0 1 -10 -10 Z" className="fill-red-500/30 dark:fill-red-900/50" stroke="none" />
            <path d="M 140 280 Q 170 275 200 280 T 260 280" className="stroke-red-500" fill="none" />

            {/* Contours du Cylindre */}
            <path d="M 140 50 v 280 a 10 10 0 0 0 10 10 h 100 a 10 10 0 0 0 10 -10 v -280" className="stroke-slate-600 dark:stroke-slate-300" fill="none" strokeWidth="3" />

            {/* Reflets sur le verre */}
            <path d="M 150 70 v 240" className="stroke-white/50 dark:stroke-white/10" fill="none" strokeWidth="4" />

            {/* Couvercle Fermé */}
            <path d="M 130 50 l 0 -10 a 70 15 0 0 1 140 0 l 0 10 a 70 15 0 0 1 -140 0 Z" className="fill-slate-800 dark:fill-slate-200 stroke-slate-900 dark:stroke-slate-100" strokeWidth="2" />
            <ellipse cx="200" cy="40" rx="70" ry="15" className="fill-slate-700 dark:fill-slate-300 stroke-slate-900 dark:stroke-slate-100" strokeWidth="2" />
            {/* Poignée du couvercle */}
            <path d="M 185 40 v -15 h 30 v 15" className="stroke-slate-900 dark:stroke-slate-100" fill="none" strokeWidth="4" />

            {/* Robinet détaillé (Fermé) */}
            <path d="M 260 300 h 10 v 20 h -10 Z" className="stroke-slate-600 fill-slate-200 dark:fill-slate-800" />
            <path d="M 270 305 h 25 Q 315 305 315 325" className="stroke-slate-500" fill="none" strokeWidth="12" />
            <rect x="280" y="295" width="15" height="30" className="stroke-slate-600 fill-slate-300" />
            <path d="M 275 285 h 25" className="stroke-slate-700 dark:stroke-slate-200" fill="none" strokeWidth="5" />
            <circle cx="287.5" cy="285" r="4" className="fill-slate-800 stroke-none" />
        </g>

        <g textAnchor="middle" className="font-bold">
            <text x="200" y="125" fontSize="14" className="fill-green-800 dark:fill-green-200">4. Senior</text>
            <text x="200" y="205" fontSize="13" className="fill-yellow-800 dark:fill-yellow-200">3. Junior</text>
            <text x="200" y="260" fontSize="12" className="fill-orange-800 dark:fill-orange-200">2. Premium</text>
            <text x="200" y="310" fontSize="12" className="fill-red-800 dark:fill-red-200">1. First Loss</text>
            <text x="200" y="380" fontSize="14" className="fill-slate-600 dark:fill-slate-300">Vault Actif (Fermé & Verrouillé)</text>
        </g>
    </svg>
);

// 1. Scénario : Cylindre Scellé (Pas de sinistre)
export const SuccessCylinderDrawing = () => (
    <svg viewBox="0 0 410 420" className="w-full h-auto max-w-sm mx-auto font-sans drop-shadow-sm">
        <SketchFilter />

        {/* Formes dessinées */}
        <g filter="url(#sketch)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            {/* Liquides dans le cylindre (Empilés de haut en bas pour un chevauchement parfait) */}

            {/* 4. Senior (Dessiné en premier, rempli jusqu'au fond) */}
            <path d="M 140 70 Q 170 75 200 70 T 260 70 L 260 330 a 10 10 0 0 1 -10 10 h -100 a 10 10 0 0 1 -10 -10 Z" className="fill-green-500/30 dark:fill-green-900/40" stroke="none" />
            <path d="M 140 70 Q 170 75 200 70 T 260 70" className="stroke-green-500" fill="none" />

            {/* 3. Junior (Recouvre la partie inférieure de Senior) */}
            <path d="M 140 170 Q 170 165 200 170 T 260 170 L 260 330 a 10 10 0 0 1 -10 10 h -100 a 10 10 0 0 1 -10 -10 Z" className="fill-yellow-500/30 dark:fill-yellow-900/50" stroke="none" />
            <path d="M 140 170 Q 170 165 200 170 T 260 170" className="stroke-yellow-500" fill="none" />

            {/* 2. Premium (Recouvre la partie inférieure de Junior) */}
            <path d="M 140 230 Q 170 235 200 230 T 260 230 L 260 330 a 10 10 0 0 1 -10 10 h -100 a 10 10 0 0 1 -10 -10 Z" className="fill-orange-500/30 dark:fill-orange-900/50" stroke="none" />
            <path d="M 140 230 Q 170 235 200 230 T 260 230" className="stroke-orange-500" fill="none" />

            {/* 1. Sponsor (Le plus lourd, recouvre le fond du cylindre) */}
            <path d="M 140 280 Q 170 275 200 280 T 260 280 L 260 330 a 10 10 0 0 1 -10 10 h -100 a 10 10 0 0 1 -10 -10 Z" className="fill-red-500/30 dark:fill-red-900/50" stroke="none" />
            <path d="M 140 280 Q 170 275 200 280 T 260 280" className="stroke-red-500" fill="none" />

            {/* Bulles d'effervescence pour le Yield dans Senior et Junior */}
            <circle cx="160" cy="100" r="3" className="stroke-green-300" fill="none" />
            <circle cx="230" cy="130" r="4" className="stroke-green-300" fill="none" />
            <circle cx="180" cy="150" r="2" className="stroke-green-300" fill="none" />
            <circle cx="170" cy="200" r="3" className="stroke-yellow-300" fill="none" />
            <circle cx="240" cy="190" r="2" className="stroke-yellow-300" fill="none" />

            {/* Contours du Cylindre */}
            <path d="M 140 50 v 280 a 10 10 0 0 0 10 10 h 100 a 10 10 0 0 0 10 -10 v -280" className="stroke-slate-600 dark:stroke-slate-300" fill="none" strokeWidth="3" />
            <ellipse cx="200" cy="50" rx="60" ry="10" className="stroke-slate-600 dark:stroke-slate-300" fill="none" />

            {/* Reflets sur le verre du cylindre */}
            <path d="M 150 70 v 240" className="stroke-white/50 dark:stroke-white/10" fill="none" strokeWidth="4" />
            <path d="M 250 100 v 150" className="stroke-white/30 dark:stroke-white/5" fill="none" strokeWidth="2" />

            {/* Robinet */}
            <path d="M 260 300 h 10 v 20 h -10 Z" className="stroke-slate-600 fill-slate-200 dark:fill-slate-800" />
            <path d="M 270 305 h 25 Q 315 305 315 325" className="stroke-slate-500" fill="none" strokeWidth="12" />
            <rect x="280" y="295" width="15" height="30" className="stroke-slate-600 fill-slate-300" />
            <path d="M 275 285 h 25" className="stroke-slate-700 dark:stroke-slate-200" fill="none" strokeWidth="5" />
            <circle cx="287.5" cy="285" r="4" className="fill-slate-800 stroke-none" />

            {/* Flèche de Densité */}
            <path d="M 100 80 v 240" className="stroke-slate-400" fill="none" strokeWidth="2" strokeDasharray="4 4" />
            <path d="M 95 310 l 5 10 l 5 -10" className="stroke-slate-400" fill="none" strokeWidth="2" />
        </g>

        {/* Textes et Éléments non filtrés (Nets) */}

        {/* Tampon SCELLÉ par dessus le robinet */}
        <g transform="translate(290, 270) rotate(-15)">
            <rect x="-40" y="-15" width="80" height="30" rx="4" className="stroke-emerald-600 fill-emerald-50 dark:fill-emerald-900/50" strokeWidth="2" />
            <text x="0" y="5" textAnchor="middle" fontSize="14" className="fill-emerald-700 dark:fill-emerald-400 font-bold uppercase tracking-wider">Scellé</text>
        </g>

        <g textAnchor="middle" className="font-bold">
            <text x="200" y="125" fontSize="14" className="fill-green-800 dark:fill-green-200">4. Senior</text>
            <text x="200" y="205" fontSize="13" className="fill-yellow-800 dark:fill-yellow-200">3. Junior</text>
            <text x="200" y="260" fontSize="12" className="fill-orange-800 dark:fill-orange-200">2. Premium</text>
            <text x="200" y="310" fontSize="12" className="fill-red-800 dark:fill-red-200">1. First Loss</text>

            <text x="75" y="200" fontSize="12" className="fill-slate-500 dark:fill-slate-400" transform="rotate(-90 75,200)">Masse Volumique +</text>

            <text x="200" y="380" fontSize="14" className="fill-slate-600 dark:fill-slate-300">Aucun Sinistre (Yield Généré)</text>
        </g>
    </svg>
);

// 2. Scénario : Cylindre Ouvert (Catastrophe) + Facture
export const CatastropheCylinderDrawing = () => (
    <svg viewBox="0 0 410 420" className="w-full h-auto max-w-sm mx-auto font-sans drop-shadow-sm">
        <SketchFilter />

        {/* Formes dessinées avec effet croquis */}
        <g filter="url(#sketch)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            {/* Liquides restants (Ordre de calque : Senior, Junior, Premium) */}

            {/* 4. Senior */}
            <path d="M 140 135 Q 170 130 200 135 T 260 135 L 260 330 a 10 10 0 0 1 -10 10 h -100 a 10 10 0 0 1 -10 -10 Z" className="fill-green-500/30 dark:fill-green-900/40" stroke="none" />
            <path d="M 140 135 Q 170 130 200 135 T 260 135" className="stroke-green-500" fill="none" />

            {/* 3. Junior */}
            <path d="M 140 235 Q 155 245 170 235 T 200 235 T 230 235 T 260 235 L 260 330 a 10 10 0 0 1 -10 10 h -100 a 10 10 0 0 1 -10 -10 Z" className="fill-yellow-500/30 dark:fill-yellow-900/50" stroke="none" />
            <path d="M 140 235 Q 155 245 170 235 T 200 235 T 230 235 T 260 235" className="stroke-yellow-500" fill="none" />

            {/* 2. Premium */}
            <path d="M 140 295 Q 160 285 180 295 T 220 295 T 260 295 L 260 330 a 10 10 0 0 1 -10 10 h -100 a 10 10 0 0 1 -10 -10 Z" className="fill-orange-500/30 dark:fill-orange-900/50" stroke="none" />
            <path d="M 140 295 Q 160 285 180 295 T 220 295 T 260 295" className="stroke-orange-500" fill="none" />

            {/* Contours du Cylindre */}
            <path d="M 140 50 v 280 a 10 10 0 0 0 10 10 h 100 a 10 10 0 0 0 10 -10 v -280" className="stroke-slate-600 dark:stroke-slate-300" fill="none" strokeWidth="3" />
            <ellipse cx="200" cy="50" rx="60" ry="10" className="stroke-slate-600 dark:stroke-slate-300" fill="none" />

            {/* Ligne indiquant l'ancien niveau maximum (trait non rallongé) */}
            <ellipse cx="200" cy="70" rx="60" ry="10" className="stroke-slate-400" fill="none" strokeDasharray="4 4" />
            <path d="M 266 70 h 8" className="stroke-slate-400" fill="none" />

            {/* Reflets sur le verre */}
            <path d="M 150 70 v 240" className="stroke-white/50 dark:stroke-white/10" fill="none" strokeWidth="4" />

            {/* Liquide qui s'écoule du bec du robinet (Placé AVANT le robinet pour être en arrière-plan) */}
            <path d="M 315 325 C 315 335, 325 350, 325 390" className="stroke-orange-500" fill="none" strokeWidth="4" strokeLinecap="round" />

            {/* Gouttes ou éclaboussures ajustées à la nouvelle trajectoire */}
            <circle cx="325" cy="398" r="2" className="fill-red-500 stroke-none" />
            <circle cx="332" cy="388" r="1.5" className="fill-orange-500 stroke-none" />
            <circle cx="318" cy="392" r="2.5" className="fill-red-500 stroke-none" />

            {/* Robinet */}
            <path d="M 260 300 h 10 v 20 h -10 Z" className="stroke-slate-600 fill-slate-200 dark:fill-slate-800" />
            <path d="M 270 305 h 25 Q 315 305 315 325" className="stroke-slate-500" fill="none" strokeWidth="12" />
            <rect x="280" y="295" width="15" height="30" className="stroke-slate-600 fill-slate-300" />
            <path d="M 275 285 h 25" className="stroke-slate-700 dark:stroke-slate-200" fill="none" strokeWidth="5" />
            <circle cx="287.5" cy="285" r="4" className="fill-slate-800 stroke-none" />

            {/* Éclair de l'Oracle au dessus (Encore réduit en largeur) */}
            <path d="M 156 5 L 240 5 L 218 45 L 246 45 L 185 100 L 202 55 L 166 55 Z" className="text-indigo-500 stroke-indigo-600" fill="currentColor" strokeWidth="2" strokeLinejoin="round" />

            {/* Flèche de Densité */}
            <path d="M 100 80 v 240" className="stroke-slate-400" fill="none" strokeWidth="2" strokeDasharray="4 4" />
            <path d="M 95 310 l 5 10 l 5 -10" className="stroke-slate-400" fill="none" strokeWidth="2" />
        </g>

        {/* Textes et Éléments Nets (Hors filtre) */}

        {/* Texte Oracle à l'intérieur de l'éclair (décalé un peu plus à gauche) */}
        <text x="195" y="32" fontSize="12" className="fill-white font-bold uppercase tracking-wider" textAnchor="middle">Oracle</text>

        {/* Dessin de la facture validée (Invoice) */}
        <g transform="translate(325, 290) rotate(10)">
            <rect x="0" y="0" width="32" height="42" rx="2" className="fill-white dark:fill-slate-800 stroke-slate-400" strokeWidth="1.5" />
            <path d="M 6 10 h 20 M 6 16 h 20 M 6 22 h 12" className="stroke-slate-300 dark:stroke-slate-500" strokeWidth="1.5" fill="none" />
            <circle cx="22" cy="30" r="6" className="stroke-red-500 fill-red-50 dark:fill-red-900/50" strokeWidth="1.5" />
            <path d="M 19 30 l 2 2 l 4 -4" className="stroke-red-500" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        </g>

        <g textAnchor="middle" className="font-bold">
            {/* Texte Max décalé pour ne plus toucher le trait */}
            <text x="290" y="74" fontSize="10" className="fill-slate-400">Max</text>

            <text x="200" y="190" fontSize="14" className="fill-green-800 dark:fill-green-200">4. Senior</text>
            <text x="200" y="270" fontSize="13" className="fill-yellow-800 dark:fill-yellow-200">3. Junior</text>

            <text x="200" y="315" fontSize="11" className="fill-orange-800 dark:fill-orange-300">Premium s'écoule...</text>
            <text x="75" y="200" fontSize="12" className="fill-slate-500 dark:fill-slate-400" transform="rotate(-90 75,200)">Masse Volumique +</text>

            <text x="345" y="264" fontSize="11" className="fill-slate-600 dark:fill-slate-400">Retrait sur</text>
            <text x="345" y="278" fontSize="11" className="fill-slate-600 dark:fill-slate-400">factures vérifiées</text>

            {/* Texte First Loss décalé sur la droite pour ne pas toucher le liquide qui tombe */}
            <text x="375" y="375" fontSize="12" className="fill-red-600 dark:fill-red-400">1. First Loss</text>
            <text x="375" y="390" fontSize="11" className="fill-slate-600 dark:fill-slate-400">(Écoulée)</text>

            <text x="200" y="405" fontSize="14" className="fill-indigo-600 dark:fill-indigo-400">Sinistre : Robinet Ouvert</text>
        </g>
    </svg>
);

// 3. Dessin du Levier de Rendement (Yield Splitting) - LECTURE DROITE À GAUCHE
export const LeverageDrawing = () => (
    <svg viewBox="0 0 400 300" className="w-full h-auto max-w-sm mx-auto font-sans drop-shadow-sm">
        <SketchFilter />
        <g filter="url(#sketch)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">

            {/* Lignes de flux (Flèches dessinées en premier pour passer sous les boîtes) */}

            {/* Flux Senior (Droite) vers Senior Yield */}
            <path d="M 280 190 L 280 90" className="stroke-emerald-500" fill="none" strokeWidth="3" />
            <path d="M 275 100 l 5 -10 l 5 10" className="stroke-emerald-500" fill="none" strokeWidth="3" />

            {/* Flux Junior (Gauche) vers Junior Yield */}
            <path d="M 60 190 L 60 90" className="stroke-yellow-500" fill="none" strokeWidth="3" />
            <path d="M 55 100 l 5 -10 l 5 10" className="stroke-yellow-500" fill="none" strokeWidth="3" />

            {/* Ligne de transfert de 30% (De Droite à Gauche) */}
            {/* Démarre du flux Senior, part vers la gauche et remonte vers le Junior */}
            <path d="M 280 140 Q 120 140 120 90" className="stroke-emerald-500" fill="none" strokeWidth="3" strokeDasharray="6 6" />
            <path d="M 115 100 l 5 -10 l 5 10" className="stroke-emerald-500" fill="none" strokeWidth="3" />

            {/* Blocs de Capital (En bas) */}
            {/* Senior (Droite - Plus grand car 80% du capital) */}
            <rect x="180" y="190" width="200" height="70" rx="8" className="stroke-green-500 text-green-50 dark:text-green-900/20" fill="currentColor" />

            {/* Junior (Gauche - Plus petit car 20% du capital) */}
            <rect x="18" y="190" width="145" height="70" rx="8" className="stroke-orange-400 text-orange-50 dark:text-orange-900/20" fill="currentColor" />

            {/* Blocs de Rendement / Yield (En haut) */}
            {/* Senior Yield (Droite) */}
            <rect x="180" y="30" width="200" height="60" rx="8" className="stroke-emerald-400 text-emerald-50 dark:text-emerald-900/30" fill="currentColor" />

            {/* Junior Yield (Gauche) */}
            <rect x="18" y="30" width="145" height="60" rx="8" className="stroke-yellow-400 text-yellow-50 dark:text-yellow-900/30" fill="currentColor" />
        </g>

        {/* Textes (Nets, sans filtre, ajustés au millimètre pour ne pas déborder) */}
        <g textAnchor="middle" className="font-bold">

            {/* Textes Capital (Bas) */}
            {/* Senior (Droite) */}
            <text x="280" y="220" fontSize="14" className="fill-green-700 dark:fill-green-400">Capital Senior (80%)</text>
            <text x="280" y="240" fontSize="11" className="fill-slate-600 dark:fill-slate-400 font-normal">Faible risque, yield plafonné</text>

            {/* Junior (Gauche) */}
            <text x="90" y="220" fontSize="14" className="fill-orange-700 dark:fill-orange-500">Capital Junior (20%)</text>
            <text x="90" y="240" fontSize="11" className="fill-slate-600 dark:fill-slate-400 font-normal">Risque élevé, yield boosté</text>

            {/* Textes Yield (Haut) */}
            {/* Senior Yield (Droite) */}
            <text x="280" y="65" fontSize="14" className="fill-emerald-700 dark:fill-emerald-400">Yield de base (Max 70%)</text>

            {/* Junior Yield (Gauche) */}
            <text x="90" y="52" fontSize="12" className="fill-yellow-700 dark:fill-yellow-500">Yield de base</text>
            <text x="90" y="72" fontSize="13" className="fill-emerald-600 dark:fill-emerald-400">+ 30% du Senior</text>

            {/* Badge de la flèche de transfert (Centré sur la courbe) */}
            <rect x="150" y="129" width="100" height="22" rx="4" className="fill-white dark:fill-slate-800 stroke-slate-200 dark:stroke-slate-700" strokeWidth="1" />
            <text x="200" y="145" fontSize="11" className="fill-emerald-600 dark:fill-emerald-400">Transfert de 30%</text>
        </g>
    </svg>
);

