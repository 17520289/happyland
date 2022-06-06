const questions = [
  {
    question: "1-6",
    picture: "./img/rollerskates.jpg",
    choose1: "papan selaju",
    choose2: "kasut roda",
    sound1: "./BM/sound/papan selaju.wav",
    sound2: "./BM/sound/kasut roda.wav",
    ans: "2",
  },
  {
    question: "2-6",
    picture: "./img/top.png",
    choose1: "gasing",
    choose2: "tingting",
    sound1: "./BM/sound/gasing.wav",
    sound2: "./BM/sound/tingting.wav",
    ans: "1",
  },
  {
    question: "3-6",
    picture: "./img/congkak.jpg",
    choose1: "catur",
    choose2: "congkak",
    sound1: "./BM/sound/catur.wav",
    sound2: "./BM/sound/congkak.wav",
    ans: "2",
  },
  {
    question: "4-6",
    picture: "./img/skateboard.png",
    choose1: "papan selaju",
    choose2: "congkak",
    sound1: "./BM/sound/papan selaju.wav",
    sound2: "./BM/sound/congkak.wav",
    ans: "1",
  },
  {
    question: "5-6",
    picture: "./img/chess.png",
    choose1: "catur",
    choose2: "gasing",
    sound1: "./BM/sound/catur.wav",
    sound2: "./BM/sound/gasing.wav",
    ans: "1",
  },
  {
    question: "6-6",
    picture: "./img/hopscotch.jpg",
    choose1: "tingting",
    choose2: "gasing",
    sound1: "./BM/sound/tingting.wav",
    sound2: "./BM/sound/gasing.wav",
    ans: "1",
  },
];

var unit = {
  "title": "Unit 3: Permainan",
  "description": "Choose the correct answers"
}

 $("[lang]").each(function (index) {
    $(this).html(unit[$(this).attr("lang")]);
  });

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
  document.getElementById("exercise").innerHTML +=
    "<div class='container' id='yeah' style='position: absolute; z-index: 4;bottom:10%; left: 20%; margin: 0px 50px 0px 50px;'><img src='../public/img/u3-yeah.gif' style='width:100%'/></div>";
  setTimeout('document.getElementById("yeah").remove()', 900);
}

function checkAnswer(clicked_id) {
  var user_ans = document.getElementById(clicked_id).value;
  if (user_ans === questions[iQuestion].ans) {
    playWord(clicked_id + "_sound");
    document.getElementById(clicked_id + "_ans_sound").hidden = false;
    document.getElementById(clicked_id + "_img").hidden = false;
    document.getElementById(clicked_id + "_img").innerHTML =
      "<img src='../public/img/tick.png' style='height: 100px;margin: 15px;position: absolute;right: 26%;top: 75%; z-index: 4;' id='tick'/>";
    console.log("đáp án đúng");
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
      "<img src='../public/img/wrong.png' style='height: 100px;margin: 15px;position: absolute;right: 26%;top: 75%; z-index: 4;' id='wrong'/>";
    console.log("dap án sai");
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
