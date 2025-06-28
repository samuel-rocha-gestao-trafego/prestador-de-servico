document.addEventListener('DOMContentLoaded', function() {
    // Exemplo de rolagem suave para links de âncora (se você adicionar IDs e links internos)
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Intersection Observer for animations (para fazer os cards aparecerem suavemente)
    const observerOptions = {
        threshold: 0.1, // Quando 10% do elemento estiver visível
        rootMargin: '0px 0px -50px 0px' // Margem para ajuste de detecção
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Se o elemento está visível, aplica a animação
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                // Desobserva o elemento para que a animação ocorra apenas uma vez
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe elementos para animação (cards de problema, solução e processo)
    const animatedElements = document.querySelectorAll('.problem-item, .solution-item, .step-item');
    animatedElements.forEach((el, index) => {
        el.style.opacity = '0'; // Começa invisível
        el.style.transform = 'translateY(30px)'; // Começa um pouco abaixo
        // Adiciona um atraso baseado no índice para que apareçam em sequência
        el.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
        observer.observe(el);
    });

    // Removido o bloco de hover do JS.
    // O CSS já está configurado para lidar com os efeitos de hover dos cards de forma mais eficiente.
    // Verifique o seu style.css:
    // .problem-item:hover, .solution-item:hover, .step-item:hover
    // Eles já contêm `transform` e `box-shadow` para o hover.

    // === Código para o Botão Flutuante do WhatsApp (Texto no Hover) ADICIONADO AQUI ===
    const whatsappButton = document.querySelector('.whatsapp-float');
    if (whatsappButton) {
        // Cria um elemento span para o texto
        const whatsappTextSpan = document.createElement('span');
        whatsappTextSpan.textContent = 'Ficou com Dúvidas?';
        whatsappTextSpan.classList.add('whatsapp-text'); // Adiciona uma classe para estilização
        whatsappButton.appendChild(whatsappTextSpan); // Adiciona o span ao botão

        // Estilos iniciais para o texto (escondido)
        whatsappTextSpan.style.position = 'absolute';
        whatsappTextSpan.style.right = '80px'; // Posição ao lado do botão
        whatsappTextSpan.style.backgroundColor = 'rgba(0,0,0,0.7)';
        whatsappTextSpan.style.color = '#FFF';
        whatsappTextSpan.style.padding = '5px 10px';
        whatsappTextSpan.style.borderRadius = '5px';
        whatsappTextSpan.style.whiteSpace = 'nowrap';
        whatsappTextSpan.style.fontSize = '14px';
        whatsappTextSpan.style.opacity = '0';
        whatsappTextSpan.style.visibility = 'hidden';
        whatsappTextSpan.style.transition = 'opacity 0.3s ease, visibility 0.3s ease';

        whatsappButton.addEventListener('mouseenter', function() {
            whatsappTextSpan.style.opacity = '1';
            whatsappTextSpan.style.visibility = 'visible';
        });

        whatsappButton.addEventListener('mouseleave', function() {
            whatsappTextSpan.style.opacity = '0';
            whatsappTextSpan.style.visibility = 'hidden';
        });
    }
    // === FIM do Código para o Botão Flutuante do WhatsApp ===

    // Implementação das animações de entrada para a Hero Section
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

    // Você pode adicionar validações de formulário aqui, se adicionar um formulário.
    // Ou talvez uma funcionalidade para copiar o número do WhatsApp, etc.
});
