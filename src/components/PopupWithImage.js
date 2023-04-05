import { Popup } from "./Popup";

class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this.popupImage = document.querySelector('.popup__image');
    this.popupCaption = document.querySelector('.popup__caption')
    super.setEventListeners()
  }

  open(cardLink, cardName) {
    super.open();
    this.popupImage.src = cardLink;
    this.popupImage.alt = cardName;
    this.popupCaption.textContent = cardName;
  }
}


export { PopupWithImage }
