// common.js
const log = console.log;
// log('common.js')

// список кнопок переходов на тестовые страницы
const testButtons = ["", "itest1.html", "itest2.html"];

// определяем текущую страницу
const currPage =
  location.pathname.split("/").pop().toLowerCase() === ""
    ? "index.html"
    : location.pathname.split("/").pop().toLowerCase();
const currPageClass = currPage.replace(".", "-");
log("currPage:", currPage, "currPageClass:", currPageClass);

document.addEventListener("DOMContentLoaded", function () {
  // console.log('document is ready.', location.hostname);

  {
    // цвет. тема стр. \надо передавать между стр
    const darkThemeMq = window.matchMedia("(prefers-color-scheme: dark)");
    if (darkThemeMq.matches) {
      //console.log(' Theme set to dark.')
      document.documentElement.classList.remove("themeLight");
      document.documentElement.classList.add("themeDark");
    } else {
      //console.log(' Theme set to light.')
      document.documentElement.classList.add("themeLight");
      document.documentElement.classList.remove("themeDark");
    }
  }

  IncludHtml.doIncludAll(
    {
      insertType: "append",
      replace: [
        { from: 'src="../asset/img/', to: 'src="./asset/img/' }, 
        { from: 'src="../asset/svg/', to: 'src="./asset/svg/' }
      ],
      "incFromId": "extId"
    },
    () => {
      // console.log("IncludHtml Finish: Ok"); // вызывается когда IncludHtml всё сделал
      // прячем индикатор ожидания
      if(typeof(root1Off) === 'undefined' || !root1Off){
        try{
          document.querySelector("body .root1").style.display = "";
        }catch(e){}
        try{
          document.querySelector("body .root2").style.display = "none";
        }catch(e){}
      }

      // по currPage добавляем 'page-selected' класс
      document.querySelectorAll(`.root1 .${currPageClass}`).forEach((el) => {
        el.classList.add("page-selected");
      });
    }
  );
});
