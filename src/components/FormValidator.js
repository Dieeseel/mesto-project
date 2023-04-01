class FormValidator {
  constructor(config, formInstance) {
    this.config = config
    this.formInstance = formInstance
    this.enableValidation() // sets event listeners
  }

  enableValidation() {
    const formList = Array.from(document.querySelectorAll(this.config.formSelector));
    formList.forEach(formElement => {
      this.setValidationEventListener(formElement, this.config);
    })
  }

  setValidationEventListener(formElement) {
    const inputList = Array.from(formElement.querySelectorAll(this.config.inputSelector));
    const buttonElement = formElement.querySelector(this.config.submitButtonSelector);

    this.toggleButtonState(inputList, buttonElement, this.config);

    formElement.addEventListener('reset', () => {
      setTimeout(() => {
        this.toggleButtonState(inputList, buttonElement, this.config);
      }, 0)
    })

    inputList.forEach((inputElement) => {
      inputElement.addEventListener('input',  ()=> {
        this.checkInputValidity(formElement, inputElement, this.config);
        this.toggleButtonState(inputList, buttonElement, this.config)
      })
    })

  }

  showError(formElement, inputElement, errorMessage) {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`)
    inputElement.classList.add(this.config.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this.config.errorClass)
  }


  hideError(formElement, inputElement) {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(this.config.inputErrorClass);
    errorElement.classList.remove(this.config.errorClass);
    errorElement.textContent = '';
  }

  checkInputValidity(formElement, inputElement) {
    if (inputElement.validity.valueMissing) {
      inputElement.setCustomValidity(inputElement.dataset.missingMessage);
    } else if (inputElement.validity.patternMismatch) {
      inputElement.setCustomValidity(inputElement.dataset.errorMessage)
    } else {
      inputElement.setCustomValidity("");
    }
    if (!inputElement.validity.valid) {
      this.showError(formElement, inputElement, inputElement.validationMessage, this.config);
    } else {
      this.hideError(formElement, inputElement, this.config)
    }
  }

  hasInvalidInput(inputList) {
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    })
  }

  toggleButtonState(inputList, buttonElement) {
    if (this.hasInvalidInput(inputList)) {
      buttonElement.disabled = true;
      buttonElement.classList.add(this.config.inactiveButtonClass)
    } else {
      buttonElement.disabled = false;
      buttonElement.classList.remove(this.config.inactiveButtonClass);
    }
  }
}

export {
  FormValidator
}
