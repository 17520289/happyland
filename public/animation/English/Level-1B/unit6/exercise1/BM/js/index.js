const question = [
  {
      "question": 0,
      "picture": "./img/bird.png",
      "sound": "./BM/sound/burung.wav",
      "result": "burung",
      "content": "burungng"
  },
  {
      "question": 1,
      "picture": "./img/cat.png",
      "sound": "./BM/sound/kucing.wav",
      "result": "kucing",
      "content": "dkucinga"
  },
  {
      "question": 2,
      "picture": "./img/dog.png",
      "sound": "./BM/sound/anjing.wav",
      "result": "anjing",
      "content": "aanjing"
  },
  {
      "question": 3,
      "picture": "./img/rabbit.png",
      "sound": "./BM/sound/arnab.wav",
      "result": "arnab",
      "content": "saarnab"
  },
  {
      "question": 4,
      "picture": "./img/duck.png",
      "sound": "./BM/sound/itik.wav",
      "result": "itik",
      "content": "yuitik"
  },
  {
      "question": 5,
      "picture": "./img/goose.png",
      "sound": "./BM/sound/angsa.wav",
      "result": "angsa",
      "content": "sangsaa"
  },
]

var unit ={
  "title" : "Unit 6: Haiwan Peliharaan",
  "description": "Choose the correct answer"
}

$("[lang]").each(function (index) {
  $(this).html(unit[$(this).attr("lang")]);
});

var check_list = [false, false, false, false, false, false, false, false];

var index = 0;

var content = "";

function init() {
  UpdateQuest();
  content = question[index].content;
  $("#img_content").attr("src", question[index].picture);
  $("#backbutton").hide();
  $("#nextbutton").hide();
  document.getElementById('tick').hidden = true;
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
  document.getElementById('tick').hidden = true;
  check_list.forEach(function (value, i) {
      check_list[i] = false;

      var btnId = "#btn" + i;
      $(btnId).css("display", "block");
      $(btnId).css("background", '#ffa606')
      $(btnId).css("borderColor", '#ebd9b9')
      $(btnId).css("color", '#703d02')
      $(btnId).html(content[i]);

  });

  document.getElementById("exercise").innerHTML += "<div class='purple' id='yeah' style='position: absolute;z-index: 999;top: -50%;'></div>"
  setTimeout('document.getElementById("yeah").remove()', 900)
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

      //NextQuest();
      if (index == 0) {
          $("#nextbutton").show();
          $("#backbutton").show();

      }
      if (index == question.length - 1) {
          $("#nextbutton").hide();
      }
  }
}
async function ChooseAS(btn, id) {
  check_list[id] = !check_list[id];

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
  audioElement.setAttribute('src', '../public/sound/correct.wav');
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
  audioElement.play()
}