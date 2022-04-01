const questions = [
  {
    question: "1-6",
    picture: "./img/seventy.png",
    choose1: "seventy",
    choose2: "thirty",
    sound1: "./sound/seventy.wav",
    sound2: "./sound/thirty.wav",
    ans: "1",
  },
  {
    question: "2-6",
    picture: "./img/sixty.png",
    choose1: "sixty",
    choose2: "eighty",
    sound1: "./sound/sixty.wav",
    sound2: "./sound/eighty.wav",
    ans: "1",
  },
  {
    question: "3-6",
    picture: "./img/twenty.png",
    choose1: "twenty",
    choose2: "fifty",
    sound1: "./sound/twenty.wav",
    sound2: "./sound/fifty.wav",
    ans: "1",
  },
  {
    question: "4-6",
    picture: "./img/eighty.png",
    choose1: "eighty",
    choose2: "seventy",
    sound1: "./sound/eighty.wav",
    sound2: "./sound/seventy.wav",
    ans: "1",
  },
  {
    question: "5-6",
    picture: "./img/fifty.png",
    choose1: "fifty",
    choose2: "thirty",
    sound1: "./sound/fifty.wav",
    sound2: "./sound/thirty.wav",
    ans: "1",
  },
  {
    question: "6-6",
    picture: "./img/thirty.png",
    choose1: "thirty",
    choose2: "sixty",
    sound1: "./sound/thirty.wav",
    sound2: "./sound/sixty.wav",
    ans: "1",
  },
];

var iQuestion = 0;
var idButton = "buttonChoose1";
// variable
let amountCorrectAnswer = 0;
let stopNext = true;
let arrAnswer = [];
// end of line 60
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
    "<img src='../public/img/sad.gif' id='sad' style='position: absolute;bottom: 0px;left: 5%;'/>";
  document.getElementById("thinking").style.visibility = "hidden";
  document.getElementById("yeah").remove();
}
function playCorrect() {
  var audioElement = document.createElement("audio");
  audioElement.setAttribute("src", "./sound/correct.wav");
  audioElement.play();
  document.getElementById("exercise").innerHTML +=
    "<img src='../public/img/yeah.gif' id='yeah' style='position: absolute;bottom: 0px;left: 5%;'/>";
  document.getElementById("thinking").style.visibility = "hidden";
  document.getElementById("sad").remove();
}

function checkAnswer(clicked_id) {
  var user_ans = document.getElementById(clicked_id).value;
  // next
  if (clicked_id) {
    stopNext = false;
  }
  // end of line 98
  if (user_ans === questions[iQuestion].ans) {
    // variable currentAnswer
    let currentAnswer =
      questions[iQuestion][`choose${questions[iQuestion].ans}`];
    // end of line 103
    playWord(clicked_id + "_sound");
    document.getElementById(clicked_id + "_ans_sound").hidden = false;
    document.getElementById(clicked_id + "_img").hidden = false;
    document.getElementById(clicked_id + "_img").innerHTML =
      "<img src='../public/img/tick.png' style='height: 100px;margin: 15px;position: absolute;right: 10%;bottom: -20%;z-index:5' id='tick'/>";
    console.log("đáp án đúng");
    clicked_id === "buttonChoose1"
      ? (idButton = clicked_id.replace(/1/g, "2"))
      : (idButton = clicked_id.replace(/2/g, "1"));
    console.log(idButton);
    document.getElementById(clicked_id).disabled = "disabled";
    document.getElementById(idButton).disabled = "disabled";
    document.getElementById(idButton).style.opacity = "0.5";
    setTimeout(playCorrect, 700);
    // amount correct answers
    if (!arrAnswer.includes(currentAnswer)) {
      arrAnswer.push(currentAnswer);
      amountCorrectAnswer++;
    } else {
      return amountCorrectAnswer;
    }
    // end of line 122
  } else {
    playWord(clicked_id + "_sound");
    document.getElementById(clicked_id + "_img").hidden = false;
    document.getElementById(clicked_id + "_img").innerHTML =
      "<img src='../public/img/wrong.png' style='height: 100px;margin: 15px;position: absolute;right: 10%;bottom: -20%;z-index:5' id='wrong'/>";
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
  // stop next
  stopNext = true;
  // end of line 152
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
    document.getElementById("nextButton").innerHTML =
      '<button id="nextButton" onclick="finish()"><img src="../../../public/img/icon/finish-btn.png"alt="" class="footer__img"></button>';
  } else {
    document.getElementById("nextButton").innerHTML =
      '<button id="nextButton" onclick="nextQuestion()"><img src="../../../public/img/icon/Ui-next.png"alt="" class="footer__img"></button>';
  }

  document.getElementById("yeah").remove();
  document.getElementById("sad").remove();
}

function nextQuestion() {
  // check if user clicked
  if (stopNext) {
    alert(" Choose the correct answers !!!");
    return iQuestion;
  } else {
    iQuestion = iQuestion + 1;
  }
  // end of line 177
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
  // check if user clicked
  if (stopNext) {
    alert(" Choose the correct answers !!!");
    return iQuestion;
  } else {
    iQuestion = iQuestion - 1;
  } // end of line 177
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
// finish exercise
function finish() {
  if (stopNext) {
    alert(" Choose the correct answers !!!");
  } else {
    console.log(objectAnswers(amountCorrectAnswer, questions.length));
  }
}
