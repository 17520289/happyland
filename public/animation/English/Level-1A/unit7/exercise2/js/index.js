const questions = [
  {
    question: "1-7",
    picture: "./img/jackfruit.png",
    choose1: "jackfruit",
    choose2: "durian",
    sound1: "./sound/jackfruit.wav",
    sound2: "./sound/durian.wav",
    ans: "1",
  },
  {
    question: "2-7",
    picture: "./img/rambutan.jpg",
    choose1: "rambutan",
    choose2: "coconut",
    sound1: "./sound/rambutan.wav",
    sound2: "./sound/coconut.wav",
    ans: "1",
  },
  {
    question: "3-7",
    picture: "./img/mangosteen.jpg",
    choose1: "watermelon",
    choose2: "mangosteen",
    sound1: "./sound/watermelon.wav",
    sound2: "./sound/mangosteen.wav",
    ans: "2",
  },
  {
    question: "4-7",
    picture: "./img/durian.jpg",
    choose1: "durian",
    choose2: "watermelon",
    sound1: "./sound/durian.wav",
    sound2: "./sound/watermelon.wav",
    ans: "1",
  },
  {
    question: "5-7",
    picture: "./img/pineapple.jpg",
    choose1: "jackfruit",
    choose2: "pineapple",
    sound1: "./sound/jackfruit.wav",
    sound2: "./sound/pineapple.wav",
    ans: "2",
  },
  {
    question: "6-7",
    picture: "./img/coconut.jpg",
    choose1: "jackfruit",
    choose2: "coconut",
    sound1: "./sound/jackfruit.wav",
    sound2: "./sound/coconut.wav",
    ans: "2",
  },
  {
    question: "7-7",
    picture: "./img/watermelon.jpg",
    choose1: "durian",
    choose2: "watermelon",
    sound1: "./sound/durian.wav",
    sound2: "./sound/watermelon.wav",
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
    "<div class='container' id='yeah' style='position: absolute; z-index: 4;top: 15px; left: 20px; margin: 0px 50px 0px 50px;'><img src='../public/img/yeah3.gif' style='width:100%'/></div>";
  setTimeout('document.getElementById("yeah").remove()', 900);
}

function checkAnswer(clicked_id) {
  var user_ans = document.getElementById(clicked_id).value;
  if (user_ans === questions[iQuestion].ans) {
    playWord(clicked_id + "_sound");
    document.getElementById(clicked_id + "_ans_sound").hidden = false;
    document.getElementById(clicked_id + "_img").hidden = false;
    document.getElementById(clicked_id + "_img").innerHTML =
      "<img src='../public/img/tick.png' style='height: 100px;margin: 15px;position: absolute;right: 0;top: 50%;z-index: 4;' id='tick'/>";
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
      "<img src='../public/img/wrong.png' style='height: 50px; margin: 15px;position: absolute;right: 45%;top: 10%;z-index: 4;' id='wrong'/>";
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
