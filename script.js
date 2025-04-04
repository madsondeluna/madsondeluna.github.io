document.addEventListener('DOMContentLoaded', () => {

    // ... (seu código IntersectionObserver e smooth scroll) ...

    // --- CÓDIGO ATUALIZADO PARA ESCONDER IMAGEM E SUBTÍTULO AO ROLAR ---

    const profileIcon = document.getElementById('profile-icon');
    const subtitleText = document.querySelector('header .subtitle');
    const hiddenClassName = 'header-element-hidden';

    function handleHeaderVisibility() {
        if (profileIcon && subtitleText) {
            const scrollThreshold = 50;
            if (window.scrollY > scrollThreshold) {
                profileIcon.classList.add(hiddenClassName);
                subtitleText.classList.add(hiddenClassName);
            } else {
                profileIcon.classList.remove(hiddenClassName);
                subtitleText.classList.remove(hiddenClassName);
            }
        }
    }

    window.addEventListener('scroll', handleHeaderVisibility);
    handleHeaderVisibility();

    // Melhoria no smooth scroll para header dinâmico
    const navLinks = document.querySelectorAll('header nav a[href^="#"]');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                const headerOffset = document.querySelector('header').offsetHeight;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth"
                });
            }
        });
    });
});