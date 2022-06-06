
var unit ={
  "title" : "Unit 7: Fruits"
}

var exercises = [
  {
    "img-ex-1": "./English/img/1.png"
  },
  {
    "img-ex-2": "./English/img/2.png"
  },
  {
    "img-ex-3": "./English/img/3.png"
  }
]

$("[lang]").each(function (index) {
  $(this).html(unit[$(this).attr("lang")]);
});

$("[img-lang]").each(function (index) {
  $(this).attr('src',exercises[index][$(this).attr("img-lang")]);
});

