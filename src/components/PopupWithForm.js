import { Popup } from "./Popup";

class PopupWithForm extends Popup {
  constructor(popupSelector, submitHandler) {
    super(popupSelector);
    this._inputList = this._popup.querySelectorAll('.form__input');
    this._form = this._popup.querySelector('.form');
    this._submitHandler = submitHandler;
    this.submitButton = this._popup.querySelector('.form__submit-button')
    this.setEventListeners();
    super.setEventListeners();
  }

  _getInputValues() {
    this._formValue = {}
    this._inputList.forEach(input => {
      this._formValue[input.name] = input.value
    })
    return this._formValue
  }

  setInputValues(data) {
    this._inputList.forEach((input) => {
      input.value = data[input.name];
    });
  }

  setEventListeners() {
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._submitHandler(this._getInputValues())
    })
  }
}


export { PopupWithForm }
