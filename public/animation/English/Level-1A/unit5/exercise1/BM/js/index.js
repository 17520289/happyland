const questions = [
  {
    id: 1,
    questionTitle: "1-5",
    picture: "./img/fruits/apple.png",
    sound: "./BM/audio/number/empat.wav",
    answer: 4,
    question: 5,
    questionText: "empat",
  },
  {
    id: 2,
    questionTitle: "2-5",
    picture: "./img/fruits/watermelon.png",
    sound: "./BM/audio/number/dua.wav",
    answer: 2,
    question: 3,
    questionText: "dua",
  },
  {
    id: 3,
    questionTitle: "3-5",
    picture: "./img/fruits/strewberry.png",
    sound: "./BM/audio/number/lima.wav",
    answer: 5,
    question: 5,
    questionText: "lima",
  },
  {
    id: 4,
    questionTitle: "4-5",
    picture: "./img/fruits/grape.png",
    sound: "./BM/audio/number/satu.wav",
    answer: 1,
    question: 1,
    questionText: "satu",
  },
  {
    id: 5,
    questionTitle: "5-5",
    picture: "./img/fruits/pear.png",
    sound: "./BM/audio/number/tiga.wav",
    answer: 3,
    question: 5,
    questionText: "tiga",
  },
];

const number = [
  {
    id: 1,
    number: 1,
    text: "satu",
    sound: "./BM/audio/number/satu.wav",
  },
  {
    id: 2,
    number: 2,
    text: "dua",
    sound: "./BM/audio/number/dua.wav",
  },
  {
    id: 3,
    number: 3,
    text: "tiga",
    sound: "./BM/audio/number/tiga.wav",
  },
  {
    id: 4,
    number: 4,
    text: "empat",
    sound: "./BM/audio/number/empat.wav",
  },
  {
    id: 5,
    number: 5,
    text: "lima",
    sound: "./BM/audio/number/lima.wav",
  },
];

var unit = {
  "title": "Unit 5: Nombor dan Bentuk",
  "decription": "Collect the correct numbers into basket",
}
$(function() {
  $("[lang]").each(function (index) {
    $(this).html(unit[$(this).attr("lang")]);
  });
});

var iQuestion = 0;
var kidClap = null;

getQuestion();
init();
function init() {
  $("#exercise").append(
    "<div class='container' id='hand' style='position: absolute; top: 500px; left: 0px;'><img id='handImg' src='../public/img/hand-97.png' style='height: 80px'/></div>"
  );

  setTimeout(animationInit, 1000);
}

function animationInit() {
  setTimeout('$("#handImg").attr("src", "../public/img/hand-98.png")', 500);
  setTimeout('$("#handImg").attr("src", "../public/img/hand-97.png")', 1000);
  setTimeout('$("#handImg").attr("src", "../public/img/hand-98.png")', 1500);
  setTimeout('$("#hand").remove()', 2500);
}

function playWord() {
  var audioElement = document.createElement("audio");
  audioElement.setAttribute("src", $("#sound").val());
  audioElement.play();
}

function playDrop() {
  var audioElement = document.createElement("audio");
  var audioElement1 = document.createElement("audio");
  audioElement.setAttribute("src", "../public/audio/shake.wav");
  audioElement1.setAttribute("src", "../public/audio/squeeze.wav");
  audioElement.play();
  setTimeout(function () {
    audioElement.paused;
    audioElement1.play();
  }, 600);
}

function playWrong() {
  var audioElement = document.createElement("audio");
  audioElement.setAttribute("src", "../public/audio/wrong.wav");
  audioElement.play();
}
function playCorrect() {
  var audioElement = document.createElement("audio");
  audioElement.setAttribute("src", "../public/audio/correct.wav");
  audioElement.play();
  $("#exercise").append(
    "<div class='container' id='yeah' style='position: absolute; top: 15px; left: 20px; margin: 0px 50px 0px 50px; z-index: 2'><img src='../public/img/yeah3.gif' style='height: 1000px;'/></div>"
  );
  setTimeout('$("#yeah").remove()', 900);
}

function checkAnswer(e) {
  var timeReturn = 0;
  for (let i = 1; i <= questions[iQuestion].answer; i++) {
    setTimeout(async function () {
      var width = $(document).width() - $("#draggable" + i).width();
      $("#draggable" + i).animate(
        {
          left: 0,
          top: 0,
        },
        1000
      );
      await sleep(1000);
      var audioElement = document.createElement("audio");
      audioElement.setAttribute("src", number[i - 1].sound);
      audioElement.play();
    }, timeReturn);

    setTimeout(function () {
      $("#TextNumber" + i).show();
      $("#TextNumber" + i).css("z-index", "4");
    }, timeReturn + 1000);

    timeReturn += 1000;
  }

  if (count == questions[iQuestion].answer) {
    playCorrect();
    var images = ["../public/img/kidsClap.png", "../public/img/kidsClap2.png"];
    var current = 0;
    kidClap = setInterval(function () {
      $("#image-kid").attr("src", images[current]);
      current = current < images.length - 1 ? current + 1 : 0;
    }, 200);
  } else {
    playWrong();
  }
}

async function getQuestion() {
  count = 0;
  clearInterval(kidClap);
  $("#image-kid").attr("src", "../public/img/kids.png");
  $("#block-fruits").empty();
  for (let i = questions[iQuestion].question; i > 0; i--) {
    // $('#block-fruits').prepend('<div class="row" style ="display: inline-block; padding: 10px;">')
    $("#block-fruits").prepend(
      '<div class="row image-item" style ="display: inline-block; padding: 10px;" onmouseover="PlaySound(`soundPopOut`)"onmouseout="StopSound(`soundPopOut`)">' +
        '<img src="' +
        questions[iQuestion].picture +
        '" alt="" class="fruits" id="draggable' +
        i +
        '">' +
        '<span alt="" class="fruits-text" id="TextNumber' +
        i +
        '">' +
        "</div>"
    );

    $("#TextNumber" + i).text(number[i - 1].text);

    $("#draggable" + i).draggable({
      cursor: "move",
      revert: "invalid",
      start: function (event, ui) {
        $(this).css("z-index", "3");
      },
      stop: function () {
        $(this).css("z-index", "1");
      },
    });
  }
  $("#question-text").text(questions[iQuestion].questionText);
  $("#markboard").text(questions[iQuestion].questionTitle);
  $("#sound").val(questions[iQuestion].sound);
  await sleep(1000);
  playWord();

  if (iQuestion === 0) {
    document.getElementById("backButton").hidden = true;
  } else {
    document.getElementById("backButton").hidden = false;
  }
  if (iQuestion === questions.length - 1) {
    // document.getElementById("nextButton").hidden = true;
  } else {
    document.getElementById("nextButton").hidden = false;
  }
}

function nextQuestion(e) {
  checkAnswer(e);
  $("#nextButton").prop("disabled", true);
  var timeChangeNextQuestion = questions[iQuestion].answer * 1000 + 1000;

  if (iQuestion === questions.length - 1) {
    document.getElementById("nextButton").hidden = true;
  } else {
    setTimeout(function () {
      getQuestion();
      $("#nextButton").prop("disabled", false);
    }, timeChangeNextQuestion);
    ++iQuestion;
  }
}

function backQuestion() {
  --iQuestion;
  getQuestion();
  $("#nextButton").prop("disabled", false);
}
