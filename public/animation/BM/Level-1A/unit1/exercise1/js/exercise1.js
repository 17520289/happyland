const questions = [
  {
    question: "1-7  ",
    picture: "./img/head.png",
    choose1: "kepala",
    choose2: "ketiak",
    sound1: "./sound/kepala.wav",
    sound2: "./sound/ketiak.wav",
    ans: "1",
  },
  {
    question: "2-7  ",
    picture: "./img/neck.png",
    choose1: "lutut",
    choose2: "leher",
    sound1: "./sound/lutut.wav",
    sound2: "./sound/leher.wav",
    ans: "2",
  },
  {
    question: "3-7 ",
    picture: "./img/shoulder.png",
    choose1: "siku",
    choose2: "bahu",
    sound1: "./sound/siku.wav",
    sound2: "./sound/bahu.wav",
    ans: "2",
  },
  {
    question: "4-7 ",
    picture: "./img/chest.png",
    choose1: "dada",
    choose2: "paha",
    sound1: "./sound/dada.wav",
    sound2: "./sound/paha.wav",
    ans: "1",
  },
  {
    question: "5-7 ",
    picture: "./img/arm.png",
    choose1: "pinggang",
    choose2: "lengan",
    sound1: "./sound/pinggang.wav",
    sound2: "./sound/lengan.wav",
    ans: "2",
  },
  {
    question: "6-7 ",
    picture: "./img/stomach.png",
    choose1: "perut",
    choose2: "dada",
    sound1: "./sound/perut.wav",
    sound2: "./sound/dada.wav",
    ans: "1",
  },
  {
    question: "7-7 ",
    picture: "./img/hand.png",
    choose1: "tangan",
    choose2: "belakang",
    sound1: "./sound/tangan.wav",
    sound2: "./sound/belakang.wav",
    ans: "1",
  },
  {
    question: "7-7 ",
    picture: "./img/leg.png",
    choose1: "kaki",
    choose2: "kuku",
    sound1: "./sound/kaki.wav",
    sound2: "./sound/kuku.wav",
    ans: "1",
  }
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
    "<div class='container' id='yeah' style='position: absolute; top: 15px; left: 20px; margin: 0px 50px 0px 50px;'><img src='../public/img/yeah3.gif' style='height: 600px'/></div>";
  setTimeout('document.getElementById("yeah").remove()', 900);
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