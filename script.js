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
            }
            // Opcional: Se quiser que a animação resete ao sair da tela
            // else {
            //     entry.target.style.opacity = '0';
            //     entry.target.style.transform = 'translateY(30px)';
            // }
        });
    }, observerOptions);

    // Observe elementos para animação (cards de problema, solução e processo)
    const animatedElements = document.querySelectorAll('.problem-item, .solution-item, .step-item');
    animatedElements.forEach(el => {
        el.style.opacity = '0'; // Começa invisível
        el.style.transform = 'translateY(30px)'; // Começa um pouco abaixo
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease'; // Transição suave
        observer.observe(el);
    });

    // Add hover effects to cards (para o efeito de levantar ao passar o mouse)
    const cardsToHover = document.querySelectorAll('.problem-item, .solution-item, .step-item');
    cardsToHover.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)'; // Levanta 10px
            this.style.boxShadow = '0 8px 25px rgba(0, 0, 0, 0.2)'; // Sombra mais forte
        });
        
        card.addEventListener('mouseleave', function() {
            // Volta à posição original e sombra padrão
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.1)';
        });
    });

    // Você pode adicionar validações de formulário aqui, se adicionar um formulário.
    // Ou talvez uma funcionalidade para copiar o número do WhatsApp, etc.
});
