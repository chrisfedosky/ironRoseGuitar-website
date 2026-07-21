(function () {
    console.log('includes.js loaded');

    function inject(targetId, filePath, callback) {
        const target = document.getElementById(targetId);
        if (!target) return;
        fetch(filePath)
            .then(function (r) {
                if (!r.ok) { console.warn('includes.js: could not load ' + filePath); return ''; }
                return r.text();
            })
            .then(function (html) {
                target.innerHTML = html;
                if (typeof callback === 'function') callback();
            })
            .catch(function (e) { console.warn('includes.js: fetch failed for ' + filePath, e); });
    }

    function setActiveLink() {
        let raw = window.location.pathname.replace(/\/$/, '');
        let current = (raw === '' || raw === '/') ? '/index.html' : raw;

        document.querySelectorAll('.nav-links a').forEach(function (link) {
            let href = link.getAttribute('href').replace(/\/$/, '');
            if (href === current) {
                link.classList.add('active');
                link.setAttribute('aria-current', 'page');
            } else {
                link.classList.remove('active');
                link.removeAttribute('aria-current');
            }
        });
    }

    inject('site-header', '/partials/header.html', setActiveLink);
    inject('site-footer', '/partials/footer.html');

    // Ensure scripts within the injected partials are executed
    document.addEventListener('DOMContentLoaded', function () {
        console.log('DOMContentLoaded event fired');

        const header = document.getElementById('site-header');
        if (header) {
            console.log('Header injected');
            const script = document.createElement('script');
            script.src = '/js/nav.js';
            script.onload = function() {
                console.log('nav.js loaded in header');
            };
            header.appendChild(script);
        }

        const footer = document.getElementById('site-footer');
        if (footer) {
            console.log('Footer injected');
            const script = document.createElement('script');
            script.src = '/js/nav.js';
            script.onload = function() {
                console.log('nav.js loaded in footer');
            };
            footer.appendChild(script);
        }
    });
})();
