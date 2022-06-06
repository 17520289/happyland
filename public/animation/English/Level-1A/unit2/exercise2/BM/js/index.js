const questions = [
  {
    id: 1,
    question: "1-7",
    picture: "./img/theface/sideburns.jpg",
    sound: "./BM/audio/theface/bauk.wav",
    ans: "5",
  },
  {
    id: 2,
    question: "2-7",
    picture: "./img/theface/teeth.jpg",
    sound: "./BM/audio/theface/gigi.wav",
    ans: "1",
  },
  {
    id: 3,
    question: "3-7",
    picture: "./img/theface/cheek.jpg",
    sound: "./BM/audio/theface/pipi.wav",
    ans: "4",
  },
  {
    id: 4,
    question: "4-7",
    picture: "./img/theface/lips.jpg",
    sound: "./BM/audio/theface/bibir.wav",
    ans: "2",
  },
  {
    id: 5,
    question: "5-7",
    picture: "./img/theface/forehead.jpg",
    sound: "./BM/audio/theface/dahi.wav",
    ans: "7",
  },
  {
    id: 6,
    question: "6-7",
    picture: "./img/theface/chin.jpg",
    sound: "./BM/audio/theface/dagu.wav",
    ans: "3",
  },
  {
    id: 7,
    question: "7-7",
    picture: "./img/theface/tongue.jpg",
    sound: "./BM/audio/theface/lidah.wav",
    ans: "6",
  },
];

const answers = [
  {
    id: 1,
    title: "1.gigi",
    sound: "./BM/audio/theface/gigi.wav",
  },
  {
    id: 2,
    title: "2.bibir",
    sound: "./BM/audio/theface/bibir.wav",
  },
  {
    id: 3,
    title: "3.dagu",
    sound: "./BM/audio/theface/dagu.wav",
  },
  {
    id: 4,
    title: "4.pipi",
    sound: "./BM/audio/theface/pipi.wav",
  },
  {
    id: 5,
    title: "5.bauk",
    sound: "./BM/audio/theface/bauk.wav",
  },
  {
    id: 6,
    title: "6.lidah",
    sound: "./BM/audio/theface/lidah.wav",
  },
  {
    id: 7,
    title: "7.dahi",
    sound: "./BM/audio/theface/dahi.wav",
  },
];

var unit ={
  "title" : "Unit 2: Muka",
  "decription": "Drag the correct answer into the blank shape"
}

$("[lang]").each(function (index) {
  $(this).html(unit[$(this).attr("lang")]);
});
var iQuestion = 0;

getQuestion();
function playWord(audio_id) {
  var audioElement = document.createElement("audio");
  audioElement.setAttribute("src", answers[--audio_id].sound);
  audioElement.play();
}

function playWordCurrent() {
  var audioElement = document.createElement("audio");
  audioElement.setAttribute("src", questions[iQuestion].sound);
  audioElement.play();
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
  document.getElementById("exercise").innerHTML +=
    "<div class='container' id='yeah' style='position: absolute; top: 15px; left: 20px; margin: 0px 50px 0px 50px; z-index: 4;'><img src='../public/img/yeah3.gif' style='width:100%'/></div>";
  setTimeout('$("#yeah").remove()', 900);
}

function checkAnswer(e) {
  var user_ans = $(e).attr("data-id");
  var question = $("#image").attr("data-id");
  playWord(user_ans);
  var answer = questions[--question].ans;
  if (user_ans === answer) {
    var audioElement = document.createElement("audio");
    document.getElementById("exercise2__ans__img").innerHTML =
      "<img src='../public/img/tick.png' style='position:relative; z-index:8; height: 50px; margin: 15px' id='tick'/>";
    setTimeout(playCorrect, 700);
    audioElement.setAttribute("src", "../public/sound/magic.wav");
    audioElement.play();
  } else {
    document.getElementById("exercise2__ans__img").innerHTML =
      "<img src='../public/img/wrong.png' style='position:relative;  z-index:8; height: 50px; margin: 15px;' id='wrong''/>";
    setTimeout(playWrong, 500);
    setTimeout('$("#wrong").remove()', 500);
  }
}

function getQuestion() {
  document.getElementById("image").src = questions[iQuestion].picture;
  $("#image").attr("data-id", questions[iQuestion].id);
  var i = 0;
  // console.log(iQuestion)
  $.each(answers, function (key, value) {
    i = key + 1;
    $("#draggable" + i).css("left", 0);
    $("#draggable" + i).css("top", 0);
    $("#draggable" + i).text(value.title);
    $("#draggable" + i).draggable({
      start: function (event, ui) {
        $(this).css("z-index", i++);
      },
    });
    $("#draggable" + i).draggable("enable");
    $("#draggable" + i).css("opacity", "1");
  });
  $.each(answers, function (key, value) {
    if (key < iQuestion) {
      var questionDisable = questions[key].ans;
      $("#draggable" + questionDisable).draggable("disable");
      $("#draggable" + questionDisable).css("opacity", "0.5");
    }
  });

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
  $("#tick").remove();
}

function nextQuestion() {
  ++iQuestion;
  document.getElementById("image").src = questions[iQuestion].picture;
  $("#image").attr("data-id", questions[iQuestion].id);
  getQuestion();
}

function backQuestion() {
  --iQuestion;
  document.getElementById("image").src = questions[iQuestion].picture;
  $("#image").attr("data-id", questions[iQuestion].id);
  getQuestion();
}