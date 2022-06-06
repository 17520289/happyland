var exercises = [
  {
    "img-unit-1": "./img/cn1.png"
  },
  {
    "img-unit-2": "./img/cn2.png"
  }
]

var title ={
"title" : "单元四：颜色",
}

$("[img-lang]").each(function (index) {
  $(this).attr('src',exercises[index][$(this).attr("img-lang")]);
});

$("[lang]").each(function (index) {
$(this).html(title[$(this).attr("lang")]);
});