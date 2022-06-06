
var unit ={
  "title" : "Unit 6: Food"
}

var exercises =
  {
    "img-ex-1": "./English/img/1.png",
    "img-ex-2": "./English/img/2.png",
    "img-ex-3": "./English/img/3.png",
    "img-ex-4": "./English/img/4.png",
    "img-ex-5": "./English/img/5.png"
  }

$("[lang]").each(function (index) {
  $(this).html(unit[$(this).attr("lang")]);
});

$("[img-lang]").each(function (index) {
  $(this).attr('src',exercises[$(this).attr("img-lang")]);
});

