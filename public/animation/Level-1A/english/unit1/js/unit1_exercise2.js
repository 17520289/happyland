const questions = [
    {
        "question": "1-6",
        "word":  "elbow",
        "choose1":"./img/ex2/elbow.png",
        "choose2":"./img/ex2/body.png",
        "sound1": "./sound/ex2/elbow.wav",
        "sound2": "./sound/ex2/body.wav",
        "ans": "1"
    },
    {
        "question": "2-6",
        "word":  "waist",
        "choose1":"./img/ex2/waist.png",
        "choose2":"./img/ex2/back.png",
        "sound1": "./sound/ex2/waist.wav",
        "sound2": "./sound/ex2/back.wav",
        "ans": "1"
    },
    {
        "question": "3-6",
        "word":  "nail",
        "choose1":"./img/ex2/leg.png",
        "choose2":"./img/ex2/nail.png",
        "sound1": "./sound/ex2/leg.wav",
        "sound2": "./sound/ex2/nail.wav",
        "ans": "2"
    },
    {
        "question": "4-6",
        "word":  "back",
        "choose1":"./img/ex2/shoulder.png",
        "choose2":"./img/ex2/back.png",
        "sound1": "./sound/ex2/shoulder.wav",
        "sound2": "./sound/ex2/back.wav",
        "ans": "2"
    },
    {
        "question": "5-6",
        "word":  "finger",
        "choose1":"./img/ex2/finger.png",
        "choose2":"./img/ex2/foot.png",
        "sound1": "./sound/ex2/finger.wav",
        "sound2": "./sound/ex2/foot.wav",
        "ans": "1"
    },
    {
        "question": "6-6",
        "word":  "armpit",
        "choose1":"./img/ex2/knee.png",
        "choose2":"./img/ex2/armpit.png",
        "sound1": "./sound/ex2/knee.wav",
        "sound2": "./sound/ex2/armpit.wav",
        "ans": "2"
    }
]
var iQuestion = 0
var idButton = "buttonChoose1"

getQuestion();
function playWord(audio_id){
    var audioElement = document.getElementById(audio_id);
    if(audio_id === "buttonChoose1_sound"){
        audioElement.setAttribute('src', questions[iQuestion].sound1)
        audioElement.play()
    }
    else{
        audioElement.setAttribute('src', questions[iQuestion].sound2)
        audioElement.play()
    }
    if(audio_id === "question_sound"){
        var word_sound = "./sound/ex2/"+ questions[iQuestion].word +".wav"
        audioElement.setAttribute('src',word_sound)
        audioElement.play()
    }
}


function playWrong(){
    var audioElement = document.createElement('audio');
    audioElement.setAttribute('src', './sound/wrong.wav');
    audioElement.play()

}
function playCorrect(){
    var audioElement = document.createElement('audio');
    audioElement.setAttribute('src', './sound/correct.wav');
    audioElement.play()
    document.getElementById("exercise").innerHTML+="<div class='container' id='yeah' style='position: absolute; top: 15px; left: 20px; margin: 0px 50px 0px 50px;'><img src='./img/yeah3.gif' style='height: 600px'/></div>"
    setTimeout('document.getElementById("yeah").remove()', 900)
}

function checkAnswer(clicked_id){
    var user_ans = document.getElementById(clicked_id).value 
    if (user_ans === questions[iQuestion].ans){
        playWord(clicked_id+"_sound")
        document.getElementById(clicked_id+"_ans_sound").hidden = false
        document.getElementById(clicked_id+"_img").hidden = false;
        document.getElementById(clicked_id+"_img").innerHTML = "<img src='./img/tick.png' style='height: 80px; margin-left: -50px; id='tick'/>"
        console.log("đáp án đúng")
        clicked_id === "buttonChoose1"?(idButton = clicked_id.replace(/1/g,"2")):(idButton = clicked_id.replace(/2/g,"1"))
        console.log(idButton)
        document.getElementById(clicked_id).disabled = 'disabled';
        document.getElementById(idButton).disabled = 'disabled';
        document.getElementById(idButton).style.opacity= "0.5";
        setTimeout(playCorrect,700)
    }
    else{
        playWord(clicked_id+"_sound")
        document.getElementById(clicked_id+"_img").hidden = false;
        document.getElementById(clicked_id+"_img").innerHTML = "<img src='./img/wrong.png' style='height: 80px; margin-left: -50px; id='wrong''/>"
        console.log("dap án sai")
        setTimeout(playWrong,500)
        clicked_id === "buttonChoose1"? setTimeout('document.getElementById("buttonChoose1_img").hidden = true;',500):setTimeout('document.getElementById("buttonChoose2_img").hidden = true;',500)
    }
}

function getQuestion(){
    document.getElementById("image").innerHTML = questions[iQuestion].word
    document.getElementById("markboard").innerHTML = questions[iQuestion].question
    document.getElementById("choose1").src = questions[iQuestion].choose1
    document.getElementById("choose2").src = questions[iQuestion].choose2
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
}


function nextQuestion(){
    iQuestion = iQuestion + 1
        document.getElementById("buttonChoose1_img").hidden = true;
        document.getElementById("buttonChoose2_img").hidden = true;
        document.getElementById("buttonChoose1").disabled = '';
        document.getElementById("buttonChoose2").disabled = '';
        document.getElementById("buttonChoose1_ans_sound").hidden = true
        document.getElementById("buttonChoose2_ans_sound").hidden = true
        document.getElementById("buttonChoose1").style.opacity= "";
        document.getElementById("buttonChoose2").style.opacity= "";
    getQuestion();
}

function backQuestion(){
    iQuestion = iQuestion - 1
        document.getElementById("buttonChoose1_img").hidden = true;
        document.getElementById("buttonChoose2_img").hidden = true;
        document.getElementById("buttonChoose1").disabled = '';
        document.getElementById("buttonChoose2").disabled = '';
        document.getElementById("buttonChoose1_ans_sound").hidden = true
        document.getElementById("buttonChoose2_ans_sound").hidden = true
        document.getElementById("buttonChoose1").style.opacity= "";
        document.getElementById("buttonChoose2").style.opacity= "";
    getQuestion();
}

