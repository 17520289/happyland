const questions = [
  {
    id: 1,
    questionTitle: "1-5",
    picture: "./img/fruits/apple.png",
    sound: "audio/number/四.wav",
    answer: 4,
    question: 5,
    questionText: "四",
  },
  {
    id: 2,
    questionTitle: "2-5",
    picture: "./img/fruits/watermelon.png",
    sound: "audio/number/二.wav",
    answer: 2,
    question: 3,
    questionText: "二",
  },
  {
    id: 3,
    questionTitle: "3-5",
    picture: "./img/fruits/strewberry.png",
    sound: "audio/number/五.wav",
    answer: 5,
    question: 5,
    questionText: "五",
  },
  {
    id: 4,
    questionTitle: "4-5",
    picture: "./img/fruits/grape.png",
    sound: "audio/number/一.wav",
    answer: 1,
    question: 1,
    questionText: "一",
  },
  {
    id: 5,
    questionTitle: "5-5",
    picture: "./img/fruits/pear.png",
    sound: "audio/number/三.wav",
    answer: 3,
    question: 5,
    questionText: "三",
  },
];

const number = [
  {
    id: 1,
    number: 1,
    text: "一",
    sound: "audio/number/一.wav",
  },
  {
    id: 2,
    number: 2,
    text: "二",
    sound: "audio/number/二.wav",
  },
  {
    id: 3,
    number: 3,
    text: "三",
    sound: "audio/number/三.wav",
  },
  {
    id: 4,
    number: 4,
    text: "四",
    sound: "audio/number/四.wav",
  },
  {
    id: 5,
    number: 5,
    text: "五",
    sound: "audio/number/五.wav",
  },
];

var iQuestion = 0;
var kidClap = null;

getQuestion();
function playWord() {
  var audioElement = document.createElement("audio");
  audioElement.setAttribute("src", $("#sound").val());
  audioElement.play();
}

function playDrop() {
  var audioElement = document.createElement("audio");
  var audioElement1 = document.createElement("audio");
  audioElement.setAttribute("src", "./audio/shake.wav");
  audioElement1.setAttribute("src", "./audio/squeeze.wav");
  audioElement.play();
  setTimeout(function () {
    audioElement.paused;
    audioElement1.play();
  }, 600);
}

function playWrong() {
  var audioElement = document.createElement("audio");
  audioElement.setAttribute("src", "./audio/wrong.wav");
  audioElement.play();
}
function playCorrect() {
  var audioElement = document.createElement("audio");
  audioElement.setAttribute("src", "./audio/correct.wav");
  audioElement.play();
  $("#exercise").append(
    "<div class='container' id='yeah' style='position: absolute; top: 15px; left: 20px; margin: 0px 50px 0px 50px;'><img src='../public/img/yeah3.gif' style='height: 600px'/></div>"
  );
  setTimeout('$("#yeah").remove()', 900);
}

function checkAnswer(e) {
  var timeReturn = 0;
  for (let i = 1; i <= questions[iQuestion].answer; i++) {
    setTimeout(function () {
      var width = $(document).width() - $("#draggable" + i).width();
      $("#draggable" + i).animate(
        {
          left: 0,
          top: 0,
        },
        1000
      );

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

function getQuestion() {
  count = 0;
  clearInterval(kidClap);
  $("#image-kid").attr("src", "../public/img/kids.png");
  $("#block-fruits").empty();
  for (let i = questions[iQuestion].question; i > 0; i--) {
    // $('#block-fruits').prepend('<div class="row" style ="display: inline-block; padding: 10px;">')
    $("#block-fruits").prepend(
      '<div class="row image-item" style ="display: inline-block; padding: 10px;">' +
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
  }
  else{
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
