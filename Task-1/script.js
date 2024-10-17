// Smooth scrolling for navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Submit form action (simple alert for now, but can be enhanced later)
document.querySelector('form').addEventListener('submit', function(e) {
    e.preventDefault();
    alert("Thank you for reaching out! I'll get back to you soon.");
});
