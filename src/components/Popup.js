class Popup {
  constructor(popupHtmlSelector) {
    this.popupHtmlSelector = popupHtmlSelector
    this.element = document.querySelector(popupHtmlSelector)
    this.closeButton = this.element.querySelector('.popup__close-button');
  }

  open() {
    this.element.classList.add('popup_opened');
    document.addEventListener('keydown', this._handleEscClose);
  }


  close() {
    this.element.classList.remove('popup_opened');
    document.removeEventListener('keydown', this._handleEscClose);
  }

  _handleEscClose() {
    document.addEventListener('keydown', (evt) => {
      if (evt.key === "Escape") {
        this.close()
      }
    });
  }


  setEventListeners() {
    this.closeButton.addEventListener('click', () => {
      this.close()
    })

    this.element.addEventListener('click', (evt) => {
      if (evt.currentTarget === evt.target) {
        this.close()
      }
    })
  }
}


export { Popup }
