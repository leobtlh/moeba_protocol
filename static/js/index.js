// ============================================
// MOEBA PROTOCOL - Landing Page JavaScript
// ============================================

// Translations
const translations = {
    fr: {
        // Navigation
        nav_features: "Fonctionnalités",
        nav_usecases: "Cas d'usage",
        nav_architecture: "Architecture",
        nav_compliance: "Conformité",
        nav_whitepaper: "Whitepaper",
        launch_dapp: "Lancer dApp",
        
        // Hero
        badge_hpiv: "Hybrid Parametric Insurance Vault (HPIV)",
        hero_title_1: "Infrastructure Paramétrique",
        hero_title_2: "d'Assurance Décentralisée",
        hero_subtitle: "La solution au risque binaire des Cat Bonds traditionnels. Architecture multi-tranches sur ERC-4626 permettant un Soft Default et une solvabilité Fully Funded.",
        cta_launch: "Lancer dApp",
        cta_whitepaper: "Lire le Whitepaper",
        
        // Stats
        stat_liquidity: "Liquidité Standardisée",
        stat_yield: "Yield Splitting",
        stat_yield_desc: "Levier Junior / Sécurité Senior",
        stat_compliance: "Conformité Suisse (LSA)",
        
        // Features
        features_title: "Infrastructure Complète d'Assurance",
        features_subtitle: "Gestion quantitative des risques avec sécurité institutionnelle pour les vaults d'assurance DeFi.",
        feature1_title: "Capital First Loss",
        feature1_desc: "L'assureur engage son propre capital en premier via la Tranche Junior, créant un tampon de sécurité pour les investisseurs Senior.",
        feature2_title: "Mécanisme Waterfall",
        feature2_desc: "L'absorption séquentielle des pertes protège la tranche Senior grâce à une hiérarchie systématique du capital.",
        feature3_title: "Yield Splitting",
        feature3_desc: "Distribution asymétrique du rendement : le Senior reçoit un APR stable tandis que le Junior capte les primes avec effet de levier.",
        feature4_title: "Intégration Oracle",
        feature4_desc: "Déclenchement automatisé via oracles UMA avec flux de données certifiés USGS, NOAA pour des sinistres objectifs.",
        feature5_title: "Anti-Inflation Attack",
        feature5_desc: "Le minting de Dead Shares à l'initialisation verrouille le taux de change et empêche les attaques par donation sur ERC-4626.",
        feature6_title: "Fully Funded",
        feature6_desc: "Vérification mathématique que TotalAssets >= Capacity avant tout dépôt, éliminant le risque de contrepartie.",
        
        // Use Cases
        usecases_title: "Catégories de Risques Supportées",
        usecases_subtitle: "Une infrastructure agnostique pilotée par Oracles UMA et capteurs IoT pour tous les risques paramétriques mesurables.",
        uc1_title: "Climat & Météo",
        uc1_desc: "Cat Bonds paramétriques pour catastrophes naturelles. Déclenchement via données NOAA, USGS : ouragans, séismes, feux de forêt, inondations.",
        uc2_title: "Immobilier (IoT)",
        uc2_desc: "Couverture automatisée via capteurs sur site. Incendies, inondations et dégâts sismiques détectés par bâtiments connectés.",
        uc3_title: "Maritime (IoT)",
        uc3_desc: "Protection chaîne d'approvisionnement et télémétrie navires. Capteurs embarqués pour incidents, naufrages et perte de cargaison.",
        uc4_title: "Cyber Sécurité",
        uc4_desc: "Atténuation native on-chain des risques numériques. Failles de smart contracts et pannes IT massives couvertes.",
        uc5_title: "Pertes d'Exploitation",
        uc5_desc: "Amortisseurs financiers corporatifs. Déclenchement sur métriques vérifiables : chutes de revenus et retards logistiques.",
        uc6_title: "Vols & Voyages",
        uc6_desc: "Couverture aviation et tourisme. Annulations massives, fermetures d'espace aérien et grèves d'aéroports.",
        
        // Architecture
        arch_title: "Architecture Multi-Tranches",
        arch_subtitle: "Le standard HPIV introduit une hiérarchie de capital pour absorber les chocs sans liquider les investisseurs.",
        arch_step1_title: "First Loss Assureur",
        arch_step1_desc: "Le Sponsor engage son capital en premier - 100% d'absorption avant tout impact investisseur.",
        arch_step2_title: "Buffer Premium Reserve",
        arch_step2_desc: "La réserve de prime sanctuarisée absorbe les pertes secondaires après le capital assureur.",
        arch_step3_title: "Tranche Junior (ERC-20)",
        arch_step3_desc: "Investisseurs à haut risque/rendement absorbent les pertes restantes avec APR boosté.",
        arch_step4_title: "Tranche Senior (ERC-4626)",
        arch_step4_desc: "Investisseurs protégés - exposés uniquement après épuisement total des tranches inférieures.",
        arch_example_title: "Simulation Soft Default",
        arch_example_subtitle: "Vault 40M$ | Sinistre 8M$",
        arch_bar1: "First Loss Assureur",
        arch_bar2: "Tranche Junior",
        arch_bar3: "Tranche Senior",
        arch_bar3_note: "Entièrement protégée",
        arch_result: "Investisseurs Senior protégés par la hiérarchie systématique du capital",
        
        // Compliance
        compliance_title: "Cadre Réglementaire Suisse",
        compliance_subtitle: "Conçu selon les exigences de la LSA révisée et de la Loi DLT/TRD.",
        comp1_title: "VUSA (Art. 30e LSA)",
        comp1_desc: "Structure Véhicule à Usage Spécifique d'Assurance. Transformateur de risques fully funded avec conformité Art. 111d AVO.",
        comp2_title: "Loi DLT (Art. 973d CO)",
        comp2_desc: "Tokens HPIV qualifiés de Droits-Valeurs Inscrits. La blockchain agit comme registre officiel de propriété.",
        comp3_title: "LBA & LSFin",
        comp3_desc: "DeFi Permissionné avec Whitelisting KYB/KYC. Exemption Investisseurs Qualifiés alignée sur les standards institutionnels.",
        
        // CTA
        cta_title: "Prêt à Construire le Futur de l'Assurance ?",
        cta_subtitle: "Rejoignez la révolution de l'assurance décentralisée avec une infrastructure de grade institutionnel.",
        cta_launch_final: "Lancer dApp",
        cta_discord: "Rejoindre Discord",
        
        // Footer
        footer_tagline: "Infrastructure VUSA Suisse pour l'Assurance Paramétrique Décentralisée.",
        footer_protocol: "Protocole",
        footer_arch: "Architecture",
        footer_contracts: "Smart Contracts",
        footer_mechanics: "Mécanique",
        footer_resources: "Ressources",
        footer_whitepaper: "Whitepaper",
        footer_docs: "Documentation",
        footer_legal: "Légal",
        footer_finma: "Veille FINMA",
        footer_aml: "Politique LBA",
        footer_risk: "Avertissement Risques",
        footer_contact: "Contact",
        footer_copyright: "© Moeba Protocol 2026 • Infrastructure VUSA Suisse"
    },
    en: {
        // Navigation
        nav_features: "Features",
        nav_usecases: "Use Cases",
        nav_architecture: "Architecture",
        nav_compliance: "Compliance",
        nav_whitepaper: "Whitepaper",
        launch_dapp: "Launch dApp",
        
        // Hero
        badge_hpiv: "Hybrid Parametric Insurance Vault (HPIV)",
        hero_title_1: "Decentralized Parametric",
        hero_title_2: "Insurance Infrastructure",
        hero_subtitle: "The solution to the binary risk of traditional Cat Bonds. Multi-tranche architecture on ERC-4626 enabling Soft Default and Fully Funded solvency.",
        cta_launch: "Launch dApp",
        cta_whitepaper: "Read Whitepaper",
        
        // Stats
        stat_liquidity: "Standardized Liquidity",
        stat_yield: "Yield Splitting",
        stat_yield_desc: "Junior Leverage / Senior Security",
        stat_compliance: "Swiss Compliance (LSA)",
        
        // Features
        features_title: "Full-Stack Insurance Infrastructure",
        features_subtitle: "Quantitative risk management with institutional-grade security for DeFi insurance vaults.",
        feature1_title: "First Loss Capital",
        feature1_desc: "The insurer commits their own capital first via Junior Tranche, creating a safety buffer for Senior investors.",
        feature2_title: "Waterfall Mechanism",
        feature2_desc: "Sequential loss absorption protects Senior tranche through systematic capital hierarchy during catastrophic events.",
        feature3_title: "Yield Splitting",
        feature3_desc: "Asymmetric yield distribution: Senior receives stable APR while Junior captures leveraged premium returns.",
        feature4_title: "Oracle Integration",
        feature4_desc: "Automated triggering via UMA oracles with certified data streams from USGS, NOAA for objective claims.",
        feature5_title: "Anti-Inflation Attack",
        feature5_desc: "Dead Shares minting at initialization locks exchange rate and prevents donation attacks on ERC-4626.",
        feature6_title: "Fully Funded",
        feature6_desc: "Mathematical verification ensures TotalAssets >= Capacity before any deposit, eliminating counterparty risk.",
        
        // Use Cases
        usecases_title: "Supported Risk Categories",
        usecases_subtitle: "An agnostic infrastructure driven by UMA Oracles and IoT sensors for all measurable parametric risks.",
        uc1_title: "Climate & Weather",
        uc1_desc: "Parametric Cat Bonds for natural disasters. Triggered by NOAA, USGS data: hurricanes, earthquakes, wildfires, floods.",
        uc2_title: "Real Estate (IoT)",
        uc2_desc: "Automated coverage via on-site sensors. Fires, flooding, and seismic damage detection through smart buildings.",
        uc3_title: "Maritime (IoT)",
        uc3_desc: "Supply chain and vessel telemetry protection. Onboard sensors for incidents, sinking, and cargo spoilage.",
        uc4_title: "Cyber Security",
        uc4_desc: "On-chain native digital risk mitigation. Smart contract exploits and massive IT outages coverage.",
        uc5_title: "Business Interruption",
        uc5_desc: "Corporate financial buffers. Triggered by verifiable metrics: revenue drops and supply chain delays.",
        uc6_title: "Flight & Travel",
        uc6_desc: "Aviation and tourism coverage. Mass cancellations, airspace closures, and airport strikes protection.",
        
        // Architecture
        arch_title: "Multi-Tranche Architecture",
        arch_subtitle: "The HPIV standard introduces a capital hierarchy to absorb shocks without liquidating investors.",
        arch_step1_title: "Insurer First Loss",
        arch_step1_desc: "Sponsor commits capital first - 100% loss absorption before any investor impact.",
        arch_step2_title: "Premium Reserve Buffer",
        arch_step2_desc: "Ring-fenced premium reserve absorbs secondary losses after insurer capital.",
        arch_step3_title: "Junior Tranche (ERC-20)",
        arch_step3_desc: "High-risk, high-reward investors absorb remaining losses with leveraged APR.",
        arch_step4_title: "Senior Tranche (ERC-4626)",
        arch_step4_desc: "Protected investors - only exposed after total exhaustion of all lower tranches.",
        arch_example_title: "Soft Default Simulation",
        arch_example_subtitle: "Vault $40M | Claim $8M",
        arch_bar1: "Insurer First Loss",
        arch_bar2: "Junior Tranche",
        arch_bar3: "Senior Tranche",
        arch_bar3_note: "Fully protected",
        arch_result: "Senior investors protected through systematic capital hierarchy",
        
        // Compliance
        compliance_title: "Swiss Regulatory Framework",
        compliance_subtitle: "Designed according to revised ISA requirements and the DLT/TRD Law.",
        comp1_title: "VUSA (Art. 30e ISA)",
        comp1_desc: "Insurance Special Purpose Vehicle structure. Risk transformer fully funded by the capital market with Art. 111d ISO compliance.",
        comp2_title: "DLT Law (Art. 973d CO)",
        comp2_desc: "HPIV tokens qualified as Ledger-based Securities. Blockchain acts as official registry of ownership.",
        comp3_title: "AMLA & FinSA",
        comp3_desc: "Permissioned DeFi with KYB/KYC Whitelisting. Qualified Investors exemption aligned with institutional standards.",
        
        // CTA
        cta_title: "Ready to Build the Future of Insurance?",
        cta_subtitle: "Join the decentralized insurance revolution with institutional-grade infrastructure.",
        cta_launch_final: "Launch dApp",
        cta_discord: "Join Discord",
        
        // Footer
        footer_tagline: "Swiss ISPV Infrastructure for Decentralized Parametric Insurance.",
        footer_protocol: "Protocol",
        footer_arch: "Architecture",
        footer_contracts: "Smart Contracts",
        footer_mechanics: "Mechanics",
        footer_resources: "Resources",
        footer_whitepaper: "Whitepaper",
        footer_docs: "Documentation",
        footer_legal: "Legal",
        footer_finma: "FINMA Watch",
        footer_aml: "AML Policy",
        footer_risk: "Risk Warning",
        footer_contact: "Contact",
        footer_copyright: "© Moeba Protocol 2026 • Swiss ISPV Infrastructure"
    }
};

