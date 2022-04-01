var audioElement = document.getElementById("audioSoundTrack");

function onSound(xMute, mute) {
  audioElement.volume = 0.3;
  if (audioElement.paused) {
    audioElement.play();
    document.getElementById("imgSoundTrack").src = xMute;
  } else {
    audioElement.pause();
    document.getElementById("imgSoundTrack").src = mute;
  }
}

function objectAnswers(correct, totalAnswer) {
  return {
    correct: correct,
    totalAnswer: totalAnswer,
  };
}

function PlaySound(soundObj) {
  var thisSound = document.getElementById(soundObj);
  thisSound.play();
}

function StopSound(soundObj) {
  var thisSound = document.getElementById(soundObj);
  thisSound.pause();
  thisSound.currentTime = 0;
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
