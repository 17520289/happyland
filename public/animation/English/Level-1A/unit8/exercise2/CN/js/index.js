const questions = [
  {
    question: "1-6",
    picture: "./img/garlic.jpg",
    choose1: "蒜头",
    choose2: "玉米",
    sound1: "./CN/sound/garlic.wav",
    sound2: "./CN/sound/corn.wav",
    ans: "1",
  },
  {
    question: "2-6",
    picture: "./img/onion.jpg",
    choose1: "黄瓜",
    choose2: "洋葱",
    sound1: "./CN/sound/cucumber.wav",
    sound2: "./CN/sound/onion.wav",
    ans: "2",
  },
  {
    question: "3-6",
    picture: "./img/spring onion.jpg",
    choose1: "青葱",
    choose2: "菜心",
    sound1: "./CN/sound/spring onion.wav",
    sound2: "./CN/sound/mustard.wav",
    ans: "1",
  },
  {
    question: "4-6",
    picture: "./img/long bean.jpg",
    choose1: "芹菜",
    choose2: "长豆n",
    sound1: "./CN/sound/celery.wav",
    sound2: "./CN/sound/long bean.wav",
    ans: "2",
  },
  {
    question: "5-6",
    picture: "./img/cauliflower.jpg",
    choose1: "番薯",
    choose2: "花椰菜",
    sound1: "./CN/sound/sweet potato.wav",
    sound2: "./CN/sound/cauliflower.wav",
    ans: "2",
  },
  {
    question: "6-6",
    picture: "./img/radish.jpg",
    choose1: "白萝卜",
    choose2: "胡萝卜",
    sound1: "./CN/sound/radish.wav",
    sound2: "./CN/sound/carrot.wav",
    ans: "1",
  },
];


var unit ={
  "title" : "单元八：蔬菜",
  "description": "Choose the correct answers."
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
}

function playWrong() {
  document.getElementById("thinking").style.visibility = "hidden";
  var audioElement = document.createElement("audio");
  audioElement.setAttribute("src", "../public/sound/wrong.wav");
  audioElement.play();
  document.getElementById("exercise").innerHTML +=
    "<img src='../public/img/sad.gif' id='sad' />";
  if (document.body.contains(document.getElementById("yeah"))) {
    document.getElementById("yeah").remove();
  }
}
function playCorrect() {
  document.getElementById("thinking").style.visibility = "hidden";
  var audioElement = document.createElement("audio");
  audioElement.setAttribute("src", "../public/sound/correct.wav");
  audioElement.play();
  document.getElementById("exercise").innerHTML +=
    "<img src='../public/img/yeah.gif' id='yeah'/>";
  if (document.body.contains(document.getElementById("sad"))) {
    document.getElementById("sad").remove();
  }
}

function checkAnswer(clicked_id) {
  var user_ans = document.getElementById(clicked_id).value;
  if (user_ans === questions[iQuestion].ans) {
    playWord(clicked_id + "_sound");
    document.getElementById(clicked_id + "_ans_sound").hidden = false;
    document.getElementById(clicked_id + "_img").hidden = false;
    document.getElementById(clicked_id + "_img").innerHTML =
      "<img src='../public/img/tick.png' style='height: 100px; margin: 15px; position: absolute; right:20%; bottom:-70%; z-index:5' id='tick'/>";
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
      "<img src='../public/img/wrong.png' style='height: 100px; margin: 15px; position: absolute; right:20%; bottom:-70%; z-index:5' id='wrong'/>";
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
  document.getElementById("thinking").style.visibility = "visible";
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
  if (document.body.contains(document.getElementById("sad"))) {
    document.getElementById("sad").remove();
  }
  if (document.body.contains(document.getElementById("yeah"))) {
    document.getElementById("yeah").remove();
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