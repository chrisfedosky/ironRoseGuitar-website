(function initializeNavMenu() {
    console.log('nav.js initialized successfully.');

    // Use document.querySelector here, as we know the element exists now
    const toggle = document.querySelector('.nav-toggle');
    const body = document.body;

    if (!toggle) {
        console.error('nav.js: Navigation toggle element (.nav-toggle) not found in DOM.');
        return;
    }

    function closeNav() {
        console.log('closeNav called');
        body.classList.remove('nav-open');
        toggle.setAttribute('aria-expanded', 'false');
        toggle.setAttribute('aria-label', 'Open navigation');
    }

    // Event Listener for Toggling
    toggle.addEventListener('click', function () {
        console.log('toggle click event');
        const isOpen = body.classList.toggle('nav-open');
        toggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
        toggle.setAttribute('aria-label', isOpen ? 'Close navigation' : 'Open navigation');
    });

    // Event Listener for Clicking outside the header
    document.addEventListener('click', function (e) {
        console.log('document click event', e.target);
        if (!e.target.closest('.site-header')) closeNav();
    });

    // Event Listeners for Navigation Links
    document.querySelectorAll('.nav-links a').forEach(function (link) {
        link.addEventListener('click', closeNav);
    });

    // Keyboard Accessibility
    document.addEventListener('keydown', function (e) {
        console.log('keydown event', e.key);
        if (e.key === 'Escape') {
            closeNav();
            toggle.focus();
        }
    });

    // Handle responsive state changes
    window.addEventListener('resize', function () {
        console.log('resize event');
        // Ensure menu is closed on desktop viewports
        if (window.innerWidth >= 768) {
            closeNav();
        }
    });
})();
