import '../pages/index.css'

import {
  // createCard,
  // addCard,
  Card
} from './Card.js'

import {
  UserInfo
} from './UserInfo'

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

import Section from './Section'


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
let userId = ""
const userInfo = new UserInfo('.profile__title', '.profile__subtitle', '.profile__avatar', api)
let section = ""
Promise.all(newPromises)
  .then(([dataProfile, initialCards]) => {
    userId = dataProfile._id
     section = new Section({
      initialCards,
      renderer
    }, '.elements__inner')

  }).catch((err) => {
    console.log(err)
  })

function renderer(items, target) {
  items.forEach((item) => {
    const card = new Card(userId, item, '.card-template', api)
    const cardElement = card.generate();
    document.querySelector(target).append(cardElement); // это тоже должно быть через секцию
  });
}


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
  userInfo.setUserInfo({
    name: nameFormField.value,
    about: professionFormField.value
  }).then(data => {
    console.log(data)
    closePopup(profilePopup);
    evt.target.reset();
    profileButtonSubmit.textContent = 'Сохранение';
  })
}

function handleAvatarFormSubmit(evt) {
  evt.preventDefault();
  avatarButtonSubmit.textContent = 'Сохранение...';
  userInfo.setAvatar(avatarLink.value).then(resp => {
    closePopup(avatarPopup);
    evt.target.reset();
    avatarButtonSubmit.textContent = 'Сохранение';
  })
}

placeFormElement.addEventListener('submit', function (evt) {
  evt.preventDefault();

  placeButtonSubmit.textContent = 'Сохранение...';

  let newCard = new Card(userId, {
    name: cardName.value,
    link: cardLink.value
  }, '.card-template', api)
  const newCardElement = newCard.generate();
  newCard.pushCardInfoToServer().then(data => {
    console.log(data)
    console.log(section)
    section.addItem(newCardElement)
    closePopup(placePopup);
    evt.target.reset();
    placeButtonSubmit.textContent = 'Сохранить';
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
