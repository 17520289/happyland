const questions = [
  {
    question: "1-6",
    word: "cry",
    choose1: "./img/play.jpg",
    choose2: "./img/cry.jpg",
    sound1: "./sound/play.wav",
    sound2: "./sound/cry.wav",
    ans: "2",
  },
  {
    question: "2-6",
    word: "cook",
    choose1: "./img/cook.jpg",
    choose2: "./img/buy.jpg",
    sound1: "./sound/cook.wav",
    sound2: "./sound/buy.wav",
    ans: "1",
  },
  {
    question: "3-6",
    word: "open",
    choose1: "./img/read.jpg",
    choose2: "./img/open.jpg",
    sound1: "./sound/read.wav",
    sound2: "./sound/open.wav",
    ans: "2",
  },
  {
    question: "4-6",
    word: "close",
    choose1: "./img/close.jpg",
    choose2: "./img/listen.jpg",
    sound1: "./sound/close.wav",
    sound2: "./sound/listen.wav",
    ans: "1",
  },
  {
    question: "5-6",
    word: "shout",
    choose1: "./img/shout.jpg",
    choose2: "./img/say.jpg",
    sound1: "./sound/shout.wav",
    sound2: "./sound/say.wav",
    ans: "1",
  },
  {
    question: "6-6",
    word: "laugh",
    choose1: "./img/sleep.jpg",
    choose2: "./img/laugh.jpg",
    sound1: "./sound/sleep.wav",
    sound2: "./sound/laugh.wav",
    ans: "2",
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
  if (audio_id === "question_sound") {
    var word_sound = "./sound/" + questions[iQuestion].word + ".wav";
    audioElement.setAttribute("src", word_sound);
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
    document.getElementById(clicked_id + "_img").innerHTML =
      "<img src='../public/img/tick.png' style='height: 80px; margin-left: -50px;' id='tick'/>";
      $('.answer-text').append("<div class='container correct-animation'><img src='../public/img/DOG (3).png' style='height: 200px'/></div>");
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
      setTimeout(playWrong, 500);
    $('.answer-text').append("<div class='container correct-animation'><img src='../public/img/DOG (2).png' style='height: 200px'/></div>");
    setTimeout('$(".correct-animation").remove()', 500);
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
  $(".correct-animation").remove()
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
