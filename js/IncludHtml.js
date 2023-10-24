// IncludHtml.js
let IncludHtml = (function () {
  let _incsRoot = "./inc";
  let _incs_count = 0;
  let _finish_callback = false;
  let _defProps = false;
  let _selectorClass = 'incs'

  function doIncludAll( selectorClass, defProps, finish_callback = false){
    _selectorClass = selectorClass;
    _defProps = defProps;
    _finish_callback = finish_callback;
    const incs = document.querySelectorAll('.'+selectorClass);
    _incs_count = incs.length;
    console.log('incs.length:', incs.length)
    if (_incs_count <= 0) {
      if(_finish_callback){
        _finish_callback();
      }
      return;
    }
    try {
      incs.forEach((el) => {
        doIncludSingle(el)
      });
    } finally {
      setTimeout(()=>{
        // const incs = document.querySelectorAll('.'+selectorClass);
        // if(incs.length > 0){
        //   console.error("Рекурсивное вставление элементов пока не работает")
        //   // debugger;
        // }
        if(_finish_callback){
          _finish_callback();
        }
      }, 100);
    }    
  }
  function doIncludSingle(el){
    let params = el.dataset.incs
    el.classList.remove(_selectorClass);
    el.removeAttribute('data-incs');
    if(!params){
      console.error("IncludHtml - нет json параметров");
      return
    }
    try{
      params = JSON.parse(params)
    }catch(e){
      console.error("Не удалось разобрать параметры!", e, "data-incs=\r\n", params)
    }
    let incFromId = false;
    incFromId = (_defProps && _defProps.incFromId) ? _defProps.incFromId : incFromId;
    incFromId = (params && params.incFromId) ? params.incFromId : incFromId;
    // let errSt = !params;
    // errSt = errSt || !incFromId
    if(incFromId && params){
      // params.incFromId
      // params.incFile
      // params.onLoadCalback
      params.docEl = el
      params.extEl = null
      params.extUrl = null
      if(!params.incFile){ // вставка элемента из текущего документа
        const docElement = document.getElementById(incFromId);
        if (docElement) {
          const extEl = docElement.cloneNode(true);
          extEl.removeAttribute('id');
          params.extEl = extEl
          doProcess(params);
        } else {
          console.error("IncludHtml - не найден элемент с указанным id:", incFromId);
        }
      } else {  // вставка элемента из документа внешнего html файла
        const url = params.incFile
        if(!url){
          console.error("IncludHtml - не задана extUrl");
          return
        }
        fetch(url)
          .then((response) => {
            if (response.ok) {
              return response.text();
            }
          })
          .then((data) => {
            if (data) {
              const parser = new DOMParser(),
                content = "text/html",
                DOM = parser.parseFromString(data, content);
              const extEl = DOM.getElementById(incFromId); // DOM.body.querySelector('.'+pparams.incClass);
              if (extEl) {
                extEl.removeAttribute('id');
                params.extEl = extEl
                doProcess(params);
              } else {
                console.error("Не найден элемент с id: " + incFromId + "\r\nВ файле: ", url);
              }
            }
          })
          .catch((error) => {
            console.error("Fetch error: ", error);
          })
        ;
      }
    }
  }
  function doProcess(params) {
    let insertType = '';
    let incInner = false;
    let replace = [];

    insertType = (_defProps && _defProps.insertType) ? _defProps.insertType : insertType;
    incInner = (_defProps && _defProps.incInner) ? _defProps.incInner : incInner;

    insertType = (params && params.insertType) ? params.insertType : insertType;
    incInner = (params && params.incInner) ? params.incInner : incInner;

    if(_defProps && _defProps.replace){
      replace = (!Array.isArray(_defProps.replace)) ? replace = replace.concat([_defProps.replace]) : replace = replace.concat(_defProps.replace)
    }
    if(params && params.replace){
      replace = (!Array.isArray(params.replace)) ? replace = replace.concat([params.replace]) : replace = replace.concat(params.replace)
    }
    if(replace){
      replace.forEach((r) => {
        try{
          if( r.from && r.to){
            const reg = new RegExp(r.from, "ig");
            const str = params.extEl.innerHTML
            params.extEl.innerHTML = str.replace(reg, r.to);
          }else{
            console.warn('"from" и "to" обязательны в елементе "replace" ');
          }
        }catch(e){
          console.warn("ошибка при выполнении замены r:", r, "err:", e);
        }
      })
    }   
    const cb = params.onLoadCalback
    if (cb) {
      const handler = eval(`(p)=>{ ${cb}(p); }`);
      try {
        handler(params);
      } catch (e) {
        console.warn("catch error in call " + cb + "(params)", e);
      }
    }

    const incs = params.extEl.querySelectorAll('.'+ _selectorClass);
    if(incs.length > 0){
      console.error("Рекурсивное вставление элементов пока не работает")
      // debugger;
    }

    if(insertType && insertType === 'append'){
      params.docEl.append(params.extEl)
    } else if(insertType && insertType === 'prepend'){
      params.docEl.prepend(params.extEl)
    } else {
      if(incInner){
        params.docEl.outerHTML = params.extEl.innerHTML;
      }else{
        params.docEl.replaceWith(params.extEl);
      }
    }
  }

  return {
    doIncludAll
  };
})();
