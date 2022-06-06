const questions = [
  {
    question: "1-7",
    picture: "./img/eat.jpg",
    choose1: "eat",
    choose2: "read",
    sound1: "./English/sound/eat.wav",
    sound2: "./English/sound/read.wav",
    ans: "1",
  },
  {
    question: "2-7",
    picture: "./img/drink.jpg",
    choose1: "cook",
    choose2: "drink",
    sound1: "./English/sound/cook.wav",
    sound2: "./English/sound/drink.wav",
    ans: "2",
  },
  {
    question: "3-7",
    picture: "./img/play.jpg",
    choose1: "play",
    choose2: "fly",
    sound1: "./English/sound/play.wav",
    sound2: "./English/sound/fly.wav",
    ans: "1",
  },
  {
    question: "4-7",
    picture: "./img/sleep.jpg",
    choose1: "sleep",
    choose2: "laugh",
    sound1: "./English/sound/sleep.wav",
    sound2: "./English/sound/laugh.wav",
    ans: "1",
  },
  {
    question: "5-7",
    picture: "./img/read.jpg",
    choose1: "read",
    choose2: "wash",
    sound1: "./English/sound/read.wav",
    sound2: "./English/sound/wash.wav",
    ans: "1",
  },
  {
    question: "6-7",
    picture: "./img/write.jpg",
    choose1: "wear",
    choose2: "write",
    sound1: "./English/sound/wear.wav",
    sound2: "./English/sound/write.wav",
    ans: "2",
  },
  {
    question: "7-7",
    picture: "./img/draw.jpg",
    choose1: "run",
    choose2: "draw",
    sound1: "./English/sound/run.wav",
    sound2: "./English/sound/draw.wav",
    ans: "2",
  },
];

var unit ={
  "title" : "Unit 8: Actions",
  "description": "Choose the correct answers."
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
  audioElement.setAttribute("src", "../public/sound/wrong.wav");
  audioElement.play();
  document.getElementById("dog").src = "./img/u8-sad.gif";
}
function playCorrect() {
  var audioElement = document.createElement("audio");
  audioElement.setAttribute("src", "../public/sound/correct.wav");
  audioElement.play();
  $("#exercise").append(
    "<div class='container' id='yeah' style='position: absolute; z-index: 4;bottom:0; left: 0;'><img src='../public/img/yeah3.gif' style='width: 100%'/></div>"
  );
  setTimeout('document.getElementById("yeah").remove()', 900);
  document.getElementById("dog").src = "./img/u8-yeah.gif";
}

function checkAnswer(clicked_id) {
  var user_ans = document.getElementById(clicked_id).value;
  if (user_ans === questions[iQuestion].ans) {
    playWord(clicked_id + "_sound");
    document.getElementById(clicked_id + "_ans_sound").hidden = false;
    document.getElementById(clicked_id + "_img").hidden = false;
    document.getElementById(clicked_id + "_img").innerHTML =
      "<img src='../public/img/tick.png' id='tick'/>";
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
      "<img src='../public/img/wrong.png'id='wrong'/>";
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
  document.getElementById("dog").src = "./img/u8-normal.gif";
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
