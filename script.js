const musicContainer = document.querySelector('.music-container')
const PlayBtn = document.querySelector('#play')
const prevBtn = document.querySelector('#prev')
const nextBtn = document.querySelector('#next')
const audio = document.querySelector('#audio')
const progress = document.querySelector('.progress')
const progressContainer = document.querySelector('.progress-container')
const title = document.querySelector('#title')
const cover = document.querySelector('#cover')

const colors = {
    "Thats What I Like": {
        bgColor: "rgb(192, 192, 192)",
        boxShadowColor: "rgba(128, 128, 128, 0.6)",
        progressColor: "#8dfe9c"
    },
    "Starry Night": {
        bgColor: "rgb(221,240,252)",
        boxShadowColor: "rgba(169,203,252,0.6)",
        progressColor: "#8daafe"
    },
    "Unstoppable": {
        bgColor: "rgb(252,221,221)",
        boxShadowColor: "rgba(252,169,169,0.6)",
        progressColor: "#fe8daa"
        
    }
}
//Song titles
const songs=["Thats What I Like","Starry Night","Unstoppable"]
//keep track of songs
let songIndex=2

loadSong(songs[songIndex])

//Initially load song info DOM
function loadSong(song){
    title.innerText = song
    audio.src=`./music/${song}.mp3`
    cover.src=`./images/${song}.jpg`

    // Updating colors
    const selectedColors = colors[song];
    document.body.style.backgroundImage = `linear-gradient(0deg, rgb(247,247,247) 23.8%, ${selectedColors.bgColor} 92%)`;
    musicContainer.style.boxShadow = `0 20px 20px 0 ${selectedColors.boxShadowColor}`;
    progress.style.backgroundColor = selectedColors.progressColor;
}
function playSong(){
    musicContainer.classList.add('play');
    PlayBtn.querySelector('i.fas').classList.remove('fa-play')
    PlayBtn.querySelector('i.fas').classList.add('fa-pause')

    audio.play()
}

function pauseSong(){
    musicContainer.classList.remove('play');
    PlayBtn.querySelector('i.fas').classList.add('fa-play')
    PlayBtn.querySelector('i.fas').classList.remove('fa-pause')

    audio.pause()
}

function prevsong(){
    songIndex--
    if(songIndex < 0){
        songIndex=songs.length - 1;
    }
    loadSong(songs[songIndex])
    playSong()
}

function nextSong(){
    songIndex++
    if(songIndex > songs.length-1){
        songIndex=0;
    }
    loadSong(songs[songIndex])
    playSong()   
}
function updateProgress(e){
    const {duration, currentTime}=e.srcElement
    const progressPercent = (currentTime / duration) * 100
    progress.style.width = `${progressPercent}%`
}

function setProgress(e){
    const width= this.clientWidth;
    const clickX= e.offsetX
    const duration = audio.duration

    audio.currentTime = (clickX / width) * duration;
}
PlayBtn.addEventListener('click',()=>{
    const isPlaying = musicContainer.classList.contains('play')
    if(isPlaying){
        pauseSong()
    }
    else{
        playSong()
    }
})

//change song events
prevBtn.addEventListener('click',prevsong)
nextBtn.addEventListener('click',nextSong)
audio.addEventListener('timeupdate',updateProgress)

progressContainer.addEventListener('click', setProgress);

audio.addEventListener('ended',nextSong) 