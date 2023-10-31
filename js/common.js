// common.js
const log = console.log;
// log('common.js')
let mcBurger = null; // modal controller

// список кнопок переходов на тестовые страницы
const testButtons = ["", "itest1.html", "itest2.html"];

// определяем текущую страницу
const currPage =
  location.pathname.split("/").pop().toLowerCase() === ""
    ? "index.html"
    : location.pathname.split("/").pop().toLowerCase();
const currPageClass = currPage.replace(".", "-");

const hashchangeHandler = () => {
  let curHash = location.hash.replaceAll('#','')
  curHash = (curHash === '' ?  IncludHtml.routes[''].hash : curHash)
  let curHash0 = curHash.split('/')[0]
  if(curHash.startsWith('!')){
    if(location.hash.replaceAll('#','') != curHash){
      IncludHtml.routes['%lastHash%'] = curHash
      location.hash = curHash
      return
    }
    let url = ''
    try{
      url = IncludHtml.routes[curHash0].url
      if(!url) 
        throw 'unsupported route [' + curHash0 + ']'
    }catch(e){
      console.error('IncludHtml.routes["' + curHash0 + '"].url\r\n', e)
      if(IncludHtml.routes['%lastHash%'])
        location.hash = IncludHtml.routes['%lastHash%']
      return;
    }
    if(IncludHtml.routes['%routePage%'] != url){
      console.log('show url:', url, 'previouse url:', IncludHtml.routes['%routePage%'])
      IncludHtml.routes['%lastHash%'] = curHash
      IncludHtml.routes['%routePage%'] = url
      // меняем заголовок стр.
      document.title = IncludHtml.routes[curHash0].title
      // замена содержимого стр.
      const a = document.querySelectorAll('.incs-route')
      // debugger
      a.forEach((el) => {
        el.innerHTML = ''
        IncludHtml.doInsertInto(
          el,
          () => {
            console.log("IncludHtml.doInsertInto Finish: Ok");
          }
        )
      })
      if(typeof(pageChanged) === 'function'){
        pageChanged()
      }
    }
  }else{
    location.hash = IncludHtml.routes['%lastHash%']
  }
}

window.onload = () => console.log('window onload');
document.addEventListener("DOMContentLoaded", function () {
  console.log('document is ready.', location.hostname, "currPage:", currPage, "currPageClass:", currPageClass);

  {  // цвет. тема стр. \надо передавать между стр
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

  // определяем маршрутизацию. какие url какие файлы подгружают
  IncludHtml.routes[''] =        {hash: '!index', url:'page-index/main.html#extId', title:'SattvaYoga | главная'};
  IncludHtml.routes['!index'] =  {hash: '!index', url:'page-index/main.html#extId', title:'SattvaYoga | главная'};
  IncludHtml.routes['!about'] =  {hash: '!about', url:'page-about/main.html#extId', title:'SattvaYoga | о нас'};
  // вспомогательные 👇
  IncludHtml.routes['%lastHash%'] = false;
  IncludHtml.routes['%routePage%'] = 'page-index/main.html#'; // 👈 используется при загрузке части стр.

  IncludHtml.doIncludAll(
    {
      insertType: "append",
      incInner: false,
      replace: [
        { from: 'src="../asset/img/', to: 'src="./asset/img/' }, 
        { from: 'src="../asset/svg/', to: 'src="./asset/svg/' }
      ],
    },
    () => {
      console.log("IncludHtml Finish: Ok"); // вызывается когда IncludHtml всё сделал
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

      // routing
      hashchangeHandler()
      window.addEventListener('hashchange', hashchangeHandler);

      mcBurger = modalController({ 
        modal: '.modal_burger', 
        btnOpen: '.header__nav-burger', 
        // focusEl: '.order__input' 
      })

    }
  );
});
function pageChanged(){
  try{
    mcBurger.closeModal()
  }catch(e){}
}