// ============================================
// LANGUAGE TOGGLE
// ============================================
function toggleLanguage() {
    const currentLang = document.documentElement.lang || 'en';
    const targetLang = currentLang === 'en' ? 'fr' : 'en';
    setLanguage(targetLang);
}

function setLanguage(lang) {
    if (!translations[lang]) lang = 'en';
    
    const elements = document.querySelectorAll('[data-i18n]');
    elements.forEach(element => {
        const key = element.getAttribute('data-i18n');
        if (translations[lang][key]) {
            element.innerHTML = translations[lang][key];
        }
    });
    
    const btn = document.getElementById('langToggle');
    if (btn) {
        btn.innerText = lang === 'en' ? 'FR' : 'EN';
    }
    
    localStorage.setItem('preferredLang', lang);
    document.documentElement.lang = lang;
}

// ============================================
// THEME TOGGLE
// ============================================
(function() {
    const switchBtn = document.getElementById('themeSwitch');
    
    const sunIcon = `
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="12" cy="12" r="4"/>
            <path d="M12 2v2"/>
            <path d="M12 20v2"/>
            <path d="m4.93 4.93 1.41 1.41"/>
            <path d="m17.66 17.66 1.41 1.41"/>
            <path d="M2 12h2"/>
            <path d="M20 12h2"/>
            <path d="m6.34 17.66-1.41 1.41"/>
            <path d="m19.07 4.93-1.41 1.41"/>
        </svg>`;

    const moonIcon = `
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
        </svg>`;

    function updateIcon(isLight) {
        if (switchBtn) switchBtn.innerHTML = isLight ? moonIcon : sunIcon;
    }

    const saved = localStorage.getItem('theme');
    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    const isLightInitial = saved === 'light' || (!saved && !prefersDark);

    if (isLightInitial) {
        document.body.classList.add('light-theme');
    } else {
        document.body.classList.remove('light-theme');
    }

    updateIcon(isLightInitial);

    if (switchBtn) {
        switchBtn.addEventListener('click', (e) => {
            e.preventDefault();
            document.body.classList.toggle('light-theme');
            const isLightNow = document.body.classList.contains('light-theme');
            localStorage.setItem('theme', isLightNow ? 'light' : 'dark');
            updateIcon(isLightNow);
        });
    }
})();

