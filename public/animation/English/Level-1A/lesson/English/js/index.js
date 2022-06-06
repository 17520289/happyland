var units = [
    {
      "img-unit-1": "./img/unit1.png"
    },
    {
      "img-unit-2": "./img/unit2.png"
    },
    {
      "img-unit-3": "./img/unit3.png"
    },
    {
      "img-unit-4": "./img/unit4.png"
    },
    {
      "img-unit-5": "./img/unit5.png"
    },
    {
      "img-unit-6": "./img/unit6.png"
    },
    {
      "img-unit-7": "./img/unit7.png"
    },
    {
      "img-unit-8": "./img/unit8.png"
    }
  ]

var title ={
  "title" : "English Speed Reading Assessmen",
}

$("[img-lang]").each(function (index) {
    $(this).attr('src',units[index][$(this).attr("img-lang")]);
});

$("[lang]").each(function (index) {
  $(this).html(title[$(this).attr("lang")]);
});
