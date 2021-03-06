const questions = [
  {
    question: "1-7",
    word: "keledek",
    choose1: "./img/sweet potato.jpg",
    choose2: "./img/onion.jpg",
    sound1: "./sound/keledek.wav",
    sound2: "./sound/bawang besar.wav",
    ans: "1",
  },
  {
    question: "2-7",
    word: "jagung",
    choose1: "./img/cucumber.jpg",
    choose2: "./img/corn.jpg",
    sound1: "./sound/timun.wav",
    sound2: "./sound/jagung.wav",
    ans: "2",
  },
  {
    question: "3-7",
    word: "cendawan",
    choose1: "./img/brinjal.jpg",
    choose2: "./img/mushroom.jpg",
    sound1: "./sound/terung.wav",
    sound2: "./sound/cendawan.wav",
    ans: "2",
  },
  {
    question: "4-7",
    word: "tomato",
    choose1: "./img/tomato.jpg",
    choose2: "./img/onion.jpg",
    sound1: "./sound/tomato.wav",
    sound2: "./sound/bawang besar.wav",
    ans: "1",
  },
  {
    question: "5-7",
    word: "kentang",
    choose1: "./img/potato.jpg",
    choose2: "./img/spring onion.jpg",
    sound1: "./sound/kentang.wav",
    sound2: "./sound/daun bawang.wav",
    ans: "1",
  },
  {
    question: "6-7",
    word: "peria",
    choose1: "./img/okra.jpg",
    choose2: "./img/bitter gourd.jpg",
    sound1: "./sound/bendi.wav",
    sound2: "./sound/peria.wav",
    ans: "2",
  },
  {
    question: "7-7",
    word: "lobak merah",
    choose1: "./img/carrot.jpg",
    choose2: "./img/celery.jpg",
    sound1: "./sound/lobak merah.wav",
    sound2: "./sound/saderi.wav",
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
  if (audio_id === "question_sound") {
    var word_sound = "./sound/" + questions[iQuestion].word + ".wav";
    audioElement.setAttribute("src", word_sound);
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
    "<div class='container' id='yeah' style='position: absolute; top: 15px; left: 20px; margin: 0px 50px 0px 50px;'><img src='../public/img/yeah3.gif' style='height: 600px'/></div>";
  setTimeout('document.getElementById("yeah").remove()', 900);
}

function checkAnswer(clicked_id) {
  var user_ans = document.getElementById(clicked_id).value;
  if (user_ans === questions[iQuestion].ans) {
    playWord(clicked_id + "_sound");
    document.getElementById(clicked_id + "_ans_sound").hidden = false;
    document.getElementById(clicked_id + "_img").hidden = false;
    $("#image-thinking").attr("src", "../public/img/yeah.gif");
    $('#'+clicked_id + "_img").append("<img src='../public/img/tick.png' style='height: 40px; margin-left: -55px;' id='tick'/>");
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
    $("#image-thinking").attr("src", "../public/img/sad.gif");
    $('#'+clicked_id + "_img").append("<img src='../public/img/wrong.png' style='height: 40px; margin-left: -55px;' id='wrong'/>");
    console.log("dap ??n sai");
    setTimeout('$("#wrong").remove()', 500);

  }
}

function getQuestion() {
  $("#tick").remove();
  $("#wrong").remove();
  $("#image-thinking").attr("src", "../public/img/thinking.gif");
  document.getElementById("image").innerHTML = questions[iQuestion].word;
  document.getElementById("markboard").innerHTML =
    questions[iQuestion].question;
  document.getElementById("choose1").src = questions[iQuestion].choose1;
  document.getElementById("choose2").src = questions[iQuestion].choose2;
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
  document.getElementById("buttonChoose1").disabled = "";
  document.getElementById("buttonChoose2").disabled = "";
  document.getElementById("buttonChoose1_ans_sound").hidden = true;
  document.getElementById("buttonChoose2_ans_sound").hidden = true;
  document.getElementById("buttonChoose1").style.opacity = "";
  document.getElementById("buttonChoose2").style.opacity = "";
  getQuestion();
}
