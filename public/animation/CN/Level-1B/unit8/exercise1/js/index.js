const questions = [
  {
    question: "1-7",
    picture: "./img/eat.jpg",
    choose1: "吃",
    choose2: "读",
    sound1: "./sound/eat.wav",
    sound2: "./sound/read.wav",
    ans: "1",
  },
  {
    question: "2-7",
    picture: "./img/drink.jpg",
    choose1: "煮",
    choose2: "渴",
    sound1: "./sound/cook.wav",
    sound2: "./sound/drink.wav",
    ans: "2",
  },
  {
    question: "3-7",
    picture: "./img/play.jpg",
    choose1: "玩",
    choose2: "飞",
    sound1: "./sound/play.wav",
    sound2: "./sound/fly.wav",
    ans: "1",
  },
  {
    question: "4-7",
    picture: "./img/sleep.jpg",
    choose1: "睡",
    choose2: "笑",
    sound1: "./sound/sleep.wav",
    sound2: "./sound/laugh.wav",
    ans: "1",
  },
  {
    question: "5-7",
    picture: "./img/read.jpg",
    choose1: "读",
    choose2: "洗",
    sound1: "./sound/read.wav",
    sound2: "./sound/wash.wav",
    ans: "1",
  },
  {
    question: "6-7",
    picture: "./img/write.jpg",
    choose1: "穿",
    choose2: "写",
    sound1: "./sound/wear.wav",
    sound2: "./sound/write.wav",
    ans: "2",
  },
  {
    question: "7-7",
    picture: "./img/draw.jpg",
    choose1: "跑",
    choose2: "画",
    sound1: "./sound/run.wav",
    sound2: "./sound/draw.wav",
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
  document.getElementById("dog").src = "./img/u8-sad.gif";
}
function playCorrect() {
  var audioElement = document.createElement("audio");
  audioElement.setAttribute("src", "./sound/correct.wav");
  audioElement.play();
  $("#exercise").append(
    "<div class='container' id='yeah' style='position: absolute; z-index: 4;bottom:0; left: 0;'><img src='../public/img/yeah3.gif' style='height: 300px'/></div>"
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
      "<img src='../public/img/tick.png' style='height: 100px;margin: 15px;position: absolute;right: 0%;top: 25%;z-index: 4;' id='tick'/>";
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
      "<img src='../public/img/wrong.png' style='height: 100px;margin: 15px;position: absolute;right: 0%;top: 25%;z-index: 4;' id='wrong'/>";
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
