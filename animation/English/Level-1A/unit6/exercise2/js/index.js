const questions = [
  {
    id: 1,
    questionTitle: "1-3",
    question: [
      {
        id: 1,
        questionTitle: "A",
        picture: "./img/dessert.jpg",
        text: "Dessert",
        sound: "sound/foods/dessert.wav",
        stt: 2,
        col: 4,
      },
      {
        id: 2,
        questionTitle: "B",
        picture: "./img/cereal.jpg",
        text: "Cereal",
        sound: "sound/foods/cereal.wav",
        stt: 3,
        col: 4,
      },
      {
        id: 3,
        questionTitle: "C",
        picture: "./img/bean.jpg",
        text: "Bean",
        sound: "sound/foods/bean.wav",
        stt: 1,
        col: 4,
      },
    ],
    answer: [
      {
        id: 1,
        sound: "sound/foods/bean.wav",
        text: "Bean",
        col: 4,
      },
      {
        id: 2,
        sound: "sound/foods/dessert.wav",
        text: "Dessert",
        col: 4,
      },
      {
        id: 3,
        sound: "sound/foods/cereal.wav",
        text: "Cereal",
        col: 4,
      },
    ],
  },
  {
    id: 2,
    questionTitle: "2-3",
    question: [
      {
        id: 1,
        questionTitle: "A",
        picture: "./img/fruits.jpg",
        text: "Fruits",
        sound: "sound/foods/fruits.wav",
        stt: 2,
        col: 6,
      },
      {
        id: 2,
        questionTitle: "B",
        picture: "./img/vegetables.jpg",
        text: "Vegetables",
        sound: "sound/foods/vegetables.wav",
        stt: 1,
        col: 6,
      },
    ],
    answer: [
      {
        id: 1,
        sound: "sound/foods/vegetables.wav",
        text: "Vegetables",
        col: 6,
      },
      {
        id: 2,
        sound: "sound/foods/fruits.wav",
        text: "Fruits",
        col: 6,
      },
    ],
  },
  {
    id: 3,
    questionTitle: "3-3",
    question: [
      {
        id: 1,
        questionTitle: "A",
        picture: "./img/beverage.jpg",
        text: "Beverage",
        sound: "sound/foods/beverage.wav",
        stt: 1,
        col: 6,
      },
      {
        id: 2,
        questionTitle: "B",
        picture: "./img/seafood.jpg",
        text: "Seafood",
        sound: "sound/foods/seafood.wav",
        stt: 2,
        col: 6,
      },
    ],
    answer: [
      {
        id: 1,
        sound: "sound/foods/beverage.wav",
        text: "Beverage",
        col: 6,
      },
      {
        id: 2,
        sound: "sound/foods/seafood.wav",
        text: "Seafood",
        col: 6,
      },
    ],
  },
];

var iQuestion = 0;
var answerCorrect = 0;

getQuestion();
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
    "<div class='container' id='yeah1' style='position: absolute; top: 230px; left: 20px; margin: 0px 50px 0px 50px; z-index:1;'><img src='./img/blue-ice.png' style='height: 300px'/></div>" +
      "<div class='container' id='yeah2' style='position: absolute; top: 230px; left: 230px; margin: 0px 50px 0px 50px;z-index:1;'><img src='./img/pink-ice.png' style='height: 300px'/></div>"
  );
  setTimeout('$("#yeah1").remove()', 900);
  setTimeout('$("#yeah2").remove()', 900);
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
  $("#block-foods").empty();

  for (let i = 0; i < questions[iQuestion].question.length; i++) {
    $("#block-foods").append(
      '<div class="col-md-' +
        questions[iQuestion].question[i].col +
        '">' +
        '<div class="img-description">' +
        '<img src="' +
        questions[iQuestion].question[i].picture +
        '" alt="" class="foods">' +
        '<input class="foods-input" id="InputAnswer' +
        i +
        '" data-text="' +
        questions[iQuestion].question[i].text +
        '">' +
        "</div>" +
        "</div>"
    );
  }
  $("#block-foods").append('<div class="clearfix"></div>');

  for (let i = 0; i < questions[iQuestion].answer.length; i++) {
    $("#block-foods").append(
      '<div class="col-md-' +
        questions[iQuestion].answer[i].col +
        '">' +
        '<span alt="" class="foods-text" id="draggable' +
        i +
        '" data-text="' +
        questions[iQuestion].answer[i].text +
        '" data-index="' + i +
        '">' +
        questions[iQuestion].answer[i].id +
        "." +
        questions[iQuestion].answer[i].text +
        "</span>" +
        "</div>"
    );
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
  $(".foods-input").droppable({
    drop: function (event, ui) {
      var i =  $(ui.draggable).attr("data-index");
      playWord(i);
      $(this).css("background-color", "#FF99D5");
      var answerDrop = $(ui.draggable).attr("data-text");
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
        if (iQuestion === questions.length - 1 && answerCorrect == questions[iQuestion].question.length) {
          playCorrect();
        }
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
  checkAnswer();

  setTimeout(function () {
    ++iQuestion;
    getQuestion();
  }, 1000);
}

function backQuestion() {
  --iQuestion;
  getQuestion();
}
