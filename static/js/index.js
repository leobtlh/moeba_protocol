// --- GESTION SCROLL FLUIDE & NAVIGATION ---
const sections = document.querySelectorAll(".page");
let currentSection = 0;
let isScrolling = false;

function smoothScrollTo(targetY, duration = 1500) {
  const startY = window.scrollY;
  const diff = targetY - startY;
  let start;

  function easeOutCubic(t) { return 1 - Math.pow(1 - t, 3); }

  function step(timestamp) {
    if (!start) start = timestamp;
    const time = timestamp - start;
    const percent = Math.min(time / duration, 1);
    const eased = easeOutCubic(percent);

    window.scrollTo(0, startY + diff * eased);

    if (time < duration) {
      requestAnimationFrame(step);
    }
  }
  requestAnimationFrame(step);
}

// GESTION WHEEL (MOLETTE)
window.addEventListener("wheel", (e) => {
  // Si une carte est ouverte, on désactive le scroll automatique des sections
  if (document.body.classList.contains('modal-open')) return;

  if (isScrolling) return;
  isScrolling = true;

  if (e.deltaY > 0 && currentSection < sections.length - 1) {
    currentSection++;
  } else if (e.deltaY < 0 && currentSection > 0) {
    currentSection--;
  }

  const targetY = sections[currentSection].offsetTop;
  smoothScrollTo(targetY, 1000);

  setTimeout(() => {
    isScrolling = false;
  }, 800);
});

// --- GESTION DES CLICS MENU (NAVIGATION FLUIDE) ---
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');

        // Si href est juste "#", on ne fait rien ou on remonte
        if(targetId === '#') return;

        const targetSection = document.querySelector(targetId);

        if (targetSection) {
            // 1. Mettre à jour currentSection pour la synchronisation molette
            sections.forEach((section, index) => {
                if(section === targetSection) {
                    currentSection = index;
                }
            });

            // 2. Lancer le scroll fluide
            isScrolling = true;
            smoothScrollTo(targetSection.offsetTop, 1000);

            // 3. Relâcher le verrou un peu après la fin
            setTimeout(() => {
                isScrolling = false;
            }, 1000);
        }
    });
});


// --- GESTION DES CARTES EXPANDABLE ---
const cards = document.querySelectorAll('.card');
const overlay = document.getElementById('modalOverlay');

function closeAllCards() {
    cards.forEach(card => card.classList.remove('expanded'));
    overlay.classList.remove('active');
    document.body.classList.remove('modal-open'); // Réactive le scroll page
}

cards.forEach(card => {
    card.addEventListener('click', (e) => {
        // Empêcher la propagation si on clique sur un lien ou un bouton à l'intérieur
        if(e.target.closest('a') || e.target.closest('button')) {
            // Si c'est le bouton fermer, on gère la fermeture ici
            if (e.target.closest('.close-btn')) {
                e.stopPropagation();
                closeAllCards();
            }
            return;
        }

        // Si la carte est déjà ouverte, on ne fait rien
        if (card.classList.contains('expanded')) return;

        // Fermer les autres d'abord
        closeAllCards();

        // Ouvrir celle-ci
        card.classList.add('expanded');
        overlay.classList.add('active');
        document.body.classList.add('modal-open'); // Désactive le scroll page
    });
});

// Fermeture via Overlay
if(overlay) overlay.addEventListener('click', closeAllCards);

// Fermeture via Echap
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeAllCards();
});

// --- GESTION DU THÈME (MOON/SUN) ---
(function(){
    const switchBtn = document.getElementById('themeSwitch');

    // Définition des icônes SVG
    const sunIcon = `
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41-1.41"/><path d="m19.07 4.93-1.41 1.41"/>
        </svg>`;

    const moonIcon = `
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
        </svg>`;

    // Fonction pour mettre à jour l'icône selon le thème
    function updateIcon(isDark) {
        // Si Dark Mode actif, on affiche le Soleil (pour pouvoir repasser en clair)
        // Sinon on affiche la Lune
        if(switchBtn) switchBtn.innerHTML = isDark ? sunIcon : moonIcon;
    }

    // Initialisation au chargement
    const saved = localStorage.getItem('theme');
    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;

    // Logique CSS :
    // .dark-theme PRÉSENT = Dark Mode
    // .dark-theme ABSENT = Light Mode (via body:not(.dark-theme))

    const isDarkInitial = saved === 'dark' || (!saved && prefersDark);

    if (isDarkInitial) {
        document.body.classList.add('dark-theme');
    } else {
        document.body.classList.remove('dark-theme');
    }

    // Mise à jour de l'icône initiale
    updateIcon(isDarkInitial);

    if(switchBtn) {
        switchBtn.addEventListener('click', (e) => {
            e.preventDefault();
            // Bascule la classe
            document.body.classList.toggle('dark-theme');

            // Vérifie le nouvel état
            const isDarkNow = document.body.classList.contains('dark-theme');

            // Sauvegarde
            localStorage.setItem('theme', isDarkNow ? 'dark' : 'light');

            // Mise à jour de l'icône
            updateIcon(isDarkNow);
        });
    }
})();
