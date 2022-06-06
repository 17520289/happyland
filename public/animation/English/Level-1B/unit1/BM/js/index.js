var unit = {
  "title": "Unit 1: Anggota Badan",
  "unit1-title": "Anggota Badan",
  "unit1-decription": "Anggota Badan",
  "exersice1": "Latihan Satu",
  "exersice2": "Latihan Dua",
  "exersice3": "Latihan Tiga"
}
$("[lang]").each(function (index) {
  $(this).html(unit[$(this).attr("lang")]);
});
