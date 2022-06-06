const question = [
  {
      "question": 0,
      "picture": "./img/card.jpg",
      "sound": "./English/sound/card.wav",
      "result": "card",
      "content": "bhycarde"
  },
  {
      "question": 1,
      "picture": "./img/cake.jpg",
      "sound": "./sound/cake.wav",
      "result": "cake",
      "content": "cakewtbi"
  },
  {
      "question": 2,
      "picture": "./img/candles.jpg",
      "sound": "./English/sound/candles.wav",
      "result": "candles",
      "content": "tcandles"
  },
  {
      "question": 3,
      "picture": "./img/clown.jpg",
      "sound": "./English/sound/clown.wav",
      "result": "clown",
      "content": "clownuts"
  },
  {
      "question": 4,
      "picture": "./img/pudding.jpg",
      "sound": "./English/sound/pudding.wav",
      "result": "pudding",
      "content": "puddinge"
  },
  {
      "question": 5,
      "picture": "./img/jelly.jpg",
      "sound": "./English/sound/jelly.wav",
      "result": "jelly",
      "content": "pajellys"
  },
]

var unit ={
  "title" : "Unit 4: Birthday Party",
  "description": "Spell the item below"
}

$("[lang]").each(function (index) {
  $(this).html(unit[$(this).attr("lang")]);
});

var check_list = [false, false, false, false, false, false, false, false];

var index = 0;

var content = "";

function init() {
  content = question[index].content;
  $("#img_content").attr("src", question[index].picture);
  $("#backbutton").hide();
  $("#nextbutton").hide(); document.getElementById('tick').hidden = true;

}

init();

function NextQuest() {
  if (index < question.length - 1)
      index++;
  UpdateQuest();
  if (index > 0) {
      $("#backbutton").show();
  }
}

function BackQuest() {
  if (index > 0)
      index--;
  UpdateQuest();
}

function UpdateQuest() {
  content = question[index].content;
  $("#img_content").attr("src", question[index].picture);
  $('#number_quest').text(index + 1 + "- 6");

  setTimeout('document.getElementById("yeah").remove()', 900)
  check_list.forEach(function (value, i) {
      check_list[i] = false;

      var btnId = "#btn" + i;
      $(btnId).css("display", "block");
      $(btnId).css("background", '#ffa606')
      $(btnId).css("borderColor", '#ebd9b9')
      $(btnId).css("color", '#703d02')
      $(btnId).html(content[i]);

  }); document.getElementById('tick').hidden = true;
  document.getElementById("exercise").innerHTML += "<div class='purple' id='yeah' style='position: absolute;z-index: 999;top: -50%;'></div>"
}

async function CheckAS() {
  var s = "";
  check_list.forEach(function (value, i) {
      if (value) {
          s += content[i]
      }
  });
  if (s == question[index].result) {

      check_list.forEach(function (value, i) {
          if (!value) {
              var btnId = "#btn" + i;
              $(btnId).css("display", "none");
          }
      });
      playWord()
      playCorrect();
      await sleep(3000);
      if (index == 0) {
          $("#nextbutton").show();
          $("#backbutton").show();
      }
      if (index == question.length - 1) {
          $("#nextbutton").hide();
      }
  } else {
      if (s.length >= question[index].result.length) {
          playWrongAudio();
      }
  }
}
async function ChooseAS(btn, id) {
  check_list[id] = !check_list[id];
  playChooseAudio();
  if (check_list[id]) {
      btn.style.background = '#e708a4';
      btn.style.color = '#ffffff'
      btn.style.borderColor = '#ebd9b9';

  } else {
      btn.style.background = '#ffa606';
      btn.style.color = '#703d02';
      btn.style.borderColor = '#703d37';
  }
  await CheckAS();
}
function playCorrect() {
  var audioElement = document.createElement('audio');
  audioElement.setAttribute('src', './sound/correct.wav');
  audioElement.play()
  document.getElementById('tick').hidden = false;
  $("#exercise").append(
      "<div class='purple' id='yeah' style='position: absolute;z-index: 999;top: -50%;'><img src='../public/img/yeah3.gif' style='height: 100%; width : 100%; z-index:999'/></div>"
  );
  setTimeout('document.getElementById("yeah").remove()', 900);
}
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function playWord() {
  var audioElement = document.createElement('audio');
  audioElement.setAttribute('src', question[index].sound)
  console.log(audioElement)
  audioElement.play()
}
function playWrongAudio() {
  var audioElement = document.createElement('audio');
  audioElement.setAttribute('src', "../public/sound/wrong.wav")
  audioElement.play()
}
function playChooseAudio() {
  var audioElement = document.createElement('audio');
  audioElement.setAttribute('src', "../public/sound/choose.wav")
  audioElement.play()
}