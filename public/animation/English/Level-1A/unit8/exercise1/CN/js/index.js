const questions = [
  {
    question: "1-7",
    word: "番薯",
    choose1: "./img/sweet potato.jpg",
    choose2: "./img/onion.jpg",
    sound1: "./CN/sound/sweet potato.wav",
    sound2: "./CN/sound/onion.wav",
    soundAns: "./CN/sound/sweet potato.wav",
    ans: "1",
  },
  {
    question: "2-7",
    word: "玉米",
    choose1: "./img/cucumber.jpg",
    choose2: "./img/corn.jpg",
    sound1: "./CN/sound/cucumber.wav",
    sound2: "./CN/sound/corn.wav",
    soundAns: "./CN/sound/corn.wav",
    ans: "2",
  },
  {
    question: "3-7",
    word: "蘑菇",
    choose1: "./img/brinjal.jpg",
    choose2: "./img/mushroom.jpg",
    sound1: "./CN/sound/brinjal.wav",
    sound2: "./CN/sound/mushroon.wav",
    soundAns: "./.zCN/sound/mushroon.wav",
    ans: "2",
  },
  {
    question: "4-7",
    word: "番茄",
    choose1: "./img/tomato.jpg",
    choose2: "./img/onion.jpg",
    sound1: "./sound/tomato.wav",
    sound2: "./sound/onion.wav",
    soundAns: "./CN/sound/tomato.wav",
    ans: "1",
  },
  {
    question: "5-7",
    word: "马铃薯",
    choose1: "./img/potato.jpg",
    choose2: "./img/spring onion.jpg",
    sound1: "./CN/sound/potato.wav",
    sound2: "./CN/sound/spring onion.wav",
    soundAns: "./CN/sound/potato.wav",
    ans: "1",
  },
  {
    question: "6-7",
    word: "苦瓜",
    choose1: "./img/okra.jpg",
    choose2: "./img/bitter gourd.jpg",
    sound1: "./CN/sound/okra.wav",
    sound2: "./CN/sound/bitter gourd.wav",
    soundAns: "./CN/sound/bitter gourd.wav",
    ans: "2",
  },
  {
    question: "7-7",
    word: "胡萝卜",
    choose1: "./img/carrot.jpg",
    choose2: "./img/celery.jpg",
    sound1: "./CN/sound/carrot.wav",
    sound2: "./CN/sound/celery.wav",
    soundAns: "./CN/sound/carrot.wav",
    ans: "1",
  },
];

var unit ={
  "title" : "单元八：蔬菜",
  "decription": "Choose the correct answers."
}

$(function() {
  $("[lang]").each(function (index) {
    $(this).html(unit[$(this).attr("lang")]);
  });
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
  if (audio_id === "question_sound") {
    audioElement.setAttribute("src", questions[iQuestion].soundAns);
    audioElement.play();
  }
}

function playWrong() {
  var audioElement = document.createElement("audio");
  audioElement.setAttribute("src", "../public/sound/wrong.wav");
  audioElement.play();
}
function playCorrect() {
  var audioElement = document.createElement("audio");
  audioElement.setAttribute("src", "../public/sound/correct.wav");
  audioElement.play();
  document.getElementById("exercise").innerHTML +=
    "<div class='container' id='yeah' style='position: absolute; top: 15px; left: 20px; margin: 0px 50px 0px 50px;'><img src='../public/img/yeah3.gif' style='width:100%'/></div>";
  setTimeout('document.getElementById("yeah").remove()', 900);
}

function checkAnswer(clicked_id) {
  var user_ans = document.getElementById(clicked_id).value;
  if (user_ans === questions[iQuestion].ans) {
    playWord(clicked_id + "_sound");
    document.getElementById(clicked_id + "_ans_sound").hidden = false;
    document.getElementById(clicked_id + "_img").hidden = false;
    $("#image-thinking").attr("src", "../public/img/yeah.gif");
    $("#" + clicked_id + "_img").append(
      "<img src='../public/img/tick.png' style='height: 40px; margin-left: -55px;' id='tick'/>"
    );
    console.log("đáp án đúng");
    clicked_id === "buttonChoose1"
      ? (idButton = clicked_id.replace(/1/g, "2"))
      : (idButton = clicked_id.replace(/2/g, "1"));
    console.log(idButton);
    document.getElementById(clicked_id).disabled = "disabled";
    document.getElementById(idButton).disabled = "disabled";
    document.getElementById(idButton).style.opacity = "0.5";
    setTimeout(playCorrect, 1300);
  } else {
    playWord(clicked_id + "_sound");
    document.getElementById(clicked_id + "_img").hidden = false;
    $("#image-thinking").attr("src", "../public/img/sad.gif");
    $("#" + clicked_id + "_img").append(
      "<img src='../public/img/wrong.png' style='height: 40px; margin-left: -55px;' id='wrong'/>"
    );
    setTimeout('$("#wrong").remove()', 500);
    console.log("dap án sai");
    setTimeout(playWrong, 1000);
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
