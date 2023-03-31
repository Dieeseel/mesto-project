class Popup {
  constructor(popupHtmlSelector) {
    this.popupHtmlSelector = popupHtmlSelector
    this.el = document.querySelector(popupHtmlSelector)
    this.closeButton = this.el.querySelector('button')
  }

  open() {
    console.log("parent open")
  }


  close() {
    console.log('here')
    this.el.classList.remove('popup_opened')
  }

  _handleEscClose() {
    document.addEventListener('keydown', (evt) => {
      this._handleKeyDown(evt)
    });
  }

  _handleKeyDown(evt) {
    if (evt.key === "Escape") {
      this.close()
    }
    document.removeEventListener('keydown', (evt) => {
      this._handleKeyDown(evt)
    });
  }

  setEventListeners() {
    // cross close button click
    this.el.querySelector('.popup__close-button').addEventListener('click', (evt) => {
      this.close()
    })

    // close on overlay click
    this.el.addEventListener('click', (evt) => {    
      console.log('here on close on overlay')  
      if (evt.currentTarget === evt.target) {
        console.log('here on close on overlay')
        this.close()
      }
    })
  }
}

class PopupWithForm extends Popup {
  constructor(popupHtmlSelector, submitHandler) {
    super(popupHtmlSelector)
    this.popupHtmlSelector = popupHtmlSelector
    this.el = document.querySelector(this.popupHtmlSelector)
    this.form = this.el.querySelector('form')
    this.submitHandler = submitHandler
    this.inputList = this.el.querySelectorAll('input')
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
      console.log(this.el.querySelector('.form__submit-button'))
      this.el.querySelector('.form__submit-button').textContent = "Сохранение..."      
        this.submitHandler(this._getInputValues())
        this.el.querySelector('.form__submit-button').textContent = "Сохранить"
    })

    // cross close button click        
    this.el.querySelector('.popup__close-button').addEventListener('click', (evt) => {
      this.close()
    })

    // close on close on overlay
    this.el.addEventListener('click', (evt) => {    
      console.log('here on close on overlay')  
      if (evt.currentTarget === evt.target) {
        console.log('here on close on overlay')
        this.close()
      }
    })

  }

  open() {
    const inputs = Array.from(this.el.querySelectorAll('input'))
    inputs.forEach(input => {
      if (input.hasAttribute('reference')) {
        input.value = document.querySelector(input.getAttribute('reference')).textContent
      } else {
        input.value = ""
      }
    })
    this.el.classList.add('popup_opened')
    this._handleEscClose()
  }

  close() {
    
    this.el.classList.remove('popup_opened')

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

class PopupWithImage extends Popup {
  constructor(popupHtmlSelector) {
    super(popupHtmlSelector)
    this.popupHtmlSelector = popupHtmlSelector
    this.el = document.querySelector(this.popupHtmlSelector)
    super.setEventListeners()
  }

  open(cardLink, cardName) {
    this.el.querySelector('.popup__image').src = cardLink
    this.el.querySelector('.popup__image').alt = cardName
    this.el.querySelector('.popup__caption').textContent = cardName
    this.el.classList.add('popup_opened')
    this._handleEscClose()
  }
}

export {
  Popup,
  PopupWithImage,
  PopupWithForm
}
