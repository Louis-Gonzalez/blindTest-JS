let time; 
let maxTime;  // Variable pour la durée maximale
let timerElement;  
let intervalId;  
let isRunning = false;
let alertSound;  // Ajout de la référence pour l'audio

window.onload = function() {
    let userTime = window.prompt("Entrez le temps du compte à rebours (en secondes) :", "10");
    if (userTime !== null && !isNaN(userTime)) {
        time = parseInt(userTime, 10);  // Assigne la valeur entrée par l'utilisateur
        maxTime = time; 
    } else {
        time = 10;  // Valeur par défaut si l'utilisateur n'entre rien
        maxTime = 10;
    }

    timerElement = document.getElementById("timer");
    let playPauseButton = document.getElementById("playPauseButton");
    let restartButton = document.getElementById("restart");
    alertSound = document.getElementById("alertSound");

    if (timerElement && playPauseButton && alertSound) {
        timerElement.innerText = time;

        // Bouton Play/Pause
        playPauseButton.addEventListener("click", function() {
            if (isRunning) {
                // Si le compte à rebours est en cours, on le met en pause
                clearInterval(intervalId);
                playPauseButton.value = "Play";
                isRunning = false;
            } else {
                // Si le compte à rebours est en pause, on le démarre
                intervalId = setInterval(countDown, 1000);
                playPauseButton.value = "Pause";
                isRunning = true;
            }
        });

        // Bouton Restart
        restartButton.addEventListener("click", function() {
            restart();
        });

    } else {
        console.error("L'élément #timer, #playPauseButton ou #alertSound est introuvable.");
    }
};

function updateProgressBar() {
    let progressBar = document.getElementById("progressBar");
    let percentage = (time / maxTime) * 100;  // Calcul du pourcentage de la barre de progression
    progressBar.style.width = percentage + "%";  // Met à jour la largeur de la barre de progression

    // Changement de couleur en fonction du temps restant
    if (time < 3) {
        progressBar.style.backgroundColor = "red";
    } else if (time <= 5) {
        progressBar.style.backgroundColor = "orange";
    } else {
        progressBar.style.backgroundColor = "green";
    }
}

function countDown() {
    if (time >= 0) {
        timerElement.innerText = time;
        timerElement.style.fontWeight = 'bold';
        
        if (time <= 5) {
            timerElement.style.color = 'red';
        }

        // Joue le son lorsque le temps atteint 1 seconde
        if (time === 1 && alertSound) {
            alertSound.play();
        }

        updateProgressBar();
        time--;
        console.log(time);
    } else {
        clearInterval(intervalId);
        timerElement.style.color = '';
        updateProgressBar();
    }
}

function restart() {
    clearInterval(intervalId);
    time = maxTime;
    timerElement.innerText = time; 
    timerElement.style.color = '';
    updateProgressBar();
    isRunning = false;
    playPauseButton.value = "Play";
}
