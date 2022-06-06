var units = [
  {
    "img-unit-1": "./English/img/ex1.png"
  },
  {
    "img-unit-2": "./English/img/ex2.png"
  },
  {
    "img-unit-3": "./English/img/ex3.png"
  },
  {
    "img-unit-4": "./English/img/ex4.png"
  },
  {
    "img-unit-5": "./English/img/ex5.png"
  }
]

var title ={
  "title" : "Unit 1: Clothes",
}

$("[img-lang]").each(function (index) {
    $(this).attr('src',units[index][$(this).attr("img-lang")]);
});

$("[lang]").each(function (index) {
  $(this).html(title[$(this).attr("lang")]);
});