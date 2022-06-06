const questions = [
  {
    question: "1-7",
    picture: "./img/noticeboard.png",
    choose1: "waste-paper basket",
    choose2: "noticeboard",
    sound1: "./English/sound/wastepaperbasket.wav",
    sound2: "./English/sound/noticeboard.wav",
    ans: "2",
  },
  {
    question: "2-7",
    picture: "./img/whieboardmarker.png",
    choose1: "whiteboard marker",
    choose2: "whiteboard",
    sound1: "./English/sound/whiteboardmarker.wav",
    sound2: "./English/sound/whiteboard.wav",
    ans: "1",
  },
  {
    question: "3-7",
    picture: "./img/1clock.png",
    choose1: "broom",
    choose2: "clock",
    sound1: "./English/sound/broom.wav",
    sound2: "./English/sound/clock.wav",
    ans: "2",
  },
  {
    question: "4-7",
    picture: "./img/waste-paperbasket.png",
    choose1: "waste-paper basket",
    choose2: "notice board",
    sound1: "./English/sound/wastepaperbasket.wav",
    sound2: "./English/sound/noticeboard.wav",
    ans: "1",
  },
  {
    question: "5-7",
    picture: "./img/broom.png",
    choose1: "broom",
    choose2: "drawers",
    sound1: "./English/sound/broom.wav",
    sound2: "./English/sound/drawer.wav",
    ans: "1",
  },
  {
    question: "6-7",
    picture: "./img/whiteboard.png",
    choose1: "whiteboard",
    choose2: "waste-paper basket",
    sound1: "./English/sound/whiteboard.wav",
    sound2: "./English/sound/wastepaperbasket.wav",
    ans: "1",
  },
  {
    question: "7-7",
    picture: "./img/drawer.png",
    choose1: "whiteboard",
    choose2: "drawers",
    sound1: "./English/sound/whiteboard.wav",
    sound2: "./English/sound/drawer.wav",
    ans: "2",
  },
];

var unit ={
  "title" : "Unit 2 : Classroom",
  "description": "Choose the correct answers."
}

$("[lang]").each(function (index) {
  $(this).html(unit[$(this).attr("lang")]);
});

var iQuestion = 0;
var idButton = "buttonChoose1";
var audioWordElement;
getQuestion();
function playWord(audio_id) {
  audioWordElement = document.getElementById(audio_id);
  if (audio_id === "buttonChoose1_sound") {
    audioWordElement.setAttribute("src", questions[iQuestion].sound1);
    audioWordElement.play();
  } else {
    audioWordElement.setAttribute("src", questions[iQuestion].sound2);
    audioWordElement.play();
  }
}

function playWrong() {
  var audioElement = document.createElement("audio");
  audioElement.setAttribute("src", "../public/sound/wrong.wav");
  audioElement.play();
  document.getElementById("teacher").src = "../public/img/teacher_no.png";
}
function playCorrect() {
  var audioElement = document.createElement("audio");
  audioElement.setAttribute("src", "../public/sound/correct.wav");
  audioElement.play();
  document.getElementById("teacher").src = "../public/img/teacher_yeah.png";
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

    audioWordElement.addEventListener("ended", function () {
      audioWordElement.currentTime = 0;
      setTimeout(playCorrect, 700);
      console.log("ended");
    });
  } else {
    playWord(clicked_id + "_sound");
    document.getElementById(clicked_id + "_img").hidden = false;
    document.getElementById(clicked_id + "_img").innerHTML =
      "<img src='../public/img/wrong.png' id='wrong''/>";
    console.log("dap án sai");
    audioWordElement.addEventListener("ended", function () {
      audioWordElement.currentTime = 0;
      setTimeout(playWrong, 500);
      console.log("ended");
    });
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
  document.getElementById("teacher").src = "../public/img/teacher.gif";
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
