// Function to load header
async function loadHeader() {
    try {
        const response = await fetch('header.html');
        const html = await response.text();
        document.getElementById('header-placeholder').innerHTML = html;
        
        // Set active navigation after header loads
        setActiveNav();
    } catch (error) {
        console.error('Error loading header:', error);
    }
}

// Function to load footer
async function loadFooter() {
    try {
        const response = await fetch('footer.html');
        const html = await response.text();
        document.getElementById('footer-placeholder').innerHTML = html;
    } catch (error) {
        console.error('Error loading footer:', error);
    }
}

// Function to set active navigation based on current page
function setActiveNav() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('nav a');
    
    navLinks.forEach(link => {
        if (link.getAttribute('href') === currentPage) {
            link.classList.add('active');
        }
    });
}

// Load components when page loads
document.addEventListener('DOMContentLoaded', function() {
    loadHeader();
    loadFooter();
});