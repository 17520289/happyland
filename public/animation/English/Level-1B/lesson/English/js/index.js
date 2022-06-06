var units = [
    {
      "img-unit-1": "./English/img/unit1.png"
    },
    {
      "img-unit-2": "./English/img/unit2.png"
    },
    {
      "img-unit-3": "./English/img/unit3.png"
    },
    {
      "img-unit-4": "./English/img/unit4.png"
    },
    {
      "img-unit-5": "./English/img/unit5.png"
    },
    {
      "img-unit-6": "./English/img/unit6.png"
    },
    {
      "img-unit-7": "./English/img/unit7.png"
    },
    {
      "img-unit-8": "./English/img/unit8.png"
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
