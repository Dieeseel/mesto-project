import { Popup } from './Popup.js'

class PopupWithForm extends Popup {
  constructor(popupHtmlSelector, submitHandler) {
    super(popupHtmlSelector)
    this.popupHtmlSelector = popupHtmlSelector
    this.element = document.querySelector(this.popupHtmlSelector)
    this.form = this.element.querySelector('form')
    this.submitHandler = submitHandler
    this.inputList = this.element.querySelectorAll('input');
    this.closeButton = this.element.querySelector('.popup__close-button');
    this.setEventListeners()
  }

  _getInputValues() {
    this._formValue = {}
    this.inputList.forEach(input => {
      this._formValue[input.name] = input.value
    })
    return this._formValue
  }

  setEventListeners() {
    this.form.addEventListener('submit', (evt) => {
      evt.preventDefault()
      this.submitHandler(this._getInputValues())
      evt.target.reset();
    })


    this.closeButton.addEventListener('click', () => {
      this.close()
    })


    this.element.addEventListener('click', (evt) => {
      if (evt.currentTarget === evt.target) {
        this.close()
      }
    })

  }

  open() {
    super.open()
  }

  close() {
    super.close();
    this.form.reset()
  }
}


export { PopupWithForm }
