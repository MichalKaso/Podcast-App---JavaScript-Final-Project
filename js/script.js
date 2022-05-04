let allEpisodes = [
  {
    name: "Ep #1 - Back From Mykonos",
    artist: "The Michael Casso Podcast",
    img: "Ep1",
    src: "Ep1",
  },

  {
    name: "Ep #2 - Merry Xmas!",
    artist: "The Michael Casso Podcast",
    img: "Ep2",
    src: "Ep2",
  },

  {
    name: "Ep #3 - Eridjola Biba",
    artist: "The Michael Casso Podcast",
    img: "Ep3",
    src: "Ep3",
  },

  {
    name: "Ep #4 - The Day the Music Died",
    artist: "The Michael Casso Podcast",
    img: "Ep4",
    src: "Ep4",
  },

  {
    name: "Ep #5 - Ms. Bianca: Flirting-Sexting-Dating!",
    artist: "The Michael Casso Podcast",
    img: "Ep5",
    src: "Ep5",
  },

  {
    name: "Ep #6 - Mr. Skerdi Sino",
    artist: "The Michael Casso Podcast",
    img: "Ep6",
    src: "Ep6",
  },

  {
    name: "Ep #8 - Discipline & Tactical Wins!",
    artist: "The Michael Casso Podcast",
    img: "Ep8",
    src: "Ep8",
  },

  {
    name: "Ep #9 - Alina: Ukranian in the frontlines!",
    artist: "The Michael Casso Podcast",
    img: "Ep9",
    src: "Ep9",
  },

  {
    name: "Ep #10 - 3 + 1 Careers",
    artist: "The Michael Casso Podcast",
    img: "Ep10",
    src: "Ep10",
  },

  {
    name: "Ep #11 - What if... ?",
    artist: "The Michael Casso Podcast",
    img: "Ep11",
    src: "Ep11",
  },

  {
    name: "Ep #12 - Gerta: The Professor",
    artist: "The Michael Casso Podcast",
    img: "Ep12",
    src: "Ep12",
  },

  {
    name: "Ep #13 - Ms. Caitlin Davis",
    artist: "The Michael Casso Podcast",
    img: "Ep13",
    src: "Ep13",
  },

  {
    name: "Ep #14 - Dóce: The Accountant",
    artist: "The Michael Casso Podcast",
    img: "Ep14",
    src: "Ep14",
  },

  {
    name: "Ep #15 - Shaping life to your vision",
    artist: "The Michael Casso Podcast",
    img: "Ep1",
    src: "Ep15",
  },
];
const wrapper = document.querySelector(".wrapper"),
  musicImg = wrapper.querySelector(".img-area img"),
  musicName = wrapper.querySelector(".music-details .name"),
  musicArtist = wrapper.querySelector(".music-details .artist"),
  playPauseBtn = wrapper.querySelector(".play-pause"),
  prevBtn = wrapper.querySelector("#prev"),
  nextBtn = wrapper.querySelector("#next"),
  mainAudio = wrapper.querySelector("#main-audio"),
  progressArea = wrapper.querySelector(".progres-area"),
  progressBar = progressArea.querySelector(".progres-bar"),
  musicList = wrapper.querySelector(".music-list"),
  moreMusicBtn = wrapper.querySelector("#more-music"),
  closemoreMusic = musicList.querySelector("#close");

let musicIndex = Math.floor(Math.random() * allEpisodes.length + 1);
isMusicPaused = true;

window.addEventListener("load", () => {
  loadMusic(musicIndex);
  playingSong();
});

function loadMusic(indexNumb) {
  musicName.innerText = allEpisodes[indexNumb - 1].name;
  musicArtist.innerText = allEpisodes[indexNumb - 1].artist;
  musicImg.src = `images/${allEpisodes[indexNumb - 1].src}.png`;
  mainAudio.src = `music/${allEpisodes[indexNumb - 1].src}.mp3`;
}

// Play
function playMusic() {
  wrapper.classList.add("paused");
  playPauseBtn.querySelector("i").innerText = "pause";
  mainAudio.play();
}

// Pause
function pauseMusic() {
  wrapper.classList.remove("paused");
  playPauseBtn.querySelector("i").innerText = "play_arrow";
  mainAudio.pause();
}

// #Previous
function prevMusic() {
  musicIndex--;
  musicIndex < 1
    ? (musicIndex = allEpisodes.length)
    : (musicIndex = musicIndex);
  loadMusic(musicIndex);
  playMusic();
  playingSong();
}

// #Next
function nextMusic() {
  musicIndex++;
  musicIndex > allEpisodes.length
    ? (musicIndex = 1)
    : (musicIndex = musicIndex);
  loadMusic(musicIndex);
  playMusic();
  playingSong();
}

// Btn: #Play & #Pause
playPauseBtn.addEventListener("click", () => {
  const isMusicPlay = wrapper.classList.contains("paused");
  isMusicPlay ? pauseMusic() : playMusic();
  playingSong();
});

// Btn: #Prev
prevBtn.addEventListener("click", () => {
  prevMusic();
});

