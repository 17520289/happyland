var unit ={
  "title" : "单元七：水果"
}

var exercises = [
  {
    "img-ex-1": "./CN/img/1.png"
  },
  {
    "img-ex-2": "./CN/img/2.png"
  },
  {
    "img-ex-3": "./CN/img/3.png"
  }
]

$("[lang]").each(function (index) {
  $(this).html(unit[$(this).attr("lang")]);
});

$("[img-lang]").each(function (index) {
  $(this).attr('src',exercises[index][$(this).attr("img-lang")]);
});
