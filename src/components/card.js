import {
  popupImage, // Это все должно быть через связываение колбеком popupa
  caption,
  imagePopup
} from './index.js'
import {
  openPopup
} from './modal.js';



class Card {
  constructor(userId, card, selector, api) {
    this.userId = userId
    this.card = card
    this.templateSelector = selector
    this.api = api
  }

  _getCard() {
    const cardElement = document
      .querySelector(this.templateSelector)
      .content
      .querySelector('.elements__container')
      .cloneNode(true);
    return cardElement;
  }

  pushCardInfoToServer() {
    return new Promise((resolve, reject) => {
      this.api.saveNewCard(this.card.name, this.card.link).then(resp => {
        this.card = resp
        resolve(resp)
      }).catch(error => {
        reject(error)
      })
    })
  }

  generate() {
    this._element = this._getCard();
    this._element.querySelector('.elements__title').textContent = this.card.name
    this._element.querySelector('.elements__item').src = this.card.link
    this._element.querySelector('.elements__item').setAttribute('__id', this.card._id)
    this._element.querySelector('.elements__item').alt = this.card.name

    if (this.card.likes) {
      this._element.querySelector('.elements__like-counter').textContent = this.card.likes.length
      if (this.card.likes.some(like => like._id === this.userId)) {
        this._element.querySelector('.elements__like').classList.add('elements__like_active');
      }
    } else {
      this._element.querySelector('.elements__like-counter').textContent = "0"
    }
    this._setEventListeners();
    return this._element;
  }

  _setEventListeners() {
    // open popup listener  !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    this._element.querySelector('.elements__item').addEventListener('click', function (evt) {
      console.log(evt.target)
      popupImage.src = evt.target.src;
      popupImage.alt = evt.target.alt;
      caption.textContent = evt.target.alt;
      openPopup(imagePopup);
    })

    // handle like
    this._element.querySelector('.elements__like').addEventListener('click', (evt) => {
      if (evt.target.classList.contains('elements__like_active')) {
        this.api.deleteLikeToCard(this.card._id)
          .then((res) => {
            evt.target.classList.toggle('elements__like_active');
            this._element.querySelector('.elements__like-counter').textContent = res.likes.length;
          })
          .catch((err) => {
            console.log(err)
          })
      } else {
        this.api.putLikeToCard(this.card._id)
          .then((res) => {
            evt.target.classList.toggle('elements__like_active');
            this._element.querySelector('.elements__like-counter').textContent = res.likes.length;
          })
          .catch((err) => {
            console.log(err)
          })
      }
    })

    // delete if available
    if (this.card.owner && this.userId !== this.card.owner._id) {
      this._element.querySelector('.elements__delete').remove()
    } else {
      this._element.querySelector('.elements__delete').addEventListener('click', (evt) => {
        const elementItem = this._element.closest('.elements__container');
        this.api.deleteCard(this.card._id)
          .then(() => {
            elementItem.remove()
          })
          .catch((res) => {
            console.log(res)
          })
      })
    }
  }
}

export {
  Card
}
