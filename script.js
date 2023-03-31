const app = document.getElementById('app');

const vidContainer = document.createElement('div');
vidContainer.classList.add('vid-container');

const video = document.createElement('video');
video.autoplay = true;
video.muted = true;
video.loop = true;
video.src = './video/beach.mp4';

const playerContainer = document.createElement('div');
playerContainer.classList.add('player-container');

const soundPicker = document.createElement('div');
soundPicker.classList.add('sound-picker');

const rainSound = document.createElement('button');
rainSound.innerHTML = 'Rain Sound';
rainSound.addEventListener('click', () => {
  video.src = './video/rain.mp4';
  audio.src = './sounds/rain.mp3';
});

const beachSound = document.createElement('button');
beachSound.innerHTML = 'Beach Sound';
beachSound.addEventListener('click', () => {
  video.src = './video/beach.mp4';
  audio.src = './sounds/beach.mp3';
});

const audio = document.createElement('audio');
audio.autoplay = true;
audio.loop = true;
audio.src = './sounds/beach.mp3';

const timeSelect = document.createElement('div');
timeSelect.setAttribute('id', 'time-select');

const smallMins = document.createElement('button');
smallMins.innerHTML = '2 Mins';
smallMins.setAttribute('id', 'small-mins');
smallMins.addEventListener('click', () => {
  updateTime(120);
});

const mediumMins = document.createElement('button');
mediumMins.innerHTML = '5 Mins';
mediumMins.setAttribute('id', 'medium-mins');
mediumMins.addEventListener('click', () => {
  updateTime(300);
});

const longMins = document.createElement('button');
longMins.innerHTML = '10 Mins';
longMins.setAttribute('id', 'long-mins');
longMins.addEventListener('click', () => {
  updateTime(600);
});

const timeDisplay = document.createElement('div');
timeDisplay.classList.add('time-display');
timeDisplay.innerHTML = '10:00';

const playButton = document.createElement('button');
playButton.classList.add('play');
playButton.innerHTML = '<i class="fas fa-play"></i>';
playButton.addEventListener('click', () => {
  const isPlaying = app.classList.contains('playing');

  if (isPlaying) {
    pause();
  } else {
    play();
  }
});

let timeLeft = 0;
let timerId;

function play() {
  app.classList.add('playing');
  timerId = setInterval(() => {
    timeLeft--;
    updateTimeDisplay();
    if (timeLeft === 0) {
      clearInterval(timerId);
      pause();
    }
  }, 1000);
}

function pause() {
  app.classList.remove('playing');
  clearInterval(timerId);
}

function updateTime(totalSeconds) {
  timeLeft = totalSeconds;
  updateTimeDisplay();
}

function updateTimeDisplay() {
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  timeDisplay.innerHTML = `${minutes}:${String(seconds).padStart(2, '0')}`;
}

soundPicker.appendChild(rainSound);
soundPicker.appendChild(beachSound);

timeSelect.appendChild(smallMins);
timeSelect.appendChild(mediumMins);
timeSelect.appendChild(longMins);

playerContainer.appendChild(soundPicker);
playerContainer.appendChild(audio);

vidContainer.appendChild(video);

app.appendChild(vidContainer);
app.appendChild(playerContainer);
app.appendChild(timeSelect);
app.appendChild(timeDisplay);
app.appendChild(playButton);
