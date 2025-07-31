document.addEventListener('DOMContentLoaded', function() {

    // --- Configuração do WhatsApp ---
    const seuNumeroWhatsApp = "5586995957281"; // <- Seu número aqui
    const mensagemPadrao = "Olá! Visitei sua Landing Page e gostaria de saber mais sobre seus serviços de gestão de tráfego.";

    if (seuNumeroWhatsApp.length < 12) {
        console.error("ATENÇÃO: Número de WhatsApp não configurado corretamente.");
        alert("Configure o número de WhatsApp no script.js.");
    }

    // Atualiza o número no rodapé
    const whatsappNumberElement = document.getElementById('whatsapp-number');
    if (whatsappNumberElement && seuNumeroWhatsApp.length === 13) {
        whatsappNumberElement.textContent = `(${seuNumeroWhatsApp.substring(2,4)}) ${seuNumeroWhatsApp.substring(4,9)}-${seuNumeroWhatsApp.substring(9)}`;
    } else if (whatsappNumberElement) {
        whatsappNumberElement.textContent = seuNumeroWhatsApp;
    }

    // Rolagem suave
    function smoothScrollTo(targetId, duration = 1000) {
        const targetElement = document.getElementById(targetId);
        if (!targetElement) return;

        const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
        const startPosition = window.pageYOffset;
        const distance = targetPosition - startPosition;
        let startTime = null;

        function animation(currentTime) {
            if (startTime === null) startTime = currentTime;
            const timeElapsed = currentTime - startTime;
            const progress = Math.min(timeElapsed / duration, 1);

            const ease = progress < 0.5
                ? 2 * progress * progress
                : -1 + (4 - 2 * progress) * progress;

            window.scrollTo(0, startPosition + distance * ease);

            if (timeElapsed < duration) {
                requestAnimationFrame(animation);
            }
        }

        requestAnimationFrame(animation);
    }

    const ctaButtons = document.querySelectorAll('#cta-principal, #whatsapp-float-btn');
    ctaButtons.forEach(button => {
        button.addEventListener('click', function(event) {
            event.preventDefault();
            smoothScrollTo('oferta-final', 1000);
        });
    });

// --- Manipulação do Formulário com envio para Google Sheets (VIA GOOGLE FORMS) ---
const contactForm = document.getElementById('contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function(event) {
        event.preventDefault();

        const nome = document.getElementById('nome').value.trim();
        const whatsapp = document.getElementById('whatsapp').value.trim();
        const desafio = document.getElementById('desafio').value.trim();

        const formKey = "1FAIpQLSfWw0zsoe2JiDrAC1_2nvgC83of0xGoIYQoEjwJ1HKhIBH8Qg";
        const entryIdNome = "entry.754196171";
        const entryIdWhatsapp = "entry.462944971";
        const entryIdDesafio = "entry.1193886501";
        
        const formUrl = `https://docs.google.com/forms/d/e/${formKey}/formResponse?usp=pp_url&${entryIdNome}=${encodeURIComponent(nome)}&${entryIdWhatsapp}=${encodeURIComponent(whatsapp)}&${entryIdDesafio}=${encodeURIComponent(desafio)}`;

        fetch(formUrl, {
            method: "POST",
            mode: "no-cors"
        }).then(() => {
             // **SOLUÇÃO À PROVA DE ERROS:** Tenta enviar o evento
             try {
                 if (typeof gtag === 'function') {
                    gtag('event', 'lead_enviado', {
                      'event_category': 'formulario',
                      'event_label': 'teste_15_dias',
                    });
                 }
             } catch (error) {
                 console.error("Erro ao enviar evento para o Google Analytics:", error);
             }
             
             const mensagem = `Olá, Samuel! Preenchi o formulário no seu site e gostaria de entender melhor sobre o TESTE DE 15 DIAS GRÁTIS.`;
             const link = `https://wa.me/${seuNumeroWhatsApp}?text=${encodeURIComponent(mensagem)}`;
             window.open(link, '_blank');
             contactForm.reset();
        }).catch(error => {
            console.error("Erro:", error);
            alert("Erro ao enviar os dados. Tente novamente.");
        });
    });
}

    // --- Animações com Intersection Observer ---
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const generalObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('appear');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.fade-in, .slide-up').forEach(el => {
        generalObserver.observe(el);
    });

    const cardObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const cards = entry.target.querySelectorAll('.animated-card');
                cards.forEach((card, index) => {
                    setTimeout(() => {
                        card.classList.add('appear');
                    }, index * 150);
                });
                observer.unobserve(entry.target);
            }
        });
    }, {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    });

    document.querySelectorAll('.passos-container, .objecoes-grid').forEach(container => {
        cardObserver.observe(container);
    });

    const listObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('appear');
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
        threshold: 0.1
    });

    document.querySelectorAll('.animated-list').forEach(list => {
        listObserver.observe(list);
    });

    const ctaHeroButton = document.getElementById('cta-principal');
    if (ctaHeroButton) {
        ctaHeroButton.classList.add('pulse');
    }
});