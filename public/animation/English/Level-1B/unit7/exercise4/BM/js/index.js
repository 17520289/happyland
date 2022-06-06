const questions = [
  {
    question: "1-7",
    word: "rakit",
    choose1: "./img/raft.jpg",
    choose2: "./img/tanker.jpg",
    sound1: "./BM/sound/rakit.wav",
    sound2: "./BM/sound/kapal tangki minyak.wav",
    soundAns: "./BM/sound/rakit.wav",
    ans: "1",
  },
  {
    question: "2-7",
    word: "sampan",
    choose1: "./img/tricycle.png",
    choose2: "./img/sampan.jpg",
    sound1: "./BM/sound/basikal roda tiga.wav",
    sound2: "./BM/sound/sampan.wav",
    soundAns: "./BM/sound/sampan.wav",
    ans: "2",
  },
  {
    question: "3-7",
    word: "feri",
    choose1: "./img/ferry.jpg",
    choose2: "./img/submarine.jpg",
    sound1: "./BM/sound/feri.wav",
    sound2: "./BM/sound/kapal selam.wav",
    soundAns: "./BM/sound/feri.wav",
    ans: "1",
  },
  {
    question: "4-7",
    word: "motorbot",
    choose1: "./img/motorboat.jpg",
    choose2: "./img/motorcycle.png",
    sound1: "./BM/sound/motorbot.wav",
    sound2: "./BM/sound/motosikal.wav",
    soundAns: "./BM/sound/motorbot.wav",
    ans: "1",
  },
  {
    question: "5-7",
    word: "perahu layar",
    choose1: "./img/aeroplane.jpg",
    choose2: "./img/sailboat.jpg",
    sound1: "./BM/sound/kapal terbang.wav",
    sound2: "./BM/sound/perahu layar.wav",
    soundAns: "./BM/sound/perahu layar.wav",
    ans: "2",
  },
  {
    question: "6-7",
    word: "kapal",
    choose1: "./img/space shuttle.jpg",
    choose2: "./img/ship.jpg",
    sound1: "./BM/sound/kapal angkasa.wav",
    sound2: "./BM/sound/kapal.wav",
    soundAns: "./BM/sound/kapal angkasa.wav",
    ans: "2",
  },
  {
    question: "7-7",
    word: "perahu",
    choose1: "./img/boat.jpg",
    choose2: "./img/cable car.jpg",
    sound1: "./BM/sound/perahu.wav",
    sound2: "./BM/sound/kereta kabel.wav",
    soundAns: "./BM/sound/perahu.wav",
    ans: "1",
  },
];

var unit ={
  "title" : "Unit 7: Kenderaan",
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
