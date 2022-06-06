var unit ={
  "title" : "Unit 2: Muka",
  "exersice1" : "Latihan Satu",
  "exersice2" : "Latihan dua"
}

$("[lang]").each(function (index) {
  $(this).html(unit[$(this).attr("lang")]);
});
