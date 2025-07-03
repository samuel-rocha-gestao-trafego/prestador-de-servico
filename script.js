document.addEventListener('DOMContentLoaded', function() {

    // --- Configuração do WhatsApp ---
    // ****** ATENÇÃO: COLOQUE SEU NÚMERO DE WHATSAPP AQUI (Ex: 5586999998888) ******
    const seuNumeroWhatsApp = "5586995957281";
    // Mensagem padrão que será enviada quando clicarem no botão.
    const mensagemPadrao = "Olá! Visitei sua Landing Page e gostaria de saber mais sobre seus serviços de gestão de tráfego.";

    // Validação para garantir que o número foi alterado
    if (seuNumeroWhatsApp === "SEU_NUMERO_DE_WHATSAPP_AQUI" || seuNumeroWhatsApp.length < 12) {
        console.error("ATENÇÃO: Edite o código JavaScript e insira seu número de WhatsApp na variável 'seuNumeroWhatsApp'.");
        alert("Atenção: O número de WhatsApp não foi configurado corretamente no código da página. Por favor, edite o arquivo script.js.");
    }

    const linkWhatsApp = `https://wa.me/${seuNumeroWhatsApp}?text=${encodeURIComponent(mensagemPadrao)}`;

    // Seleciona todos os links ou botões que devem levar ao WhatsApp
    // Inclui todos os botões de CTA e o botão flutuante
    const whatsappElements = document.querySelectorAll(
        '#cta-principal, #cta-final, #whatsapp-float-btn, footer #whatsapp-number'
    );

    whatsappElements.forEach(element => {
        // Para o span do número, apenas atualiza o texto, não é um link direto
        if (element.id === 'whatsapp-number') {
            // Formata o número para exibição, se desejar
            if (seuNumeroWhatsApp.length === 13) { // Ex: 5586995957281
                element.textContent = `(${seuNumeroWhatsApp.substring(2,4)}) ${seuNumeroWhatsApp.substring(4,9)}-${seuNumeroWhatsApp.substring(9)}`;
            } else {
                element.textContent = seuNumeroWhatsApp; // Ou exiba como está
            }
        } else {
            element.setAttribute('href', linkWhatsApp); // Define o href para o link do WhatsApp
            element.setAttribute('target', '_blank'); // Abre em nova aba
        }
    });

    // --- Animações com Intersection Observer ---

    // Opções para o Intersection Observer
    const observerOptions = {
        root: null, // viewport
        rootMargin: '0px',
        threshold: 0.1 // O callback será executado quando 10% do elemento estiver visível
    };

    // Observer para elementos com fade-in e slide-up
    const generalObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('appear');
                observer.unobserve(entry.target); // Para animar apenas uma vez
            }
        });
    }, observerOptions);

    // Observa todos os elementos com as classes de animação
    document.querySelectorAll('.fade-in, .slide-up').forEach(el => {
        generalObserver.observe(el);
    });

    // Observer para cards (Passos, Objeções)
    const cardObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Anima os cards com um pequeno atraso entre eles
                const cards = entry.target.querySelectorAll('.animated-card');
                cards.forEach((card, index) => {
                    setTimeout(() => {
                        card.classList.add('appear');
                    }, index * 150); // Atraso de 150ms entre cada card
                });
                observer.unobserve(entry.target); // Desobserva o container
            }
        });
    }, {
        root: null,
        rootMargin: '0px',
        threshold: 0.15 // Detecta mais cedo para cards
    });

    // Observa os containers dos cards
    document.querySelectorAll('.passos-container, .objecoes-grid').forEach(container => {
        cardObserver.observe(container);
    });

    // Observer para listas com itens animados
    const listObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('appear');
                // Anima cada item da lista com atraso progressivo
                entry.target.querySelectorAll('.list-item-animate').forEach((item, index) => {
                    item.style.transitionDelay = `${index * 0.1}s`;
                    item.classList.add('appear');
                });
                observer.unobserve(entry.target);
            }
        });
    }, {
        root: null,
        rootMargin: '0px',
        threshold: 0.1 // Quando 10% da lista estiver visível
    });

    // Observa todas as listas com itens animados
    document.querySelectorAll('.animated-list').forEach(list => {
        listObserver.observe(list);
    });

    // Animação inicial do botão CTA principal no Hero Section
    const ctaHeroButton = document.getElementById('cta-principal');
    if (ctaHeroButton) {
        ctaHeroButton.classList.add('pulse'); // Garante que a animação inicial de pulso esteja lá
    }
});