
var unit ={
  "title" : "Unit 1: Parts of the Body",
  "unit1-decription": "Choose the correct answers.",
  "exersice1" : "Exersice 1",
  "exersice2" : "Exersice 2",
  "exersice3": "Exersice 3"
}

$("[lang]").each(function (index) {
  $(this).html(unit[$(this).attr("lang")]);
});
