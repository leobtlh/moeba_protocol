document.addEventListener('DOMContentLoaded', () => {
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('.doc-section');
    const menuToggle = document.getElementById('menu-toggle');
    const sidebar = document.getElementById('sidebar');
    const mainContent = document.getElementById('main-content');

    function navigateTo(targetId) {
        sections.forEach(section => section.classList.remove('active'));
        navLinks.forEach(link => link.classList.remove('active'));

        const targetSection = document.getElementById(targetId);
        if (targetSection) {
            targetSection.classList.add('active');
            mainContent.scrollTop = 0;
        }

        const activeLinks = document.querySelectorAll(`.nav-link[data-target="${targetId}"]`);
        activeLinks.forEach(link => link.classList.add('active'));

        if (window.innerWidth < 768) {
            sidebar.classList.add('-translate-x-full');
        }
    }

    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('data-target');
            navigateTo(targetId);
        });
    });

    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            sidebar.classList.toggle('-translate-x-full');
        });
    }
});

// ============================================
// THEME TOGGLE
// ============================================
(function() {
    const switchBtns = document.querySelectorAll('.theme-toggle-btn');

    const sunIcon = `
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="12" cy="12" r="4"/>
            <path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/>
        </svg>`;

    const moonIcon = `
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
        </svg>`;

    function updateIcons(isLight) {
        switchBtns.forEach(btn => {
            btn.innerHTML = isLight ? moonIcon : sunIcon;
        });
    }

    const saved = localStorage.getItem('theme');
    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    const isLightInitial = saved === 'light' || (!saved && !prefersDark);

    if (isLightInitial) {
        document.body.classList.add('light-theme');
    } else {
        document.body.classList.remove('light-theme');
    }

    updateIcons(isLightInitial);

    switchBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            document.body.classList.toggle('light-theme');
            const isLightNow = document.body.classList.contains('light-theme');
            localStorage.setItem('theme', isLightNow ? 'light' : 'dark');
            updateIcons(isLightNow);
        });
    });
})();
