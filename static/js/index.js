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
        nav_deepdive: "Deep Dive",
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
        
        // Deep Dive
        deepdive_badge: "Documentation Technique",
        deepdive_title: "Plongée Technique",
        deepdive_subtitle: "Explorez les fondations techniques de l'infrastructure d'assurance décentralisée de Moeba Protocol.",
        tech1_title: "Smart Contracts",
        tech1_desc: "Standard ERC-4626 Tokenized Vault avec architecture multi-tranches. Contrats Solidity audités sur Ethereum/Polygon.",
        tech2_title: "Intégration Oracle",
        tech2_desc: "UMA Optimistic Oracle pour la résolution des litiges. Flux de données en temps réel depuis des sources certifiées pour les déclencheurs paramétriques.",
        tech3_title: "Tokenomics & Rendements",
        tech3_desc: "Modèle de distribution asymétrique des rendements. Stabilité APR Senior vs rendements à effet de levier Junior via allocation des primes.",
        waterfall_title: "Cascade Soft Default",
        waterfall_subtitle: "Absorption séquentielle des pertes protégeant les investisseurs Senior",
        
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
        nav_deepdive: "Deep Dive",
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
        
        // Deep Dive
        deepdive_badge: "Technical Documentation",
        deepdive_title: "Protocol Deep Dive",
        deepdive_subtitle: "Explore the technical foundations powering Moeba Protocol's decentralized insurance infrastructure.",
        tech1_title: "Smart Contracts",
        tech1_desc: "ERC-4626 Tokenized Vault Standard with multi-tranche architecture. Audited Solidity contracts on Ethereum/Polygon.",
        tech2_title: "Oracle Integration",
        tech2_desc: "UMA Optimistic Oracle for dispute resolution. Real-time data feeds from certified sources for parametric triggers.",
        tech3_title: "Tokenomics & Yields",
        tech3_desc: "Asymmetric yield distribution model. Senior APR stability vs Junior leveraged returns through premium allocation.",
        waterfall_title: "Soft Default Waterfall",
        waterfall_subtitle: "Sequential loss absorption protecting Senior investors",
        
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
// LOGO PIXEL ANIMATION (Gauntlet-style)
// ============================================
class LogoPixelAnimation {
    constructor(canvasId, logoSrc) {
        this.canvas = document.getElementById(canvasId);
        if (!this.canvas) return;
        
        this.ctx = this.canvas.getContext('2d');
        this.particles = [];
        this.logoImage = new Image();
        this.logoImage.crossOrigin = 'anonymous';
        this.logoImage.src = logoSrc;
        this.animationId = null;
        this.mouse = { x: null, y: null, radius: 150 };
        this.isAssembled = false;
        this.assembleProgress = 0;
        this.pixelSize = 5;
        this.gap = 1;
        
        this.logoImage.onload = () => this.init();
        
        // Mouse interaction
        this.canvas.addEventListener('mousemove', (e) => {
            const rect = this.canvas.getBoundingClientRect();
            this.mouse.x = e.clientX - rect.left;
            this.mouse.y = e.clientY - rect.top;
        });
        
        this.canvas.addEventListener('mouseleave', () => {
            this.mouse.x = null;
            this.mouse.y = null;
        });
        
        window.addEventListener('resize', () => this.resize());
    }
    
    init() {
        this.resize();
        this.extractPixels();
        this.animate();
    }
    
    resize() {
        const container = this.canvas.parentElement;
        const dpr = window.devicePixelRatio || 1;
        this.canvas.width = container.offsetWidth * dpr;
        this.canvas.height = container.offsetHeight * dpr;
        this.canvas.style.width = container.offsetWidth + 'px';
        this.canvas.style.height = container.offsetHeight + 'px';
        this.ctx.scale(dpr, dpr);
        this.width = container.offsetWidth;
        this.height = container.offsetHeight;
    }
    
    extractPixels() {
        // Create offscreen canvas to read logo pixels
        const offCanvas = document.createElement('canvas');
        const offCtx = offCanvas.getContext('2d');
        
        const logoSize = Math.min(this.width, this.height) * 0.75;
        offCanvas.width = logoSize;
        offCanvas.height = logoSize;
        
        offCtx.drawImage(this.logoImage, 0, 0, logoSize, logoSize);
        
        const imageData = offCtx.getImageData(0, 0, logoSize, logoSize);
        const pixels = imageData.data;
        
        this.particles = [];
        
        const centerX = this.width / 2;
        const centerY = this.height / 2;
        const offsetX = centerX - logoSize / 2;
        const offsetY = centerY - logoSize / 2;
        
        for (let y = 0; y < logoSize; y += this.pixelSize + this.gap) {
            for (let x = 0; x < logoSize; x += this.pixelSize + this.gap) {
                const index = (y * logoSize + x) * 4;
                const alpha = pixels[index + 3];
                
                if (alpha > 128) {
                    const r = pixels[index];
                    const g = pixels[index + 1];
                    const b = pixels[index + 2];
                    
                    // Random starting position (scattered)
                    const angle = Math.random() * Math.PI * 2;
                    const distance = Math.random() * Math.max(this.width, this.height);
                    
                    this.particles.push({
                        // Target position (assembled logo)
                        targetX: x + offsetX,
                        targetY: y + offsetY,
                        // Current position (starts scattered)
                        x: centerX + Math.cos(angle) * distance,
                        y: centerY + Math.sin(angle) * distance,
                        // Velocity
                        vx: 0,
                        vy: 0,
                        // Color
                        color: `rgb(${r}, ${g}, ${b})`,
                        // Size with slight variation
                        size: this.pixelSize * (0.8 + Math.random() * 0.4),
                        // Delay for staggered animation
                        delay: Math.random() * 60,
                        // Original alpha
                        alpha: alpha / 255
                    });
                }
            }
        }
    }
    
