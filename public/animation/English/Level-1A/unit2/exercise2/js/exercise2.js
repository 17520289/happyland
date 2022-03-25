const questions = [
    {
        "id": 1,
        "question": "1-7",
        "picture":  "./img/theface/sideburns.jpg",
        "sound": "audio/theface/sideburns.wav",
        "ans": "5"
    },
    {
        "id": 2,
        "question": "2-7",
        "picture":  "./img/theface/teeth.jpg",
        "sound": "audio/theface/teeth.wav",
        "ans": "1"
    },
    {
        "id": 3,
        "question": "3-7",
        "picture":  "./img/theface/cheek.jpg",
        "sound": "audio/theface/cheek.wav",
        "ans": "4"
    },
    {
        "id": 4,
        "question": "4-7",
        "picture":  "./img/theface/lips.jpg",
        "sound": "audio/theface/lips.wav",
        "ans": "2"
    },
    {
        "id": 5,
        "question": "5-7",
        "picture":  "./img/theface/forehead.jpg",
        "sound": "audio/theface/forehead.wav",
        "ans": "7"
    },
    {
        "id": 6,
        "question": "6-7",
        "picture":  "./img/theface/chin.jpg",
        "sound": "audio/theface/chin.wav",
        "ans": "3"
    },
    {
        "id": 7,
        "question": "7-7",
        "picture":  "./img/theface/tongue.jpg",
        "sound": "audio/theface/tongue.wav",
        "ans": "6"
    }
]

const answers = [
    {
        "id": 1,
        "title":"1.teeth",
        "sound": "audio/theface/teeth.wav",
    },
    {
        "id": 2,
        "title":"2.lips",
        "sound": "audio/theface/lips.wav",
    },
    {
        "id": 3,
        "title":"3.chin",
        "sound": "audio/theface/chin.wav",
    },
    {
        "id": 4,
        "title":"4.cheek",
        "sound": "audio/theface/cheek.wav",
    },
    {
        "id": 5,
        "title":"5.sideburns",
        "sound": "audio/theface/sideburns.wav",
    },
    {
        "id": 6,
        "title":"6.tongue",
        "sound": "audio/theface/tongue.wav",
    },
    {
        "id": 7,
        "title":"7.forehead",
        "sound": "audio/theface/forehead.wav",
    }
]
var iQuestion = 0

getQuestion();
function playWord(audio_id){
    var audioElement = document.createElement('audio');
    audioElement.setAttribute('src', answers[--audio_id].sound)
    audioElement.play()
}

function playWordCurrent(){
    var audioElement = document.createElement('audio');
    audioElement.setAttribute('src', questions[iQuestion].sound)
    audioElement.play()
}

function playWrong(){
    var audioElement = document.createElement('audio');
    audioElement.setAttribute('src', './audio/wrong.wav');
    audioElement.play()

}
function playCorrect(){
    var audioElement = document.createElement('audio');
    audioElement.setAttribute('src', './audio/correct.wav');
    audioElement.play()
    document.getElementById("exercise").innerHTML+="<div class='container' id='yeah' style='position: absolute; top: 15px; left: 20px; margin: 0px 50px 0px 50px;'><img src='./img/yeah3.gif' style='height: 600px'/></div>"
    setTimeout('$("#yeah").remove()', 900)
}

function checkAnswer(e){
    var user_ans = $(e).attr('data-id');
    var question = $("#image").attr('data-id');
    playWord(user_ans);
    var answer = questions[--question].ans;
    if (user_ans === answer){
        
         document.getElementById("exercise2__ans__img").innerHTML = "<img src='./img/tick.png' style='height: 50px; margin: 15px' id='tick'/>"
        setTimeout(playCorrect,700)
    }
    else{
        document.getElementById("exercise2__ans__img").innerHTML = "<img src='./img/wrong.png' style='height: 50px; margin: 15px;' id='wrong''/>"
        setTimeout(playWrong,500)
        setTimeout('$("#wrong").remove()', 500)
    }
}

function getQuestion(){
    document.getElementById("image").src = questions[iQuestion].picture
    $("#image").attr('data-id',questions[iQuestion].id);
    var i = 0
    // console.log(iQuestion)
    $.each( answers, function( key, value ) {
        i = key +1
        $("#draggable" + i).css("left", 0);
        $("#draggable" + i).css("top", 0);
        $("#draggable" + i).text(value.title);
        $("#draggable" + i).draggable({
            start: function(event, ui) { $(this).css("z-index", i++); }
        });
        $("#draggable" + i).draggable('enable');
        $("#draggable" + i).css('opacity', '1');
      });
    $.each( answers, function( key, value ) {
        if(key < iQuestion){
            var questionDisable = questions[key].ans;
            $("#draggable" + questionDisable).draggable('disable');
            $("#draggable" + questionDisable).css('opacity', '0.5');
        }
    });

    if (iQuestion === 0){
        document.getElementById("backButton").hidden = true;
    }
    else{
        document.getElementById("backButton").hidden = false;
    }
    if (iQuestion === questions.length-1){
        document.getElementById("nextButton").hidden = true;
    }
    else{
        document.getElementById("nextButton").hidden = false;
    }
    $("#tick").remove();
    
}


function nextQuestion(){
    ++iQuestion;
    document.getElementById("image").src = questions[iQuestion].picture
    $("#image").attr('data-id',questions[iQuestion].id);
    getQuestion();
}

function backQuestion(){
    --iQuestion;
    document.getElementById("image").src = questions[iQuestion].picture
    $("#image").attr('data-id',questions[iQuestion].id);
    getQuestion();
}

