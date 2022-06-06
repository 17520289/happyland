const question = [
  {
      "question": 0,
      "picture": "./img/bus.png",
      "sound": "./English/sound/bus.wav",
      "result": "bus",
      "content": "fybusasm"
  },
  {
      "question": 1,
      "picture": "./img/jeep.png",
      "sound": "./English/sound/jeep.wav",
      "result": "jeep",
      "content": "rojeepgk"
  },
  {
      "question": 2,
      "picture": "./img/taxi.png",
      "sound": "./English/sound/taxi.wav",
      "result": "taxi",
      "content": "ptaxiikl"
  },
  {
      "question": 3,
      "picture": "./img/van.png",
      "sound": "./English/sound/van.wav",
      "result": "van",
      "content": "vanihoan"
  },
  {
      "question": 4,
      "picture": "./img/lorry.png",
      "sound": "./English/sound/lorry.wav",
      "result": "lorry",
      "content": "erjlorry"
  },
  {
      "question": 5,
      "picture": "./img/truck.png",
      "sound": "./sound/truck.wav",
      "result": "truck",
      "content": "xtruckio"
  },
]

var unit ={
  "title" : "Unit 7: Transportation",
  "description": "Spell the transportation below"
}

$("[lang]").each(function (index) {
  $(this).html(unit[$(this).attr("lang")]);
});

var check_list = [false, false, false, false, false, false, false, false];

var index = 0;

var content = "";

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
  $('#tick').remove();
  content = question[index].content;
  $("#img_content").attr("src", question[index].picture);
  $('#number_quest').text(index + 1 + "- 6");

  setTimeout('document.getElementById("yeah").remove()', 900)
  check_list.forEach(function (value, i) {
      check_list[i] = false;

      var btnId = "#btn" + i;
      $(btnId).css("display", "block");
      $(btnId).css("background", '#ffffff')
      $(btnId).css("borderColor", '#703d37')
      $(btnId).css("color", '#c9310b')
      $(btnId).css("backgroundImage", 'url(./img/button.png)')
      $(btnId).css("backgroundRepeat", 'noRepeat')
      $(btnId).css("backgroundSize", '100% 100%')
      $(btnId).css("backgroundPosition", 'center')
      $(btnId).html(content[i]);

  });
  document.getElementById("exercise").innerHTML += "<div class='purple' id='yeah' style='position: absolute;z-index: 999;top: -50%;'></div>"

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
      if (index == 0) {
          $("#nextbutton").show();
          $("#backbutton").show();
      }
      if (index == question.length - 1) {
          $("#nextbutton").hide();
      }
  }
  else {
      if (s.length >= question[index].result.length) {
          playWrong();
      }
  }

}
async function ChooseAS(btn, id) {
  check_list[id] = !check_list[id];

  if (check_list[id]) {
      btn.style.color = '#242023'
      btn.style.backgroundRepeat = 'no-repeat'
      btn.style.backgroundImage = 'url(./img/button.png)'
      btn.style.backgroundSize = '100% 100%'
      btn.style.backgroundPosition = 'center'

  } else {
      btn.style.background = '#fffff';
      btn.style.color = '#c9310b';
      btn.style.borderColor = '#ebd9b9';
      btn.style.backgroundRepeat = 'no-repeat'
      btn.style.backgroundImage = 'url(./img/button.png)'
      btn.style.backgroundSize = '100% 100%'
      btn.style.backgroundPosition = 'center'
  }
  await CheckAS();
}
function playCorrect() {
  var audioElement = document.createElement('audio');
  audioElement.setAttribute('src', '../public/sound/correct.wav');
  audioElement.play()
  $('#content').append(
      "<img src='../public/img/tick.png' style='height: 100px;margin: 15px;position: absolute;right: 0%;top: 55%;z-index: 4;' id='tick'/>"
  );
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

function checkWrong() {
  var s = "";
  check_list.forEach(function (value, i) {
      if (value) {
          s += content[i]
      }
  });
  if (s != question[index].result) {

      check_list.forEach(function (value, i) {
          if (!value) {
              var btnId = "#btn" + i;
              $(btnId).css("display", "none");
          }
      });
      playWord()
      playWrong();
  }
}

function playWrong() {
  var audioElement = document.createElement('audio');
  audioElement.setAttribute('src', '../public/sound/wrong.wav');
  audioElement.play()
  setTimeout('document.getElementById("tick").remove()', 500)

}