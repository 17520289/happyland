
var unit ={
  "title" : "Unit 2: The Face",
  "exersice1" : "Exersice 1",
  "exersice2" : "Exersice 2"
}

$("[lang]").each(function (index) {
  $(this).html(unit[$(this).attr("lang")]);
});
