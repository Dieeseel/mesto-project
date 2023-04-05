class Card {
  constructor({ itemData, userId, api }, popupWithImage, selector) {
    this._title = itemData.name;
    this._link = itemData.link;
    this._cardId = itemData._id
    this._userId = userId;
    this._likes = itemData.likes;
    this._owner = itemData.owner._id;
    this._api = api;
    this.handleCardClick = popupWithImage;
    this._selector = selector;
  }

  _getCard() {
    const cardElement = document.querySelector(this._selector)
      .content
      .querySelector('.elements__container')
      .cloneNode(true);

    return cardElement;
  }

  generate() {
    this._element = this._getCard();
    this._image = this._element.querySelector('.elements__item');
    this._likeCounter = this._element.querySelector('.elements__like-counter');
    this._likeButton = this._element.querySelector('.elements__like');
    this._deleteButton = this._element.querySelector('.elements__delete')

    this._element.querySelector('.elements__title').textContent = this._title;
    this._image.src = this._link;
    this._image.alt = this._title;
    this._likeCounter.textContent = this._likes.length;

    this._renderLikeButton();
    this._renderDeleteButton();
    this._setEventListeners();

    return this._element
  }

  _renderLikeButton() {
    if (this._likes.some(like => like._id === this._userId)) {
      this._likeButton.classList.add('elements__like_active')
    }
  }

  _renderDeleteButton() {
    if (this._userId !== this._owner) {
      this._deleteButton.remove()
    }
  }

  _setEventListeners() {
    this._image.addEventListener('click', (evt) => {
      this.handleCardClick.open(evt.target.src, evt.target.alt)
    })

    this._likeButton.addEventListener('click', (evt) => {
      if (evt.target.classList.contains('elements__like_active')) {
        this._api.deleteLikeToCard(this._cardId)
          .then((res) => {
            evt.target.classList.toggle('elements__like_active');
            this._likeCounter.textContent = res.likes.length;
          })
          .catch((err) => {
            console.log(err)
          })
      }
      else {
        this._api.putLikeToCard(this._cardId)
          .then((res) => {
            evt.target.classList.toggle('elements__like_active');
            this._likeCounter.textContent = res.likes.length;
          })
          .catch((err) => {
            console.log(err)
          })
      }
    })

    this._deleteButton.addEventListener('click', (evt) => {
      const elementItem = this._element.closest('.elements__container');
      this._api.deleteCard(this._cardId)
        .then(() => {
          elementItem.remove()
        })
        .catch((res) => {
          console.log(res)
        })
    })
  }
}

export { Card }
