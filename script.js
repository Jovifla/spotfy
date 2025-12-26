const songName = document.getElementById("som-name");
const bandName = document.getElementById("banda-name");
const song = document.getElementById("audio");
const cover = document.getElementById("cover");
const play = document.getElementById("play");
const next = document.getElementById("next");
const previous = document.getElementById("previous");
const progressBarContainer = document.getElementById("progress-bar");
const progressBar = document.getElementById("current-progress");

const playList = [
      {
            songName : "24 Horas De Amor",
            artist : "ExaltaSamba",
            file : "24 HORAS DE AMOR"
      },
      {
            songName : "A que ta gostoso deixa",
            artist : "ExaltaSamba",
            file : "A QUE TA GOSTOSO DEIXA"
      },
      {
            songName: "A Samba a Gente Bota Pra Quebrar",
            artist : "ExaltaSamba",
            file : "A SAMBA A GENTE BOTA PRA QUEBRAR"
      }
];

let isPlaying = false;
let songIndex = 0;

function playSong() {
      const icon = play.querySelector('.bi');
      if (icon) {
            icon.classList.remove('bi-play-btn-fill');
            icon.classList.add('bi-pause-btn-fill');
      }
      song.play().catch(e => console.error("Erro ao reproduzir (verifique o caminho do arquivo):", e));
      isPlaying = true;
}

function pauseSong() {
      const icon = play.querySelector('.bi');
      if (icon) {
            icon.classList.add('bi-play-btn-fill');
            icon.classList.remove('bi-pause-btn-fill');
      }
      song.pause();
      isPlaying = false;
}
function playPauseDecider() {
      if(isPlaying === true) {
            pauseSong();
      } else {
            playSong();
      }
}
function iniciarSom(){
      cover.src =`images/${playList[songIndex].file}.jpg`;
      song.src = `musics/${playList[songIndex].file}.mp3`;
      console.log("Carregando música:", song.src);
      songName.innerText = playList[songIndex].songName;
      bandName.innerText = playList[songIndex].artist;
}

function previousSong() {
      if(songIndex === 0){
            songIndex = playList.length - 1;
      } else {
            songIndex -= 1;
      }
      iniciarSom();
      playSong();
}

function nextSong() {
      if(songIndex === playList.length - 1){
            songIndex = 0;
      } else {
            songIndex += 1;
      }
      iniciarSom();
      playSong();
}

function updateProgress(){
      // Verifica se a duração é válida para evitar erros de cálculo
      if (song.duration) {
            const barWidth = (song.currentTime/song.duration)*100;
            progressBar.style.width = `${barWidth}%`;
      }
}

function jumpTo(event){
      const width = progressBarContainer.clientWidth;
      const clickPosition = event.offsetX;
      const jumpToTime = (clickPosition/width)*song.duration;
      song.currentTime = jumpToTime;
}

iniciarSom();
play.addEventListener("click", playPauseDecider);
previous.addEventListener("click", previousSong);
next.addEventListener("click", nextSong);
song.addEventListener('timeupdate', updateProgress);
progressBarContainer.addEventListener('click', jumpTo);
