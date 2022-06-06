
var unit ={
  "title" : "单元六：食物"
}

var exercises =
{
    "img-ex-1": "./CN/img/1.png",
    "img-ex-2": "./CN/img/2.png",
    "img-ex-3": "./CN/img/3.png",
    "img-ex-4": "./CN/img/4.png",
    "img-ex-5": "./CN/img/5.png"
}

$("[lang]").each(function (index) {
  $(this).html(unit[$(this).attr("lang")]);
});

$("[img-lang]").each(function (index) {
  $(this).attr('src',exercises[$(this).attr("img-lang")]);
});