export default class Card {
  constructor(data, templateSelector) {
    this._name = data.name;
    this._link = data.link;
    this._templateSelector = templateSelector;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._templateSelector)
      .content
      .querySelector('.elements__card')
      .cloneNode(true);

    return cardElement;
  }

  _handleLikeClick() {
    this._likeButton.classList.toggle('elements__card-like_active');
  }

  _handleDeleteClick() {
    this._element.remove();
    this._element = null;
  }

  _handleImageClick() {
    const event = new CustomEvent('imageClick', {
      detail: {
        name: this._name,
        link: this._link
      }
    });
    document.dispatchEvent(event);
  }

  _setEventListeners() {
    this._likeButton = this._element.querySelector('.elements__card-like');
    this._deleteButton = this._element.querySelector('.elements__card-delete');
    this._cardImage = this._element.querySelector('.elements__card-image');

    this._likeButton.addEventListener('click', () => {
      this._handleLikeClick();
    });

    this._deleteButton.addEventListener('click', () => {
      this._handleDeleteClick();
    });

    this._cardImage.addEventListener('click', () => {
      this._handleImageClick();
    });
  }

  generateCard() {
    this._element = this._getTemplate();
    this._setEventListeners();

    this._element.querySelector('.elements__card-title').textContent = this._name;
    this._element.querySelector('.elements__card-image').src = this._link;
    this._element.querySelector('.elements__card-image').alt = `Imagen de ${this._name}`;

    return this._element;
  }
}
