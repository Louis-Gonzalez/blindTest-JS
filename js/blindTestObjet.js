class CountdownTimer {
    constructor(time, timerElementId, progressBarId, playPauseButtonId, restartButtonId, alertSoundId, soundTrackId, responseButtonId) {
        this.time = time;  
        this.maxTime = time;  
        this.isRunning = false;
        this.hasStarted = false;  // Indicateur si le timer a déjà commencé
        this.intervalId = null;

        // Récupération des éléments HTML
        this.timerElement = document.getElementById(timerElementId);
        this.progressBar = document.getElementById(progressBarId);
        this.playPauseButton = document.getElementById(playPauseButtonId);
        this.restartButton = document.getElementById(restartButtonId);
        this.alertSound = document.getElementById(alertSoundId);
        this.soundTrack = document.getElementById(soundTrackId);
        this.responseButton = document.getElementById(responseButtonId);

        // Initialiser la liste de musique
        this.musicList = this.source();
        this.selectedMusic = null; // Propriété pour stocker la musique sélectionnée

        // Initialiser les événements
        this.init();
    }

    source() {
        return [
            {name: "soundTrack1", path: "../media/music/soundTrack1.mp3", musicTitle: "Alan-Walker&Ava-Max_Alone.mp3"},
            {name: "soundTrack2", path: "../media/music/soundTrack2.mp3", musicTitle: "Alan-Walker_Faded.mp3"},
            {name: "soundTrack3", path: "../media/music/soundTrack3.mp3", musicTitle: "Ava-Max_Kings&Queens.mp3"},
            {name: "soundTrack4", path: "../media/music/soundTrack4.mp3", musicTitle: "Ava-Max_Sweet-but-Psycho.mp3"},
            {name: "soundTrack5", path: "../media/music/soundTrack5.mp3", musicTitle: "Aya-Nakamura_Copines.mp3"},
            {name: "soundtrack6", path: "../media/music/soundTrack6.mp3", musicTitle: "BLACKPINK_How-You-Like-That.mp3"},
            {name: "soundTrack7", path: "../media/music/soundTrack7.mp3", musicTitle: "BLACKPINK_Pink-Venom.mp3"},
            {name: "soundTrack8", path: "../media/music/soundTrack8.mp3", musicTitle: "Bob-Sinclar_Rock-This-Party.mp3"},
            {name: "soundTrack9", path: "../media/music/soundTrack9.mp3", musicTitle: "Charli-XCX_Break-The-Rules.mp3"},
            {name: "soundTrack10", path: "../media/music/soundTrack10.mp3", musicTitle:"DANCE-MONKEY_TONES-AND-I.mp3"},
            {name: "soundtrack11", path:"../media/music/soundTrack11.mp3", musicTitle:"David-Guetta&MORTEN_Kill-Me-Slow.mp3"},
            {name: "soundtrack12", path:"../media/music/soundTrack12.mp3", musicTitle:"Ed-Sheeran_Shape-of-You.mp3"},
            {name: "soundtrack13", path:"../media/music/soundTrack13.mp3", musicTitle:"FAUN_Federkleid.mp3"},
            {name: "soundtrack14", path:"../media/music/soundTrack14.mp3", musicTitle:"GIMS&VITAA_PRENDS-MA-MAIN.mp3"},
            {name: "soundtrack15", path:"../media/music/soundTrack15.mp3", musicTitle:"GIMS_ORIGAMI.mp3"},
            {name: "soundtrack16", path:"../media/music/soundTrack16.mp3", musicTitle:"Hass-Hass_Diljit-X-Sia.mp3"},
            {name: "soundtrack17", path:"../media/music/soundTrack17.mp3", musicTitle:"Imagine-Dragons_Believer.mp3"},
            {name: "soundtrack18", path:"../media/music/soundTrack18.mp3", musicTitle:"Italobrothers_Stamp-On-The-Ground.mp3"},
            {name: "soundtrack19", path:"../media/music/soundTrack19.mp3", musicTitle:"ItaloBrothers_Welcome-To-The-Dancefloor.mp3"},
            {name: "soundtrack20", path:"../media/music/soundTrack20.mp3", musicTitle:"KDA-POPSTARS_League of Legends.mp3"},
            {name: "soundtrack21", path:"../media/music/soundTrack21.mp3", musicTitle:"Keen-v&Lorelei-B_la-vie-du-bon-cote.mp3"},
            {name: "soundtrack22", path:"../media/music/soundTrack22.mp3", musicTitle:"Kungs_Never-Going-Home.mp3"},
            {name: "soundtrack23", path:"../media/music/soundTrack23.mp3", musicTitle:"Kygo&Ava-Max_Whatever.mp3"},
            {name: "soundtrack24", path:"../media/music/soundTrack24.mp3", musicTitle:"Kylie-Cantrall&Alex-Boniello_Red.mp3"},
            {name: "soundtrack25", path:"../media/music/soundTrack25.mp3", musicTitle:"La-Chenille-Synchro.mp3"},
            {name: "soundtrack26", path:"../media/music/soundTrack26.mp3", musicTitle:"Marwa-Loud_Bad-Boy.mp3"},
            {name: "soundtrack27", path:"../media/music/soundTrack27.mp3", musicTitle:"Marwa-Loud_Fallait-pas.mp3"},
            {name: "soundtrack28", path:"../media/music/soundTrack28.mp3", musicTitle:"Miley-Cyrus_Flowers.mp3"},
            {name: "soundtrack29", path:"../media/music/soundTrack29.mp3", musicTitle:"Nathan-Evans_Wellerman.mp3"},
            {name: "soundtrack30", path:"../media/music/soundTrack30.mp3", musicTitle:"Sia&Sean-Paul_Cheap-Thrills.mp3"},
            {name: "soundtrack31", path:"../media/music/soundTrack31.mp3", musicTitle:"Sia_Unstoppable.mp3"},
            {name: "soundtrack32", path:"../media/music/soundTrack32.mp3", musicTitle:"The-Weeknd_Blinding-Lights.mp3"},
            {name: "soundtrack33", path:"../media/music/soundTrack33.mp3", musicTitle:"W&W&ItaloBrothers&Captain-Curtis_Jump-Jump-Jump.mp3"},
            {name: "soundtrack34", path:"../media/music/soundTrack34.mp3", musicTitle:"What-s_My-Name.mp3"},
        ]
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

    getRandomMusic() {
        let randomIndex = Math.floor(Math.random() * this.musicList.length);
        return this.musicList[randomIndex];  // Retourne la musique sélectionnée
    }

    start() {
        if (!this.isRunning) {  // Vérifie si le timer n'est pas déjà en cours
            this.isRunning = true;
    
            // Choisit une musique aléatoire seulement si le timer n'a pas encore commencé
            if (!this.hasStarted) {
                this.selectedMusic = this.getRandomMusic();  // Choisit une musique aléatoire
                this.soundTrack.src = this.selectedMusic.path;  // Met à jour la source de la musique
                this.hasStarted = true;  // Marque que le timer a commencé
            }
    
            this.soundTrack.play();
            this.intervalId = setInterval(() => this.countDown(), 1000);
            this.playPauseButton.value = "Pause";
        }
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
    
        // Réinitialiser l'indicateur
        this.hasStarted = false;
    
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
            responseElement.innerText = `${this.selectedMusic.musicTitle} ${this.selectedMusic.name}`;  // Affiche le titre de la musique
            responseElement.style.display = 'block';  // Afficher la réponse
        }
    }
}

window.onload = function() {
    let time = 20;

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
