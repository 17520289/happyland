var units = [
    {
      "img-unit-1": "./CN/img/unit1.png"
    },
    {
      "img-unit-2": "./CN/img/unit2.png"
    },
    {
      "img-unit-3": "./CN/img/unit3.png"
    },
    {
      "img-unit-4": "./CN/img/unit4.png"
    },
    {
      "img-unit-5": "./CN/img/unit5.png"
    },
    {
      "img-unit-6": "./CN/img/unit6.png"
    },
    {
      "img-unit-7": "./CN/img/unit7.png"
    },
    {
      "img-unit-8": "./CN/img/unit8.png"
    }
  ]

  var title ={
    "title" : "华文速读评审",
  }
  
  $("[img-lang]").each(function (index) {
      $(this).attr('src',units[index][$(this).attr("img-lang")]);
  });
  
  $("[lang]").each(function (index) {
    $(this).html(title[$(this).attr("lang")]);
  });