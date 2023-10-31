// modalController & scrollService

const scrollService = {
  scrollPosition: 0,
  desableScroll() {
    this.scrollPosition = window.scrollY;
    //log('scrollPosition:', this.scrollPosition)
    document.documentElement.style.scrollBehavior = 'auto'
    document.body.style.cssText = `
    overflow: hidden;
    position: fixed;
    top: -${this.scrollPosition}px;
    left: 0;
    height: 100vh;
    width: 100vw;
    padding-right: ${window.innerWidth - document.body.offsetWidth}px;
` // document.body.offsetWidth - ширина страницы(документа)
    // window.innerWidth - ширина окна браузера
  },
  enableScroll() {
    document.body.style.cssText = ''
    window.scroll({ top: this.scrollPosition })
    document.documentElement.style.scrollBehavior = ''
  },
}

const modalController = ({ modal, btnOpen, focusEl = false, time = 300 }) => {
  const buttonEls = document.querySelectorAll(btnOpen)
  const modalEl = document.querySelector(modal)

  modalEl.style.cssText = `
  display:initial;
  visibility: hidden;
  opacity: 0;
  transition: opacity ${time}ms ease-in-out;
  `;

  const closeModal = (e) => {
    if(!e){
      _closeModal()
      return
    }
    const target = e.target
    const code = e.code
    if (target === modalEl || code === 'Escape') {
      _closeModal()
    }
  }
  const _closeModal = () => {
    modalEl.style.opacity = 0
    setTimeout(() => {
      modalEl.style.visibility = 'hidden'
      scrollService.enableScroll()
    }, time)

    window.removeEventListener('keydown', closeModal)
  }

  const openModal = () => {
    // debugger
    modalEl.style.visibility = 'visible'
    modalEl.style.opacity = 1

    window.addEventListener('keydown', closeModal)
    scrollService.desableScroll()

    if (focusEl) {
      document.querySelector(focusEl).focus();
    }
  }

  buttonEls.forEach((buttonEl) => {
    buttonEl.addEventListener('click', (e) => {
      openModal()
    })
  })

  if(modalEl){
    modalEl.addEventListener('click', (e) => {
      closeModal(e)
    })
  } else {
    console.error('modalController - не найден [' + modal +']')
  }

  return {
    openModal, // modalController.openModal()
    closeModal
  }
}
