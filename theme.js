// Light/Dark theme switcher.
// Load this script in <head> (synchronously) so the theme is applied
// before first paint and the page never flashes the wrong colors.

(function () {
    'use strict';

    // --- Apply saved (or system-preferred) theme immediately ---
    function currentTheme() {
        var stored = null;
        try { stored = localStorage.getItem('theme'); } catch (e) { /* ignore */ }
        if (stored === 'light' || stored === 'dark') return stored;
        return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
            ? 'dark' : 'light';
    }

    function applyTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        var btn = document.querySelector('.theme-toggle');
        if (btn) {
            btn.innerHTML = theme === 'dark' ? ICON_SUN : ICON_MOON;
            btn.setAttribute('aria-label',
                theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode');
            btn.title = btn.getAttribute('aria-label');
        }
    }

    var ICON_MOON =
        '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" ' +
        'stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' +
        '<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>';

    var ICON_SUN =
        '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" ' +
        'stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' +
        '<circle cx="12" cy="12" r="4"/>' +
        '<path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41' +
        'M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"/></svg>';

    applyTheme(currentTheme());

    function toggleTheme() {
        var next = document.documentElement.getAttribute('data-theme') === 'dark'
            ? 'light' : 'dark';
        try { localStorage.setItem('theme', next); } catch (e) { /* ignore */ }
        applyTheme(next);
    }

    // --- Inject the toggle button into the nav once it exists ---
    // (On most pages the nav is fetched asynchronously by components.js.)
    // The button is appended to <nav> itself and pinned to the right edge
    // via CSS, so the centered menu links are unaffected.
    function placeToggle() {
        var nav = document.querySelector('nav');
        if (!nav || nav.querySelector('.theme-toggle')) return !!nav;
        var btn = document.createElement('button');
        btn.className = 'theme-toggle';
        btn.type = 'button';
        btn.addEventListener('click', toggleTheme);
        nav.appendChild(btn);
        applyTheme(document.documentElement.getAttribute('data-theme'));
        return true;
    }

    document.addEventListener('DOMContentLoaded', function () {
        if (placeToggle()) return;
        var observer = new MutationObserver(function () {
            if (placeToggle()) observer.disconnect();
        });
        observer.observe(document.body, { childList: true, subtree: true });
    });

    // Follow system preference live if the user hasn't chosen explicitly
    if (window.matchMedia) {
        window.matchMedia('(prefers-color-scheme: dark)')
            .addEventListener('change', function (e) {
                var stored = null;
                try { stored = localStorage.getItem('theme'); } catch (err) { /* ignore */ }
                if (!stored) applyTheme(e.matches ? 'dark' : 'light');
            });
    }
})();
