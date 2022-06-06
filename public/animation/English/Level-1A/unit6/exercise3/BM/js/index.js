const question = [
  {
      "question": 0,
      "picture": "./img/tea.jpg",
      "sound": "./BM/sound/teh.wav",
      "result": "teh",
      "content": "mttehar"
  },
  {
      "question": 1,
      "picture": "./img/soup.jpg",
      "sound": "./BM/sound/sup.wav",
      "result": "sup",
      "content": "redsupj"
  },
  {
      "question": 2,
      "picture": "./img/coffee.jpg",
      "sound": "./BM/sound/kopi.wav",
      "result": "kopi",
      "content": "hkopino"
  },
  {
      "question": 3,
      "picture": "./img/noodles.jpg",
      "sound": "./BM/sound/mi.wav",
      "result": "mi",
      "content": "nmiheap"
  },
  {
      "question": 4,
      "picture": "./img/juice.jpg",
      "sound": "./BM/sound/jus.wav",
      "result": "jus",
      "content": "jususua"
  },
  {
      "question": 5,
      "picture": "./img/jam.jpg",
      "sound": "./BM/sound/jem.wav",
      "result": "jem",
      "content": "waurjem"
  },
]

var unit ={
  "title" : "Unit 6: Makanan",
  "decription": "Choose the correct answers."
}

$(function() {
  $("[lang]").each(function (index) {
    $(this).html(unit[$(this).attr("lang")]);
  });
});

var check_list = [false, false, false, false, false, false, false, false];

var index = 0;

var content = "";
var countChoose = 0;

function init() {
  content = question[index].content;
  $("#img_content").attr("src", question[index].picture);
  $("#backbutton").hide();
  $("#nextbutton").hide();
  countChoose = 0;
  UpdateQuest();
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

  check_list.forEach(function (value, i) {
      check_list[i] = false;

      var btnId = "#btn" + i;
      $(btnId).css("display", "block");
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
  audioElement.setAttribute('src', '../public/sound/correct.wav');
  audioElement.play()
  document.getElementById("exercise").innerHTML += "<div class='purple' id='yeah' style='position: absolute;z-index: 999;top: -20%;left:20%;height:50vw'><img src='../public/img/yeah3.gif' style='height: 100%; width : 100%; z-index:999'/></div>"
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