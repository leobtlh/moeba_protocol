import React, { useEffect, useState } from 'react';
import { X, BookOpen, Sun, Zap } from '../ui/Icons';

// --- COMPOSANTS DE DESSIN ---
const SketchFilter = () => (
    <defs>
        <filter id="sketch" x="-10%" y="-10%" width="120%" height="120%">
            <feTurbulence type="fractalNoise" baseFrequency="0.02" numOctaves="2" result="noise" />
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="1.5" xChannelSelector="R" yChannelSelector="G" />
        </filter>
    </defs>
);

// 0A. Scénario : Phase de Financement (Pending)
const PendingCylinderDrawing = () => (
    <svg viewBox="0 0 400 420" className="w-full h-auto max-w-sm mx-auto font-sans drop-shadow-sm">
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

            {/* ========================================================= */}
            {/* VERRES ET LIQUIDES VERSÉS EN ARC (Senior à gauche, Junior à droite) */}
            {/* ========================================================= */}

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
const ActiveCylinderDrawing = () => (
    <svg viewBox="0 0 400 420" className="w-full h-auto max-w-sm mx-auto font-sans drop-shadow-sm">
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
const SuccessCylinderDrawing = () => (
    <svg viewBox="0 0 400 420" className="w-full h-auto max-w-sm mx-auto font-sans drop-shadow-sm">
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

            {/* Robinet détaillé (Fermé) */}
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
const CatastropheCylinderDrawing = () => (
    <svg viewBox="0 0 400 420" className="w-full h-auto max-w-sm mx-auto font-sans drop-shadow-sm">
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

            {/* 1. Sponsor est écoulé donc il n'y a plus de rouge dans le cylindre */}

            {/* Contours du Cylindre */}
            <path d="M 140 50 v 280 a 10 10 0 0 0 10 10 h 100 a 10 10 0 0 0 10 -10 v -280" className="stroke-slate-600 dark:stroke-slate-300" fill="none" strokeWidth="3" />
            <ellipse cx="200" cy="50" rx="60" ry="10" className="stroke-slate-600 dark:stroke-slate-300" fill="none" />

            {/* Ligne indiquant l'ancien niveau maximum (trait non rallongé) */}
            <ellipse cx="200" cy="70" rx="60" ry="10" className="stroke-slate-400" fill="none" strokeDasharray="4 4" />
            <path d="M 270 70 h 15" className="stroke-slate-400" fill="none" />

            {/* Reflets sur le verre */}
            <path d="M 150 70 v 240" className="stroke-white/50 dark:stroke-white/10" fill="none" strokeWidth="4" />

            {/* Liquide qui s'écoule du bec du robinet (Placé AVANT le robinet pour être en arrière-plan) */}
            <path d="M 315 325 C 315 335, 325 350, 325 390" className="stroke-orange-500" fill="none" strokeWidth="4" strokeLinecap="round" />

            {/* Gouttes ou éclaboussures ajustées à la nouvelle trajectoire */}
            <circle cx="325" cy="398" r="2" className="fill-red-500 stroke-none" />
            <circle cx="332" cy="388" r="1.5" className="fill-orange-500 stroke-none" />
            <circle cx="318" cy="392" r="2.5" className="fill-red-500 stroke-none" />

            {/* Robinet détaillé (OUVERT) - Dessiné PAR-DESSUS le liquide */}
            <path d="M 260 300 h 10 v 20 h -10 Z" className="stroke-slate-600 fill-slate-200 dark:fill-slate-800" />
            <path d="M 270 305 h 25 Q 315 305 315 325" className="stroke-slate-500" fill="none" strokeWidth="12" />
            <rect x="280" y="295" width="15" height="30" className="stroke-slate-600 fill-slate-300" />
            <path d="M 287.5 275 v 20" className="stroke-slate-700 dark:stroke-slate-200" fill="none" strokeWidth="5" />
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
            <text x="300" y="74" fontSize="10" className="fill-slate-400">Max</text>

            <text x="200" y="190" fontSize="14" className="fill-green-800 dark:fill-green-200">4. Senior</text>
            <text x="200" y="270" fontSize="13" className="fill-yellow-800 dark:fill-yellow-200">3. Junior</text>

            <text x="200" y="315" fontSize="11" className="fill-orange-800 dark:fill-orange-300">Premium s'écoule...</text>
            <text x="75" y="200" fontSize="12" className="fill-slate-500 dark:fill-slate-400" transform="rotate(-90 75,200)">Masse Volumique +</text>

            <text x="345" y="265" fontSize="11" className="fill-slate-600 dark:fill-slate-400">Retrait sur</text>
            <text x="345" y="280" fontSize="11" className="fill-slate-600 dark:fill-slate-400">factures vérifiées</text>

            {/* Texte First Loss décalé sur la droite pour ne pas toucher le liquide qui tombe */}
            <text x="375" y="375" fontSize="12" className="fill-red-600 dark:fill-red-400">1. First Loss</text>
            <text x="375" y="390" fontSize="11" className="fill-slate-600 dark:fill-slate-400">(Écoulée)</text>

            <text x="200" y="405" fontSize="14" className="fill-indigo-600 dark:fill-indigo-400">Sinistre : Robinet Ouvert</text>
        </g>
    </svg>
);

// 3. Dessin du Levier de Rendement (Yield Splitting) - LECTURE DROITE À GAUCHE
const LeverageDrawing = () => (
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
            <rect x="20" y="190" width="140" height="70" rx="8" className="stroke-orange-400 text-orange-50 dark:text-orange-900/20" fill="currentColor" />

            {/* Blocs de Rendement / Yield (En haut) */}
            {/* Senior Yield (Droite) */}
            <rect x="180" y="30" width="200" height="60" rx="8" className="stroke-emerald-400 text-emerald-50 dark:text-emerald-900/30" fill="currentColor" />

            {/* Junior Yield (Gauche) */}
            <rect x="20" y="30" width="140" height="60" rx="8" className="stroke-yellow-400 text-yellow-50 dark:text-yellow-900/30" fill="currentColor" />
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
// -----------------------------------------------------------------------------

const AcademyModal = ({ isOpen, onClose, activeTheme }) => {
    const [shouldRender, setShouldRender] = useState(isOpen);
    const [scenario, setScenario] = useState('success');
    // Nouvel état pour gérer le Point 0
    const [vaultState, setVaultState] = useState('pending');

    useEffect(() => {
        let timeoutId;
        if (isOpen) {
            setShouldRender(true);
            document.body.style.overflow = 'hidden';
            setScenario('success');
            setVaultState('pending');
        } else {
            document.body.style.overflow = 'unset';
            timeoutId = setTimeout(() => {
                setShouldRender(false);
            }, 300);
        }

        return () => {
            document.body.style.overflow = 'unset';
            if (timeoutId) clearTimeout(timeoutId);
        };
    }, [isOpen]);

    if (!shouldRender) return null;

    const getThemeSpecificContent = () => {
        switch(activeTheme) {
            case 'climate': return "Climate & Weather : L'oracle repose sur des sources publiques (ex: NOAA, USGS). L'assureur doit fournir les coordonnées géographiques précises (Lat/Long) du risque couvert lors du déploiement du Vault.";
            case 'cyber': return "Cybersecurity : L'oracle repose sur un audit forensique post-mortem. L'assureur doit lier le Vault à un certificat de sécurité ou une preuve on-chain d'interruption de réseau.";
            case 'business': return "Business Interruption : Le déclencheur est lié à des flux de trésorerie tokenisés ou des données de chaîne d'approvisionnement vérifiables par des oracles IoT.";
            case 'flight': return "Flight Cancellation : Le Vault interroge l'API de l'aviation civile internationale. L'assureur déploie des liquidités ciblées sur des aéroports spécifiques.";
            case 'realestate': return "Real Estate Sensors : Utilisation d'Oracles Optimistes couplés à des capteurs IoT physiques (feu, inondation, structure) dans les bâtiments certifiés.";
            case 'maritime': return "Maritime Logistics: We use 'Smart Twistlocks' or Computer Vision to detect cargo loss. If stability sensors confirm a sinking event (Hull Loss), the Vault triggers an instant payout.";
            default: return "Sélectionnez un thème pour voir les spécificités de l'assurance.";
        }
    };

    return (
        <div
            className={`fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-8 bg-black/40 backdrop-blur-md transition-all duration-300 ${isOpen ? 'animate-fade-in opacity-100' : 'animate-fade-out opacity-0'}`}
            onClick={onClose}
        >
            <div
                className={`w-[95%] md:w-[85%] lg:w-[75%] max-h-[95vh] bg-white/40 dark:bg-white/5 border border-white/30 dark:border-white/10 rounded-3xl shadow-2xl flex flex-col overflow-hidden relative backdrop-blur-2xl transition-all duration-300 ${isOpen ? 'animate-zoom-in scale-100' : 'animate-zoom-out scale-95'}`}
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header */}
                <div className="flex justify-between items-center p-6 border-b border-white/30 dark:border-white/10 bg-white/20 dark:bg-white/5 shrink-0">
                    <h2 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-3">
                        <BookOpen className="h-6 w-6 text-indigo-500" />
                        Mœba Academy : <span className="text-indigo-600 dark:text-indigo-400 capitalize">{activeTheme}</span>
                    </h2>
                    <button onClick={onClose} className="p-2 bg-black/5 dark:bg-white/10 rounded-full hover:bg-black/10 dark:hover:bg-white/20 transition">
                        <X className="h-5 w-5 text-slate-600 dark:text-slate-300" />
                    </button>
                </div>

                {/* Corps de la page */}
                <div className="flex-1 overflow-y-auto p-6 md:p-10 space-y-10 bg-transparent">

                    {/* SECTION 0 : PRE-LAUNCH VS ACTIVE */}
                    <section>
                        <div className="flex justify-between items-end mb-6">
                            <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100 font-sans">
                                0. Cycle de vie du Vault
                            </h3>

                            <div className="flex items-center gap-1 bg-white/50 dark:bg-black/30 p-1 rounded-xl border border-white/40 dark:border-white/10 shadow-inner">
                                <button
                                    onClick={() => setVaultState('pending')}
                                    className={`px-4 py-2 text-sm font-bold rounded-lg transition-all flex items-center gap-2 ${vaultState === 'pending' ? 'bg-white dark:bg-slate-700 shadow-md text-blue-600 dark:text-blue-400' : 'text-slate-500 hover:text-slate-700 dark:text-slate-400'}`}
                                >
                                    Phase de Financement
                                </button>
                                <button
                                    onClick={() => setVaultState('active')}
                                    className={`px-4 py-2 text-sm font-bold rounded-lg transition-all flex items-center gap-2 ${vaultState === 'active' ? 'bg-slate-800 shadow-md text-white' : 'text-slate-500 hover:text-slate-700 dark:text-slate-400'}`}
                                >
                                    Vault Actif (Fermé)
                                </button>
                            </div>
                        </div>

                        <div className="flex flex-col xl:flex-row gap-8 items-center bg-white/30 dark:bg-white/5 p-6 md:p-8 rounded-2xl border border-white/40 dark:border-white/10">
                            {/* Dessin SVG Dynamique */}
                            <div className="w-full xl:w-1/2 flex justify-center items-center bg-white/40 dark:bg-black/20 rounded-xl p-4 border border-white/50 dark:border-white/5">
                                {vaultState === 'pending' ? <PendingCylinderDrawing /> : <ActiveCylinderDrawing />}
                            </div>

                            <div className="w-full xl:w-1/2">
                                {vaultState === 'pending' ? (
                                    <>
                                        <h4 className="text-lg font-bold text-blue-600 dark:text-blue-400 mb-4 flex items-center gap-2">
                                            Dépôts Ouverts (Avant la date de début)
                                        </h4>
                                        <p className="mb-6 text-slate-700 dark:text-slate-200">
                                            Tant que la date de début n'est pas atteinte, le Vault est ouvert. La sécurité est déjà garantie car :
                                        </p>
                                        <ul className="space-y-4">
                                            <li className="flex gap-3">
                                                <span className="text-blue-500">✓</span>
                                                <p className="text-sm text-slate-800 dark:text-slate-300"><strong>Assureur pré-engagé :</strong> Les capitaux First Loss et Premium sont déjà déposés au fond du cylindre.</p>
                                            </li>
                                            <li className="flex gap-3">
                                                <span className="text-blue-500">✓</span>
                                                <p className="text-sm text-slate-800 dark:text-slate-300"><strong>Dépôts Investisseurs :</strong> Vous pouvez rajouter librement du capital dans la tranche Senior ou Junior.</p>
                                            </li>
                                        </ul>
                                    </>
                                ) : (
                                    <>
                                        <h4 className="text-lg font-bold text-slate-800 dark:text-slate-200 mb-4 flex items-center gap-2">
                                            Risque en Cours (Cylindre Verrouillé)
                                        </h4>
                                        <p className="mb-6 text-slate-700 dark:text-slate-200">
                                            Une fois la date de début atteinte, les règles changent pour protéger tout le monde :
                                        </p>
                                        <ul className="space-y-4">
                                            <li className="flex gap-3">
                                                <span className="text-slate-500">🔒</span>
                                                <p className="text-sm text-slate-800 dark:text-slate-300"><strong>Fermeture Hermétique :</strong> Le cylindre est refermé avec un couvercle. Il est désormais impossible de rajouter ou de retirer du capital (ni Senior, ni Junior, ni Sponsor).</p>
                                            </li>
                                            <li className="flex gap-3 items-center">
                                                {/* Éclair Violet */}
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    viewBox="0 0 24 24"
                                                    fill="currentColor"
                                                    className="w-5 h-5 text-violet-500 flex-shrink-0"
                                                >
                                                    <path fillRule="evenodd" d="M14.615 1.595a.75.75 0 0 1 .359.852L12.982 9.75h7.268a.75.75 0 0 1 .548 1.262l-10.5 11.25a.75.75 0 0 1-1.272-.71l1.992-7.302H3.75a.75.75 0 0 1-.548-1.262l10.5-11.25a.75.75 0 0 1 .913-.143Z" clipRule="evenodd" />
                                                </svg>

                                                <p className="text-sm text-slate-800 dark:text-slate-300">
                                                    <strong>L'Oracle surveille :</strong> Le risque est officiellement transféré. Tout le monde attend la fin de la période de couverture.
                                                </p>
                                            </li>
                                        </ul>
                                    </>
                                )}
                            </div>
                        </div>
                    </section>

                    {/* SECTION 1 : WATERFALL (Métaphore du Cylindre de Densité) */}
                    <section>
                        <div className="flex justify-between items-end mb-6">
                            <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100 font-sans">
                                1. La Capital Stack Mœba (Cylindre de Densité)
                            </h3>

                            <div className="flex items-center gap-1 bg-white/50 dark:bg-black/30 p-1 rounded-xl border border-white/40 dark:border-white/10 shadow-inner">
                                <button
                                    onClick={() => setScenario('success')}
                                    className={`px-4 py-2 text-sm font-bold rounded-lg transition-all flex items-center gap-2 ${scenario === 'success' ? 'bg-white dark:bg-slate-700 shadow-md text-emerald-600 dark:text-emerald-400' : 'text-slate-500 hover:text-slate-700 dark:text-slate-400'}`}
                                >
                                    <Sun className="h-4 w-4" /> Sans Sinistre
                                </button>
                                <button
                                    onClick={() => setScenario('catastrophe')}
                                    className={`px-4 py-2 text-sm font-bold rounded-lg transition-all flex items-center gap-2 ${scenario === 'catastrophe' ? 'bg-red-500 shadow-md text-white' : 'text-slate-500 hover:text-slate-700 dark:text-slate-400'}`}
                                >
                                    <Zap className="h-4 w-4" /> Catastrophe
                                </button>
                            </div>
                        </div>

                        <div className="flex flex-col xl:flex-row gap-8 items-center bg-white/30 dark:bg-white/5 p-6 md:p-8 rounded-2xl border border-white/40 dark:border-white/10">
                            {/* Cylindre SVG Dynamique */}
                            <div className="w-full xl:w-1/2 flex justify-center items-center bg-white/40 dark:bg-black/20 rounded-xl p-4 border border-white/50 dark:border-white/5">
                                {scenario === 'success' ? <SuccessCylinderDrawing /> : <CatastropheCylinderDrawing />}
                            </div>

                            <div className="w-full xl:w-1/2">
                                {scenario === 'success' ? (
                                    <>
                                        <h4 className="text-lg font-bold text-emerald-700 dark:text-emerald-400 mb-4 flex items-center gap-2">
                                            Robinet Scellé & Yield Splitting
                                        </h4>
                                        <p className="mb-6 text-slate-700 dark:text-slate-200">
                                            Imaginez le capital comme des liquides de masses volumiques différentes dans un cylindre. Le capital de l'assureur est le plus lourd au fond, et le capital Senior (le plus sûr) flotte au-dessus. Si aucun sinistre n'ouvre le robinet, <strong>la couche de Premium est redistribuée sous forme de rendement (Yield)</strong> :
                                        </p>
                                        <ul className="space-y-4">
                                            <li className="flex gap-3">
                                                <span className="text-emerald-500">✓</span>
                                                <p className="text-sm text-slate-800 dark:text-slate-300"><strong>Sponsor :</strong> Récupère son capital de First Loss.</p>
                                            </li>
                                            <li className="flex gap-3">
                                                <span className="text-emerald-500">✓</span>
                                                <p className="text-sm text-slate-800 dark:text-slate-300"><strong>Senior (Sécurité) :</strong> Récupère son capital et perçoit un rendement de base issu du Premium (ex: 70% de l'APR global).</p>
                                            </li>
                                            <li className="flex gap-3">
                                                <span className="text-emerald-500">✓</span>
                                                <p className="text-sm text-slate-800 dark:text-slate-300"><strong>Junior (Yield Seekers) :</strong> Grâce à l'effet de levier, absorbe le reliquat du Premium (Yield) laissé par la tranche Senior, résultant en un APR sur-performant.</p>
                                            </li>
                                        </ul>
                                    </>
                                ) : (
                                    <>
                                        <h4 className="text-lg font-bold text-red-600 dark:text-red-400 mb-4 flex items-center gap-2">
                                            The Waterfall Engine (Robinet Ouvert)
                                        </h4>
                                        <p className="mb-6 text-slate-700 dark:text-slate-200">
                                            En cas de sinistre validé, le robinet s'ouvre et les fonds sont retirés uniquement sur factures vérifiées. Par gravité, les tranches les plus "lourdes" situées au fond s'écoulent en premier:
                                        </p>
                                        <div className="grid gap-3">
                                            <div className="flex items-center gap-4 p-3 bg-red-500/10 rounded-xl border border-red-500/20">
                                                <span className="flex-shrink-0 w-6 h-6 flex items-center justify-center bg-red-500 text-white rounded-md font-bold text-xs">1</span>
                                                <p className="text-sm text-slate-800 dark:text-slate-200"><strong>First Loss :</strong> Le capital du Sponsor est détruit en premier.</p>
                                            </div>
                                            <div className="flex items-center gap-4 p-3 bg-orange-500/10 rounded-xl border border-orange-500/20">
                                                <span className="flex-shrink-0 w-6 h-6 flex items-center justify-center bg-orange-500 text-white rounded-md font-bold text-xs">2</span>
                                                <p className="text-sm text-slate-800 dark:text-slate-200"><strong>Premium Buffer :</strong> Les primes non distribuées épongent la perte.</p>
                                            </div>
                                            <div className="flex items-center gap-4 p-3 bg-yellow-500/10 rounded-xl border border-yellow-500/20">
                                                <span className="flex-shrink-0 w-6 h-6 flex items-center justify-center bg-yellow-500 text-white rounded-md font-bold text-xs">3</span>
                                                <p className="text-sm text-slate-800 dark:text-slate-200"><strong>Junior Tranche :</strong> Absorption de la perte jusqu'à épuisement.</p>
                                            </div>
                                            <div className="flex items-center gap-4 p-3 bg-green-500/10 rounded-xl border border-green-500/20">
                                                <span className="flex-shrink-0 w-6 h-6 flex items-center justify-center bg-green-500 text-white rounded-md font-bold text-xs">4</span>
                                                <p className="text-sm text-slate-800 dark:text-slate-200"><strong>Senior Tranche :</strong> N'est touchée qu'en tout dernier recours.</p>
                                            </div>
                                        </div>
                                    </>
                                )}
                            </div>
                        </div>
                    </section>

                    {/* SECTION 2 : YIELD SPLITTING & LEVIER */}
                    <section>
                        <h3 className="text-xl font-bold mb-6 text-slate-800 dark:text-slate-100 font-sans">
                            2. Levier de Rendement (Yield Splitting)
                        </h3>

                        <div className="flex flex-col xl:flex-row gap-8 items-center bg-white/30 dark:bg-white/5 p-6 md:p-8 rounded-2xl border border-white/40 dark:border-white/10">

                            {/* Dessin Levier SVG */}
                            <div className="w-full xl:w-1/2 flex justify-center items-center bg-white/40 dark:bg-black/20 rounded-xl p-4 border border-white/50 dark:border-white/5">
                                <LeverageDrawing />
                            </div>

                            {/* Explication & Formules Mathématiques */}
                            <div className="w-full xl:w-1/2 space-y-5">
                                <p className="text-slate-700 dark:text-slate-200 leading-relaxed">
                                    La tranche Junior capte le reliquat des primes. Puisque la tranche Senior ne prend que 70% du rendement généré par son propre capital, les 30% restants sont redirigés vers la tranche Junior. Cela crée un effet de levier mécanique.
                                </p>

                                {/* Bloc Formules (Style Code Terminal) */}
                                <div className="bg-slate-900 rounded-xl p-5 shadow-inner border border-slate-700 font-mono text-sm overflow-x-auto text-emerald-400">
                                    <div className="mb-2 text-slate-400">// 1. La tranche Senior prend 70% de l'APR de base</div>
                                    <div className="mb-4 text-white">APR_Senior = APR_Base * 0.7</div>

                                    <div className="mb-2 text-slate-400">// 2. Le reste du rendement généré va au Junior</div>
                                    <div className="mb-1 text-white">Yield_Total = (Capital_Senior + Capital_Junior) * APR_Base</div>
                                    <div className="mb-4 text-white">Yield_Junior = Yield_Total - (Capital_Senior * APR_Senior)</div>

                                    <div className="mb-2 text-slate-400">// 3. L'APR final Junior est proportionnel à son petit capital</div>
                                    <div className="text-white font-bold text-yellow-400">APR_Junior = Yield_Junior / Capital_Junior</div>
                                </div>

                                {/* Exemple Chiffré */}
                                <div className="bg-indigo-50 dark:bg-indigo-900/30 p-5 rounded-xl border border-indigo-100 dark:border-indigo-800/50">
                                    <h4 className="font-bold text-indigo-900 dark:text-indigo-200 mb-2">📊 Exemple Concret :</h4>
                                    <ul className="text-sm space-y-2 text-indigo-800 dark:text-indigo-300">
                                        <li>• <strong>Capital Total :</strong> 10M$ (8M$ Senior + 2M$ Junior)</li>
                                        <li>• <strong>APR de Base :</strong> 10% (Génère 1M$ de Yield au total)</li>
                                        <li>• <strong>APR Senior :</strong> 7% (Les Seniors reçoivent 560,000$)</li>
                                        <li className="pt-2 border-t border-indigo-200 dark:border-indigo-700/50">
                                            <span className="font-bold text-yellow-600 dark:text-yellow-400">
                                                ➔ Reste pour Junior : 440,000$
                                            </span>
                                        </li>
                                        <li>
                                            <span className="font-bold text-emerald-600 dark:text-emerald-400 text-base">
                                                ➔ APR Junior Final = 22%
                                            </span> <br/>
                                            <span className="text-xs italic">(440k$ divisé par leur capital de 2M$)</span>
                                        </li>
                                    </ul>
                                </div>

                            </div>
                        </div>
                    </section>

                    {/* SECTION 3 : SPÉCIFICITÉS ASSUREUR */}
                    <section>
                        <h3 className="text-xl font-bold mb-4 text-slate-800 dark:text-slate-100 font-sans">
                            3. Spécificités Assureur ({activeTheme})
                        </h3>
                        <div className="bg-indigo-500/10 dark:bg-indigo-400/10 p-6 rounded-2xl border border-indigo-500/20 dark:border-indigo-400/20">
                            <p className="text-indigo-900 dark:text-indigo-100 leading-relaxed font-medium">
                                {getThemeSpecificContent()}
                            </p>
                        </div>
                    </section>

                </div>
            </div>
        </div>
    );
};

export default AcademyModal;
