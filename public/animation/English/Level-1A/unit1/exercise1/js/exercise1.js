const questions = [
  {
    question: "./img/2.png",
    picture: "./img/head.png",
    choose1: "head",
    choose2: "shoulder",
    sound1: "./sound/head.wav",
    sound2: "./sound/shoulder.wav",
    ans: "1",
    ansText: "head",
  },
  {
    question: "./img/3.png",
    picture: "./img/neck.png",
    choose1: "knee",
    choose2: "neck",
    sound1: "./sound/knee.wav",
    sound2: "./sound/neck.wav",
    ans: "2",
    ansText: "neck",
  },
  {
    question: "./img/4.png",
    picture: "./img/shoulder.png",
    choose1: "waist",
    choose2: "shoulder",
    sound1: "./sound/waist.wav",
    sound2: "./sound/shoulder.wav",
    ans: "2",
    ansText: "shoulder",
  },
  {
    question: "./img/5.png",
    picture: "./img/chest.png",
    choose1: "chest",
    choose2: "elbow",
    sound1: "./sound/chest.wav",
    sound2: "./sound/elbow.wav",
    ans: "1",
    ansText: "chest",
  },
  {
    question: "./img/6.png",
    picture: "./img/arm.png",
    choose1: "wrist",
    choose2: "arm",
    sound1: "./sound/wrist.wav",
    sound2: "./sound/arm.wav",
    ans: "2",
    ansText: "arm",
  },
  {
    question: "./img/7.png",
    picture: "./img/stomach.png",
    choose1: "stomach",
    choose2: "thigh",
    sound1: "./sound/stomach.wav",
    sound2: "./sound/thigh.wav",
    ans: "1",
    ansText: "stomach",
  },
  {
    question: "./img/8.png",
    picture: "./img/hand.png",
    choose1: "hand",
    choose2: "neck",
    sound1: "./sound/hand.wav",
    sound2: "./sound/neck.wav",
    ans: "1",
    ansText: "hand",
  },
  {
    question: "./img/9.png",
    picture: "./img/leg.png",
    choose1: "leg",
    choose2: "chest",
    sound1: "./sound/leg.wav",
    sound2: "./sound/chest.wav",
    ans: "1",
    ansText: "leg",
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
  audioElement.volume = 0.5;
  audioElement.play();
}
function playCorrect() {
  var audioElement = document.createElement("audio");
  audioElement.setAttribute("src", "./sound/correct.wav");
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
