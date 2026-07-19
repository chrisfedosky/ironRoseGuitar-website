(function () {
    console.log('includes.js loaded');

    /**
     * Injects HTML content into a target element and executes a callback upon success.
     * @param {string} targetId - The ID of the DOM element to inject into.
     * @param {string} filePath - The path to the HTML partial file.
     * @param {function} [callback] - Function to execute after injection is complete.
     */
    function inject(targetId, filePath, callback) {
        const target = document.getElementById(targetId);
        if (!target) {
            console.warn(`includes.js: Target element #${targetId} not found.`);
            return;
        }

        fetch(filePath)
            .then(function (r) {
                if (!r.ok) {
                    console.error('includes.js: Could not load ' + filePath, r.statusText);
                    return null;
                }
                return r.text();
            })
            .then(function (html) {
                target.innerHTML = html;
                if (callback && typeof callback === 'function') {
                    // Execute the callback only after the content is in the DOM
                    callback();
                }
            })
            .catch(function (e) {
                console.error('includes.js: Fetch failed for ' + filePath, e);
            });
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

    // 1. Inject Header and pass the navigation initialization function as a callback
    inject('site-header', '/partials/header.html', setActiveLink);

    // 2. Inject Footer (no specific initialization needed for footer content)
    inject('site-footer', '/partials/footer.html');

})();


