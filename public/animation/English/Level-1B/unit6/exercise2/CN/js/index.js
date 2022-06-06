const questions = [
  {
    question: "1-7",
    word: "乌龟",
    choose1: "./img/rabbit.png",
    choose2: "./img/tortoise.png",
    sound1: "./CN/sound/rabbit.wav",
    sound2: "./CN/sound/tortoise.wav",
    soundAns: "./CN/sound/tortoise.wav",
    ans: "2",
  },
  {
    question: "2-7",
    word: "公鸡",
    choose1: "./img/cock.png",
    choose2: "./img/duck.png",
    sound1: "./CN/sound/cock.wav",
    sound2: "./CN/sound/duck.wav",
    soundAns: "./CN/sound/cock.wav",
    ans: "1",
  },
  {
    question: "3-7",
    word: "火鸡",
    choose1: "./img/goldfish.png",
    choose2: "./img/turkey.png",
    sound1: "./CN/sound/goldfish.wav",
    sound2: "./CN/sound/turkey.wav",
    soundAns: "./CN/sound/turkey.wav",
    ans: "2",
  },
  {
    question: "4-7",
    word: "母鸡",
    choose1: "./img/hen.png",
    choose2: "./img/cow.png",
    sound1: "./CN/sound/hen.wav",
    sound2: "./CN/sound/cow.wav",
    soundAns: "./CN/sound/hen.wav",
    ans: "1",
  },
  {
    question: "5-7",
    word: "仓鼠",
    choose1: "./img/hamster.png",
    choose2: "./img/dog.png",
    sound1: "./CN/sound/hamster.wav",
    sound2: "./CN/sound/dog.wav",
    soundAns: "./CN/sound/hamster.wav",
    ans: "1",
  },
  {
    question: "6-7",
    word: "金鱼",
    choose1: "./img/goat.png",
    choose2: "./img/goldfish.png",
    sound1: "./CN/sound/goat.wav",
    sound2: "./CN/sound/goldfish.wav",
    soundAns: "./CN/sound/goldfish.wav",
    ans: "2",
  },
  {
    question: "7-7",
    word: "变色龙",
    choose1: "./img/chameleon.png",
    choose2: "./img/pony.png",
    sound1: "./CN/sound/chameleon.wav",
    sound2: "./CN/sound/pony.wav",
    soundAns: "./CN/sound/chameleon.wav",
    ans: "1",
  },
];

var unit ={
  "title" : "单元六：宠物与家禽",
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
  if (audio_id === "question_sound") {
    audioWordElement.setAttribute("src", questions[iQuestion].soundAns);
    audioWordElement.play();
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
    document.getElementById(clicked_id + "_img").innerHTML =
      "<img src='../public/img/tick.png' style='height: 80px; margin-left: -50px;' id='tick'/>";
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
      "<img src='../public/img/wrong.png' style='height: 80px; margin-left: -50px; id='wrong''/>";
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
