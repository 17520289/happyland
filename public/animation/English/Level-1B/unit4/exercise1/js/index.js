const questions = [
  {
    question: "1-6",
    word: "decoration",
    choose1: "./img/decoration.jpg",
    choose2: "./img/card.jpg",
    sound1: "./sound/decoration.wav",
    sound2: "./sound/card.wav",
    ans: "1",
  },
  {
    question: "2-6",
    word: "friends",
    choose1: "./img/popcorn.png",
    choose2: "./img/friends.jpg",
    sound1: "./sound/popcorn.wav",
    sound2: "./sound/friends.wav",
    ans: "2",
  },
  {
    question: "3-6",
    word: "present",
    choose1: "./img/camera.png",
    choose2: "./img/present.png",
    sound1: "./sound/camera.wav",
    sound2: "./sound/present.wav",
    ans: "2",
  },
  {
    question: "4-6",
    word: "party hats",
    choose1: "./img/candle.jpg",
    choose2: "./img/party hat.jpg",
    sound1: "./sound/candle.wav",
    sound2: "./sound/party hats.wav",
    ans: "2",
  },
  {
    question: "5-6",
    word: "party mask",
    choose1: "./img/party mask.jpg",
    choose2: "./img/sweets.jpg",
    sound1: "./sound/party mask.wav",
    sound2: "./sound/sweets.wav",
    ans: "1",
  },
  {
    question: "6-6",
    word: "ribbon",
    choose1: "./img/ribbon.png",
    choose2: "./img/pudding.jpg",
    sound1: "./sound/ribbon.wav",
    sound2: "./sound/pudding.wav",
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
  if (audio_id === "question_sound") {
    var word_sound = "./sound/" + questions[iQuestion].word + ".wav";
    audioElement.setAttribute("src", word_sound);
    console.log(word_sound);
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
  $(".answer-text").append(
    "<div class='container' id='correct-animation'><img src='../public/img/BP-yeah.png' style='height: 300px'/></div>"
  );
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
  $("#correct-animation").remove();
  document.getElementById("exercise").innerHTML += "<div/></div>";
  setTimeout('document.getElementById("yeah").remove()', 900);
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
