const questions = [
  {
    question: "1-6  ",
    picture: "./img/hair.png",
    choose1: "头发",
    choose2: "鼻子",
    sound1: "./sound/hair.wav",
    sound2: "./sound/nose.wav",
    ans: "1",
  },
  {
    question: "2-6  ",
    picture: "./img/eyebrow.png",
    choose1: "嘴唇",
    choose2: "眉毛",
    sound1: "./sound/lip.wav",
    sound2: "./sound/eyebrow.wav",
    ans: "2",
  },
  {
    question: "3-6 ",
    picture: "./img/eye.png",
    choose1: "额头",
    choose2: "眼睛",
    sound1: "./sound/forehead.wav",
    sound2: "./sound/eye.wav",
    ans: "2",
  },
  {
    question: "4-6 ",
    picture: "./img/mouth.png",
    choose1: "口",
    choose2: "耳朵",
    sound1: "./sound/mouth.wav",
    sound2: "./sound/ear.wav",
    ans: "1",
  },
  {
    question: "5-6 ",
    picture: "./img/nose.png",
    choose1: "下巴",
    choose2: "鼻子",
    sound1: "./sound/chin.wav",
    sound2: "./sound/nose.wav",
    ans: "2",
  },
  {
    question: "6-6 ",
    picture: "./img/ear.png",
    choose1: "耳朵",
    choose2: "眼睛",
    sound1: "./sound/ear.wav",
    sound2: "./sound/eye.wav",
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
    "<div class='container' id='yeah' style='position: absolute; z-index: 4;top: 15px; left: 20px; margin: 0px 50px 0px 50px;'><img src='./img/yeah3.gif' style='height: 600px'/></div>";
  setTimeout('document.getElementById("yeah").remove()', 900);
  // $("#exercise").append(
  //   "<div class='container' id='yeah1' style='position: absolute; top: 230px; left: 20px; margin: 0px 50px 0px 50px; z-index:1;'><img src='./img/blue-ice.png' style='height: 300px'/></div>" +
  //     "<div class='container' id='yeah2' style='position: absolute; top: 230px; left: 230px; margin: 0px 50px 0px 50px;z-index:1;'><img src='./img/pink-ice.png' style='height: 300px'/></div>"
  // );
  // setTimeout('$("#yeah1").remove()', 900);
  // setTimeout('$("#yeah2").remove()', 900);
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
