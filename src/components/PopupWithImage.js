import { Popup } from './Popup.js'

class PopupWithImage extends Popup {
  constructor(popupHtmlSelector) {
    super(popupHtmlSelector)
    this.popupImage = document.querySelector('.popup__image');
    this.popupCaption = document.querySelector('.popup__caption')
    super.setEventListeners()
  }

  open(cardLink, cardName) {
    this.popupImage.src = cardLink
    this.popupImage.alt = cardName
    this.popupCaption.textContent = cardName
    super.open();
    super._handleEscClose()
  }
}

export { PopupWithImage }
