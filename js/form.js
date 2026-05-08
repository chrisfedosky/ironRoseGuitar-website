/* ============================================================
   form.js — contact form validation
   Validates before Netlify receives the POST.
   Only used on contact.html — loaded after nav.js.
   ============================================================ */
(function () {

  const form      = document.getElementById('bookingForm');
  const submitBtn = document.getElementById('submitBtn');
  if (!form) return;

  /* ── Field definitions ── */
  function getFields() {
    return [
      {
        el:      document.getElementById('name'),
        errorEl: document.getElementById('name-error'),
        validate: function (v) {
          if (!v.trim())       return 'Please enter your name.';
          if (v.trim().length < 2) return 'Name must be at least 2 characters.';
          return '';
        }
      },
      {
        el:      document.getElementById('email'),
        errorEl: document.getElementById('email-error'),
        validate: function (v) {
          if (!v.trim()) return 'Please enter your email address.';
          if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)) return 'Please enter a valid email address.';
          return '';
        }
      },
      {
        el:      document.getElementById('lesson-type'),
        errorEl: document.getElementById('lesson-type-error'),
        validate: function (v) {
          if (!v) return 'Please choose a lesson format.';
          return '';
        }
      },
      {
        el:      null,
        errorEl: document.getElementById('experience-error'),
        validate: function () {
          if (!form.querySelector('input[name="experience"]:checked')) return 'Please select your experience level.';
          return '';
        }
      }
    ];
  }

  /* ── Show / clear error ── */
  function showError(field, msg) {
    if (!field.errorEl) return;
    field.errorEl.textContent = msg;
    field.errorEl.style.display = msg ? 'block' : 'none';
    if (field.el) {
      field.el.setAttribute('aria-invalid', msg ? 'true' : 'false');
      field.el.classList.toggle('input-error', !!msg);
    }
  }

  /* ── Validate all fields ── */
  function validateAll() {
    let valid = true;
    let firstError = null;
    getFields().forEach(function (f) {
      const msg = f.validate(f.el ? f.el.value : '');
      showError(f, msg);
      if (msg && !firstError) firstError = f.el || form.querySelector('input[name="experience"]');
      if (msg) valid = false;
    });
    if (firstError) firstError.focus();
    return valid;
  }

  /* ── Live validation on blur ── */
  getFields().forEach(function (f) {
    if (!f.el) return;
    f.el.addEventListener('blur', function () {
      showError(f, f.validate(f.el.value));
    });
  });

  /* ── Submit ── */
  form.addEventListener('submit', function (e) {
    if (!validateAll()) { e.preventDefault(); return; }
    submitBtn.disabled = true;
    submitBtn.textContent = 'Sending…';
    /* Let Netlify handle the POST — no preventDefault here */
  });

})();
