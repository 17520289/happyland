const questions = [
  {
      "question": "1-5",
      "picture":  "./img/thigh.png",
      "choose1":"A. lutut",
      "choose2":"B. paha",
      "sound1": "./sound/lutut.wav",
      "sound2": "./sound/paha.wav",
      "ans": "2"
  },
  {
      "question": "2-5",
      "picture":  "./img/ankle.png",
      "choose1":"A. betis",
      "choose2":"B. buku lali",
      "sound1": "./sound/betis.wav",
      "sound2": "./sound/buku lali.wav",
      "ans": "2"
  },
  {
      "question": "3-5",
      "picture":  "./img/knee.png",
      "choose1":"A. jari kaki",
      "choose2":"B. lutut",
      "sound1": "./sound/jari kaki.wav",
      "sound2": "./sound/lutut.wav",
      "ans": "2"
  },
  {
      "question": "4-5",
      "picture":  "./img/toe.png",
      "choose1":"A. jari kaki",
      "choose2":"B. betis",
      "sound1": "./sound/jari kaki.wav",
      "sound2": "./sound/betis.wav",
      "ans": "1"
  },
  {
      "question": "5-5",
      "picture":  "./img/calf.png",
      "choose1":"A. betis",
      "choose2":"B. paha",
      "sound1": "./sound/betis.wav",
      "sound2": "./sound/paha.wav",
      "ans": "1"
  }
]
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
    "<div class='container' id='yeah' style='position: absolute; top: 0px; left: 20px; margin: 0px 50px 0px 50px;'><img src='./img/yeah3.gif' style='height: 100%; width: 100%;'/></div>";
  setTimeout('document.getElementById("yeah").remove()', 900);
}

function checkAnswer(clicked_id) {
  var user_ans = document.getElementById(clicked_id).value;
  document.getElementById("click-gif").hidden = true;
  document.getElementById("click-gif2").hidden = true;
  if (user_ans === questions[iQuestion].ans) {
    playWord(clicked_id + "_sound");
    document.getElementById(clicked_id + "_ans_sound").hidden = false;
    document.getElementById(clicked_id + "_img").hidden = false;
    document.getElementById(clicked_id + "_img").innerHTML =
      "<img src='./img/tick.png' style='height: 100px; margin: 0 15px; position: absolute; right:-50px; top:-15px;' id='tick'/>";
    console.log("????p ??n ????ng");
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
      "<img src='./img/wrong.png' style='height: 70px; margin: 0 10px; position: absolute; right:0px; ' id='wrong'/>";
    console.log("dap ??n sai");
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
