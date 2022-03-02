const questions = [
  {
    id: 1,
    questionTitle: "1-7",
    question: [
      {
        id: 1,
        questionTitle: "A",
        picture: "./img/sevenstone.jpg",
        text: "batu seremban",
        sound: "sound/games/batu seremban.wav",
        stt: 2,
        col: 6,
      }
    ],
    answer: [
      {
        id: 1,
        sound: "sound/games/tarik tali.wav",
        text: "tarik tali",
        col: 8,
      },
      {
        id: 2,
        sound: "sound/games/batu seremban.wav",
        text: "batu seremban",
        col: 8,
      }
    ],
  },
  {
    id: 2,
    questionTitle: "2-7",
    question: [
      {
        id: 1,
        questionTitle: "A",
        picture: "./img/tug-of-war.jpg",
        text: "tarik tali",
        sound: "sound/games/tarik tali.wav",
        stt: 2,
        col: 6,
      }
    ],
    answer: [
      {
        id: 1,
        sound: "sound/games/tarik tali.wav",
        text: "tarik tali",
        col: 8,
      },
      {
        id: 2,
        sound: "sound/games/lari ikat kaki.wav",
        text: "lari ikat kaki",
        col: 8,
      },
    ],
  },
  {
    id: 3,
    questionTitle: "3-7",
    question: [
      {
        id: 1,
        questionTitle: "A",
        picture: "./img/rope skipping.jpg",
        text: "lompat tali",
        sound: "sound/games/lompat tali.wav",
        stt: 1,
        col: 6,
      }
    ],
    answer: [
      {
        id: 1,
        sound: "sound/games/lari dalam guni.wav",
        text: "lari dalam guni",
        col: 8,
      },
      {
        id: 2,
        sound: "sound/games/lompat tali.wav",
        text: "lompat tali",
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
  $("#exercise").append(
    "<div class='container' id='yeah1' style='position: absolute; top: 230px; right: 20px; margin: 0px 50px 0px 50px; z-index:1;'><img src='./img/win-star.png' style='height: 300px'/></div>"
  );
  setTimeout('$("#yeah1").remove()', 900);
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
  $("#block-games").empty();

  for (let i = 0; i < questions[iQuestion].question.length; i++) {
    $("#block-games").append(
      '<div class="col-md-' +
        questions[iQuestion].question[i].col +
        '">' +
        '<div class="img-description">' +
        '<img src="' +
        questions[iQuestion].question[i].picture +
        '" alt="" class="games">' +
        '<input class="games-input" id="InputAnswer' +
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
        '<span alt="" class="games-text" id="draggable' +
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
  $(".games-input").droppable({
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
