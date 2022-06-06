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
  ,
  {
    "img-unit-4": "./BM/img/ex4.png"
  }
  ,
  {
    "img-unit-5": "./BM/img/ex5.png"
  }
]

var title ={
  "title" : "Unit 7: Kenderaan",
}

$("[img-lang]").each(function (index) {
    $(this).attr('src',units[index][$(this).attr("img-lang")]);
});

$("[lang]").each(function (index) {
  $(this).html(title[$(this).attr("lang")]);
});