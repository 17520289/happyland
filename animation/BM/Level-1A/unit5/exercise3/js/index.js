const questions = [
  {
    question: "1-7 ",
    picture: "./img/oval.png",
    choose1: "A. bujur",
    choose2: "B. segi empat tepat",
    sound1: "./sound/bujur.wav",
    sound2: "./sound/segi empat tepat.wav",
    ans: "1",
  },
  {
    question: "2-7 ",
    picture: "./img/triangle.png",
    choose1: "A. segi empat sama",
    choose2: "B. segi tiga",
    sound1: "./sound/segi empat sama.wav",
    sound2: "./sound/segi tiga.wav",
    ans: "2",
  },
  {
    question: "3-7 ",
    picture: "./img/rectangle.png",
    choose1: "A. bulat",
    choose2: "B. segi empat tepat",
    sound1: "./sound/bulat.wav",
    sound2: "./sound/segi empat tepat.wav",
    ans: "2",
  },
  {
    question: "4-7",
    picture: "./img/circle.png",
    choose1: "A. bulat",
    choose2: "B. bentuk hati",
    sound1: "./sound/bulat.wav",
    sound2: "./sound/bentuk hati.wav",
    ans: "1",
  },
  {
    question: "5-7  ",
    picture: "./img/star.png",
    choose1: "A. segi empat sama",
    choose2: "B. bentuk bintang",
    sound1: "./sound/segi empat sama.wav",
    sound2: "./sound/bentuk bintang.wav",
    ans: "2",
  },
  {
    question: "6-7 ",
    picture: "./img/heart.png",
    choose1: "A. bulat",
    choose2: "B. bentuk hati",
    sound1: "./sound/bulat.wav",
    sound2: "./sound/bentuk hati.wav",
    ans: "2",
  },
  {
    question: "7-7",
    picture: "./img/square.png",
    choose1: "A. segi empat sama",
    choose2: "B. segi tiga",
    sound1: "./sound/segi empat sama.wav",
    sound2: "./sound/segi tiga.wav",
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
    "<div class='container' id='yeah' style='position: absolute; z-index: 4;top: 15px; left: 20px; '><img src='../public/img/yeah3.gif' style='height: 100%; width: 100%;'/></div>";
  setTimeout('document.getElementById("yeah").remove()', 900);
  document.getElementsByClassName(
    "exercise3__ans__choose"
  ).style.animationPlayState = "paused";
}

function checkAnswer(clicked_id) {
  document.getElementById("click-gif").hidden = true;
  document.getElementById("click-gif2").hidden = true;
  var user_ans = document.getElementById(clicked_id).value;
  if (user_ans === questions[iQuestion].ans) {
    playWord(clicked_id + "_sound");
    document.getElementById(clicked_id + "_ans_sound").hidden = false;
    document.getElementById(clicked_id + "_img").hidden = false;
    document.getElementById(clicked_id + "_img").innerHTML =
      "<img src='../public/img/tick.png' style='height: 100px; margin: 15px; position: absolute; right:-16%; top:-30%' id='tick'/>";
    document.getElementById("question-text").innerText = "Very Good !";
    document.getElementById("image-kid").src = "../public/img/kidsClap2.png";
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
      "<img src='../public/img/wrong.png' style='height: 50px; margin: 15px; id='wrong''/>";
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
  document.getElementById("exercise").innerHTML += "<div/></div>";
  setTimeout('document.getElementById("yeah").remove()', 900);
  document.getElementById("image").src = questions[iQuestion].picture;
  document.getElementById("markboard").innerHTML =
    questions[iQuestion].question;
  document.getElementById("choose1").innerHTML = questions[iQuestion].choose1;
  document.getElementById("choose2").innerHTML = questions[iQuestion].choose2;
  document.getElementById("question-text").innerText = "What is this shape ?";
  document.getElementById("image-kid").src = "../public/img/kids.png";
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
