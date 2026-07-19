(function () {
    console.log('nav.js loaded');

    const toggle = document.querySelector('.nav-toggle');
    const body = document.body;
    if (!toggle) return;

    function closeNav() {
        console.log('closeNav called');
        body.classList.remove('nav-open');
        toggle.setAttribute('aria-expanded', 'false');
        toggle.setAttribute('aria-label', 'Open navigation');
    }

    toggle.addEventListener('click', function () {
        console.log('toggle click event');
        const isOpen = body.classList.toggle('nav-open');
        toggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
        toggle.setAttribute('aria-label', isOpen ? 'Close navigation' : 'Open navigation');
    });

    document.addEventListener('click', function (e) {
        console.log('document click event', e.target);
        if (!e.target.closest('.site-header')) closeNav();
    });

    document.querySelectorAll('.nav-links a').forEach(function (link) {
        link.addEventListener('click', closeNav);
    });

    document.addEventListener('keydown', function (e) {
        console.log('keydown event', e.key);
        if (e.key === 'Escape') { closeNav(); toggle.focus(); }
    });

    window.addEventListener('resize', function () {
        console.log('resize event');
        if (window.innerWidth >= 768) closeNav();
    });
})();


