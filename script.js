// Smooth scroll navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
            updateActiveNav();
        }
    });
});

// Update active navigation on scroll
function updateActiveNav() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('nav-active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('nav-active');
        }
    });
}

window.addEventListener('scroll', updateActiveNav);

// Fetch hero image from Unsplash API
async function fetchHeroImage() {
    try {
        const response = await fetch('https://api.unsplash.com/random?query=developer+coding&w=720&h=600&client_id=K4Jd34M5jWD8E9gV2L7pU8qT5nR2sX9bA0vW3cY');
        const data = await response.json();
        document.getElementById('heroImage').src = data.urls.regular;
        document.getElementById('heroImage').alt = data.alt_description || 'Developer coding';
    } catch (error) {
        console.error('Error fetching image:', error);
        // Fallback image
        document.getElementById('heroImage').src = 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=720&h=600&fit=crop';
    }
}

// Fetch quotes from Quotable API
async function fetchQuote() {
    try {
        const response = await fetch('https://api.quotable.io/random?tags=technology');
        const data = await response.json();
        document.getElementById('quoteText').textContent = `"${data.content}"`;
        document.getElementById('quoteAuthor').textContent = `— ${data.author.replace(', type.fit', '')}`;
    } catch (error) {
        console.error('Error fetching quote:', error);
        // Fallback quote
        document.getElementById('quoteText').textContent = '"Code is poetry written in a language only computers understand."';
        document.getElementById('quoteAuthor').textContent = '— Developer Wisdom';
    }
}

// New quote button
document.getElementById('newQuoteBtn').addEventListener('click', fetchQuote);

// Contact form submission
document.getElementById('contactForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const formData = {
        name: document.querySelector('input[name="name"]').value,
        email: document.querySelector('input[name="email"]').value,
        subject: document.querySelector('input[name="subject"]').value,
        message: document.querySelector('textarea[name="message"]').value
    };

    // Display success message
    alert(`Thank you, ${formData.name}! Your message has been sent. I'll get back to you soon!`);
    document.getElementById('contactForm').reset();
});

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    fetchHeroImage();
    fetchQuote();
    updateActiveNav();
});