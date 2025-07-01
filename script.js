document.addEventListener('DOMContentLoaded', () => {
    // Seleciona os elementos da página
    const yesBtn = document.getElementById('yesBtn');
    const noBtn = document.getElementById('noBtn');
    const message = document.getElementById('message');
    const questionText = document.querySelector('.question');
    const buttonsDiv = document.querySelector('.buttons');
    const headerTitle = document.querySelector('header h1');
    const headerSubtitle = document.querySelector('header p');
    const dragonImage = document.querySelector('.dragon-image');
    const mimoInstructions = document.getElementById('mimoInstructions'); // Seleciona as instruções do mimo
    const backBtn = document.getElementById('backBtn'); // Seleciona o botão de voltar
    const dragonMusic = document.getElementById('dragonMusic'); // Seleciona a música do dragão
    const shrekMusic = document.getElementById('shrekMusic'); // Seleciona a música do Shrek
    const whatsappBtn = document.getElementById('whatsappBtn'); // Seleciona o botão de WhatsApp

    // Tenta tocar a música do dragão automaticamente. Pode ser bloqueado por navegadores.
    // O usuário pode precisar interagir com a página para a música começar a tocar.
    if (dragonMusic) {
        dragonMusic.play().catch(error => {
            console.log("Autoplay de áudio (Música do Dragão) bloqueado. O usuário precisará interagir para tocar a música.", error);
        });
    }

    // Função para mover o botão "Não" para uma posição aleatória
    const moveNoButton = () => {
        // Verifica se o botão "Não" ainda existe na DOM e não está escondido ou em animação
        if (!noBtn || noBtn.classList.contains('hidden') || noBtn.classList.contains('shrink-fade')) return;

        // Obtém as dimensões da janela e do botão
        // Subtrai uma margem para evitar que o botão vá para muito perto das bordas
        const maxX = window.innerWidth - noBtn.offsetWidth - 40;
        const maxY = window.innerHeight - noBtn.offsetHeight - 40;

        // Garante que o botão não saia da tela, com um mínimo de 0
        const randomX = Math.max(0, Math.floor(Math.random() * maxX));
        const randomY = Math.max(0, Math.floor(Math.random() * maxY));

        // Aplica a posição usando CSS
        noBtn.style.position = 'absolute'; // Mudar para absolute para poder mover livremente
        noBtn.style.left = `${randomX}px`;
        noBtn.style.top = `${randomY}px`;
    };

 // Evento para o botão "SIM"
    if (yesBtn) {
        yesBtn.addEventListener('click', () => {
            // Pausa a música do dragão
            if (dragonMusic) dragonMusic.pause();

            // Define o ponto de início da música do Shrek para 3 segundos e a reproduz
            if (shrekMusic) {
                shrekMusic.currentTime = 6; // Define o tempo de início para 6 segundos
                shrekMusic.play().catch(error => console.log("Erro ao reproduzir música do Shrek:", error));
            }

            // Esconde a pergunta e os botões de escolha
            questionText.classList.add('hidden');
            buttonsDiv.classList.add('hidden');

            // Atualiza o cabeçalho para a confirmação
            headerTitle.textContent = 'Vamboraaaa! 🎉'; // Título de confirmação atualizado
            headerSubtitle.textContent = 'Mal posso esperar para descolar no sábado!'; // Subtítulo de confirmação atualizado

            // Atualiza a imagem principal para o Shrek e adiciona animação
            dragonImage.src = 'https://wallpapersok.com/images/high/shrek-making-a-funny-face-1lawv7i17eeg10xw.jpg';
            dragonImage.alt = 'Shrek a fazer uma cara engraçada';
            dragonImage.classList.add('shrek-animation'); // Adiciona classe para animação

            // Atualiza e mostra a mensagem de confirmação
            message.textContent = 'Prepare-se para um sábado lendário! A diversão está garantida! 🎉'; // Mensagem de confirmação atualizada
            message.style.color = '#28A745';
            message.classList.remove('hidden');

            // Mostra as instruções do mimo
            mimoInstructions.classList.remove('hidden');

            // Mostra o botão de voltar e o botão de WhatsApp
            backBtn.classList.remove('hidden');
            whatsappBtn.classList.remove('hidden');
        });
    }

    // Evento para o botão "NÃO" (ao passar o rato)
    if (noBtn) {
        noBtn.addEventListener('mouseover', () => {
            // O botão "Não" fugirá em todas as larguras de ecrã
            moveNoButton();
        });

        // Evento para o botão "NÃO" (ao clicar)
        noBtn.addEventListener('click', (e) => {
            e.preventDefault();

            // Adiciona a classe de animação para o botão encolher e desaparecer
            noBtn.classList.add('shrink-fade');

            setTimeout(() => {
                if (noBtn && noBtn.parentNode) {
                    noBtn.parentNode.removeChild(noBtn); // Remove o botão da DOM
                }

                // Esconde o botão SIM e a div de botões
                if (yesBtn) yesBtn.classList.add('hidden');
                buttonsDiv.classList.add('hidden');
                questionText.classList.add('hidden');

                // Atualiza e mostra a mensagem de brincadeira
                message.textContent = 'Ops! Parece que o botão "Não" fugiu... 😏\nSó existe uma resposta certa aqui!';
                message.style.color = '#dc3545';
                message.classList.remove('hidden');

                // Garante que as instruções do mimo e o botão de WhatsApp não apareçam
                mimoInstructions.classList.add('hidden');
                whatsappBtn.classList.add('hidden');

                // Mostra o botão de voltar
                backBtn.classList.remove('hidden');
            }, 500);
        });
    }

    // Evento para o botão "Voltar ao Início"
    if (backBtn) {
        backBtn.addEventListener('click', () => {
            window.location.reload(); // Recarrega a página para o estado inicial
        });
    }

    // Evento para o botão de WhatsApp
    if (whatsappBtn) {
        whatsappBtn.addEventListener('click', () => {
            const phoneNumber = '5511949211730'; // Substitua pelo seu número de telefone (ex: 5511999998888)
            const whatsappMessage = encodeURIComponent('Pelos céus e reinos distantes! Eu aceito o desafio de sábado! Que a nossa aventura comece!);
            const whatsappUrl = `https://wa.me/${phoneNumber}?text=${whatsappMessage}`;
            window.open(whatsappUrl, '_blank'); // Abre em uma nova aba/janela
        });
    }
});