const question = [
  {
      "question": 0,
      "picture": "./img/wash.jpg",
      "result": "wash",
      "content": "thawes",
      "sound": "./English/sound/wash.wav"
  },
  {
      "question": 1,
      "picture": "./img/ask.jpg",
      "result": "ask",
      "content": "khsate",
      "sound": "./English/sound/ask.wav"
  },
  {
      "question": 2,
      "picture": "./img/sell.jpg",
      "result": "sell",
      "content": "laelts",
      "sound": "./English/sound/sell.wav"
  },
  {
      "question": 3,
      "picture": "./img/buy.jpg",
      "result": "buy",
      "content": "uyehtb",
      "sound": "./English/sound/buy.wav"
  },
  {
      "question": 4,
      "picture": "./img/listen.jpg",
      "result": "listen",
      "content": "etisnl",
      "sound": "./English/sound/listen.wav"
  },

]

var unit ={
  "title" : "Unit 8: Actions",
  "description": "Choose the correct answers."
}

$("[lang]").each(function (index) {
  $(this).html(unit[$(this).attr("lang")]);
});

var check_list = [false, false, false, false, false, false];

var index = 0;

var content = "";
var result = "";
var answer = "";

UpdateQuest();

function NextQuest() {
  ++index;
  UpdateQuest();
}

function BackQuest() {
  --index;
  UpdateQuest();
}

function UpdateQuest() {
  content = question[index].content;
  result = question[index].result;
  answer = "";
  stt_quest = 0;
  $("#img_content").attr("src", question[index].picture);
  $('#number_quest').text(index + 1 + "- 5");

  check_list.forEach(function (value, i) {
      check_list[i] = false;

      var btnId = "#btn" + i;
      $(btnId).css("display", "block");

      $(btnId).html(content[i]);

  });

  check_list.forEach(function (value, i) {
      check_list[i] = false;

      var contentid = "#content" + (i + 1);
      $(contentid).text(i + 1);
      $(contentid).css({ 'opacity': 1 });

      if (i > result.length - 1)
          $(contentid).css({ 'opacity': 0 });

  });

  if (index === 0) {
      document.getElementById("backbutton").hidden = true;
  } else {
      document.getElementById("backbutton").hidden = false;
  }
  if (index === question.length - 1) {
      document.getElementById("nextbutton").hidden = true;
  } else {
      document.getElementById("nextbutton").hidden = false;
  }
  document.getElementById("yeah").remove()
}

async function CheckAS() {


  if (answer == question[index].result) {
      playWord();
      playCorrect();
  }
}
var stt_quest = 0;
async function ChooseAS(btn, id) {

  if (content[id] == result[stt_quest]) {
      switch (stt_quest) {
          case 0:
              $("#content1").text(content[id]);
              break;
          case 1:
              $("#content2").text(content[id]);
              break;
          case 2:
              $("#content3").text(content[id]);
              break;
          case 3:
              $("#content4").text(content[id]);
              break;
          case 4:
              $("#content5").text(content[id]);
              break;
          case 5:
              $("#content6").text(content[id]);
              break;
          default:
          // code block
      }
      answer += content[id];
      stt_quest++;
      $(btn).css("display", "none");
      playCorrectChoose();
  } else {
      if (!result.includes(content[id])) {
          $(btn).css("display", "none");
          playWrong()
      }
  }

  await CheckAS();
}
function playCorrect() {
  var audioElement = document.createElement('audio');
  audioElement.setAttribute('src', '../public/sound/correct.wav');
  audioElement.play()
  document.getElementById("exercise").innerHTML += "<div class='purple' id='yeah' style='position: absolute;z-index: 999;top: 40%; right:25% '><img src='./img/dog-happy.gif' style='height: 90%; width : 90%; z-index:999'/></div>"
  $('.button-two').css("display", "none");
}
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function playWord() {
  var audioElement = document.createElement('audio');
  audioElement.setAttribute('src', question[index].sound)
  audioElement.play()
}

function playWrong() {
  var audioElement = document.createElement('audio');
  audioElement.setAttribute('src', '../public/sound/wrong.wav');
  audioElement.play()
}

function playCorrectChoose() {
  var audioElement = document.createElement('audio');
  audioElement.setAttribute('src', './sound/fly-in.wav');
  audioElement.play()
}