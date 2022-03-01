const questions = [
  {
    id: 1,
    questionTitle: "1-5",
    question: [
      {
        id: 1,
        questionTitle: "A",
        picture: "./img/see-saw.png",
        text: "jongkang-jongket",
        sound: "sound/park/jongkang-jongket.wav",
        stt: 2,
        col: 6,
      }
    ],
    answer: [
      {
        id: 1,
        sound: "sound/park/jongkang-jongket.wav",
        text: "jongkang-jongket",
        col: 8,
      },
      {
        id: 2,
        sound: "sound/park/taman permainan.wav",
        text: "taman permainan",
        col: 8,
      }
    ],
  },
  {
    id: 2,
    questionTitle: "2-5",
    question: [
      {
        id: 1,
        questionTitle: "A",
        picture: "./img/slide.png",
        text: "gelongsor",
        sound: "sound/park/gelongsor.wav",
        stt: 2,
        col: 6,
      }
    ],
    answer: [
      {
        id: 1,
        sound: "sound/park/besi gayut.wav",
        text: "besi gayut",
        col: 8,
      },
      {
        id: 2,
        sound: "sound/park/gelongsor.wav",
        text: "gelongsor",
        col: 8,
      },
    ],
  },
  {
    id: 3,
    questionTitle: "3-5",
    question: [
      {
        id: 1,
        questionTitle: "A",
        picture: "./img/swing.png",
        text: "buaian",
        sound: "sound/park/buaian.wav",
        stt: 1,
        col: 6,
      }
    ],
    answer: [
      {
        id: 1,
        sound: "sound/park/buaian.wav",
        text: "buaian",
        col: 8,
      },
      {
        id: 2,
        sound: "sound/park/besi gayut.wav",
        text: "besi gayut",
        col: 8,
      },
    ],
  },
];

var iQuestion = 0;
var answerCorrect = 0;
var ansAB =['A','B']

getQuestion();
function playAnswer() {
  var audioElement = document.createElement("audio");
  audioElement.setAttribute("src", questions[iQuestion].question[0].sound);
  audioElement.play();
}
function playWord(i) {
  var audioElement = document.createElement("audio");
  audioElement.setAttribute("src", questions[iQuestion].answer[i].sound);
  audioElement.play();
}

function playDrop() {
  var audioElement = document.createElement("audio");
  var audioElement1 = document.createElement("audio");
  audioElement.setAttribute("src", "./sound/shake.wav");
  audioElement1.setAttribute("src", "./sound/squeeze.wav");
  audioElement.play();
  setTimeout(function () {
    audioElement.paused;
    audioElement1.play();
  }, 600);
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
    "<div class='container' id='yeah' style='position: absolute; z-index: 4;top: 15px; left: 20px; margin: 0px 50px 0px 50px;'><img src='../public/img/yeah3.gif' style='height: 600px'/></div>";
  setTimeout('document.getElementById("yeah").remove()', 900);

}

function checkAnswer(e) {
  if (answerCorrect == questions[iQuestion].question.length) {
    playCorrect();
  } else {
    playWrong();
  }
}

function getQuestion() {
  $("#image-kid").attr("src", "img/kids.png");
  $("#block-park").empty();

  for (let i = 0; i < questions[iQuestion].question.length; i++) {
    $("#block-park").append(
      '<div class="col-md-' +
        questions[iQuestion].question[i].col +
        '">' +
        '<div class="img-description">' +
        '<img src="' +
        questions[iQuestion].question[i].picture +
        '" alt="" class="park">' +
        '<input class="park-input" id="InputAnswer' +
        i +
        '" data-text="' +
        questions[iQuestion].question[i].text +
        '" readonly>' +
        "</div>" +
        "</div>"
    );
  }

  $("#block-answer").empty();

  for (let i = 0; i < questions[iQuestion].answer.length; i++) {
    $("#block-answer").append(
      '<div class="drag-answer col-md-' +
        questions[iQuestion].answer[i].col +
        '"'+
        'id="draggable' +i + '"' +
        '>' +
        '<div class="ans__ab">'+ansAB[i] +'</div>' +
        '<span alt="" class="park-text" id="draggable' +
        i +
        '" data-text="' +
        questions[iQuestion].answer[i].text +
        '" data-index="' + i +
        '">' +
        questions[iQuestion].answer[i].text +
        "</span>" +
        "</div>"
    );
    $("#block-answer").append('<div class="clearfix"></div>')
  }

  for (let i = 0; i < questions[iQuestion].answer.length; i++) {
    $("#draggable" + i).draggable({
      cursor: "move",
      revert: "invalid",
      start: function (event, ui) {},
      stop: function () {
        
      },
    });
  }
  answerCorrect = 0;
  $(".park-input").droppable({
    drop: function (event, ui) {
      var i =  $(ui.draggable).children().next().attr("data-index");
      playWord(i);
      $(this).css("background-color", "#FF99D5");
      var answerDrop = $(ui.draggable).children().next().attr("data-text");
      var answer = $(this).attr("data-text");
      $(this).parent().find('#correct').remove();
      $(this).parent().find('#wrong').remove();
      if (answerDrop === answer) {
        ++answerCorrect;
        $(this)
        .parent()
        .append(
          "<img src='../public/img/tick.png' style='height: 50px; margin: 15px;' id='correct'/>"
        );
        $(ui.draggable).draggable('disable');
        playCorrect();
      } else {
        $(this)
          .parent()
          .append(
            "<img src='../public/img/wrong.png' style='height: 50px; margin: 15px;' id='wrong'/>"
          );
        var audioElement = document.createElement("audio");
        audioElement.setAttribute("src", "./sound/wrong.wav");
        audioElement.play();

         $(ui.draggable).css({ top: 0, left: 0 })

      }
    },
    out: function (event, ui) {},
  });

  $("#markboard").text(questions[iQuestion].questionTitle);

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

function nextQuestion(e) {
  ++iQuestion;
  getQuestion();
}

function backQuestion() {
  --iQuestion;
  getQuestion();
}
