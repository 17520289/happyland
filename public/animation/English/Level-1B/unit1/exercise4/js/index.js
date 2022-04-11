const questions = [
  {
    question: "1-7",
    word: "pocket",
    choose1: "./img/pocket.jpg",
    choose2: "./img/slipper.jpg",
    sound1: "./sound/pocket.wav",
    sound2: "./sound/slippers.wav",
    ans: "1",
  },
  {
    question: "2-7",
    word: "button",
    choose1: "./img/button.jpg",
    choose2: "./img/school uniform.jpg",
    sound1: "./sound/button.wav",
    sound2: "./sound/school uniform.wav",
    ans: "1",
  },
  {
    question: "3-7",
    word: "socks",
    choose1: "./img/hat.jpg",
    choose2: "./img/socks.jpg",
    sound1: "./sound/hat.wav",
    sound2: "./sound/socks.wav",
    ans: "2",
  },
  {
    question: "4-7",
    word: "gloves",
    choose1: "./img/glove.jpg",
    choose2: "./img/boots.jpg",
    sound1: "./sound/gloves.wav",
    sound2: "./sound/boots.wav",
    ans: "1",
  },
  {
    question: "5-7",
    word: "scarf",
    choose1: "./img/shirt.jpg",
    choose2: "./img/scarf.jpg",
    sound1: "./sound/shirt.wav",
    sound2: "./sound/scarf.wav",
    ans: "2",
  },
  {
    question: "6-7",
    word: "belt",
    choose1: "./img/shorts.jpg",
    choose2: "./img/belt.jpg",
    sound1: "./sound/shorts.wav",
    sound2: "./sound/belt.wav",
    ans: "2",
  },
  {
    question: "7-7",
    word: "necktie",
    choose1: "./img/necktie.jpg",
    choose2: "./img/pajamas.jpg",
    sound1: "./sound/necktie.wav",
    sound2: "./sound/pajamas.wav",
    ans: "1",
  },
];

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
    var word_sound = "./sound/" + questions[iQuestion].word + ".wav";
    audioWordElement.setAttribute("src", word_sound);
    audioWordElement.play();
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
    audioWordElement.addEventListener("ended", function () {
      audioWordElement.currentTime = 0;
      setTimeout(playCorrect, 700);
    });
  } else {
    playWord(clicked_id + "_sound");
    document.getElementById(clicked_id + "_img").hidden = false;
    document.getElementById(clicked_id + "_img").innerHTML =
      "<img src='../public/img/wrong.png' style='height: 80px; margin-left: -50px; id='wrong''/>";
    $("#exercise").append(
      "<div class='container' id='wrong-animation' style='position: absolute; top: 15px; left: 10%; margin: 0px 50px 0px 50px;'><img src='../public/img/boom.png' style='width:100%'/></div>"
    );
    setTimeout('$("#wrong-animation").remove()', 900);
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
