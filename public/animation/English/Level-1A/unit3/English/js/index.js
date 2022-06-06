
var unit ={
  "title" : "Unit 3: Family Members",
  "say-cheese" : "Say <br/> Cheese",
  "hello" : "Hello",
  "start": "Let's Start"
}

$("[lang]").each(function (index) {
  $(this).html(unit[$(this).attr("lang")]);
});
