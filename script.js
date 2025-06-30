document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling for anchor links (if any, like in footer)
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Intersection Observer for animations (para fazer os cards e texto aparecerem suavemente)
    const observerOptions = {
        threshold: 0.1, // Quando 10% do elemento estiver visível
        rootMargin: '0px 0px -50px 0px' // Margem para ajuste de detecção
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Se o elemento está visível, aplica a animação
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0) translateX(0) scale(1)'; // Volta para posição e escala normal
                
                // Desobserva o elemento para que a animação ocorra apenas uma vez
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe elementos para animação:
    // - Cards de problema (.problem-item)
    // - Cards de solução (.solution-item)
    // - Cards de processo (.step-item)
    // - Parágrafos e itens de lista na seção de audiência (.animated-text-line)
    const animatedElements = document.querySelectorAll(
        '.problem-item, .solution-item, .step-item, .animated-text-line'
    );

    animatedElements.forEach((el, index) => {
        el.style.opacity = '0'; // Começa invisível
        
        // Ajusta o transform inicial para os novos itens de lista, para que deslizem da esquerda
        if (el.classList.contains('target-audience-item')) {
            el.style.transform = 'translateX(-20px)';
        } else {
            el.style.transform = 'translateY(20px)'; // Padrão para outros elementos
        }

        // Adiciona um pequeno atraso para criar um efeito cascata
        el.style.transitionDelay = `${index * 0.1}s`; // Ajuste o 0.1s para mais ou menos atraso

        observer.observe(el);
    });


    // Animação da Hero Section no carregamento da página
    const heroTitle = document.querySelector('.hero-section h1');
    const heroSubheadline = document.querySelector('.hero-section .sub-headline');
    const heroButton = document.querySelector('.hero-section .btn-primary');

    if (heroTitle) {
        heroTitle.style.opacity = '0';
        heroTitle.style.transform = 'translateY(20px)';
        heroTitle.style.transition = 'opacity 0.8s ease-out, transform 0.8s ease-out';
    }
    if (heroSubheadline) {
        heroSubheadline.style.opacity = '0';
        heroSubheadline.style.transform = 'translateY(20px)';
        heroSubheadline.style.transition = 'opacity 0.8s ease-out 0.3s, transform 0.8s ease-out 0.3s';
    }
    if (heroButton) {
        heroButton.style.opacity = '0';
        heroButton.style.transform = 'translateY(20px)';
        heroButton.style.transition = 'opacity 0.8s ease-out 0.6s, transform 0.8s ease-out 0.6s';
    }

    // Ativa as animações da Hero Section no carregamento completo da página
    window.addEventListener('load', () => {
        if (heroTitle) {
            heroTitle.style.opacity = '1';
            heroTitle.style.transform = 'translateY(0)';
        }
        if (heroSubheadline) {
            heroSubheadline.style.opacity = '1';
            heroSubheadline.style.transform = 'translateY(0)';
        }
        if (heroButton) {
            heroButton.style.opacity = '1';
            heroButton.style.transform = 'translateY(0)';
        }
    });
});
