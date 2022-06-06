var units = [
    {
      "img-unit-1": "./BM/img/unit1.png"
    },
    {
      "img-unit-2": "./BM/img/unit2.png"
    },
    {
      "img-unit-3": "./BM/img/unit3.png"
    },
    {
      "img-unit-4": "./BM/img/unit4.png"
    },
    {
      "img-unit-5": "./BM/img/unit5.png"
    },
    {
      "img-unit-6": "./BM/img/unit6.png"
    },
    {
      "img-unit-7": "./BM/img/unit7.png"
    },
    {
      "img-unit-8": "./BM/img/unit8.png"
    }
  ]

  var title ={
    "title" : "Penilaian Bacaan Laju",
  }
  
  $("[img-lang]").each(function (index) {
      $(this).attr('src',units[index][$(this).attr("img-lang")]);
  });
  
  $("[lang]").each(function (index) {
    $(this).html(title[$(this).attr("lang")]);
  });