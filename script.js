document.addEventListener('DOMContentLoaded', () => {

    const observerOptions = {
        root: null, // relative to the viewport
        rootMargin: '0px',
        threshold: 0.1 // Trigger when 10% of the element is visible
    };

    // Rolagem suave ao clicar em "Madson Aragão"
    const topLink = document.getElementById('top-link');
    topLink.addEventListener('click', function (e) {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });


    const observerCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Optional: Stop observing the element once it's visible
                // observer.unobserve(entry.target);
            }
            // Optional: Remove 'visible' class if element scrolls out of view
            // else {
            //     entry.target.classList.remove('visible');
            // }
        });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    // Select all elements you want to fade in
    const elementsToFadeIn = document.querySelectorAll('.fade-in');
    elementsToFadeIn.forEach(el => {
        observer.observe(el);
    });

    // Smooth scroll for navigation links
    const navLinks = document.querySelectorAll('header nav a[href^="#"]');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                // Calculate position considering the sticky header height
                const headerOffset = document.querySelector('header').offsetHeight;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset - 20; // Extra 20px buffer

                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth"
                });
            }
        });
    });
    
// Detectar rolagem e aplicar/remover classe 'compact'
window.addEventListener("scroll", function () {
    const header = document.querySelector("header");

    if (window.scrollY > 80) {
        header.classList.add("compact");
    } else {
        header.classList.remove("compact");
    }
});

});

// ============================================
// Gallery Modal/Lightbox Functionality
// ============================================

let currentImageIndex = 0;
const galleryImages = [];

// Initialize gallery when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Collect all gallery images
    const galleryItems = document.querySelectorAll('.gallery-item');
    galleryItems.forEach(item => {
        const img = item.querySelector('img');
        const caption = item.querySelector('.gallery-caption p');
        galleryImages.push({
            src: img.src,
            alt: img.alt,
            caption: caption ? caption.textContent : ''
        });
    });
});

function openModal(index) {
    currentImageIndex = index;
    const modal = document.getElementById('galleryModal');
    const modalImg = document.getElementById('modalImage');
    const modalCaption = document.getElementById('modalCaption');
    
    modal.classList.add('active');
    modalImg.src = galleryImages[index].src;
    modalImg.alt = galleryImages[index].alt;
    modalCaption.textContent = galleryImages[index].caption;
    
    // Prevent body scroll when modal is open
    document.body.style.overflow = 'hidden';
}

function closeModal(event) {
    // Close only if clicking on the modal background or close button
    if (!event || event.target.id === 'galleryModal' || event.target.classList.contains('gallery-modal-close')) {
        const modal = document.getElementById('galleryModal');
        modal.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
}

function changeImage(direction) {
    currentImageIndex += direction;
    
    // Loop around if at the end or beginning
    if (currentImageIndex >= galleryImages.length) {
        currentImageIndex = 0;
    } else if (currentImageIndex < 0) {
        currentImageIndex = galleryImages.length - 1;
    }
    
    const modalImg = document.getElementById('modalImage');
    const modalCaption = document.getElementById('modalCaption');
    
    modalImg.src = galleryImages[currentImageIndex].src;
    modalImg.alt = galleryImages[currentImageIndex].alt;
    modalCaption.textContent = galleryImages[currentImageIndex].caption;
}

// Keyboard navigation for the modal
document.addEventListener('keydown', (e) => {
    const modal = document.getElementById('galleryModal');
    if (modal.classList.contains('active')) {
        if (e.key === 'Escape') {
            closeModal({ target: { id: 'galleryModal' } });
        } else if (e.key === 'ArrowLeft') {
            changeImage(-1);
        } else if (e.key === 'ArrowRight') {
            changeImage(1);
        }
    }
});

