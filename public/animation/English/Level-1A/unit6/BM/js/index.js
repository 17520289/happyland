
var unit ={
  "title" : "Unit 6: Makanan"
}

var exercises = {
  "img-ex-1": "./BM/img/1.png",
  "img-ex-2": "./BM/img/2.png",
  "img-ex-3": "./BM/img/3.png",
  "img-ex-4": "./BM/img/4.png",
  "img-ex-5": "./BM/img/5.png"
}

$("[lang]").each(function (index) {
  $(this).html(unit[$(this).attr("lang")]);
});

$("[img-lang]").each(function (index) {
  $(this).attr('src',exercises[$(this).attr("img-lang")]);
});