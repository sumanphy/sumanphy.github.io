async function loadHeader() {
    try {
        const response = await fetch('header.html');
        const html = await response.text();
        document.getElementById('header-placeholder').innerHTML = html;
        setActiveNav();
    } catch (error) {
        console.error('Error loading header:', error);
    }
}

async function loadFooter() {
    try {
        const response = await fetch('footer.html');
        const html = await response.text();
        document.getElementById('footer-placeholder').innerHTML = html;
    } catch (error) {
        console.error('Error loading footer:', error);
    }
}

function setActiveNav() {
    // For subpages, mark Research as active
    const navLinks = document.querySelectorAll('nav a');
    navLinks.forEach(link => {
        if (link.getAttribute('href') === '../research.html') {
            link.classList.add('active');
        }
    });
}

document.addEventListener('DOMContentLoaded', function() {
    loadHeader();
    loadFooter();
});