/* ============================================================
   includes.js — injects header.html and footer.html partials
   into the empty shell elements on every page.

   SCRIPT ORDER in every HTML page — includes.js must be first:
     <script src="/js/includes.js"></script>
     <script src="/js/nav.js"></script>
     <script src="/js/form.js"></script>  (contact.html only)

   ACTIVE LINK: automatically marks the current page link
   in the nav — no manual class="active" needed in header.html.
   ============================================================ */
(function () {

  /* ── Inject a partial into a target element ── */
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

  /* ── Mark the active nav link ── */
  function setActiveLink() {
    /*
       Normalize the current path:
       - Strip trailing slash
       - Treat bare "/" as "/index.html"
       - Works for all five pages:
           /index.html, /lessons.html, /about.html,
           /faq.html, /contact.html
    */
    var raw     = window.location.pathname.replace(/\/$/, '');
    var current = (raw === '' || raw === '/') ? '/index.html' : raw;

    document.querySelectorAll('.nav-links a').forEach(function (link) {
      var href = link.getAttribute('href').replace(/\/$/, '');
      if (href === current) {
        link.classList.add('active');
        link.setAttribute('aria-current', 'page');
      } else {
        link.classList.remove('active');
        link.removeAttribute('aria-current');
      }
    });
  }

  /* ── Run ── */
  inject('site-header', '/partials/header.html', setActiveLink);
  inject('site-footer', '/partials/footer.html');

})();
