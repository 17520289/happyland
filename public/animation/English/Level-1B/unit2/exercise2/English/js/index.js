const questions = [
  {
    question: "1-7",
    picture: "./img/pencil.png",
    choose1: "book",
    choose2: "pencil",
    sound1: "./English/sound/book.wav",
    sound2: "./English/sound/pencil.wav",
    ans: "2",
  },
  {
    question: "2-7",
    picture: "./img/ruler.png",
    choose1: "ruler",
    choose2: "clock",
    sound1: "./English/sound/ruler.wav",
    sound2: "./English/sound/clock.wav",
    ans: "1",
  },
  {
    question: "3-7",
    picture: "./img/eraser.png",
    choose1: "map",
    choose2: "eraser",
    sound1: "./English/sound/map.wav",
    sound2: "./English/sound/eraser.wav",
    ans: "2",
  },
  {
    question: "4-7",
    picture: "./img/color pencil.png",
    choose1: "scissors",
    choose2: "colour pencil",
    sound1: "./English/sound/scissors.wav",
    sound2: "./English/sound/colour pencil.wav",
    ans: "2",
  },
  {
    question: "5-7",
    picture: "./img/crayon.png",
    choose1: "crayon",
    choose2: "pencil",
    sound1: "./English/sound/crayon.wav",
    sound2: "./English/sound/pencil.wav",
    ans: "1",
  },
  {
    question: "6-7",
    picture: "./img/pencil sharpener.png",
    choose1: "pencil case",
    choose2: "pencil sharpener",
    sound1: "./English/sound/pencil case.wav",
    sound2: "./English/sound/pencil sharpener.wav",
    ans: "2",
  },
  {
    question: "7-7",
    picture: "./img/pen.png",
    choose1: "pen",
    choose2: "ruler",
    sound1: "./English/sound/pen.wav",
    sound2: "./English/sound/ruler.wav",
    ans: "1",
  },
];

var unit ={
  "title" : "Unit 2: Classroom",
  "description": "Choose the correct answers."
}

$("[lang]").each(function (index) {
  $(this).html(unit[$(this).attr("lang")]);
});

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
  audioElement.setAttribute("src", "../public/sound/wrong.wav");
  audioElement.play();
}
function playCorrect() {
  var audioElement = document.createElement("audio");
  audioElement.setAttribute("src", "../public/sound/correct.wav");
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
    clicked_id === "buttonChoose1"
      ? (document.getElementById(clicked_id + "_img").innerHTML =
          "<img src='../public/img/tick.png' style='height: 80px;margin: 15px;position: absolute;right: -5%;z-index: 3;top: 70%;' id='tick'/>")
      : (document.getElementById(clicked_id + "_img").innerHTML =
          "<img src='../public/img/tick.png' style='height: 80px;margin: 15px;position: absolute;left: -5%;z-index: 3;top: 70%;' id='tick'/>");
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
    clicked_id === "buttonChoose1"
      ? (document.getElementById(clicked_id + "_img").innerHTML =
          "<img src='../public/img/wrong.png' style='height: 80px;margin: 15px;position: absolute;right: -5%;z-index: 3;top: 50%;' id='wrong'/>")
      : (document.getElementById(clicked_id + "_img").innerHTML =
          "<img src='../public/img/wrong.png' style='height: 80px;margin: 15px;position: absolute;left: -5%;z-index: 3;top: 50%;' id='wrong'/>");

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
