const questions = [
  {
    question: "./CN/img/2.png",
    picture: "./CN/img/head.png",
    choose1: "头",
    choose2: "肩膀",
    sound1: "./CN/sound/head.wav",
    sound2: "./CN/sound/shoulder.wav",
    ans: "1",
    ansText: "头",
  },
  {
    question: "./CN/img/3.png",
    picture: "./CN/img/neck.png",
    choose1: "膝盖",
    choose2: "颈",
    sound1: "./CN/sound/knee.wav",
    sound2: "./CN/sound/neck.wav",
    ans: "2",
    ansText: "颈",
  },
  {
    question: "./CN/img/4.png",
    picture: "./CN/img/shoulder.png",
    choose1: "腰",
    choose2: "肩膀",
    sound1: "./CN/sound/waist.wav",
    sound2: "./CN/sound/shoulder.wav",
    ans: "2",
    ansText: "肩膀",
  },
  {
    question: "./CN/img/5.png",
    picture: "./CN/img/chest.png",
    choose1: "胸",
    choose2: "肘",
    sound1: "./CN/sound/chest.wav",
    sound2: "./CN/sound/elbow.wav",
    ans: "1",
    ansText: "胸",
  },
  {
    question: "./CN/img/6.png",
    picture: "./CN/img/arm.png",
    choose1: "手腕",
    choose2: "手臂",
    sound1: "./CN/sound/wrist.wav",
    sound2: "./CN/sound/arm.wav",
    ans: "2",
    ansText: "手臂",
  },
  {
    question: "./CN/img/7.png",
    picture: "./CN/img/stomach.png",
    choose1: "肚子",
    choose2: "大腿",
    sound1: "./CN/sound/stomach.wav",
    sound2: "./CN/sound/thigh.wav",
    ans: "1",
    ansText: "肚子",
  },
  {
    question: "./CN/img/8.png",
    picture: "./CN/img/hand.png",
    choose1: "手",
    choose2: "颈",
    sound1: "./CN/sound/hand.wav",
    sound2: "./CN/sound/neck.wav",
    ans: "1",
    ansText: "手",
  },
  {
    question: "./CN/img/9.png",
    picture: "./CN/img/leg.png",
    choose1: "脚",
    choose2: "胸",
    sound1: "./CN/sound/leg.wav",
    sound2: "./CN/sound/chest.wav",
    ans: "1",
    ansText: "脚",
  },
];
var unit = {
  "title": "单元一：身体各部分",
  "unit1-title": "单元一：身体各部分",
  "unit1-decription": "Choose the correct answers.",
  "exersice1": "練習一",
  "exersice2": "練習二",
  "exersice3": "練習三"
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
  var audioElement = document.createElement("audio");
  audioElement.setAttribute("src", "../public/sound/wrong.wav");
  audioElement.volume = 0.5;
  audioElement.play();
}
function playCorrect() {
  var audioElement = document.createElement("audio");
  audioElement.setAttribute("src", "../public/sound/correct.wav");
  audioElement.volume = 0.5;
  audioElement.play();
  document.getElementById("exercise").innerHTML +=
    "<div class='container' id='yeah' style='position: absolute; top: 0; left: 5%; margin: 0px 50px 0px 50px;'><img src='../public/img/yeah3.gif' style='width:100%'/></div>";
  setTimeout('document.getElementById("yeah").remove()', 1000);
}

function checkAnswer(clicked_id) {
  var user_ans = document.getElementById(clicked_id).value;
  if (user_ans === questions[iQuestion].ans) {
    playWord(clicked_id + "_sound");
    document.getElementById(clicked_id + "_ans_sound").hidden = false;
    document.getElementById(clicked_id + "_img").hidden = false;
    document.getElementById("markboard").src = questions[iQuestion].question;
    document.getElementById(clicked_id + "_img").innerHTML =
      "<img src='../public/img/tick.png' style='height: 50px; margin: 15px; id='tick'/>";
    console.log("đáp án đúng");
    clicked_id === "buttonChoose1"
      ? (idButton = clicked_id.replace(/1/g, "2"))
      : (idButton = clicked_id.replace(/2/g, "1"));
    console.log(idButton);
    document.getElementById(clicked_id).disabled = "disabled";
    document.getElementById(idButton).disabled = "disabled";
    document.getElementById(idButton).style.opacity = "0.5";
    document.getElementById("buttonChoose1").hidden = true;
    document.getElementById("buttonChoose2").hidden = true;
    document.getElementById("ansText").innerHTML = questions[iQuestion].ansText;
    setTimeout(playCorrect, 700);
  } else {
    playWord(clicked_id + "_sound");
    document.getElementById(clicked_id + "_img").hidden = false;
    document.getElementById(clicked_id + "_img").innerHTML =
      "<img src='../public/img/wrong.png' style='height: 50px; margin: 15px; position: absolute; top:10%; z-index:55' id='wrong'/>";
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
  document.getElementById("choose1").innerHTML = questions[iQuestion].choose1;
  document.getElementById("choose2").innerHTML = questions[iQuestion].choose2;
  document.getElementById("buttonChoose1").hidden = false;
  document.getElementById("buttonChoose2").hidden = false;
  document.getElementById("ansText").innerHTML = "";
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
