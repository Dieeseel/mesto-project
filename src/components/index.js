import '../pages/index.css'

import {
  createCard,
  addCard
} from './card.js'

import {
  openPopup,
  closePopup,
  profileName,
  profileProfession,
  profilePopup,
  avatarPopup
} from './modal.js'

import {
  enableValidation
} from './validate.js'

import Api from './Api.js';

const api = new Api()

const placePopup = document.querySelector('#popup__add-card');
const imagePopup = document.querySelector('#popup__open-img');
const profileFormButton = document.querySelector('.profile__edit-button');
const placeFormButton = document.querySelector('.profile__add-button');
const crossPopupButtons = document.querySelectorAll('.popup__close-button');
const nameFormField = profilePopup.querySelector('#name-input');
const professionFormField = profilePopup.querySelector('#profession-input');
const profileFormElement = document.querySelector('#profile-form');
const placeFormElement = document.querySelector('#place-form');
const avatarFormElement = document.querySelector('#avatar-form');
const popupImage = imagePopup.querySelector('.popup__image');
const caption = imagePopup.querySelector('.popup__caption');
const cardName = document.querySelector('#place-name');
const cardLink = document.querySelector('#place-link');
const placeButtonSubmit = placePopup.querySelector('.form__submit-button');
const profileButtonSubmit = profilePopup.querySelector('.form__submit-button');
const avatarButtonSubmit = avatarPopup.querySelector('.form__submit-button')
const avatarFormButton = document.querySelector('.profile__avatar-button');
const avatar = document.querySelector('.profile__avatar');
const avatarLink = avatarPopup.querySelector('#avatar-link');

const validationSettings = {
  formSelector: '.form',
  inputSelector: '.form__input',
  submitButtonSelector: '.form__submit-button',
  inactiveButtonClass: 'form__submit-button_disabled',
  inputErrorClass: 'form__input_type_error',
  errorClass: 'form__field-error_active'
};


const newPromises = [api.getUserData(), api.getInitialCards()]

Promise.all(newPromises)
  .then(([dataProfile, initialCards]) => {
    const userId = dataProfile._id
    profileName.textContent = dataProfile.name;
    profileProfession.textContent = dataProfile.about;
    avatar.src = dataProfile.avatar;

    initialCards.forEach((card) => {
      addCard(createCard(userId, card));
    })
  })
  .catch((err) => {
    console.log(err)
  })




profileFormButton.addEventListener('click', function () {
  nameFormField.value = profileName.textContent;
  professionFormField.value = profileProfession.textContent;

  openPopup(profilePopup);
});



placeFormButton.addEventListener('click', function () {
  openPopup(placePopup);
})


avatarFormButton.addEventListener('click', function () {
  openPopup(avatarPopup);
})


crossPopupButtons.forEach(function (button) {
  const popup = button.closest('.popup');
  button.addEventListener('click', () => closePopup(popup));
})


function handleProfileFormSubmit(evt) {
  evt.preventDefault();

  profileButtonSubmit.textContent = 'Сохранение...';
  api.saveProfileData(nameFormField.value, professionFormField.value)
    .then((data) => {
      profileName.textContent = data.name;
      profileProfession.textContent = data.about;
      closePopup(profilePopup);
      evt.target.reset();
    })
    .catch((err) => {
      console.log(err)
    })
    .finally(() => {
      profileButtonSubmit.textContent = 'Сохранение';
    })
}


function handleAvatarFormSubmit(evt) {
  evt.preventDefault();

  avatarButtonSubmit.textContent = 'Сохранение...';
  api.changeAvatar(avatarLink.value)
    .then((res) => {
      avatar.src = res.avatar;
      closePopup(avatarPopup);
      evt.target.reset();
    })
    .catch((err) => {
      console.log(err)
    })
    .finally(() => {
      avatarButtonSubmit.textContent = 'Сохранение';
    })
}



placeFormElement.addEventListener('submit', function (evt) {
  evt.preventDefault();

  placeButtonSubmit.textContent = 'Сохранение...';
  api.saveNewCard(cardName.value, cardLink.value)
    .then((card) => {
      const userId = card.owner._id;

      addCard(createCard(userId, card));
      closePopup(placePopup);
      evt.target.reset();
    })
    .catch((err) => {
      console.log(err)
    })
    .finally(() => {
      placeButtonSubmit.textContent = 'Сохранение';
    })
})


profileFormElement.addEventListener('submit', handleProfileFormSubmit);
avatarFormElement.addEventListener('submit', handleAvatarFormSubmit);




enableValidation(validationSettings)
export {
  validationSettings,
  popupImage,
  caption,
  imagePopup
}
