const questions = [
  {
    question: "1-7",
    id: "./img/question1.png",
    contentFirst: "There are 365 or 366",
    contentLast: "in a year",
    choose1: "weeks",
    choose2: "days",
    sound1: "./sound/week.wav",
    sound2: "./sound/day.wav",
    ans: "2",
    answerText: "days",
  },
  {
    question: "2-7",
    id: "./img/question2.png",
    contentFirst: "There are 365 or 366",
    contentLast: "in a year",
    choose1: "days",
    choose2: "month",
    sound1: "./sound/day.wav",
    sound2: "./sound/month.wav",
    ans: "1",
    answerText: "days",
  },
  {
    question: "3-7",
    id: "./img/question3.png",
    contentFirst: "There are twelve",
    contentLast: "in a year",
    choose1: "months",
    choose2: "weeks",
    sound1: "./sound/month.wav",
    sound2: "./sound/week.wav",
    ans: "1",
    answerText: "months",
  },
  {
    question: "4-7",
    id: "./img/question4.png",
    contentFirst: "During the school",
    contentLast: ", I go for a vacation with my family.",
    choose1: "holidays",
    choose2: "time",
    sound1: "./sound/holiday.wav",
    sound2: "./sound/time.wav",
    ans: "1",
    answerText: "holidays",
  },
  {
    question: "5-7",
    id: "./img/question5.png",
    contentFirst: "I am five",
    contentLast: "old",
    choose1: "days",
    choose2: "years",
    sound1: "./sound/day.wav",
    sound2: "./sound/year.wav",
    ans: "2",
    answerText: "years",
  },
  {
    question: "6-7",
    id: "./img/question6.png",
    contentFirst: "January is the first",
    contentLast: "of the year.",
    choose1: "week",
    choose2: "month",
    sound1: "./sound/week.wav",
    sound2: "./sound/month.wav",
    ans: "2",
    answerText: "month",
  },
  {
    question: "7-7",
    id: "./img/question7.png",
    contentFirst: "I go to school five days a",
    contentLast: " .",
    choose1: "year",
    choose2: "week",
    sound1: "./sound/year.wav",
    sound2: "./sound/week.wav",
    ans: "2",
    answerText: "week",
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
    document.getElementById("buttonChoose_img").hidden = false;
    document.getElementById("buttonChoose_img").innerHTML =
      "<img src='./img/tick.png' style='height: 50px;margin: 15px;z-index:5' id='tick'/>";
    console.log("đáp án đúng");
    document.getElementById("answerText").innerHTML =
      questions[iQuestion].answerText;
    document.getElementById("buttonChoose1").hidden = true;
    document.getElementById("buttonChoose2").hidden = true;
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
    document.getElementById("buttonChoose_img").hidden = false;
    document.getElementById("buttonChoose_img").innerHTML =
      "<img src='./img/wrong.png' style='height: 50px;margin: 15px;z-index:5' id='wrong'/>";
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
  document.getElementById("buttonChoose1").hidden = false;
  document.getElementById("buttonChoose2").hidden = false;
  document.getElementById("NoQuestion").src = questions[iQuestion].id;
  document.getElementById("contentFirst").innerHTML =
    questions[iQuestion].contentFirst;
  document.getElementById("contentLast").innerHTML =
    questions[iQuestion].contentLast;
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
  document.getElementById("buttonChoose1").disabled = "";
  document.getElementById("buttonChoose2").disabled = "";
  document.getElementById("buttonChoose1_ans_sound").hidden = true;
  document.getElementById("buttonChoose2_ans_sound").hidden = true;
  document.getElementById("buttonChoose1").style.opacity = "";
  document.getElementById("buttonChoose2").style.opacity = "";
  document.getElementById("buttonChoose_img").hidden = true;
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
