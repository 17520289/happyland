var unit = {
  "title": "单元一：身体各部分",
  "unit1-decription": "Choose the correct answers.",
  "exersice1": "練習一",
  "exersice2": "練習二",
  "exersice3": "練習三"
}
$("[lang]").each(function (index) {
  $(this).html(unit[$(this).attr("lang")]);
});
