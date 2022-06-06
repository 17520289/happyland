const questions = [
  {
    question: "1-7",
    picture: "./img/aerial.png",
    choose1: "window",
    choose2: "aerial",
    sound1: "./sound/window.wav",
    sound2: "./sound/aerial.wav",
    ans: "2",
  },
  {
    question: "2-7",
    picture: "./img/roof.png",
    choose1: "roof",
    choose2: "stairs",
    sound1: "./sound/roof.wav",
    sound2: "./sound/stairs.wav",
    ans: "1",
  },
  {
    question: "3-7",
    picture: "./img/window.png",
    choose1: "window",
    choose2: "door",
    sound1: "./sound/window.wav",
    sound2: "./sound/door.wav",
    ans: "1",
  },
  {
    question: "4-7",
    picture: "./img/pillow.png",
    choose1: "wall",
    choose2: "pillow",
    sound1: "./sound/wall.wav",
    sound2: "./sound/pillow.wav",
    ans: "2",
  },
  {
    question: "5-7",
    picture: "./img/door.png",
    choose1: "roof",
    choose2: "door",
    sound1: "./sound/roof.wav",
    sound2: "./sound/door.wav",
    ans: "2",
  },
  {
    question: "6-7",
    picture: "./img/wall.png",
    choose1: "aerial",
    choose2: "wall",
    sound1: "./sound/aerial.wav",
    sound2: "./sound/wall.wav",
    ans: "2",
  },
  {
    question: "7-7",
    picture: "./img/stairs.png",
    choose1: "window",
    choose2: "stairs",
    sound1: "./sound/window.wav",
    sound2: "./sound/stairs.wav",
    ans: "2",
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
  document.getElementById("exercise").innerHTML +=
    "<div class='container' id='yeah' style='position: absolute; z-index: 4;top: 15px; left: 20px; margin: 0px 50px 0px 50px;'><img src='../public/img/yeah3.gif' style='width:100%'/></div>";
  setTimeout('document.getElementById("yeah").remove()', 900);
}

function checkAnswer(clicked_id) {
  var user_ans = document.getElementById(clicked_id).value;
  if (user_ans === questions[iQuestion].ans) {
    playWord(clicked_id + "_sound");
    document.getElementById(clicked_id + "_ans_sound").hidden = false;
    document.getElementById(clicked_id + "_img").hidden = false;
    clicked_id === "buttonChoose1"
      ? (document.getElementById(clicked_id + "_img").innerHTML =
          "<img src='../public/img/tick.png' style='height: 70px;margin: 15px;position: absolute;right: 10%;top: 30%;z-index:5' id='tick'/>")
      : (document.getElementById(clicked_id + "_img").innerHTML =
          "<img src='../public/img/tick.png' style='height: 70px;margin: 15px;position: absolute;left: 10%;top: 30%;z-index:5' id='tick'/>");
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
    clicked_id === "buttonChoose1"
      ? (document.getElementById(clicked_id + "_img").innerHTML =
          "<img src='../public/img/wrong.png' style='height: 70px;margin: 15px;position: absolute;right: 10%;top: 30%;z-index:5' id='tick'/>")
      : (document.getElementById(clicked_id + "_img").innerHTML =
          "<img src='../public/img/wrong.png' style='height: 70px;margin: 15px;position: absolute;left: 10%;top: 30%;z-index:5' id='tick'/>");

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
