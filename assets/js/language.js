(function () {
  var navTranslations = {
    '/#ourstory': { de: 'Unsere Hochzeit', en: 'Our Story' },
    '/location':  { de: 'Location & Ablauf', en: 'Venue & Schedule' },
    '/faq':       { de: 'Details', en: 'Details' },
    '/rsvp':      { de: 'Teilnahme', en: 'Attendance' }
  };

  var placeholders = {
    de: {
      telefon: 'Telefon',
      dietary: 'Beim Essen bitte beachten (Allergien, vegetarisch etc.)',
      song:    'Ich tanze gerne zu ...',
      code:    'Einladungscode *'
    },
    en: {
      telefon: 'Phone',
      dietary: 'Dietary requirements (allergies, vegetarian etc.)',
      song:    'I love to dance to ...',
      code:    'Invitation code *'
    }
  };

  function setLanguage(lang) {
    window.weddingLang = lang;

    document.querySelectorAll('.lang-de').forEach(function (el) {
      el.style.display = lang === 'de' ? '' : 'none';
    });
    document.querySelectorAll('.lang-en').forEach(function (el) {
      el.style.display = lang === 'en' ? '' : 'none';
    });

    // Update nav link text
    document.querySelectorAll('.navbar-nav a').forEach(function (a) {
      var href = a.getAttribute('href') || '';
      // Strip baseurl if present (ends with known keys)
      var key = Object.keys(navTranslations).find(function (k) {
        return href === k || href.endsWith(k);
      });
      if (key && navTranslations[key][lang]) {
        a.textContent = navTranslations[key][lang];
      }
    });

    // Update form placeholders
    var t = placeholders[lang];
    var fields = ['telefon', 'dietary', 'song'];
    fields.forEach(function (f) {
      var el = document.querySelector('[name="' + f + '"]');
      if (el) el.placeholder = t[f];
    });
    var codeEl = document.getElementById('rsvp-code');
    if (codeEl) codeEl.placeholder = t.code;

    // Update toggle button style
    document.querySelectorAll('.lang-toggle-btn').forEach(function (btn) {
      var active = btn.dataset.lang === lang;
      btn.style.fontWeight = active ? 'bold' : 'normal';
      btn.style.opacity   = active ? '1' : '0.5';
    });

    localStorage.setItem('weddingLang', lang);
  }

  function addToggle() {
    var navList = document.querySelector('.navbar-nav');
    if (!navList) return;
    var li = document.createElement('li');
    li.className = 'nav-item';
    li.style.cssText = 'display:flex;align-items:center;padding:0 8px;';
    li.innerHTML =
      '<button class="lang-toggle-btn" data-lang="de" onclick="window.setWeddingLang(\'de\')"' +
        ' style="background:none;border:none;cursor:pointer;font-size:13px;letter-spacing:1px;padding:2px 4px;color:#c4a0a0;">DE</button>' +
      '<span style="color:#c4a0a0;margin:0 2px;">|</span>' +
      '<button class="lang-toggle-btn" data-lang="en" onclick="window.setWeddingLang(\'en\')"' +
        ' style="background:none;border:none;cursor:pointer;font-size:13px;letter-spacing:1px;padding:2px 4px;color:#c4a0a0;">EN</button>';
    navList.appendChild(li);
  }

  window.setWeddingLang = function (lang) {
    setLanguage(lang);
  };

  document.addEventListener('DOMContentLoaded', function () {
    addToggle();
    var saved = localStorage.getItem('weddingLang') || 'de';
    setLanguage(saved);
  });
}());
