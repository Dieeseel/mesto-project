const profileFormButton = document.querySelector('.profile__edit-button');
const placeFormButton = document.querySelector('.profile__add-button');
const avatarFormButton = document.querySelector('.profile__avatar-button');
const popups = document.querySelectorAll('.popup');
const profileName = document.querySelector('.profile__title');
const profileProfession = document.querySelector('.profile__subtitle');
const profilePopup = document.querySelector('#popup__edit-profile');
const avatarPopup = document.querySelector('#popup__avatar');
const profileButtonSubmit = profilePopup.querySelector('.form__submit-button');


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
}


export {
  configApi,
  validationSettings,
  profileFormButton,
  placeFormButton,
  avatarFormButton,
  popups,
  profileName,
  profileProfession,
  profilePopup,
  avatarPopup,
  profileButtonSubmit
 }
