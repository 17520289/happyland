const questions = [
  {
    question: "./BM/img/2.png",
    picture: "./BM/img/head.png",
    choose1: "kepala",
    choose2: "ketiak",
    sound1: "./BM/sound/kepala.wav",
    sound2: "./BM/sound/ketiak.wav",
    ans: "1",
    ansText: "kepala",
  },
  {
    question: "./BM/img/3.png",
    picture: "./BM/img/neck.png",
    choose1: "lutut",
    choose2: "leher",
    sound1: "./BM/sound/lutut.wav",
    sound2: "./BM/sound/leher.wav",
    ans: "2",
    ansText: "leher",
  },
  {
    question: "./BM/img/4.png",
    picture: "./BM/img/shoulder.png",
    choose1: "siku",
    choose2: "bahu",
    sound1: "./BM/sound/siku.wav",
    sound2: "./BM/sound/bahu.wav",
    ans: "2",
    ansText: "bahu",
  },
  {
    question: "./BM/img/5.png",
    picture: "./BM/img/chest.png",
    choose1: "dada",
    choose2: "paha",
    sound1: "./BM/sound/dada.wav",
    sound2: "./BM/sound/paha.wav",
    ans: "1",
    ansText: "dada",
  },
  {
    question: "./BM/img/6.png",
    picture: "./BM/img/arm.png",
    choose1: "pinggang",
    choose2: "lengan",
    sound1: "./BM/sound/pinggang.wav",
    sound2: "./BM/sound/lengan.wav",
    ans: "2",
    ansText: "lengan",
  },
  {
    question: "./BM/img/7.png",
    picture: "./BM/img/stomach.png",
    choose1: "perut",
    choose2: "dada",
    sound1: "./BM/sound/perut.wav",
    sound2: "./BM/sound/dada.wav",
    ans: "1",
    ansText: "perut",
  },
  {
    question: "./BM/img/8.png",
    picture: "./BM/img/hand.png",
    choose1: "tangan",
    choose2: "belakang",
    sound1: "./BM/sound/tangan.wav",
    sound2: "./BM/sound/belakang.wav",
    ans: "1",
    ansText: "tangan",
  },
  {
    question: "./BM/img/9.png",
    picture: "./BM/img/leg.png",
    choose1: "kaki",
    choose2: "kuku",
    sound1: "./BM/sound/kaki.wav",
    sound2: "./BM/sound/kuku.wav",
    ans: "1",
    ansText: "kaki",
  },
];

var unit = {
  "title": "Unit 1: Anggota Badan",
  "unit1-title": "Anggota Badan",
  "unit1-decription": "Choose the correct answers",
  "exersice1": "Latihan Satu",
  "exersice2": "Latihan Dua",
  "exersice3": "Latihan Tiga"
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
