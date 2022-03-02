const questions = [
  {
    question: "1-6",
    picture: "./img/garlic.jpg",
    choose1: "bawang putih",
    choose2: "bawang besar",
    sound1: "./sound/bawang putih.wav",
    sound2: "./sound/bawang besar.wav",
    ans: "1",
  },
  {
    question: "2-6",
    picture: "./img/onion.jpg",
    choose1: "cendawan",
    choose2: "bawang besar",
    sound1: "./sound/cendawan.wav",
    sound2: "./sound/bawang besar.wav",
    ans: "2",
  },
  {
    question: "3-6",
    picture: "./img/spring onion.jpg",
    choose1: "daun bawang",
    choose2: "timun",
    sound1: "./sound/daun bawang.wav",
    sound2: "./sound/timun.wav",
    ans: "1",
  },
  {
    question: "4-6",
    picture: "./img/long bean.jpg",
    choose1: "kentang",
    choose2: "kacang panjang",
    sound1: "./sound/kentang.wav",
    sound2: "./sound/kacang panjang.wav",
    ans: "2",
  },
  {
    question: "5-6",
    picture: "./img/cauliflower.jpg",
    choose1: "keledek",
    choose2: "kubis bunga",
    sound1: "./sound/keledek.wav",
    sound2: "./sound/kubis bunga.wav",
    ans: "2",
  },
  {
    question: "6-6",
    picture: "./img/radish.jpg",
    choose1: "lobak putih",
    choose2: "labu",
    sound1: "./sound/lobak putih.wav",
    sound2: "./sound/labu.wav",
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
  document.getElementById("exercise").innerHTML +=
    "<img src='../public/img/sad.gif' id='sad' style='height: 450px; margin-top:-10%; z-index: 5; position: absolute; bottom: 0%; left: 40%;'/>";
  document.getElementById("thinking").style.visibility = "hidden";
}
function playCorrect() {
  var audioElement = document.createElement("audio");
  audioElement.setAttribute("src", "./sound/correct.wav");
  audioElement.play();
  document.getElementById("exercise").innerHTML +=
    "<img src='../public/img/yeah.gif' id='yeah' style='height: 500px; margin-top:-10%; z-index: 5; position: absolute; bottom: 0%; left: 36%;'/>";
  document.getElementById("thinking").style.visibility = "hidden";
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
  document.getElementById("yeah").remove();
  document.getElementById("sad").remove();
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
