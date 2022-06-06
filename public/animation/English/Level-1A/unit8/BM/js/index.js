
var unit ={
  "title" : "Unit 8: Sayur-sayuran"
}

var exercises = [
  {
    "img-ex-1": "./BM/img/1.png"
  },
  {
    "img-ex-2": "./BM/img/2.png"
  },
  {
    "img-ex-3": "./BM/img/3.png"
  }
]

$("[lang]").each(function (index) {
  $(this).html(unit[$(this).attr("lang")]);
});

$("[img-lang]").each(function (index) {
  $(this).attr('src',exercises[index][$(this).attr("img-lang")]);
});

