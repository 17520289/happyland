const questions = [
  {
    question: "1-7",
    picture: "./img/run.jpg",
    choose1: "跑",
    choose2: "读",
    sound1: "./sound/run.wav",
    sound2: "./sound/read.wav",
    ans: "1",
    bgChoose1: "./img/u8-A1.png",
    bgChoose2: "./img/u8-B1.png",
  },
  {
    question: "2-7",
    picture: "./img/walk.jpg",
    choose1: "飞",
    choose2: "走",
    sound1: "./sound/fly.wav",
    sound2: "./sound/walk.wav",
    ans: "2",
    bgChoose1: "./img/u8-A2.png",
    bgChoose2: "./img/u8-B2.png",
  },
  {
    question: "3-7",
    picture: "./img/sit.jpg",
    choose1: "坐",
    choose2: "跳",
    sound1: "./sound/sit.wav",
    sound2: "./sound/jump.wav",
    ans: "1",
    bgChoose1: "./img/u8-A3.png",
    bgChoose2: "./img/u8-B3.png",
  },
  {
    question: "4-7",
    picture: "./img/stand.jpg",
    choose1: "穿",
    choose2: "站",
    sound1: "./sound/wear.wav",
    sound2: "./sound/stand.wav",
    ans: "2",
    bgChoose1: "./img/u8-A1.png",
    bgChoose2: "./img/u8-B2.png",
  },
  {
    question: "5-7",
    picture: "./img/jump.jpg",
    choose1: "跑",
    choose2: "跳",
    sound1: "./sound/run.wav",
    sound2: "./sound/jump.wav",
    ans: "2",
    bgChoose1: "./img/u8-A2.png",
    bgChoose2: "./img/u8-B1.png",
  },
  {
    question: "6-7",
    picture: "./img/wear.jpg",
    choose1: "穿",
    choose2: "跑",
    sound1: "./sound/wear.wav",
    sound2: "./sound/run.wav",
    ans: "1",
    bgChoose1: "./img/u8-A2.png",
    bgChoose2: "./img/u8-B3.png",
  },
  {
    question: "7-7",
    picture: "./img/fly.jpg",
    choose1: "走",
    choose2: "飞",
    sound1: "./sound/walk.wav",
    sound2: "./sound/fly.wav",
    ans: "2",
    bgChoose1: "./img/u8-A3.png",
    bgChoose2: "./img/u8-B2.png",
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
  document.getElementById("dog").src = "./img/u8-sad.gif";
  document.getElementById("dog1").src = "./img/u8-sad.gif";
}
function playCorrect() {
  var audioElement = document.createElement("audio");
  audioElement.setAttribute("src", "./sound/correct.wav");
  audioElement.play();
  $("#exercise").append(
    "<div class='container' id='yeah' style='position: absolute; z-index: 4;bottom:0; left: 0;'><img src='../public/img/yeah3.gif' style='height: 300px'/></div>"
  );
  setTimeout('document.getElementById("yeah").remove()', 900);
  document.getElementById("dog").src = "./img/u8-yeah.gif";
  document.getElementById("dog1").src = "./img/u8-yeah.gif";
}

function checkAnswer(clicked_id) {
  var user_ans = document.getElementById(clicked_id).value;
  if (user_ans === questions[iQuestion].ans) {
    playWord(clicked_id + "_sound");
    document.getElementById(clicked_id + "_ans_sound").hidden = false;
    document.getElementById(clicked_id + "_img").hidden = false;
    document.getElementById(clicked_id + "_img").innerHTML =
      "<img src='../public/img/tick.png' style='height: 100px;margin: 15px;position: absolute;right: 28%;top: 90%;z-index: 4;' id='tick'/>";
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
      "<img src='../public/img/wrong.png' style='height: 100px;margin: 15px;position: absolute;right: 28%;top: 90%;z-index: 4;' id='wrong'/>";
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
  document.getElementById("bgChoose1").src = questions[iQuestion].bgChoose1;
  document.getElementById("bgChoose2").src = questions[iQuestion].bgChoose2;
  document.getElementById("dog").src = "./img/u8-normal.gif";
  document.getElementById("dog1").src = "./img/u8-normal.gif";
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
