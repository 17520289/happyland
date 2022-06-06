var units = [
  {
    "img-unit-1": "./BM/img/ex1.png"
  },
  {
    "img-unit-2": "./BM/img/ex2.png"
  },
  {
    "img-unit-3": "./BM/img/ex3.png"
  }
]

var title ={
  "title" : "Unit 2: Bilik Darjah",
}

$("[img-lang]").each(function (index) {
    $(this).attr('src',units[index][$(this).attr("img-lang")]);
});

$("[lang]").each(function (index) {
  $(this).html(title[$(this).attr("lang")]);
});