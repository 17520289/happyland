var exercises = [
  {
    "img-unit-1": "./img/bm1.png"
  },
  {
    "img-unit-2": "./img/bm2.png"
  }
]

var title ={
"title" : "Unit 4: Warna",
}

$("[img-lang]").each(function (index) {
  $(this).attr('src',exercises[index][$(this).attr("img-lang")]);
});

$("[lang]").each(function (index) {
$(this).html(title[$(this).attr("lang")]);
});