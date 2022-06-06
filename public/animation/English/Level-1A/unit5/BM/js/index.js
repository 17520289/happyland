var exercises = [
  {
    "img-unit-1": "./public/img/bm1.png"
  },
  {
    "img-unit-2": "./public/img/bm2.png"
  },
  {
    "img-unit-3": "./public/img/bm3.png"
  }
]

var title ={
"title" : "Unit 5: Nombor dan Bentuk",
}

$("[img-lang]").each(function (index) {
  $(this).attr('src',exercises[index][$(this).attr("img-lang")]);
});

$("[lang]").each(function (index) {
$(this).html(title[$(this).attr("lang")]);
});