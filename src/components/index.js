import '../pages/index.css'
import { configApi, validationSettings, profileFormButton, placeFormButton, avatarFormButton } from '../utils/constants.js'
import { Api } from './Api.js'
import { Section } from './Section.js'
import { Card } from './Card.js'
import { UserInfo } from './UserInfo.js'
import { FormValidator } from './FormValidator.js'
import { PopupWithImage, PopupWithForm } from './Popup.js'


//Объявление экземпляром классов
const popupWithImage = new PopupWithImage('.popup__open-image')
const popupEditProfile = new PopupWithForm('.popup__edit-profile', handleProfileFormSubmit)
const popupAddCard = new PopupWithForm('.popup__add-card', handleNewPlaceFormSubmit)
const popupChangeAvatar = new PopupWithForm('.popup__avatar', handleAvatarFormSubmit)

const validatorPopupEditProfile = new FormValidator(validationSettings, popupEditProfile.form)
const validatorPopupAddCard = new FormValidator(validationSettings, popupAddCard.form)
const validatorPopupChangeAvatar = new FormValidator(validationSettings, popupChangeAvatar.form)

const api = new Api(configApi)


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
    const card = new Card(userId, item, '.card-template', api, popupWithImage)
    const cardElement = card.generate();
    document.querySelector(target).append(cardElement); // это тоже должно быть через секцию
  });
}

// ######################################################################################

profileFormButton.addEventListener('click', function () {
  popupEditProfile.open()
});

function handleProfileFormSubmit(data) {
  userInfo.setUserInfo(data).then(data => {
    popupEditProfile.close()
  })
}

// ######################################################################################

placeFormButton.addEventListener('click', () => {
  popupAddCard.open();
})

function handleNewPlaceFormSubmit(data) {
  api.saveNewCard(data.name, data.link).then(resp => {
    console.log(resp)
    let newCard = new Card(userId, resp, '.card-template', api, popupWithImage)
    const newCardElement = newCard.generate();
    section.addItem(newCardElement)
  })
  popupAddCard.close()
}

// ######################################################################################

avatarFormButton.addEventListener('click', function () {
  popupChangeAvatar.open();
})

function handleAvatarFormSubmit(data) {
  userInfo.setAvatar(data.link).then(resp => {
    popupChangeAvatar.close();
  })
}

// ######################################################################################

