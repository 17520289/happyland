const questions = [
  {
    question: "1-6",
    picture: "./img/shirt.jpg",
    choose1: "shirt",
    choose2: "pajamas",
    sound1: "./sound/shirt.wav",
    sound2: "./sound/pajamas.wav",
    ans: "1",
  },
  {
    question: "2-6",
    picture: "./img/tshirt.jpg",
    choose1: "singlet",
    choose2: "t-shirt",
    sound1: "./sound/singlets.wav",
    sound2: "./sound/T-shirt.wav",
    ans: "2",
  },
  {
    question: "3-6",
    picture: "./img/blouse.jpg",
    choose1: "blouse",
    choose2: "uniform",
    sound1: "./sound/blouse.wav",
    sound2: "./sound/uniform.wav",
    ans: "1",
  },
  {
    question: "4-6",
    picture: "./img/singlets.jpg",
    choose1: "singlets",
    choose2: "sandals",
    sound1: "./sound/singlets.wav",
    sound2: "./sound/sandals.wav",
    ans: "1",
  },
  {
    question: "5-6",
    picture: "./img/coat.jpg",
    choose1: "glove",
    choose2: "coat",
    sound1: "./sound/glove.wav",
    sound2: "./sound/coat.wav",
    ans: "2",
  },
  {
    question: "6-6",
    picture: "./img/pants.jpg",
    choose1: "necktie",
    choose2: "pants",
    sound1: "./sound/necktie.wav",
    sound2: "./sound/pants.wav",
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
  $("#exercise").append(
    "<div class='container' id='yeah' style='position: absolute; z-index: 4;top: 15px; left: 20px; margin: 0px 50px 0px 50px;'><img src='../public/img/yeah3.gif' style='width:100%'/></div>"
  );
  setTimeout('document.getElementById("yeah").remove()', 900);
}

function checkAnswer(clicked_id) {
  var user_ans = document.getElementById(clicked_id).value;
  if (user_ans === questions[iQuestion].ans) {
    playWord(clicked_id + "_sound");
    document.getElementById(clicked_id + "_ans_sound").hidden = false;
    document.getElementById(clicked_id + "_img").hidden = false;
    if (clicked_id === "buttonChoose2") {
      document.getElementById(clicked_id + "_img").innerHTML =
        "<img src='../public/img/tick.png' style='height: 100px;margin: 15px;position: absolute;left: 5%;top: 10%;z-index: 4;' id='tick'/>";
    } else {
      document.getElementById(clicked_id + "_img").innerHTML =
        "<img src='../public/img/tick.png' style='height: 100px;margin: 15px;position: absolute;right: 5%;top: 10%;z-index: 4;' id='tick'/>";
    }

    console.log("đáp án đúng", user_ans === 1);
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
    if (clicked_id === "buttonChoose2") {
      document.getElementById(clicked_id + "_img").innerHTML =
        "<img src='../public/img/wrong.png' style='height: 100px;margin: 15px;position: absolute;right: 5%;top: 10%;z-index: 4;' id='wrong'/>";
    } else {
      document.getElementById(clicked_id + "_img").innerHTML =
        "<img src='../public/img/wrong.png' style='height: 100px;margin: 15px;position: absolute;left: 5%;top: 10%;z-index: 4;' id='wrong'/>";
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
  document.getElementById("exercise").innerHTML +=
    "<div class='container' id='yeah'</div>";
  setTimeout('document.getElementById("yeah").remove()', 900);
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
