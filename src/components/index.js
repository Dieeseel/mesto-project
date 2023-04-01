import '../pages/index.css'
import { configApi, validationSettings, profileFormButton, placeFormButton, avatarFormButton, profileButtonSubmit, profileName, profileProfession } from '../utils/constants.js'
import { Api } from './api.js'
import Section from './Section.js'
import Card from './Card.js'
import { UserInfo } from './UserInfo.js'
import { FormValidator } from './FormValidator.js'
import { PopupWithImage } from './PopupWithImage.js'
import { PopupWithForm } from './PopupWithForm.js'

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
    const userId = dataProfile._id
    section = new Section({
      data: initialCards,
      renderer: (item) => {
        const card = new Card(item, userId, api, popupWithImage, '.card-template');
        const cardElement = card.generate();
        section.addItem(cardElement)
      }
    }, '.elements__inner');
    section.renderItems()

  }).catch((err) => {
    console.log(err)
  })


profileFormButton.addEventListener('click', function () {
  popupEditProfile.open()
});

function handleProfileFormSubmit(data) {
  userInfo.setUserInfo(data)
    .then(data => {
      profileName.textContent = data.name;
      profileProfession.textContent = data.about;
      popupEditProfile.close()
    })
    .catch((err) => {
       console.log(err)
    })
  }

placeFormButton.addEventListener('click', () => {
  popupAddCard.open();
})

function handleNewPlaceFormSubmit(data) {
  api.saveNewCard(data.name, data.link).then(resp => {
    const newCard = new Card(resp, resp.owner._id, api, popupWithImage, '.card-template')
    const newCardElement = newCard.generate();
    section.addItem(newCardElement);
    popupAddCard.close()
  })
}


avatarFormButton.addEventListener('click', function () {
  popupChangeAvatar.open();
})

function handleAvatarFormSubmit(data) {
  userInfo.setAvatar(data.link).then(resp => {
    popupChangeAvatar.close();
  })
}



