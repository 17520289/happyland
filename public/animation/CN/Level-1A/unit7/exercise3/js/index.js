const questions = [
  {
    question: "1-7",
    word: "番石榴",
    choose1: "./img/guava.jpg",
    choose2: "./img/papaya.jpg",
    sound1: "./sound/guava.wav",
    sound2: "./sound/papaya.wav",
    ans: "1",
  },
  {
    question: "2-7",
    word: "杨桃",
    choose1: "./img/durian.jpg",
    choose2: "./img/starfruit.jpg",
    sound1: "./sound/durian.wav",
    sound2: "./sound/starfruit.wav",
    ans: "2",
  },
  {
    question: "3-7",
    word: "蜜瓜",
    choose1: "./img/honeydew.png",
    choose2: "./img/pineapple.jpg",
    sound1: "./sound/honeydew.wav",
    sound2: "./sound/pineapple.wav",
    ans: "1",
  },
  {
    question: "4-7",
    word: "奇异果",
    choose1: "./img/kiwi.jpg",
    choose2: "./img/orange.jpg",
    sound1: "./sound/kiwi.wav",
    sound2: "./sound/orange.wav",
    ans: "1",
  },
  {
    question: "5-7",
    word: "草莓",
    choose1: "./img/mangosteen.jpg",
    choose2: "./img/strawberry.jpg",
    sound1: "./sound/mangosteen.wav",
    sound2: "./sound/strawberry.wav",
    ans: "2",
  },
  {
    question: "6-7",
    word: "荔枝",
    choose1: "./img/lemon.jpg",
    choose2: "./img/lychee.jpg",
    sound1: "./sound/lemon.wav",
    sound2: "./sound/lychee.wav",
    ans: "2",
  },
  {
    question: "7-7",
    word: "柚子",
    choose1: "./img/pomelo.jpg",
    choose2: "./img/watermelon.jpg",
    sound1: "./sound/pomelo.wav",
    sound2: "./sound/watermelon.wav",
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
