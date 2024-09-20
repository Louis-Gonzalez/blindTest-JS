class CountdownTimer {
    constructor(time, timerElementId, progressBarId, playPauseButtonId, restartButtonId, alertSoundId) {
        this.time = time;  
        this.maxTime = time;  
        this.isRunning = false;
        this.intervalId = null;

        // Récupération des éléments HTML
        this.timerElement = document.getElementById(timerElementId);
        this.progressBar = document.getElementById(progressBarId);
        this.playPauseButton = document.getElementById(playPauseButtonId);
        this.restartButton = document.getElementById(restartButtonId);
        this.alertSound = document.getElementById(alertSoundId);

        // Initialiser les événements
        this.init();
    }

    // Initialisation des événements pour les boutons
    init() {
        if (this.timerElement && this.playPauseButton && this.alertSound) {
            this.updateTimerDisplay();

            // Événement pour le bouton Play/Pause
            this.playPauseButton.addEventListener("click", () => {
                if (this.isRunning) {
                    this.pause();
                } else {
                    this.start();
                }
            });

            // Événement pour le bouton Restart
            this.restartButton.addEventListener("click", () => {
                this.restart();
            });
        } else {
            console.error("Les éléments HTML nécessaires ne sont pas trouvés.");
        }
    }

    // Démarrer le compte à rebours
    start() {
        this.isRunning = true;
        this.intervalId = setInterval(() => this.countDown(), 1000);
        this.playPauseButton.value = "Pause";
    }

    // Mettre en pause le compte à rebours
    pause() {
        clearInterval(this.intervalId);
        this.isRunning = false;
        this.playPauseButton.value = "Play";
    }

    // Redémarrer le compte à rebours
    restart() {
        this.pause();
        this.time = this.maxTime;
        this.updateTimerDisplay();
        this.resetStyles();
    }

    // Mettre à jour l'affichage du timer
    updateTimerDisplay() {
        this.timerElement.innerText = this.time;
    }

    // Mettre à jour la barre de progression et la couleur
    updateProgressBar() {
        let percentage = (this.time / this.maxTime) * 100;
        this.progressBar.style.width = percentage + "%";

        // Couleur de la barre selon le temps restant
        if (this.time < 3) {
            this.progressBar.style.backgroundColor = "red";
        } else if (this.time <= 5) {
            this.progressBar.style.backgroundColor = "orange";
        } else {
            this.progressBar.style.backgroundColor = "green";
        }
    }

    // Gérer la logique du compte à rebours
    countDown() {
        this.timerElement.style.fontWeight = 'bold';
        if (this.time >= 0) {
            this.updateTimerDisplay();
            this.updateProgressBar();

            if (this.time <= 5) {
                this.timerElement.style.color = 'red';
            }

            if (this.time === 1) {
                this.alertSound.play();
            }

            this.time--;
        } else {
            this.pause();
            this.resetStyles();
        }
    }

    // Réinitialiser les styles du timer
    resetStyles() {
        this.timerElement.style.color = '';
        this.updateProgressBar();
    }
}

// Utilisation de la classe après chargement de la page
window.onload = function() {
    let userTime = window.prompt("Entrez le temps du compte à rebours (en secondes) :", "10");
    let time = (userTime !== null && !isNaN(userTime)) ? parseInt(userTime, 10) : 10;

    // Créer une instance de la classe CountdownTimer
    let countdown = new CountdownTimer(
        time,  // Temps entré par l'utilisateur
        "timer",  // ID du timer
        "progressBar",  // ID de la barre de progression
        "playPauseButton",  // ID du bouton Play/Pause
        "restart",  // ID du bouton Restart
        "alertSound"  // ID de l'élément audio pour le son d'alerte
    );
};
