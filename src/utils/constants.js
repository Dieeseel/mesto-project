const profileFormButton = document.querySelector('.profile__edit-button');
const placeFormButton = document.querySelector('.profile__add-button');
const avatarFormButton = document.querySelector('.profile__avatar-button');

const configApi = {
  baseUrl: 'https://nomoreparties.co/v1/plus-cohort-21',
  headers: {
    authorization: '417c23b5-d216-4c43-a497-aa05308a8288',
    'Content-Type': 'application/json'
  }
};

const validationSettings = {
  formSelector: '.form',
  inputSelector: '.form__input',
  submitButtonSelector: '.form__submit-button',
  inactiveButtonClass: 'form__submit-button_disabled',
  inputErrorClass: 'form__input_type_error',
  errorClass: 'form__field-error_active'
};

export { profileFormButton, placeFormButton, avatarFormButton, configApi, validationSettings }
