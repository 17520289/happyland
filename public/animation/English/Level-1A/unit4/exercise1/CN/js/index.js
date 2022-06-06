const question = [
  {
    "question": 0,
    "picture": "./colours/star_1.png",
    "sound": "./CN/sound/yellow.wav",
    "number": 4,
    "color": "yellow",
    "pen": 2
  },
  {
    "question": 1,
    "picture": "./colours/square_1.png",
    "sound": "./CN/sound/green.wav",
    "number": 1,
    "color": "green",
    "pen": 4
  },
  {
    "question": 2,
    "picture": "./colours/rectangle_1.png",
    "sound": "./CN/sound/blue.wav",
    "number": 1,
    "color": "blue",
    "pen": 1
  },
  {
    "question": 3,
    "picture": "./colours/circle_1.png",
    "sound": "./CN/sound/orange.wav",
    "number": 2,
    "color": "orange",
    "pen": 6
  },
  {
    "question": 4,
    "picture": "./colours/triangle_1.png",
    "sound": "./CN/sound/purple.wav",
    "number": 1,
    "color": "purple",
    "pen": 5
  },
  {
    "question": 5,
    "picture": "./colours/love_1.png",
    "sound": "./CN/sound/red.wav",
    "number": 1,
    "color": "red",
    "pen": 3
  }
]
var unit = {
  "title": "单元四：颜色",
  "decription": "Fill in the correct colours",
}
$(function() {
  $("[lang]").each(function (index) {
    $(this).html(unit[$(this).attr("lang")]);
  });
});

    var idPen = 0;
    var image = "";

    function resetPen() {
      $("#pen1").attr("src", "./colours/blue_1.png");
      $("#pen2").attr("src", "./colours/yellow_1.png");
      $("#pen3").attr("src", "./colours/red_1.png");
      $("#pen4").attr("src", "./colours/green_1.png");
      $("#pen5").attr("src", "./colours/purple_1.png");
      $("#pen6").attr("src", "./colours/orange_1.png");
    }
    function choosePen(img, id) {
      idPen = id;

      resetPen();

      if (image != "") {
        image.src.replace(/_2/, "_1");
      }
      image = img

      img.src = img.src.match(/_1/) ?
        img.src.replace(/_1/, "_2") :
        img.src.replace(/_2/, "_1");

    }

    function sleep(ms) {
      return new Promise(resolve => setTimeout(resolve, ms));
    }

    var index = -1;
    var choose = 0;
    var currentQuestion = 0;
    

    function init() {

      currentQuestion = 0;
      choose = 0;
      $("#backbutton").hide();

    }
    async function changeQuestion() {
      choose = 0;
      await NextQuest();
    }

    init()

    async function showWrong() {

      $("#img_tick").attr("src", "../public/img/wrong.png");
      $('.tick').show();
      await sleep(2000);
      $('.tick').hide();

    }
    async function showCorrect() {
      $("#img_tick").attr("src", "../public/img/tick.png");
      $('.tick').show();
      await sleep(2000);
      $('.tick').hide();
    }
    async function changeColor(img, pen) {

      if (idPen != question[currentQuestion].pen || idPen != pen) {
        showWrong();
        playWrong();
        return;
      }

      if (img.src.includes("_2")) {
        return;
      }

      choose++;
      img.src = img.src.replace(/_1/, "_2")

      if (choose >= question[currentQuestion].number) {

        playWord();
        playCorrect();

        var image = document.getElementById("quest");
        image.src = image.src.replace(/_1/, "_2");

        await sleep(3000);

      }

    }
    function HideShowButton() {
      if (currentQuestion >= 1) {
        $("#backbutton").show();
      } else {
        $("#backbutton").hide();
      }

      if (currentQuestion >= 5) {
        $("#nextbutton").hide();
      } else {
        $("#nextbutton").show();
      }

    }
    async function NextQuest() {
      currentQuestion++;

      if (currentQuestion > 5)
        return;
      HideShowButton();
      resetPen();
      var growDiv = document.getElementById('grow');

      growDiv.style.height = 0;

      await sleep(1500);

      growDiv.style.height = "25vw";

      index++;
      var image = document.getElementById("quest");
      image.src = question[currentQuestion].picture; //list_img[index];
      $("#title_quest").text(question[currentQuestion].color)

      await sleep(1500);

    }

    async function BackQuest() {
      //console.log(currentQuestion);
      if (currentQuestion <= 0)
        return;

      currentQuestion--;

      HideShowButton();
      resetPen();

      var growDiv = document.getElementById('grow');

      growDiv.style.height = 0;

      await sleep(1500);

      growDiv.style.height = "25vw";

      index--;
      var image = document.getElementById("quest");
      image.src = question[currentQuestion].picture;

      var title = document.getElementById("title_quest");

      $("#title_quest").text(question[currentQuestion].color)
      await sleep(1500);

    }
    function playWrong() {
      var audioElement = document.createElement('audio');
      audioElement.setAttribute('src', '../public/sound/wrong.wav');
      audioElement.play()
    }
    function playCorrect() {

      showCorrect();

      var audioElement = document.createElement('audio');
      audioElement.setAttribute('src', '../public/sound/correct.wav');
      audioElement.play()

      document.getElementById("exercise").innerHTML += "<div class='purple' id='yeah' style='position: absolute;z-index: 999;top: -20%;left:15%;height:50vw;'><img src='../public/img/yeah3.gif' style='height: 100%; width : 100%; z-index:999;'/></div>"
      setTimeout('document.getElementById("yeah").remove()', 900)
    }

    function playWord() {
      var audioElement = document.createElement('audio');
      audioElement.setAttribute('src', question[currentQuestion].sound)
      audioElement.play()
    }