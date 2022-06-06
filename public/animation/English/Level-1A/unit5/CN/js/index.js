var exercises = [
  {
    "img-unit-1": "./public/img/en1.png"
  },
  {
    "img-unit-2": "./public/img/en2.png"
  },
  {
    "img-unit-3": "./public/img/en3.png"
  }
]

var title ={
"title" : "单元五：数字与形状",
}

$("[img-lang]").each(function (index) {
  $(this).attr('src',exercises[index][$(this).attr("img-lang")]);
});

$("[lang]").each(function (index) {
$(this).html(title[$(this).attr("lang")]);
});