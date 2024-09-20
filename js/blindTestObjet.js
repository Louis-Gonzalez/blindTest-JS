class CountdownTimer {
    constructor(time, timerElementId, progressBarId, playPauseButtonId, restartButtonId, alertSoundId, soundTrackId, responseButtonId) {
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
        this.soundTrack = document.getElementById(soundTrackId);
        this.responseButton = document.getElementById(responseButtonId);

        // Initialiser les événements
        this.init();
    }

    init() {
        if (this.timerElement && this.playPauseButton && this.alertSound) {
            this.updateTimerDisplay();

            this.playPauseButton.addEventListener("click", () => {
                if (this.isRunning) {
                    this.pause();
                } else {
                    this.start();
                }
            });

            this.restartButton.addEventListener("click", () => {
                this.restart();
            });
        } else {
            console.error("Les éléments HTML nécessaires ne sont pas trouvés.");
        }
    }

    start() {
        this.isRunning = true;
        this.intervalId = setInterval(() => this.countDown(), 1000);
        this.playPauseButton.value = "Pause";
        this.soundTrack.play();
    }

    pause() {
        clearInterval(this.intervalId);
        this.isRunning = false;
        this.playPauseButton.value = "Play";

        if (this.soundTrack) {
            this.soundTrack.pause();
        }
    }

    restart() {
        this.pause();
        this.time = this.maxTime;
        this.updateTimerDisplay();
        this.resetStyles();

        if (this.soundTrack) {
            this.soundTrack.currentTime = 0;  // Remet la musique au début
        }

        // Réafficher le timer et la barre de progression
        this.timerElement.style.display = 'block';
        this.progressBar.style.display = 'block';

        // Masquer la réponse
        let responseElement = document.getElementById("response");
        if (responseElement) {
            responseElement.style.display = 'none';  // Masquer la réponse
        }
    }

    updateTimerDisplay() {
        this.timerElement.innerText = this.time;
    }

    updateProgressBar() {
        let percentage = (this.time / this.maxTime) * 100;
        this.progressBar.style.width = percentage + "%";

        if (this.time < 3) {
            this.progressBar.style.backgroundColor = "red";
        } else if (this.time <= 5) {
            this.progressBar.style.backgroundColor = "orange";
        } else {
            this.progressBar.style.backgroundColor = "green";
        }
    }

    countDown() {
        this.timerElement.style.fontWeight = 'bold';
        if (this.time >= 0) {
            this.updateTimerDisplay();
            this.updateProgressBar();

            if (this.time <= 5) {
                this.timerElement.style.color = 'orange';
            }

            if (this.time < 3) {
                this.timerElement.style.color = 'red';
            }

            if (this.time === 1) {
                this.alertSound.play();
            }

            this.time--;
        } else {
            this.pause();
            this.resetStyles();
            this.response();  // Afficher la réponse lorsque le temps atteint 0
        }
    }

    resetStyles() {
        this.timerElement.style.color = '';
        this.updateProgressBar();
    }

    response() {
        // Masquer le compteur et la barre de progression
        this.timerElement.style.display = 'none';
        this.progressBar.style.display = 'none';

        // Afficher la réponse
        let responseElement = document.getElementById("response");
        if (responseElement) {
            responseElement.innerText = "Voici la réponse !";  // Personnalisez le texte de la réponse
            responseElement.style.display = 'block';  // Afficher la réponse
        }
    }
}

window.onload = function() {
    let time = 10;

    let countdown = new CountdownTimer(
        time,  
        "timer",  
        "progressBar",  
        "playPauseButton",  
        "restart",  
        "alertSound",  
        "soundTrack",  
        "response"  
    );
};
