const radio = document.getElementById('radio');
const playStopButton = document.getElementById('playStopButton');
const status = document.getElementById('status');

function toggleRadio() {
    if (radio.paused) {
        radio.src = "https://stm37.srvstm.com:6888/stream";
        radio.play();
        playStopButton.textContent = 'Stop';
        status.textContent = 'Tocando...';
    } else {
        radio.pause();
        radio.currentTime = 0;
        playStopButton.textContent = 'Play';
        status.textContent = 'Parado.';
    }
}

radio.addEventListener('error', () => {
    status.textContent = 'Erro ao carregar o áudio.';
});

function updateDate() {
    const today = new Date();
    const dateString = today.toLocaleDateString('pt-BR', {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
        year: 'numeric'
    });
    document.getElementById('dateDisplay').textContent = dateString;
}

updateDate();  // Atualiza a data ao carregar a página


// Funcionalidade do Carrossel
const carousel = document.getElementById('carousel');
const totalSlides = document.querySelectorAll('#carousel a').length;
let currentIndex = 0;

function showNextSlide() {
    currentIndex = (currentIndex + 1) % totalSlides;
    const offset = -currentIndex * 100;
    carousel.style.transform = `translateX(${offset}%)`;
}

setInterval(showNextSlide, 3000);