// Btn: #Next
nextBtn.addEventListener("click", () => {
  nextMusic();
});

// Progress Bar
mainAudio.addEventListener("timeupdate", (e) => {
  const currentTime = e.target.currentTime;
  const duration = e.target.duration;
  let progressWidth = (currentTime / duration) * 100;
  progressBar.style.width = `${progressWidth}%`;

  let musicCurrentTime = wrapper.querySelector(".current-time"),
    musicDuration = wrapper.querySelector(".max-duration");

  mainAudio.addEventListener("loadeddata", () => {
    let mainAdDuration = mainAudio.duration;
    let totalMin = Math.floor(mainAdDuration / 60);
    let totalSec = Math.floor(mainAdDuration % 60);

    if (totalSec < 10) {
      totalSec = `0${totalSec}`;
    }
    musicDuration.innerText = `${totalMin} : ${totalSec}`;
  });

  let currentMin = Math.floor(currentTime / 60);
  let currentSec = Math.floor(currentTime % 60);

  if (currentSec < 10) {
    currentSec = `0${currentSec}`;
  }
  musicCurrentTime.innerText = `${currentMin} : ${currentSec}`;
});

progressArea.addEventListener("click", (e) => {
  let progressWidth = progressArea.clientWidth;
  let clickedOffsetX = e.offsetX;
  let songDuration = mainAudio.duration;

  mainAudio.currentTime = (clickedOffsetX / progressWidth) * songDuration;
  playMusic();
  playingSong();
});

const repeatBtn = wrapper.querySelector("#repeat");
repeatBtn.addEventListener("click", () => {
  let getText = repeatBtn.innerText;

  switch (getText) {
    case "repeat":
      repeatBtn.innerText = "repeat_one";
      repeatBtn.setAttribute("title", "Music looped");
      break;

    case "repeat_one":
      repeatBtn.innerText = "shuffle";
      repeatBtn.setAttribute("title", "Music Shuffled");
      break;

    case "shuffle":
      repeatBtn.innerText = "repeat";
      repeatBtn.setAttribute("title", "All looped");
      break;
  }
});

mainAudio.addEventListener("ended", () => {
  let getText = repeatBtn.innerText;

  switch (getText) {
    case "repeat":
      nextMusic();
      break;

    case "repeat_one":
      mainAudio.currentTime = 0;
      loadMusic(musicIndex);
      playMusic();
      break;

    case "shuffle":
      let randIndex = Math.floor(Math.random() * allEpisodes.length + 1);

      do {
        randIndex = Math.floor(Math.random() * allEpisodes.length + 1);
      } while (musicIndex == randIndex);
      musicIndex = randIndex;
      loadMusic(musicIndex);
      playMusic();
      playingSong();
      break;
  }
});

moreMusicBtn.addEventListener("click", () => {
  musicList.classList.toggle("show");
});
closemoreMusic.addEventListener("click", () => {
  moreMusicBtn.click();
});

const ulTag = wrapper.querySelector("ul");
for (let i = 0; i < allEpisodes.length; i++) {
  let liTag = `<li li-index="${i + 1}">
                    <div class="row">
                        <span>${allEpisodes[i].name}</span>
                        <p>${allEpisodes[i].artist}</p>
                    </div>
                    <span id="${allEpisodes[i].src}" class="audio-duration">
                        3:40
                    </span>
                    <audio class="${allEpisodes[i].src}" src="music/${
    allEpisodes[i].src
  }.mp3"></audio>
                </li>`;

  ulTag.insertAdjacentHTML("beforeend", liTag);

  let liAudioDurationTag = ulTag.querySelector(`#${allEpisodes[i].src}`);
  let liAudioTag = ulTag.querySelector(`.${allEpisodes[i].src}`);

  liAudioTag.addEventListener("loadeddata", () => {
    let duration = liAudioTag.duration;
    let totalMin = Math.floor(duration / 60);
    let totalSec = Math.floor(duration % 60);

    if (totalSec < 10) {
      totalSec = `0${totalSec}`;
    }

    liAudioDurationTag.innerText = `${totalMin}:${totalSec}`;
    liAudioDurationTag.setAttribute("t-duration", `${totalMin}:${totalSec}`);
  });
}

function playingSong() {
  const allLiTag = ulTag.querySelectorAll("li");

  for (let j = 0; j < allLiTag.length; j++) {
    let audioTag = allLiTag[j].querySelector(".audio-duration");

    if (allLiTag[j].classList.contains("playing")) {
      allLiTag[j].classList.remove("playing");
      let adDuration = audioTag.getAttribute("t-duration");
      audioTag.innerText = adDuration;
    }

    if (allLiTag[j].getAttribute("li-index") == musicIndex) {
      allLiTag[j].classList.add("playing");
      audioTag.innerText = "Playing";
    }

    allLiTag[j].setAttribute("onclick", "clicked(this)");
  }
}

function clicked(element) {
  let getLiIndex = element.getAttribute("li-index");
  musicIndex = getLiIndex;

  loadMusic(musicIndex);
  playMusic();
  playingSong();
}
