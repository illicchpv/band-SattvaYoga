// testmenu.js
// log('testmenu.js')
document.addEventListener('DOMContentLoaded', function () {
  // если стр. запущене не локально, ничего не добавляем
  if (location.hostname !== '127.0.0.1') {
    return
  }

  let btnText = 'light->dark'
  const darkThemeMq = window.matchMedia("(prefers-color-scheme: dark)");
  if (darkThemeMq.matches) {
    btnText = 'dark->light'
  }
  
  document.querySelector("body .root1").insertAdjacentHTML('afterbegin',
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
      <div class="testMenu__page" title="перейти на index.html">
        <a href="/">main</a>
      </div>
      <div class="testMenu__page" title="перейти на testpage1.html">
        <a href="./testpage1.html"><i>test</i> page1</a>
      </div>
      <div class="testMenu__page" title="перейти на testpage2.html">
        <a href="./testpage2.html"><i>test</i> page2</a>
      </div>
      <div class="testMenu__page" title="перейти на testpage3.html">
        <a href="./testpage3.html"><i>test</i> page3</a>
      </div>
      <div class="testMenu__page">
        <button onclick="themeChange()" title="сменить схему цветов"><span id="theme">${btnText}<span></button>
      </div>      
    </div>
  </div>
  `);
});
function themeChange() {
  document.documentElement.classList.toggle('themeLight')
  document.documentElement.classList.toggle('themeDark')
  if (document.documentElement.classList.contains('themeDark')) {
    document.getElementById('theme').innerText = 'dark->light'
  } else {
    document.getElementById('theme').innerText = 'light->dark'
  }
}