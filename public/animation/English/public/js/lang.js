var language = localStorage.getItem('language');
language = language.replace(/"|'/g,'');
switch(language) {
  case 'en':
    language = 'English';
    $("body").css("font-family","\'LoveAndJoy\'");
    $("html").css("font-family","\'LoveAndJoy\'");
    break;
  case 'cn':
    language = 'CN';
    $("body").css("font-family","\'simkai\'");
    $("html").css("font-family","\'simkai\'");
    break;
  case 'bm':
    language = 'BM';
    break;
  default:
    language = 'English';
    $("body").css("font-family","\'LoveAndJoy\'");
    $("html").css("font-family","\'LoveAndJoy\'");
}
var jsUrl = "./"+language+"/js/index.js";
load_js(jsUrl);
function load_js(src)
{
  var head= document.getElementsByTagName('head')[0];
  var script= document.createElement('script');
  script.src= src;
  head.appendChild(script);
}
  
