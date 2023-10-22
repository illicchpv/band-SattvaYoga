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
    "incs",
    {
      insertType: "append",
      replace: [{ from: 'src="../asset/img/', to: 'src="./asset/img/' }],
    },
    () => {
      // console.log("IncludHtml Finish: Ok"); // вызывается когда IncludHtml всё сделал
      // прячим индикатор ожидания
      document.querySelector("body .root1").style.display = "";
      document.querySelector("body .root2").style.display = "none";
      // по currPage меняем selected класс

      document.querySelectorAll(`.root1 .${currPageClass}`).forEach((el) => {
        el.classList.add("selected");
      });
    }
  );
});
