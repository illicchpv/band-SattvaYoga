// testmenu.js
// log('testmenu.js')
document.addEventListener("DOMContentLoaded", function () {
  // если стр. запущене не локально, ничего не добавляем
  if (location.hostname !== "127.0.0.1") {
    return;
  }

  let btnText = "light->dark";
  const darkThemeMq = window.matchMedia("(prefers-color-scheme: dark)");
  if (darkThemeMq.matches) {
    btnText = "dark->light";
  }

  // верхнее техническое меню.
  // const testButtons = ["", "itest1.html", "itest2.html"]; // определяется в common.js
  let btns = ''
  if(testButtons){
    btns = testButtons.reduce((pgs, pg) => {
      const pgName = pg === "" ? "index.html" : pg;
      const pgCaption = "<i>test</i> " + pgName.replace(".html", "");
      return (
        pgs +
        `
        <div class="testMenu__page" title="перейти на ${pgName}">
          <a href="./${pg}"><i>test</i> ${pgName}</a>
        </div>
        `
      );
    }, "");
  }
  // log('btns:', btns)

  document.querySelector("body .root1").insertAdjacentHTML(
    "afterbegin",
    `
  <!-- верхнее техническое меню. ну может протестировать что-то понадобиться -->
  <style>
  .testMenu {
    background-color: #f4f1f1;
    padding-left: 5px;
    padding-bottom: 2px;
    font-family: sans-serif;
    font-size: 12px;
    font-weight: 400;
    height: 5px;
    overflow: hidden;
    -webkit-transition: height 0.3s;
    transition: height 0.3s;
  }
  .testMenu:hover {
    height: 25px;
    overflow: unset;
  }
  .testMenu i{
    font-style: normal;
  }
  .testMenu__pages {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    gap: 7%;
  }
  .testMenu__pages button {
    padding: 6px 10px 1px;
    border-radius: 0;
    border: 1px solid rgba(0, 0, 0, 0.3);
  }
  .testMenu__page a {
    color: black;
    display: block;
    padding: 6px 10px 1px;
    text-decoration: none;
    border-radius: 0;
    border: 1px solid rgba(0, 0, 0, 0.3);
  }
  .testMenu__page a:hover {
    text-decoration: underline;
  }
  @media (max-width: 1000px) {
    .testMenu i {
      display: none;
    }
  }
  </style>
  <div class="testMenu">
    <div class="testMenu__pages">
      ${btns}
      <div class="testMenu__page">
        <button onclick="themeChange()" title="сменить схему цветов"><span id="theme">${btnText}<span></button>
      </div>      
    </div>
  </div>
  `
  );
});

// обработчик нажания на кнопку 'сменить схему цветов' ☝️
function themeChange() {
  document.documentElement.classList.toggle("themeLight");
  document.documentElement.classList.toggle("themeDark");
  if (document.documentElement.classList.contains("themeDark")) {
    document.getElementById("theme").innerText = "dark->light";
  } else {
    document.getElementById("theme").innerText = "light->dark";
  }
}
