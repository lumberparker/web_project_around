import Card from './Card.js';
import FormValidator from './FormValidator.js';
import { openPopup, closePopup, closePopupOnOverlayClick, openImagePopup } from './utils.js';

// Datos iniciales de las tarjetas
const initialCards = [
  { name: "Valle de Yosemite", link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/yosemite.jpg" },
  { name: "Lago Louise", link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/lake-louise.jpg" },
  { name: "Montañas Calvas", link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/bald-mountains.jpg" },
  { name: "Latemar", link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/latemar.jpg" },
  { name: "Parque Nacional de la Vanoise", link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/vanoise.jpg" },
  { name: "Lago di Braies", link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/lago.jpg" }
];

// Configuración de validación
const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__form-input",
  submitButtonSelector: ".popup__send",
  inactiveButtonClass: "popup__send_disabled",
  inputErrorClass: "popup__form-input_type_error",
  errorClass: "popup__error_visible"
};

// Elementos del DOM
const elementsSection = document.querySelector('.elements');
const editButton = document.querySelector(".profile__info-edit");
const addButton = document.querySelector('.profile__add');
const popup = document.querySelector(".popup");
const popupAdd = document.querySelector('.popup__add');
const popupImage = document.querySelector('.popup__image');
const closeButtons = document.querySelectorAll('.popup__close, .popup__close-add, .popup__close-image');
const form = document.querySelector(".popup__form");
const addForm = document.querySelector('.popup__form-add');
const nameField = document.querySelector(".popup__form-input[name='name']");
const aboutField = document.querySelector(".popup__form-input[name='about']");
const profileName = document.querySelector(".profile__info-name");
const profileHeading = document.querySelector(".profile__info-heading");

// Función para crear tarjeta
function createCard(cardData) {
  const card = new Card(cardData, '#card-template');
  return card.generateCard();
}

// Función para agregar tarjeta al DOM
function addCardToDOM(cardElement) {
  elementsSection.prepend(cardElement);
}

// Crear tarjetas iniciales
initialCards.forEach(cardData => {
  const cardElement = createCard(cardData);
  addCardToDOM(cardElement);
});

// Instanciar validadores de formularios
const editFormValidator = new FormValidator(validationConfig, form);
const addFormValidator = new FormValidator(validationConfig, addForm);

editFormValidator.enableValidation();
addFormValidator.enableValidation();

// Event Listeners para popups
editButton.addEventListener("click", () => {
  nameField.value = profileName.textContent;
  aboutField.value = profileHeading.textContent;
  editFormValidator.resetValidation();
  openPopup(popup);
});

addButton.addEventListener('click', () => {
  addForm.reset();
  addFormValidator.resetValidation();
  openPopup(popupAdd);
});

// Event listeners para cerrar popups
closeButtons.forEach(button => {
  button.addEventListener('click', (event) => {
    const popupToClose = event.target.closest('.popup');
    closePopup(popupToClose);
    
    // Limpiar imagen si es el popup de imagen
    if (popupToClose.classList.contains('popup__image')) {
      const img = popupToClose.querySelector('.popup__image-img');
      if (img) img.src = '';
    }
  });
});

// Event listeners para cerrar en overlay
document.querySelectorAll('.popup, .popup__add, .popup__image').forEach(popupEl => {
  popupEl.addEventListener('mousedown', closePopupOnOverlayClick);
});

// Event listener para envío del formulario de editar perfil
form.addEventListener("submit", (event) => {
  event.preventDefault();
  const newName = nameField.value.trim();
  const newAbout = aboutField.value.trim();
  
  if (newName && newAbout) {
    profileName.textContent = newName;
    profileName.title = newName;
    profileHeading.textContent = newAbout;
    profileHeading.title = newAbout;
    closePopup(popup);
  }
});

// Event listener para envío del formulario de agregar tarjeta
addForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const nameInput = addForm.querySelector('.popup__form-input-name');
  const linkInput = addForm.querySelector('.popup__form-input-link');
  const name = nameInput.value.trim();
  const link = linkInput.value.trim();
  
  if (name && link) {
    const newCard = createCard({ name, link });
    addCardToDOM(newCard);
    closePopup(popupAdd);
    addForm.reset();
  }
});

// Event listener para abrir imagen en popup
document.addEventListener('imageClick', (event) => {
  const { name, link } = event.detail;
  openImagePopup(name, link);
});