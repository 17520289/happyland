function onSound() {
  var audioElement = document.createElement("audio");
  audioElement.setAttribute("src", "../../../public/sound/soundtrack.wav");
  audioElement.play();
}

function objectAnswers(correct, inCorrect) {
  return {
    correct: correct,
    inCorrect: inCorrect,
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
