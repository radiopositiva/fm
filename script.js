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

// Funções para abrir e fechar o popup
const openPopupBtn = document.getElementById("openPopupBtn");
const popupContainer = document.getElementById("popupContainer");
const closePopupBtn = document.getElementById("closePopupBtn");

openPopupBtn.addEventListener("click", () => {
    popupContainer.style.display = "flex"; // Exibe o popup centralizado
});

closePopupBtn.addEventListener("click", () => {
    popupContainer.style.display = "none"; // Oculta o popup
});

// Fecha o popup ao clicar fora do conteúdo
popupContainer.addEventListener("click", (e) => {
    if (e.target === popupContainer) {
        popupContainer.style.display = "none";
    }
});


function openTab(event, tabName) {
    const tabs = document.getElementsByClassName("tab-content");
    for (let i = 0; i < tabs.length; i++) {
      tabs[i].classList.remove("active");
    }
    document.getElementById(tabName).classList.add("active");

    const tabButtons = document.getElementsByClassName("tab");
    for (let i = 0; i < tabButtons.length; i++) {
      tabButtons[i].classList.remove("active");
    }
    if (event) {
      event.currentTarget.classList.add("active");
    }
  }

  function highlightCurrentProgram() {
    const daysOfWeek = ["Domingo", "Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado"];
    const now = new Date();
    const currentDay = daysOfWeek[now.getDay()];
    const currentTime = now.getHours() * 100 + now.getMinutes();
    
    openTab(null, currentDay);
    const currentTab = document.getElementById(currentDay);
    if (!currentTab) return;

    const rows = currentTab.getElementsByTagName("tr");
    let currentProgramInfo = "Nenhum programa no momento";
    
    for (let i = 1; i < rows.length; i++) {
      const timeCell = rows[i].cells[0];
      const timeParts = timeCell.textContent.split(":");
      const programTime = parseInt(timeParts[0]) * 100 + parseInt(timeParts[1]);
      
      if (programTime <= currentTime && (i === rows.length - 1 || 
         parseInt(rows[i + 1].cells[0].textContent.replace(":", "")) > currentTime)) {
        rows[i].classList.add("highlight");

        // Obtem o horário, programa e apresentador para exibir na página
        const horario = rows[i].cells[0].textContent;
        const programa = rows[i].cells[1].textContent;
        const apresentador = rows[i].cells[2].textContent;
        
        currentProgramInfo = `Horário: ${horario}<br>Programa: ${programa}<br>Apresentador: ${apresentador}`;
        break;
      }
    }
    
    // Exibe o programa atual na div "current-program"
    document.getElementById("current-program").innerHTML = `Programa atual:<br>${currentProgramInfo}`;
  }

  document.addEventListener("DOMContentLoaded", () => {
    highlightCurrentProgram();
  });

  function updateProgram() {
    const now = new Date();
    let program;

    if (now.getHours() >= 6 && now.getHours() < 12) {
        program = "Programa da Manhã";
    } else if (now.getHours() >= 12 && now.getHours() < 18) {
        program = "Programa da Tarde";
    } else {
        program = "Programa da Noite";
    }

    document.getElementById("secondary-program-info").textContent = "Programa atual: " + program;
}

setInterval(updateProgram, 60000); // Atualiza a cada minuto
updateProgram(); // Atualiza ao carregar a página
  