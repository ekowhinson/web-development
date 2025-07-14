// Toggle navigation menu visibility
function toggleMenu() {
    const navMenu = document.getElementById('nav-menu');
    navMenu.classList.toggle('visible');
}

// Attach event listener to hamburger icon
document.addEventListener('DOMContentLoaded', () => {
    const hamburger = document.getElementById('hamburger');
    if (hamburger) {
        hamburger.addEventListener('click', toggleMenu);
    }

    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('nav a[href^="#"]');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href').slice(1);
            const targetSection = document.getElementById(targetId);
            if (targetSection) {
                e.preventDefault();
                targetSection.scrollIntoView({ behavior: 'smooth' });
                // Optionally close menu after click
                if (navMenu.classList.contains('visible')) {
                    navMenu.classList.remove('visible');
                }
            }
        });
    });
});
/**
 * Filter projects by category.
 * @param {string} category - The category to filter by.
 */
function filterProjects(category) {
    const projects = document.querySelectorAll('.project');
    projects.forEach(project => {
        if (category === 'all' || project.dataset.category === category) {
            project.style.display = '';
        } else {
            project.style.display = 'none';
        }
    });
}

// Attach filter event listeners
document.addEventListener('DOMContentLoaded', () => {
    const filterButtons = document.querySelectorAll('.project-filter');
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const category = this.dataset.category;
            filterProjects(category);
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
        });
    });

    // Lightbox effect for project images
    const images = document.querySelectorAll('.project img');
    const lightbox = document.createElement('div');
    lightbox.id = 'lightbox-modal';
    lightbox.style.display = 'none';
    lightbox.style.position = 'fixed';
    lightbox.style.top = 0;
    lightbox.style.left = 0;
    lightbox.style.width = '100vw';
    lightbox.style.height = '100vh';
    lightbox.style.background = 'rgba(0,0,0,0.8)';
    lightbox.style.justifyContent = 'center';
    lightbox.style.alignItems = 'center';
    lightbox.style.zIndex = 1000;
    lightbox.innerHTML = '<img style="max-width:90vw;max-height:90vh;" /><span style="position:absolute;top:20px;right:40px;font-size:2rem;color:#fff;cursor:pointer;" id="lightbox-close">&times;</span>';
    document.body.appendChild(lightbox);

    images.forEach(img => {
        img.style.cursor = 'pointer';
        img.addEventListener('click', function() {
            lightbox.querySelector('img').src = this.src;
            lightbox.style.display = 'flex';
        });
    });

    lightbox.addEventListener('click', function(e) {
        if (e.target === lightbox || e.target.id === 'lightbox-close') {
            lightbox.style.display = 'none';
            lightbox.querySelector('img').src = '';
        }
    });
});
// Contact form validation and real-time feedback
document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.getElementById('contact-form');
    if (!contactForm) return;

    const nameInput = contactForm.querySelector('input[name="name"]');
    const emailInput = contactForm.querySelector('input[name="email"]');
    const messageInput = contactForm.querySelector('textarea[name="message"]');
    const feedback = contactForm.querySelector('.form-feedback') || (() => {
        const div = document.createElement('div');
        div.className = 'form-feedback';
        contactForm.prepend(div);
        return div;
    })();

    function validateEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    function showFeedback(message, type = 'error') {
        feedback.textContent = message;
        feedback.style.color = type === 'error' ? 'red' : 'green';
    }

    function clearFeedback() {
        feedback.textContent = '';
    }

    function validateField(input) {
        if (input === nameInput && !nameInput.value.trim()) {
            showFeedback('Please enter your name.');
            return false;
        }
        if (input === emailInput && !validateEmail(emailInput.value.trim())) {
            showFeedback('Please enter a valid email address.');
            return false;
        }
        if (input === messageInput && !messageInput.value.trim()) {
            showFeedback('Please enter your message.');
            return false;
        }
        clearFeedback();
        return true;
    }

    [nameInput, emailInput, messageInput].forEach(input => {
        input.addEventListener('input', () => validateField(input));
    });

    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        let valid = true;
        if (!nameInput.value.trim()) {
            showFeedback('Please enter your name.');
            nameInput.focus();
            valid = false;
        } else if (!validateEmail(emailInput.value.trim())) {
            showFeedback('Please enter a valid email address.');
            emailInput.focus();
            valid = false;
        } else if (!messageInput.value.trim()) {
            showFeedback('Please enter your message.');
            messageInput.focus();
            valid = false;
        }
        if (valid) {
            showFeedback('Thank you for your message!', 'success');
            contactForm.reset();
        }
    });
});
