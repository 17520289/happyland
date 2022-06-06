
var unit ={
  "title" : "单元二：脸",
  "exersice1" : "練習一",
  "exersice2" : "練習二"
}

$("[lang]").each(function (index) {
  $(this).html(unit[$(this).attr("lang")]);
});