// ============================================
// MOBILE MENU
// ============================================
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const mobileMenu = document.getElementById('mobileMenu');

if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
    });
    
    // Close mobile menu when clicking a link
    mobileMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.add('hidden');
        });
    });
}

// ============================================
// SMOOTH SCROLL FOR ANCHOR LINKS
// ============================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            e.preventDefault();
            targetElement.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ============================================
// LOADER
// ============================================
const loader = document.getElementById('moebaLoader');
const cell = document.querySelector('.fusion-container');

if (loader && cell) {
    const pageLoadPromise = new Promise(resolve => {
        if (document.readyState === 'complete') {
            resolve();
        } else {
            window.addEventListener('load', resolve);
        }
    });

    const animationPromise = new Promise(resolve => {
        cell.addEventListener('animationend', resolve, { once: true });
        setTimeout(resolve, 3500);
    });

    Promise.all([pageLoadPromise, animationPromise]).then(() => {
        loader.classList.add('hidden');
        setTimeout(() => {
            loader.style.display = 'none';
        }, 1000);
    });
}

// ============================================
// INTERSECTION OBSERVER FOR ANIMATIONS
// ============================================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-fade-in-up');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe sections for animation
document.querySelectorAll('section').forEach(section => {
    section.style.opacity = '1';
});

// ============================================
// INITIALIZATION
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    const savedLang = localStorage.getItem('preferredLang') || 'en';
    setLanguage(savedLang);
});

// Scroll to top on page load
if ('scrollRestoration' in history) {
    history.scrollRestoration = 'manual';
}

window.addEventListener('load', function() {
    window.scrollTo(0, 0);
});
