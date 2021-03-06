const questions = [
  {
    question: "1-6",
    picture: "./img/sweets.jpg",
    choose1: "gula-gula",
    choose2: "penyedut minuman",
    sound1: "./sound/gula-gula.wav",
    sound2: "./sound/penyedut minuman.wav",
    ans: "1",
  },
  {
    question: "2-6",
    picture: "./img/popcorn.png",
    choose1: "gula-gula",
    choose2: "bertih jagung",
    sound1: "./sound/gula-gula.wav",
    sound2: "./sound/bertih jagung.wav",
    ans: "2",
  },
  {
    question: "3-6",
    picture: "./img/camera.png",
    choose1: "kamera",
    choose2: "gula-gula",
    sound1: "./sound/kamera.wav",
    sound2: "./sound/gula-gula.wav",
    ans: "1",
  },
  {
    question: "4-6",
    picture: "./img/sandwich.jpg",
    choose1: "sandwic",
    choose2: "penyedut minuman",
    sound1: "./sound/sandwic.wav",
    sound2: "./sound/penyedut minuman.wav",
    ans: "1",
  },
  {
    question: "5-6",
    picture: "./img/videocamera.png",
    choose1: "kamera video",
    choose2: "bertih jagung",
    sound1: "./sound/kamera video.wav",
    sound2: "./sound/bertih jagung.wav",
    ans: "1",
  },
  {
    question: "6-6",
    picture: "./img/straw.png",
    choose1: "penyedut minuman",
    choose2: "kamera",
    sound1: "./sound/penyedut minuman.wav",
    sound2: "./sound/kamera.wav",
    ans: "1",
  },
];
var iQuestion = 0;
var idButton = "buttonChoose1";

getQuestion();
function playWord(audio_id) {
  var audioElement = document.getElementById(audio_id);
  if (audio_id === "buttonChoose1_sound") {
    audioElement.setAttribute("src", questions[iQuestion].sound1);
    audioElement.play();
  } else {
    audioElement.setAttribute("src", questions[iQuestion].sound2);
    audioElement.play();
  }
}

function playWrong() {
  var audioElement = document.createElement("audio");
  audioElement.setAttribute("src", "./sound/wrong.wav");
  audioElement.play();
}
function playCorrect() {
  var audioElement = document.createElement("audio");
  audioElement.setAttribute("src", "./sound/correct.wav");
  audioElement.play();
  $("#exercise").append(
    "<div class='container' id='yeah' style='position: absolute; z-index: 4;bottom:0; left: 0;'><img src='./img/u4-yeah.gif' style='height: 300px'/></div>"
  );
  setTimeout('document.getElementById("yeah").remove()', 900);
}

function checkAnswer(clicked_id) {
  var user_ans = document.getElementById(clicked_id).value;
  if (user_ans === questions[iQuestion].ans) {
    playWord(clicked_id + "_sound");
    document.getElementById(clicked_id + "_ans_sound").hidden = false;
    document.getElementById(clicked_id + "_img").hidden = false;
    document.getElementById(clicked_id + "_img").innerHTML =
      "<img src='../public/img/tick.png' style='height: 100px;margin: 15px;position: absolute;right: -25%;top: 25%;z-index: 4;' id='tick'/>";
    console.log("????p ??n ????ng");
    clicked_id === "buttonChoose1"
      ? (idButton = clicked_id.replace(/1/g, "2"))
      : (idButton = clicked_id.replace(/2/g, "1"));
    console.log(idButton);
    document.getElementById(clicked_id).disabled = "disabled";
    document.getElementById(idButton).disabled = "disabled";
    document.getElementById(idButton).style.opacity = "0.5";
    setTimeout(playCorrect, 700);
  } else {
    playWord(clicked_id + "_sound");
    document.getElementById(clicked_id + "_img").hidden = false;
    document.getElementById(clicked_id + "_img").innerHTML =
      "<img src='../public/img/wrong.png' style='height: 100px;margin: 15px;position: absolute;right: -25%;top: 25%;z-index: 4;' id='wrong'/>";
    console.log("dap ??n sai");
    setTimeout(playWrong, 500);
    clicked_id === "buttonChoose1"
      ? setTimeout(
          'document.getElementById("buttonChoose1_img").hidden = true;',
          500
        )
      : setTimeout(
          'document.getElementById("buttonChoose2_img").hidden = true;',
          500
        );
  }
}

function getQuestion() {
  document.getElementById("exercise").innerHTML +=
    "<div class='container' id='yeah'</div>";
  setTimeout('document.getElementById("yeah").remove()', 900);
  document.getElementById("image").src = questions[iQuestion].picture;
  document.getElementById("markboard").innerHTML =
    questions[iQuestion].question;
  document.getElementById("choose1").innerHTML = questions[iQuestion].choose1;
  document.getElementById("choose2").innerHTML = questions[iQuestion].choose2;
  if (iQuestion === 0) {
    document.getElementById("backButton").hidden = true;
  } else {
    document.getElementById("backButton").hidden = false;
  }
  if (iQuestion === questions.length - 1) {
    document.getElementById("nextButton").hidden = true;
  } else {
    document.getElementById("nextButton").hidden = false;
  }
}

function nextQuestion() {
  iQuestion = iQuestion + 1;
  document.getElementById("buttonChoose1_img").hidden = true;
  document.getElementById("buttonChoose2_img").hidden = true;
  document.getElementById("buttonChoose1").disabled = "";
  document.getElementById("buttonChoose2").disabled = "";
  document.getElementById("buttonChoose1_ans_sound").hidden = true;
  document.getElementById("buttonChoose2_ans_sound").hidden = true;
  document.getElementById("buttonChoose1").style.opacity = "";
  document.getElementById("buttonChoose2").style.opacity = "";
  getQuestion();
}

function backQuestion() {
  iQuestion = iQuestion - 1;
  document.getElementById("buttonChoose1_img").hidden = true;
  document.getElementById("buttonChoose2_img").hidden = true;
  document.getElementById("buttonChoose1").disabled = "";
  document.getElementById("buttonChoose2").disabled = "";
  document.getElementById("buttonChoose1_ans_sound").hidden = true;
  document.getElementById("buttonChoose2_ans_sound").hidden = true;
  document.getElementById("buttonChoose1").style.opacity = "";
  document.getElementById("buttonChoose2").style.opacity = "";
  getQuestion();
}
