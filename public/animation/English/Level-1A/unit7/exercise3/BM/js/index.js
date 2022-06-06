const questions = [
  {
    question: "1-7",
    word: "jambu batu",
    choose1: "./img/guava.jpg",
    choose2: "./img/kiwi.jpg",
    sound1: "./BM/sound/jambu batu.wav",
    sound2: "./BM/sound/buah-kivi.wav",
    soundAns: "./BM/sound/jambu batu.wav",
    ans: "1",
  },
  {
    question: "2-7",
    word: "belimbing besi",
    choose1: "./img/durian.jpg",
    choose2: "./img/starfruit.jpg",
    sound1: "./BM/sound/durian.wav",
    sound2: "./BM/sound/belimbing besi.wav",
    soundAns: "./BM/sound/belimbing besi.wav",
    ans: "2",
  },
  {
    question: "3-7",
    word: "tembikai susu",
    choose1: "./img/honeydew.png",
    choose2: "./img/watermelon.jpg",
    sound1: "./BM/sound/tembikai susu.wav",
    sound2: "./BM/sound/tembikai.wav",
    soundAns: "./BM/sound/tembikai susu.wav",
    ans: "1",
  },
  {
    question: "4-7",
    word: "buah kivi",
    choose1: "./img/kiwi.jpg",
    choose2: "./img/orange.jpg",
    sound1: "./BM/sound/buah-kivi.wav",
    sound2: "./BM/sound/orange.wav",
    soundAns: "./BM/sound/buah-kivi.wav",
    ans: "1",
  },
  {
    question: "5-7",
    word: "stroberi",
    choose1: "./img/mangosteen.jpg",
    choose2: "./img/strawberry.jpg",
    sound1: "./BM/sound/manggis.wav",
    sound2: "./BM/sound/stroberi.wav",
    soundAns: "./BM/sound/stroberi.wav",
    ans: "2",
  },
  {
    question: "6-7",
    word: "laici",
    choose1: "./img/lemon.jpg",
    choose2: "./img/lychee.jpg",
    sound1: "./BM/sound/lemon.wav",
    sound2: "./BM/sound/laici.wav",
    soundAns: "./BM/sound/laici.wav",
    ans: "2",
  },
  {
    question: "7-7",
    word: "limau bali",
    choose1: "./img/pomelo.jpg",
    choose2: "./img/watermelon.jpg",
    sound1: "./BM/sound/limau bali.wav",
    sound2: "./BM/sound/tembikai.wav",
    soundAns: "./BM/sound/limau bali.wav",
    ans: "1",
  },
];

var unit ={
  "title" : "Unit 7: Buah-buahan",
  "decription": "Choose the correct answers."
}

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
      setTimeout(playCorrect, 300);
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
      setTimeout(playWrong, 300);
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

