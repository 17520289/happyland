var exercises = [
  {
    "img-unit-1": "./img/en1.png"
  },
  {
    "img-unit-2": "./img/en2.png"
  }
]

var title ={
"title" : "Unit 4 : Colours",
}

$("[img-lang]").each(function (index) {
  $(this).attr('src',exercises[index][$(this).attr("img-lang")]);
});

$("[lang]").each(function (index) {
$(this).html(title[$(this).attr("lang")]);
});