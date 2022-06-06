const question = [
  {
      "question": 0,
      "picture": "./img/desk.png",
      "sound": "./BM/sound/meja tulis.wav",
      "result": "mejatulis",
      "content": "ekmejavasatulist"
  },
  {
      "question": 1,
      "picture": "./img/book.png",
      "sound": "./BM/sound/buku.wav",
      "result": "buku",
      "content": "bukufqvm"
  },
  {
      "question": 2,
      "picture": "./img/chair.png",
      "sound": "./BM/sound/kerusi.wav",
      "result": "kerusi",
      "content": "unkerusi"
  },
  {
      "question": 3,
      "picture": "./img/bag.png",
      "sound": "./BM/sound/beg.wav",
      "result": "beg",
      "content": "podubegi"
  },
  {
      "question": 4,
      "picture": "./img/scissor.png",
      "sound": "./BM/sound/gunting.wav",
      "result": "gunting",
      "content": "guntingn"
  },
]

var unit ={
  "title" : "Unit 2: Bilik Darjah",
  "description": "Choose the correct answer"
}

$("[lang]").each(function (index) {
  $(this).html(unit[$(this).attr("lang")]);
});

var index = 0;

var content = "";
var check_list = [];

function init() {
  content = question[index].content;
  $("#img_content").attr("src", question[index].picture);
  $("#backbutton").hide();

  for (var i = 0; i < question[index].content.split('').length; i++) {
      check_list.push(false);
  }
  // $("#nextbutton").hide();
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
  check_list = [];
  for (var i = 0; i < question[index].content.split('').length; i++) {
      check_list.push(false);
  }

  content = question[index].content;
  $("#img_content").attr("src", question[index].picture);
  $('#number_quest').text(index + 1 + "- 6");

  check_list.forEach(function (value, i) {
      check_list[i] = false;

      var btnId = "#btn" + i;
      $(btnId).css("display", "");
      $(btnId).css("background", '#ebd9b9')
      $(btnId).css("borderColor", '#703d37')

      $(btnId).html(content[i]);

  });
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
      btn.style.background = '#e6960d';
      btn.style.borderColor = '#000000';

  } else {
      btn.style.background = '#ebd9b9';
      btn.style.borderColor = '#703d37';
  }
  await CheckAS();
}
function playCorrect() {
  var audioElement = document.createElement('audio');
  audioElement.setAttribute('src', './sound/correct.wav');
  audioElement.play()
  document.getElementById("exercise").innerHTML += "<div class='purple' id='yeah' style='position: absolute;z-index: 999;top: -50%;'><img src='../public/img/yeah3.gif' style='height: 100%; width : 100%; z-index:999'/></div>"
  setTimeout('document.getElementById("yeah").remove()', 900)
}
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function playWord() {
  var audioElement = document.createElement('audio');
  audioElement.setAttribute('src', question[index].sound)
  audioElement.play()
}