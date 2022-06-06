const questions = [
  {
    question: "1-7",
    picture: "./img/desk.png",
    choose1: "书本",
    choose2: "书桌",
    sound1: "./CN/sound/book.wav",
    sound2: "./CN/sound/desk.wav",
    ans: "2",
  },
  {
    question: "2-7",
    picture: "./img/chair.png",
    choose1: "椅子",
    choose2: "书包",
    sound1: "./CN/sound/chair.wav",
    sound2: "./CN/sound/bag.wav",
    ans: "1",
  },
  {
    question: "3-7",
    picture: "./img/bag.png",
    choose1: "书本",
    choose2: "书包",
    sound1: "./CN/sound/book.wav",
    sound2: "./CN/sound/bag.wav",
    ans: "2",
  },
  {
    question: "4-7",
    picture: "./img/glue.png",
    choose1: "剪刀",
    choose2: "糨糊",
    sound1: "./CN/sound/scissors.wav",
    sound2: "./CN/sound/glue.wav",
    ans: "2",
  },
  {
    question: "5-7",
    picture: "./img/book.png",
    choose1: "书本",
    choose2: "文具盒",
    sound1: "./CN/sound/book.wav",
    sound2: "./CN/sound/pencil case.wav",
    ans: "1",
  },
  {
    question: "6-7",
    picture: "./img/scissor.png",
    choose1: "文具盒",
    choose2: "剪刀",
    sound1: "./CN/sound/pencil case.wav",
    sound2: "./CN/sound/scissors.wav",
    ans: "2",
  },
  {
    question: "7-7",
    picture: "./img/pencil case.png",
    choose1: "文具盒",
    choose2: "书包",
    sound1: "./CN/sound/pencil case.wav",
    sound2: "./CN/sound/bag.wav",
    ans: "1",
  },
];


var unit ={
  "title" : "单元二：课室",
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
  document.getElementById("teacher").src = "../public/img/teacher_no.gif";
}
function playCorrect() {
  var audioElement = document.createElement("audio");
  audioElement.setAttribute("src", "../public/sound/correct.wav");
  audioElement.play();
  document.getElementById("teacher").src = "../public/img/teacher_yeah.gif";
}

function checkAnswer(clicked_id) {
  var user_ans = document.getElementById(clicked_id).value;
  if (user_ans === questions[iQuestion].ans) {
    playWord(clicked_id + "_sound");
    document.getElementById(clicked_id + "_ans_sound").hidden = false;
    document.getElementById(clicked_id + "_img").hidden = false;
    document.getElementById(clicked_id + "_img").innerHTML =
      "<img src='../public/img/tick.png' style='height: 100px; margin: 15px; position: absolute; right:-5%; top:10%' id='tick'/>";
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
      "<img src='../public/img/wrong.png' style='height: 100px; margin: 15px;position: absolute; right:-5%; top:10%' id='wrong'/>";
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
