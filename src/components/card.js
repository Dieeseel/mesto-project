import {
  popupImage,
  caption,
  imagePopup
} from './index.js'
import {
  openPopup
} from './modal.js';

import Api from './Api.js';

const api = new Api()

const elementsContainer = document.querySelector('.elements__inner');
const cardTemplate = document.querySelector('#card-template').content;


export function createCard(userId, card) {
  const cardContainer = cardTemplate.querySelector('.elements__container').cloneNode(true);
  const cardElement = cardContainer.querySelector('.elements__item');
  const cardTitle = cardContainer.querySelector('.elements__title')
  const likeButton = cardContainer.querySelector('.elements__like');
  const likeCounter = cardContainer.querySelector('.elements__like-counter');
  const crossButton = cardContainer.querySelector('.elements__delete');


  cardTitle.textContent = card.name;
  cardElement.src = card.link;
  cardElement.alt = card.name;
  likeCounter.textContent = card.likes.length;


  likeButton.addEventListener('click', function (evt) {
    if (evt.target.classList.contains('elements__like_active')) {
      api.deleteLikeToCard(card._id)
        .then((res) => {
          evt.target.classList.toggle('elements__like_active');
          likeCounter.textContent = res.likes.length;
        })
        .catch((err) => {
          console.log(err)
        })
    } else {
      api.putLikeToCard(card._id)
        .then((res) => {
          evt.target.classList.toggle('elements__like_active');
          likeCounter.textContent = res.likes.length;
        })
        .catch((err) => {
          console.log(err)
        })
    }
  })

  if (card.likes.some(like => like._id === userId)) {
    likeButton.classList.add('elements__like_active');
  }



  if (userId !== card.owner._id) {
    crossButton.remove()
  } else {
    crossButton.addEventListener('click', function (evt) {
      const elementDelete = evt.target
      const elementItem = elementDelete.closest('.elements__container');

      api.deleteCard(card._id)
        .then(() => {
          elementItem.remove()
        })
        .catch((res) => {
          console.log(res)
        })
    })
  }



  cardElement.addEventListener('click', function () {
    popupImage.src = card.link;
    popupImage.alt = card.name;
    caption.textContent = card.name;

    openPopup(imagePopup);
  })

  return cardContainer
}

export function addCard(card) {
  elementsContainer.prepend(card);
}
