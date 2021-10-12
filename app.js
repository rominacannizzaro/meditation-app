const app = () => {   
    const song = document.querySelector('.song');  
    const play = document.querySelector('.play'); 
    const outline = document.querySelector('.moving-outline circle');  
    const video = document.querySelector('.vid-container video'); 

    //Sounds 
    const sounds = document.querySelectorAll('.sound-picker button');  
    //Time Display 
    const timeDisplay = document.querySelector('.time-display');
    const timeSelect = document.querySelectorAll(".time-select button");
    //Get the length of the oultine 
    const outlineLength = outline.getTotalLength();  
    //Duration 
    let fakeDuration = 600; // set up a "fake" duration, a default duration. When the time selected by the user expires, the song will stop.
    
    //Animation effect of the outline
    outline.style.strokeDasharray = outlineLength;
    outline.style.strokeDashoffset = outlineLength;

    //Play sound
    play.addEventListener("click", () => {
        checkPlaying(song);
    });

    //Create a function to pause and play sound
     const checkPlaying = song => {
        if (song.paused) {
            song.play();
            video.play();
            play.src = "./svg/pause.svg";
        } else {
            song.pause();
            video.pause(); 
            play.src = "./svg/play.svg";
        }
    };

    //Keep track of time along the circle
    song.ontimeupdate = () => {
        let currentTime = song.currentTime;
        let elapsed = fakeDuration - currentTime;
        let seconds = Math.floor(elapsed % 60);
        let minutes = Math.floor(elapsed / 60);
    

    //Animate the circle
    let progress = outlineLength - (currentTime / fakeDuration) * outlineLength;
    outline.style.strokeDashoffset = progress;

    //Animate the text (countdown timer)
        timeDisplay.textContent = `${minutes}:${seconds}`;
    };
};

app();