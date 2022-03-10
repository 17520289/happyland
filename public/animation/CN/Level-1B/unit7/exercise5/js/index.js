const questions = [
  {
    question: "1-7",
    picture: "./img/aeroplane.jpg",
    choose1: "飞机",
    choose2: "缆车",
    sound1: "./sound/aeroplane.wav",
<<<<<<< HEAD
    sound2: "./sound/cablecar.wav",
=======
    sound2: "./sound/cable car.wav",
>>>>>>> 57c03bfa5fb90d91997017bf9894290f4b9d12b1
    ans: "1",
  },
  {
    question: "2-7",
    picture: "./img/cruise.jpg",
    choose1: "油船",
    choose2: "邮轮",
<<<<<<< HEAD
    sound1: "./sound/tanker.wav",
=======
    sound1: "./sound/tanker ship.wav",
>>>>>>> 57c03bfa5fb90d91997017bf9894290f4b9d12b1
    sound2: "./sound/cruise.wav",
    ans: "2",
  },
  {
    question: "3-7",
    picture: "./img/cablecar.jpg",
    choose1: "潜水艇",
    choose2: "缆车",
    sound1: "./sound/submarine.wav",
    sound2: "./sound/cablecar.wav",
    ans: "2",
  },
  {
    question: "4-7",
    picture: "./img/helicopter.jpg",
    choose1: "直升机",
    choose2: "飞机",
    sound1: "./sound/helicopter.wav",
    sound2: "./sound/aeroplane.wav",
    ans: "1",
  },
  {
    question: "5-7",
    picture: "./img/tanker.jpg",
    choose1: "油船",
    choose2: "太空船",
    sound1: "./sound/tanker.wav",
    sound2: "./sound/spaceshuttle.wav",
    ans: "1",
  },
  {
    question: "6-7",
    picture: "./img/submarine.jpg",
    choose1: "潜水艇",
    choose2: "太空船",
    sound1: "./sound/submarine.wav",
    sound2: "./sound/spaceshuttle.wav",
    ans: "1",
  },
  {
    question: "7-7",
    picture: "./img/spaceshuttle.jpg",
    choose1: "太空船",
    choose2: "邮轮",
    sound1: "./sound/spaceshuttle.wav",
    sound2: "./sound/cruise.wav",
    ans: "1",
  },
];

<<<<<<< HEAD

=======
>>>>>>> 57c03bfa5fb90d91997017bf9894290f4b9d12b1
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
  $("#exercise").append(
    "<div class='container' id='yeah' style='position: absolute; z-index: 4;top: 15px; left: 20px; margin: 0px 50px 0px 50px;'><img src='../public/img/yeah3.gif' style='height: 600px'/></div>"
  );
  setTimeout('document.getElementById("yeah").remove()', 900);
}

function checkAnswer(clicked_id) {
  var user_ans = document.getElementById(clicked_id).value;
  if (user_ans === questions[iQuestion].ans) {
    playWord(clicked_id + "_sound");
    document.getElementById(clicked_id + "_ans_sound").hidden = false;
    document.getElementById(clicked_id + "_img").hidden = false;
    if (clicked_id === "buttonChoose1") {
      document.getElementById(clicked_id + "_img").innerHTML =
        "<img src='../public/img/tick.png' style='height: 100px;margin: 15px;position: absolute;right: 10%;top: 50%;z-index: 4;' id='tick'/>";
    } else {
      document.getElementById(clicked_id + "_img").innerHTML =
        "<img src='../public/img/tick.png' style='height: 100px;margin: 15px;position: absolute;right: 15%;top: 50%;z-index: 4;' id='tick'/>";
    }
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
    if (clicked_id === "buttonChoose1") {
      document.getElementById(clicked_id + "_img").innerHTML =
        "<img src='../public/img/wrong.png' style='height: 100px;margin: 15px;position: absolute;right: 10%;top: 50%;z-index: 4;' id='wrong'/>";
    } else {
      document.getElementById(clicked_id + "_img").innerHTML =
        "<img src='../public/img/wrong.png' style='height: 100px;margin: 15px;position: absolute;right: 15%;top: 50%;z-index: 4;' id='tick'/>";
    }
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
