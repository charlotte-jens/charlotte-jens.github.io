(function () {
  var navTranslations = {
    '/': { de: 'Unsere Hochzeit', en: 'Our Wedding', tw: '我們的婚禮' },
    '/location':  { de: 'Location & Ablauf', en: 'Venue & Schedule', tw: '地點與流程' },
    '/faq':       { de: 'Details', en: 'Details', tw: '詳情' },
    '/rsvp':      { de: 'Teilnahme', en: 'Attendance', tw: '出席回覆' }
  };

  var pageTitles = {
    '/rsvp':     { de: 'Teilnahme', en: 'Attendance', tw: '出席回覆' },
    '/location': { de: 'Location & Ablauf', en: 'Venue & Schedule', tw: '地點與流程' },
    '/faq':      { de: 'DETAILS', en: 'DETAILS', tw: '詳情' }
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
      song:    'Songs that get my hips moving',
      code:    'Invitation code *'
    },
    tw: {
      telefon: '電話',
      dietary: '飲食需求（過敏、素食等）',
      song:    '讓我想跳舞的歌',
      code:    '邀請碼 *'
    }
  };

  function setLanguage(lang) {
    window.weddingLang = lang;

    ['de', 'en', 'tw'].forEach(function (l) {
      document.querySelectorAll('.lang-' + l).forEach(function (el) {
        el.style.display = lang === l ? (el.tagName === 'DIV' ? 'block' : 'inline') : 'none';
      });
    });

    // Update nav link text
    document.querySelectorAll('.navbar-nav a').forEach(function (a) {
      var href = a.getAttribute('href') || '';
      var key = Object.keys(navTranslations).find(function (k) {
        return href === k || href.endsWith(k);
      });
      if (key && navTranslations[key][lang]) {
        a.textContent = navTranslations[key][lang];
      }
    });

    // Update form placeholders
    var t = placeholders[lang];
    ['telefon', 'dietary', 'song'].forEach(function (f) {
      var el = document.getElementById('rsvp-' + f) || document.querySelector('[name="' + f + '"]');
      if (el) el.placeholder = t[f];
    });
    var codeEl = document.getElementById('rsvp-code');
    if (codeEl) codeEl.placeholder = t.code;

    // Update toggle button active state
    document.querySelectorAll('.lang-toggle-btn').forEach(function (btn) {
      btn.classList.toggle('lang-active', btn.dataset.lang === lang);
    });

    // Update page title
    var path = window.location.pathname.replace(/\/$/, '');
    var titleKey = Object.keys(pageTitles).find(function (k) {
      return path === k || path.endsWith(k);
    });
    if (titleKey) {
      document.title = pageTitles[titleKey][lang];
      var billboardEl = document.querySelector('h1.billboard-text');
      if (billboardEl) billboardEl.textContent = pageTitles[titleKey][lang];
    }

    localStorage.setItem('weddingLang', lang);
  }

  function addToggle() {
    var navList = document.querySelector('.navbar-nav');
    if (!navList) return;
    var li = document.createElement('li');
    li.className = 'nav-item';
    li.style.cssText = 'display:flex;align-items:center;padding:0 8px;';
    li.innerHTML =
      '<button class="lang-toggle-btn" data-lang="de" onclick="window.setWeddingLang(\'de\')">DE</button>' +
      '<span class="lang-toggle-sep" style="margin:0 2px;">|</span>' +
      '<button class="lang-toggle-btn" data-lang="en" onclick="window.setWeddingLang(\'en\')">EN</button>' +
      '<span class="lang-toggle-sep" style="margin:0 2px;">|</span>' +
      '<button class="lang-toggle-btn" data-lang="tw" onclick="window.setWeddingLang(\'tw\')">TW</button>';
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
