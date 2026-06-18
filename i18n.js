/**
 * i18n Translation Engine - PetNav Multi-Language Support
 * Supports: EN (default), ZH (中文), KO (한국어), JA (日本語)
 */
const i18n = (() => {
  const STORAGE_KEY = 'petnav-lang';
  const SUPPORTED = ['en', 'zh', 'ko', 'ja'];

  // Translation dictionary
  const translations = {};

  // Register translations for a page
  function register(pageId, dict) {
    translations[pageId] = dict;
  }

  // Get current language
  function getLang() {
    return localStorage.getItem(STORAGE_KEY) || 'en';
  }

  // Set language and apply
  function setLang(lang) {
    if (!SUPPORTED.includes(lang)) lang = 'en';
    localStorage.setItem(STORAGE_KEY, lang);
    apply(lang);
    updateSelector(lang);
  }

  // Apply translations for current page
  function apply(lang) {
    const pageId = document.body.dataset.page;
    const dict = translations[pageId];
    if (!dict) return;

    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.dataset.i18n;
      const text = dict[key]?.[lang];
      if (text) {
        if (el.tagName === 'META' && el.name === 'description') {
          el.content = text;
        } else if (el.tagName === 'INPUT' && el.placeholder !== undefined) {
          el.placeholder = text;
        } else {
          el.textContent = text;
        }
      }
    });

    // Update HTML lang attribute
    document.documentElement.lang = lang;
    document.documentElement.dir = 'ltr';
  }

  // Update selector UI
  function updateSelector(lang) {
    const sel = document.getElementById('lang-select');
    if (sel) sel.value = lang;
  }

  // Init language selector
  function init() {
    const lang = getLang();
    apply(lang);
    updateSelector(lang);
  }

  return { register, getLang, setLang, init };
})();

document.addEventListener('DOMContentLoaded', () => i18n.init());
