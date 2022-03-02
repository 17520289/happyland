const questions = [
  {
    question: "1-8",
    picture: "./img/grandfather.jpg",
    choose1: "ibu",
    choose2: "datuk",
    sound1: "./sound/ibu.wav",
    sound2: "./sound/datuk.wav",
    ans: "2",
    bg: "./img/speakbubble-49.png",
    color: "white",
  },
  {
    question: "2-8",
    picture: "./img/father.jpg",
    choose1: "nenek",
    choose2: "bapa",
    sound1: "./sound/nenek.wav",
    sound2: "./sound/bapa.wav",
    ans: "2",
    bg: "./img/speakbubble-52.png",
    color: "black",
  },
  {
    question: "3-8",
    picture: "./img/mother.jpg",
    choose1: "ibu",
    choose2: "datuk",
    sound1: "./sound/ibu.wav",
    sound2: "./sound/datuk.wav",
    ans: "1",
    bg: "./img/speakbubble-53.png",
    color: "white",
  },
  {
    question: "4-8",
    picture: "./img/grandmother.jpg",
    choose1: "nenek",
    choose2: "bapa",
    sound1: "./sound/nenek.wav",
    sound2: "./sound/bapa.wav",
    ans: "1",
    bg: "./img/speakbubble-49.png",
    color: "black",
  },
  {
    question: "5-8",
    picture: "./img/younger brother.jpg",
    choose1: "adik lelaki",
    choose2: "bapa",
    sound1: "./sound/adik lelaki.wav",
    sound2: "./sound/bapa.wav",
    ans: "1",
    bg: "./img/speakbubble-49.png",
    color: "black",
  },
  {
    question: "6-8",
    picture: "./img/elder brother.jpg",
    choose1: "abang",
    choose2: "kakak",
    sound1: "./sound/abang.wav",
    sound2: "./sound/kakak.wav",
    ans: "1",
    bg: "./img/speakbubble-52.png",
    color: "white",
  },
  {
    question: "7-8",
    picture: "./img/younger sister.jpg",
    choose1: "adik perempuan",
    choose2: "adik lelaki",
    sound1: "./sound/adik perempuan.wav",
    sound2: "./sound/adik lelaki.wav",
    ans: "1",
    bg: "./img/speakbubble-53.png",
    color: "black",
  },
  {
    question: "8-8",
    picture: "./img/elder sister.jpg",
    choose1: "kakak",
    choose2: "ibu",
    sound1: "./sound/kakak.wav",
    sound2: "./sound/ibu.wav",
    ans: "1",
    bg: "./img/speakbubble-49.png",
    color: "white",
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
    "<div class='container' id='yeah' style='position: absolute; z-index: 4;top: 15px; left: 20px; margin: 0px 50px 0px 50px;'><img src='./img/yeah3.gif' style='height:100% ; width: 100%'/></div>";
  setTimeout('document.getElementById("yeah").remove()', 900);
}

function checkAnswer(clicked_id) {
  var user_ans = document.getElementById(clicked_id).value;
  if (user_ans === questions[iQuestion].ans) {
    playWord(clicked_id + "_sound");
    document.getElementById(clicked_id + "_ans_sound").hidden = false;
    document.getElementById(clicked_id + "_img").hidden = false;
    document.getElementById(clicked_id + "_img").innerHTML =
      "<img src='./img/tick.png' style='height: 100px; margin: 15px; position: absolute; right:-16%; top:-30%' id='tick'/>";
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
      "<img src='./img/wrong.png' style='height: 50px; margin: 15px; id='wrong''/>";
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
  document.getElementById(
    "image-whoAmI"
  ).style.backgroundImage = `url(${questions[iQuestion].bg})`;
  document.getElementById("image-whoAmI").style.color =
    questions[iQuestion].color;
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
