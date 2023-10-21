// index.js
// log('index.js')

const element_Onload = function (p) { // обработчик вставляемых элементов
  p.extEl.innerHTML = IncludHtml.replaceAll(p.extEl.innerHTML, "../img/", "./img/");
  p.extEl.querySelector("#url").innerHTML = p.incFile
};

document.addEventListener('DOMContentLoaded', function () {
  // console.log('document is ready.', location.hostname);

  const darkThemeMq = window.matchMedia("(prefers-color-scheme: dark)");
  if (darkThemeMq.matches) {
    //console.log(' Theme set to dark.')
    document.documentElement.classList.remove('themeLight')
    document.documentElement.classList.add('themeDark')
  } else {
    //console.log(' Theme set to light.')
    document.documentElement.classList.add('themeLight')
    document.documentElement.classList.remove('themeDark')
  }

  IncludHtml.doIncludAll("incs", () =>{
    // console.log("IncludHtml Finish: Ok"); // вызывается когда IncludHtml всё сделал
    document.querySelector("body .root1").style.display = ''; 
    document.querySelector("body .root2").style.display = 'none'; 
  });
});
