document.addEventListener('DOMContentLoaded', () => {

    const observerOptions = {
        root: null, // relative to the viewport
        rootMargin: '0px',
        threshold: 0.1 // Trigger when 10% of the element is visible
    };

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

});

// --- CÓDIGO ADICIONADO/ATUALIZADO PARA ESCONDER IMAGEM E SUBTÍTULO AO ROLAR ---

    // Seleciona os elementos pelo ID (para imagem) e classe/seletor (para subtítulo)
    const profileIcon = document.getElementById('profile-icon'); 
    // (Certifique-se que sua imagem no HTML tem id="profile-icon" OU ajuste o seletor aqui se usar outra coisa, como .logo-icon)
    const subtitleText = document.querySelector('header .subtitle'); 
    
    // Define a partir de quantos pixels de rolagem os elementos devem sumir
    const scrollThreshold = 50; // Ajuste este valor conforme desejar (ex: 30, 70)
    const hiddenClassName = 'header-element-hidden'; // Classe CSS definida no style.css para o estado oculto

    // Função que verifica a rolagem e aplica/remove a classe de ocultar
    function handleHeaderVisibility() {
        // Verifica se os elementos realmente existem na página antes de manipulá-los para evitar erros
        const iconExists = profileIcon != null;
        const subtitleExists = subtitleText != null;

        // Verifica a posição da rolagem vertical da janela
        if (window.scrollY > scrollThreshold) {
            // Se rolou além do limite, adiciona a classe para esconder os elementos
            // (O CSS cuida da animação de fade/translate)
            if (iconExists) profileIcon.classList.add(hiddenClassName);
            if (subtitleExists) subtitleText.classList.add(hiddenClassName);
        } else {
            // Se está perto do topo (rolagem menor ou igual ao limite), remove a classe para mostrar os elementos
            if (iconExists) profileIcon.classList.remove(hiddenClassName);
            if (subtitleExists) subtitleText.classList.remove(hiddenClassName);
        }
    }

    // Adiciona um "ouvinte" que chama a função handleHeaderVisibility toda vez que o evento 'scroll' ocorrer na janela
    window.addEventListener('scroll', handleHeaderVisibility);

    // Chama a função uma vez assim que a página carrega (e o script roda) para definir o estado inicial correto
    // (Importante caso a página carregue já com alguma rolagem, ou para garantir que estejam visíveis no topo)
    handleHeaderVisibility(); 
    