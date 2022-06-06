var units = [
  {
    "img-unit-1": "./CN/img/ex1.png"
  },
  {
    "img-unit-2": "./CN/img/ex2.png"
  }
]

var title ={
  "title" : "单元五：公园",
}

$("[img-lang]").each(function (index) {
    $(this).attr('src',units[index][$(this).attr("img-lang")]);
});

$("[lang]").each(function (index) {
  $(this).html(title[$(this).attr("lang")]);
});