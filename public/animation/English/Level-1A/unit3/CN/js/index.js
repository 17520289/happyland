var unit ={
  "title" : "单元三：家庭成员",
  "say-cheese" : "笑一笑",
  "hello" : "你好",
  "start": "開始"
}

$("[lang]").each(function (index) {
  $(this).html(unit[$(this).attr("lang")]);
});

