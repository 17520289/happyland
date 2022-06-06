const questions = [
  {
    question: "1-7  ",
    picture: "./img/rice.png",
    choose1: "饭",
    choose2: "牛奶",
    sound1: "./CN/sound/rice.wav",
    sound2: "./CN/sound/milk.wav",
    ans: "1",
  },
  {
    question: "2-7  ",
    picture: "./img/bread.png",
    choose1: "乳酪",
    choose2: "面包",
    sound1: "./CN/sound/cheese.wav",
    sound2: "./CN/sound/bread.wav",
    ans: "2",
  },
  {
    question: "3-7 ",
    picture: "./img/egg.png",
    choose1: "肉类",
    choose2: "鸡蛋",
    sound1: "./CN/sound/meat.wav",
    sound2: "./CN/sound/egg.wav",
    ans: "2",
  },
  {
    question: "4-7 ",
    picture: "./img/biscuit.png",
    choose1: "饼",
    choose2: "面包",
    sound1: "./CN/sound/biscuit.wav",
    sound2: "./CN/sound/bread.wav",
    ans: "1",
  },
  {
    question: "5-7 ",
    picture: "./img/milk.png",
    choose1: "饭",
    choose2: "牛奶",
    sound1: "./CN/sound/rice.wav",
    sound2: "./CN/sound/milk.wav",
    ans: "2",
  },
  {
    question: "6-7 ",
    picture: "./img/cheese.png",
    choose1: "乳酪",
    choose2: "面包",
    sound1: "./CN/sound/cheese.wav",
    sound2: "./CN/sound/bread.wav",
    ans: "1",
  },
  {
    question: "7-7 ",
    picture: "./img/meat.png",
    choose1: "肉类",
    choose2: "鸡蛋",
    sound1: "./CN/sound/meat.wav",
    sound2: "./CN/sound/egg.wav",
    ans: "1",
  },
];

var unit ={
  "title" : "单元六：食物",
  "decription": "Choose the correct answers."
}

$(function() {
  $("[lang]").each(function (index) {
    $(this).html(unit[$(this).attr("lang")]);
  });
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
    "<div class='container' id='yeah1' style='position: absolute; bottom: 100px; left: 20px; margin: 0px 50px 0px 50px; z-index:1;'><img src='../public/img/yeah.png' style='height: 300px'/></div>"
  );
  setTimeout('$("#yeah1").remove()', 900);
  document.getElementsByClassName(
    "exercise3__ans__choose"
  ).style.animationPlayState = "paused";
}

function checkAnswer(clicked_id) {
  var user_ans = document.getElementById(clicked_id).value;
  if (user_ans === questions[iQuestion].ans) {
    playWord(clicked_id + "_sound");
    document.getElementById(clicked_id + "_ans_sound").hidden = false;
    document.getElementById(clicked_id + "_img").hidden = false;
    document.getElementById(clicked_id + "_img").innerHTML =
      "<img src='../public/img/tick.png' style='height: 100px; margin: 15px; position: absolute; right:-16%; top:-30%' id='tick'/>";
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
      "<img src='../public/img/wrong.png' style='height: 50px; margin: 15px; id='wrong''/>";
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