const questions = [
  {
    question: "1-7",
    picture: "./img/patrolcar.jpg",
    choose1: "patrol car",
    choose2: "fire engine",
    sound1: "./sound/patrolcar.wav",
    sound2: "./sound/fireengine.wav",
    ans: "1",
  },
  {
    question: "2-7",
    picture: "./img/ambulance.png",
    choose1: "bullock cart",
    choose2: "ambulance",
    sound1: "./sound/bullockcart.wav",
    sound2: "./sound/ambulance.wav",
    ans: "2",
  },
  {
    question: "3-7",
    picture: "./img/train.png",
    choose1: "train",
    choose2: "fire engine",
    sound1: "./sound/train.wav",
    sound2: "./sound/fireengine.wav",
    ans: "1",
  },
  {
    question: "4-7",
    picture: "./img/lightrailtransit.jpg",
    choose1: "oil tanker",
    choose2: "light rail transit",
    sound1: "./sound/oiltanker.wav",
    sound2: "./sound/lightrailtransit.wav",
    ans: "2",
  },
  {
    question: "5-7",
    picture: "./img/fireengine.png",
    choose1: "fire engine",
    choose2: "ambulance",
    sound1: "./sound/fireengine.wav",
    sound2: "./sound/ambulance.wav",
    ans: "1",
  },
  {
    question: "6-7",
    picture: "./img/oiltanker.png",
    choose1: "monorail",
    choose2: "oil tanker",
    sound1: "./sound/monorail.wav",
    sound2: "./sound/oiltanker.wav",
    ans: "2",
  },
  {
    question: "7-7",
    picture: "./img/monorail.jpg",
    choose1: "monorail",
    choose2: "train",
    sound1: "./sound/monorail.wav",
    sound2: "./sound/train.wav",
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
    "<div class='container' id='yeah' style='position: absolute; z-index: 4;top: 15px; left: 20px; margin: 0px 50px 0px 50px;'><img src='../public/img/yeah3.gif' style='width:100%'/></div>"
  );
  setTimeout('document.getElementById("yeah").remove()', 900);
}

function checkAnswer(clicked_id) {
  var user_ans = document.getElementById(clicked_id).value;
  if (user_ans === questions[iQuestion].ans) {
    playWord(clicked_id + "_sound");
    document.getElementById(clicked_id + "_ans_sound").hidden = false;
    document.getElementById(clicked_id + "_img").hidden = false;
    if (clicked_id === "buttonChoose1") {
      document.getElementById(clicked_id + "_img").innerHTML =
        "<img src='../public/img/tick.png' style='height: 100px;margin: 15px;position: absolute;right: 10%;top: 50%;z-index: 4;' id='tick'/>";
    } else {
      document.getElementById(clicked_id + "_img").innerHTML =
        "<img src='../public/img/tick.png' style='height: 100px;margin: 15px;position: absolute;right: 15%;top: 50%;z-index: 4;' id='tick'/>";
    }
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
    if (clicked_id === "buttonChoose1") {
      document.getElementById(clicked_id + "_img").innerHTML =
        "<img src='../public/img/wrong.png' style='height: 100px;margin: 15px;position: absolute;right: 10%;top: 50%;z-index: 4;' id='tick'/>";
    } else {
      document.getElementById(clicked_id + "_img").innerHTML =
        "<img src='../public/img/wrong.png' style='height: 100px;margin: 15px;position: absolute;right: 15%;top: 50%;z-index: 4;' id='tick'/>";
    }
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
