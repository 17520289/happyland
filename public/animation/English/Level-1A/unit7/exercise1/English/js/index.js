const question = [
  {
      "question": 0,
      "picture": "./img/apple.png",
      "sound": "./English/sound/fruit/apple.wav",
      "result": "apple",
      "content": "papplee"
  },
  {
      "question": 1,
      "picture": "./img/orange.png",
      "sound": "./English/sound/fruit/orange.wav",
      "result": "orange",
      "content": "orangen"
  },
  {
      "question": 2,
      "picture": "./img/banana.png",
      "sound": "./English/sound/fruit/banana.wav",
      "result": "banana",
      "content": "pbanana"
  },
  {
      "question": 3,
      "picture": "./img/papaya.png",
      "sound": "./English/sound/fruit/papaya.wav",
      "result": "papaya",
      "content": "papayau"
  }
]

var unit ={
  "title" : "Unit 7 : Fruit",
  "decription": "Spell the food below"
}

$(function() {
  $("[lang]").each(function (index) {
    $(this).html(unit[$(this).attr("lang")]);
  });
});

var check_list = [false, false, false, false, false, false, false, false];

var index = 0;

var content = "";
UpdateQuest();

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
  $('#number_quest').text(index + 1 + "- 4");

  check_list.forEach(function (value, i) {
      check_list[i] = false;

      var btnId = "#btn" + i;
      $(btnId).css("display", "block");
      $(btnId).css("background", '#ebd9b9')
      $(btnId).css("borderColor", '#703d37')

      $(btnId).html(content[i]);

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
  audioElement.setAttribute('src', './sound/correct.wav');
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
  audioElement.setAttribute('src', "./sound/wrong.wav")
  audioElement.play()
}
function playChooseAudio() {
  var audioElement = document.createElement('audio');
  audioElement.setAttribute('src', "./sound/choose.wav")
  audioElement.play()
}