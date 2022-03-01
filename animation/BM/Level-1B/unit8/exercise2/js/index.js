const questions = [
  {
    question: "1-7",
    picture: "./img/run.jpg",
    choose1: "lari",
    choose2: "baca",
    sound1: "./sound/lari.wav",
    sound2: "./sound/baca.wav",
    ans: "1",
  },
  {
    question: "2-7",
    picture: "./img/walk.jpg",
    choose1: "terbang",
    choose2: "jalan",
    sound1: "./sound/terbang.wav",
    sound2: "./sound/jalan.wav",
    ans: "2",
  },
  {
    question: "3-7",
    picture: "./img/sit.jpg",
    choose1: "duduk",
    choose2: "lompat",
    sound1: "./sound/duduk.wav",
    sound2: "./sound/lompat.wav",
    ans: "1",
  },
  {
    question: "4-7",
    picture: "./img/stand.jpg",
    choose1: "pakai",
    choose2: "berdiri",
    sound1: "./sound/pakai.wav",
    sound2: "./sound/berdiri.wav",
    ans: "2",
  },
  {
    question: "5-7",
    picture: "./img/jump.jpg",
    choose1: "lari",
    choose2: "lompat",
    sound1: "./sound/lari.wav",
    sound2: "./sound/lompat.wav",
    ans: "2",
  },
  {
    question: "6-7",
    picture: "./img/wear.jpg",
    choose1: "pakai",
    choose2: "lari",
    sound1: "./sound/pakai.wav",
    sound2: "./sound/lari.wav",
    ans: "1",
  },
  {
    question: "7-7",
    picture: "./img/fly.jpg",
    choose1: "jalan",
    choose2: "terbang",
    sound1: "./sound/jalan.wav",
    sound2: "./sound/terbang.wav",
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
  document.getElementById("dog1").src = "./img/u8-sad.gif";
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
  document.getElementById("dog1").src = "./img/u8-yeah.gif";
}

function checkAnswer(clicked_id) {
  var user_ans = document.getElementById(clicked_id).value;
  if (user_ans === questions[iQuestion].ans) {
    playWord(clicked_id + "_sound");
    document.getElementById(clicked_id + "_ans_sound").hidden = false;
    document.getElementById(clicked_id + "_img").hidden = false;
    document.getElementById(clicked_id + "_img").innerHTML =
      "<img src='../public/img/tick.png' style='height: 100px;margin: 15px;position: absolute;right: 28%;top: 90%;z-index: 4;' id='tick'/>";
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
      "<img src='../public/img/wrong.png' style='height: 100px;margin: 15px;position: absolute;right: 28%;top: 90%;z-index: 4;' id='wrong'/>";
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
  document.getElementById("bgChoose1").src = questions[iQuestion].bgChoose1;
  document.getElementById("bgChoose2").src = questions[iQuestion].bgChoose2;
  document.getElementById("dog").src = "./img/u8-normal.gif";
  document.getElementById("dog1").src = "./img/u8-normal.gif";
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
