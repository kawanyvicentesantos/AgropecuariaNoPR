/* ==========================================================================
   INTERATIVIDADE E DINAMISMO - PROGRAMAÇÃO PARA O AGRINHO 2026
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

    // --- 1. EFEITO NO CABEÇALHO AO ROLAR A PÁGINA (SCROLL EFFECT) ---
    const header = document.getElementById('main-header');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.style.boxShadow = '0 4px 25px rgba(0, 0, 0, 0.12)';
            header.style.borderBottom = '1px solid rgba(46, 125, 50, 0.1)';
        } else {
            header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.05)';
            header.style.borderBottom = 'none';
        }
    });

    // --- 2. DESTAQUE AUTOMÁTICO NO MENU DE NAVEGAÇÃO ---
    const sections = document.querySelectorAll('section, footer');
    const navLinks = document.querySelectorAll('#nav-menu ul li a');

    window.addEventListener('scroll', () => {
        let currentSectionId = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            // Define que o usuário entrou na seção quando passa de 1/3 da altura dela na tela
            if (window.scrollY >= (sectionTop - 150)) {
                currentSectionId = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.style.color = ''; // Limpa o estilo padrão
            link.style.borderBottom = 'none';

            if (link.getAttribute('href') === `#${currentSectionId}`) {
                link.style.color = '#2e7d32'; // Aplica a cor do Verde Sustentável no link ativo
                link.style.borderBottom = '2px solid #2e7d32';
            }
        });
    });

    // --- 3. VALIDAÇÃO E SIMULAÇÃO DE ENVIO DO FORMULÁRIO DE FEEDBACK ---
    const feedbackForm = document.getElementById('feedback-form');
    const formAlert = document.getElementById('form-alert');

    if (feedbackForm) {
        feedbackForm.addEventListener('submit', (event) => {
            // Impede a página de recarregar (padrão do HTML)
            event.preventDefault();

            // Captura os valores digitados pelo usuário
            const nome = document.getElementById('nome').value.trim();
            const email = document.getElementById('email').value.trim();
            const mensagem = document.getElementById('mensagem').value.trim();

            // Altera o estado do botão para indicar processamento técnico
            const submitBtn = feedbackForm.querySelector('.btn-submit');
            const originalBtnText = submitBtn.textContent;
            submitBtn.textContent = 'Processando dados...';
            submitBtn.disabled = true;

            // Simula uma resposta de servidor (comunicação assíncrona) após 1.5 segundos
            setTimeout(() => {
                // Configura a caixa de alerta com estilo de sucesso
                formAlert.textContent = `Obrigado pelo seu feedback, ${nome}! Sua mensagem sobre as Terras Futuras foi registrada com sucesso para o Concurso Agrinho.`;
                formAlert.className = 'alert-success'; // Ativa a classe que configuramos no CSS

                // Exibe o alerta de sucesso de forma elegante
                formAlert.style.opacity = '0';
                formAlert.classList.remove('hidden');

                // Pequeno efeito de transição de opacidade via JS
                let opacity = 0;
                const fadeIn = setInterval(() => {
                    if (opacity < 1) {
                        opacity += 0.1;
                        formAlert.style.opacity = opacity;
                    } else {
                        clearInterval(fadeIn);
                    }
                }, 20);

                // Limpa os campos do formulário para novos envios
                feedbackForm.reset();

                // Restaura o botão original
                submitBtn.textContent = originalBtnText;
                submitBtn.disabled = false;

            }, 1500);
        });
    }
});
