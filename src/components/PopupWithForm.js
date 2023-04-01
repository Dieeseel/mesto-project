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
    this.submitButton = this.element.querySelector('.form__submit-button');

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
      this.submitButton.textContent = "Сохранение..."
      this.submitHandler(this._getInputValues())
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
    const inputs = Array.from(this.element.querySelectorAll('input'))
    inputs.forEach(input => {
      if (input.hasAttribute('reference')) {
        input.value = document.querySelector(input.getAttribute('reference')).textContent
      } else {
        input.value = ""
      }
    })
    this.element.classList.add('popup_opened')
    this._handleEscClose()
  }


    close() {
      this.submitButton.textContent = "Сохранить"
      this.element.classList.remove('popup_opened')
      let errorSpans = this.form.querySelectorAll('.form__field-error')
      errorSpans.forEach(errorSpan=>{
        errorSpan.textContent = ""
      })

      let errorInputs = this.form.querySelectorAll('.form__input_type_error')
      errorInputs.forEach(errorInput=>{
        console.log('found')
        errorInput.classList.remove('form__input_type_error')
      })

      this.form.reset()
    }



}


export { PopupWithForm }
