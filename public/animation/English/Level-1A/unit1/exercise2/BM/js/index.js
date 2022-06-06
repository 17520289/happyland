const questions = [
  {
    question: "1-6",
    word: "siku",
    choose1: "./BM/img/ex2/elbow.png",
    choose2: "./BM/img/ex2/body.png",
    sound1: "./BM/sound/ex2/siku.wav",
    sound2: "./BM/sound/ex2/badan.wav",
    soundAns: "./BM/sound/ex2/siku.wav",
    ans: "1",
  },
  {
    question: "2-6",
    word: "pinggan",
    choose1: "./BM/BM/img/ex2/waist.png",
    choose2: "./BM/BM/img/ex2/back.png",
    sound1: "./BM/sound/ex2/pinggan.wav",
    sound2: "./BM/sound/ex2/belakang.wav",
    soundAns: "./BM/sound/ex2/pinggan.wav",
    ans: "1",
  },
  {
    question: "3-6",
    word: "kuku",
    choose1: "./BM/img/ex2/leg.png",
    choose2: "./BM/img/ex2/nail.png",
    sound1: "./BM/sound/ex2/kaki.wav",
    sound2: "./BM/sound/ex2/kuku.wav",
    soundAns: "./BM/sound/ex2/kuku.wav",
    ans: "2",
  },
  {
    question: "4-6",
    word: "belakang",
    choose1: "./BM/img/ex2/shoulder.png",
    choose2: "./BM/img/ex2/back.png",
    sound1: "./BM/sound/ex2/bahu.wav",
    sound2: "./BM/sound/ex2/belakang.wav",
    soundAns: "./BM/sound/ex2/belakang.wav",
    ans: "2",
  },
  {
    question: "5-6",
    word: "jari",
    choose1: "./BM/img/ex2/finger.png",
    choose2: "./BM/img/ex2/foot.png",
    sound1: "./BM/sound/ex2/jari.wav",
    sound2: "./BM/sound/ex2/tapak kaki.wav",
    soundAns: "./BM/sound/ex2/jari.wav",
    ans: "1",
  },
  {
    question: "6-6",
    word: "ketiak",
    choose1: "./BM/img/ex2/knee.png",
    choose2: "./BM/img/ex2/armpit.png",
    sound1: "./BM/sound/ex2/lutut.wav",
    sound2: "./BM/sound/ex2/ketiak.wav",
    soundAns: "./BM/sound/ex2/ketiak.wav",
    ans: "2",
  },
];
var unit = {
  "title": "Unit 1: Anggota Badan",
  "unit1-decription": "Choose the correct answers.",
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
    "<div class='container' id='yeah' style='position: absolute; top: 15px; left: 20px; margin: 0px 50px 0px 50px;'><img src='../public//img/yeah3.gif' style='width:100%'/></div>";
  setTimeout('document.getElementById("yeah").remove()', 900);
}

function checkAnswer(clicked_id) {
  var user_ans = document.getElementById(clicked_id).value;
  if (user_ans === questions[iQuestion].ans) {
    playWord(clicked_id + "_sound");
    document.getElementById(clicked_id + "_ans_sound").hidden = false;
    document.getElementById(clicked_id + "_img").hidden = false;
    document.getElementById(clicked_id + "_img").innerHTML =
      "<img src='../public/img/tick.png' style='height: 80px; margin-left: -50px; id='tick'/>";
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
      "<img src='../public/img/wrong.png' style='height: 80px; margin-left: -50px; id='wrong''/>";
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
