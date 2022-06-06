var units = [
  {
    "img-unit-1": "./CN/img/ex1.png"
  },
  {
    "img-unit-2": "./CN/img/ex2.png"
  },
  {
    "img-unit-3": "./CN/img/ex3.png"
  }
  ,
  {
    "img-unit-4": "./CN/img/ex4.png"
  }
  ,
  {
    "img-unit-5": "./CN/img/ex5.png"
  }
]

var title ={
  "title" : "单元七：交通工具",
}

$("[img-lang]").each(function (index) {
    $(this).attr('src',units[index][$(this).attr("img-lang")]);
});

$("[lang]").each(function (index) {
  $(this).html(title[$(this).attr("lang")]);
});