    animate() {
        this.ctx.clearRect(0, 0, this.width, this.height);
        
        this.assembleProgress++;
        
        for (let i = 0; i < this.particles.length; i++) {
            const p = this.particles[i];
            
            // Staggered assembly
            if (this.assembleProgress > p.delay) {
                // Ease towards target
                const dx = p.targetX - p.x;
                const dy = p.targetY - p.y;
                
                p.vx += dx * 0.05;
                p.vy += dy * 0.05;
                
                // Friction
                p.vx *= 0.85;
                p.vy *= 0.85;
                
                // Mouse repulsion when assembled
                if (this.mouse.x !== null && this.mouse.y !== null) {
                    const mouseDx = p.x - this.mouse.x;
                    const mouseDy = p.y - this.mouse.y;
                    const mouseDist = Math.sqrt(mouseDx * mouseDx + mouseDy * mouseDy);
                    
                    if (mouseDist < this.mouse.radius) {
                        const force = (this.mouse.radius - mouseDist) / this.mouse.radius;
                        const angle = Math.atan2(mouseDy, mouseDx);
                        p.vx += Math.cos(angle) * force * 8;
                        p.vy += Math.sin(angle) * force * 8;
                    }
                }
                
                p.x += p.vx;
                p.y += p.vy;
            }
            
            // Draw particle
            this.ctx.globalAlpha = p.alpha;
            this.ctx.fillStyle = p.color;
            
            // Rounded rectangles for pixels
            const radius = 1;
            this.ctx.beginPath();
            this.ctx.roundRect(p.x - p.size / 2, p.y - p.size / 2, p.size, p.size, radius);
            this.ctx.fill();
        }
        
        this.ctx.globalAlpha = 1;
        
        this.animationId = requestAnimationFrame(() => this.animate());
    }
    
    destroy() {
        if (this.animationId) {
            cancelAnimationFrame(this.animationId);
        }
    }
}

// Initialize logo animation after loader finishes
function initLogoAnimation() {
    // Wait for loader to be hidden before starting the animation
    const loader = document.getElementById('moebaLoader');
    
    const startAnimation = () => {
        new LogoPixelAnimation('logoPixelCanvas', 'img/IconTest03.png');
    };
    
    if (loader) {
        // Check if loader is already hidden
        if (loader.classList.contains('hidden') || loader.style.display === 'none') {
            startAnimation();
        } else {
            // Wait for loader animation to complete
            const observer = new MutationObserver((mutations) => {
                mutations.forEach((mutation) => {
                    if (mutation.type === 'attributes' && 
                        (loader.classList.contains('hidden') || loader.style.display === 'none')) {
                        observer.disconnect();
                        setTimeout(startAnimation, 100);
                    }
                });
            });
            observer.observe(loader, { attributes: true, attributeFilter: ['class', 'style'] });
        }
    } else {
        startAnimation();
    }
}

// ============================================
// PARALLAX EFFECT FOR DEEP DIVE SECTION
// ============================================
function initParallax() {
    const parallaxContainer = document.querySelector('.parallax-container');
    const backLayer = document.querySelector('.parallax-back');
    const midLayer = document.querySelector('.parallax-mid');
    
    if (!parallaxContainer) return;
    
    // Mouse-based parallax
    document.addEventListener('mousemove', (e) => {
        const mouseX = e.clientX / window.innerWidth - 0.5;
        const mouseY = e.clientY / window.innerHeight - 0.5;
        
        if (backLayer) {
            backLayer.style.transform = `translate(${mouseX * 30}px, ${mouseY * 30}px)`;
        }
        if (midLayer) {
            midLayer.style.transform = `translate(${mouseX * 60}px, ${mouseY * 60}px)`;
        }
    });
    
    // Scroll-based parallax for tech cards
    const techCards = document.querySelectorAll('.tech-card');
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const cardObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                entry.target.style.transitionDelay = `${index * 100}ms`;
            }
        });
    }, observerOptions);
    
    techCards.forEach((card) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(40px)';
        card.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        cardObserver.observe(card);
    });
}

// ============================================
// 3D TILT EFFECT ON TECH CARDS
// ============================================
function initTiltEffect() {
    const cards = document.querySelectorAll('.tech-card');
    
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 20;
            const rotateY = (centerX - x) / 20;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
        });
    });
}

// ============================================
// INITIALIZATION
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    const savedLang = localStorage.getItem('preferredLang') || 'en';
    setLanguage(savedLang);
    
    // Initialize logo pixel animation
    initLogoAnimation();
    
    // Initialize parallax effect
    initParallax();
    
    // Initialize 3D tilt on tech cards
    initTiltEffect();
});

// Scroll to top on page load
if ('scrollRestoration' in history) {
    history.scrollRestoration = 'manual';
}

window.addEventListener('load', function() {
    window.scrollTo(0, 0);
});
