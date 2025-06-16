const initialCards = [
  { name: "Valle de Yosemite", link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/yosemite.jpg" },
  { name: "Lago Louise", link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/lake-louise.jpg" },
  { name: "Montañas Calvas", link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/bald-mountains.jpg" },
  { name: "Latemar", link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/latemar.jpg" },
  { name: "Parque Nacional de la Vanoise", link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/vanoise.jpg" },
  { name: "Lago di Braies", link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/lago.jpg" }
];

function createCard(card) {
  const cardElement = document.createElement('div');
  cardElement.classList.add('elements__card');
  cardElement.style.position = 'relative';

  cardElement.innerHTML = `
    <button class="elements__card-delete" aria-label="Eliminar tarjeta" type="button">
      <svg width="18" height="20" viewBox="0 0 18 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M2.45787 18.1422C2.51882 18.8126 3.06735 19.3002 3.73778 19.3002H14.2615C14.9319 19.3002 15.4804 18.7923 15.5414 18.1422L16.7197 5.79007H1.27954L2.45787 18.1422Z" fill="white"/>
        <path d="M16.7201 1.93002H11.5801V1.27991C11.5801 0.568849 11.0113 0 10.3002 0H7.72009C7.00903 0 6.44018 0.568849 6.44018 1.27991V1.93002H1.27991C0.568849 1.93002 0 2.49887 0 3.20993C0 3.92099 0.568849 4.48984 1.27991 4.48984H16.7201C17.4312 4.48984 18 3.92099 18 3.20993C18 2.49887 17.4312 1.93002 16.7201 1.93002Z" fill="white"/>
      </svg>
    </button>
    <img
      src="${card.link}"
      alt="Imagen de ${card.name}"
      class="elements__card-image"
    />
    <div class="elements__card-info">
      <h2 class="elements__card-title" title="${card.name}">${card.name}</h2>
      <svg class="elements__card-like" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
        <path
          d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 
             2 5.42 4.42 3 7.5 3c1.74 0 3.41 0.81 4.5 2.09 
             C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 
             22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
        />
      </svg>
    </div>
  `;

  const likeButton = cardElement.querySelector('.elements__card-like');
  likeButton.addEventListener('click', () => {
    if (likeButton.style.fill === "black") {
      likeButton.style.fill = "white";
      likeButton.style.stroke = "black";
    } else {
      likeButton.style.fill = "black";
      likeButton.style.stroke = "black";
    }
  });

  const deleteButton = cardElement.querySelector('.elements__card-delete');
  deleteButton.addEventListener('click', () => {
    cardElement.remove();
  });

  return cardElement;
}

document.addEventListener('DOMContentLoaded', () => {
  const elementsSection = document.querySelector('.elements');
  initialCards.forEach(card => {
    elementsSection.appendChild(createCard(card));
  });
});

const editButton = document.querySelector(".profile__info-edit");
const popup = document.querySelector(".popup");
const closeButton = document.querySelector(".popup__close");
const form = document.querySelector(".popup__form");
const nameField = document.querySelector(".popup__form-input[name='name']");
const aboutField = document.querySelector(".popup__form-input[name='about']");
const profileName = document.querySelector(".profile__info-name");
const profileHeading = document.querySelector(".profile__info-heading");
const saveButton = document.querySelector(".popup__send");

editButton.addEventListener("click", function () {
  nameField.value = profileName.textContent;
  aboutField.value = profileHeading.textContent;
  popup.classList.add("show");
});

closeButton.addEventListener("click", function () {
  popup.classList.remove("show");
});

saveButton.addEventListener("click", function (event) {
  event.preventDefault();
  const newName = nameField.value.trim();
  const newAbout = aboutField.value.trim();
  if (newName && newAbout) {
    profileName.textContent = newName;
    profileName.title = newName;
    profileHeading.textContent = newAbout;
    profileHeading.title = newAbout;
    popup.classList.remove("show");
    form.reset();
  }
});

const addButton = document.querySelector('.profile__add');
const popupAdd = document.querySelector('.popup__add');
const closeAddButton = popupAdd.querySelector('.popup__close-add');
const addForm = popupAdd.querySelector('.popup__form-add');
const nameInput = addForm.querySelector('.popup__form-input-name');
const linkInput = addForm.querySelector('.popup__form-input-link');
const elementsSection = document.querySelector('.elements');

addButton.addEventListener('click', () => {
  popupAdd.classList.add('show');
  addForm.reset();
});

closeAddButton.addEventListener('click', () => {
  popupAdd.classList.remove('show');
});

addForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const name = nameInput.value.trim();
  const link = linkInput.value.trim();
  if (name && link) {
    const newCard = createCard({ name, link });
    elementsSection.prepend(newCard);
    popupAdd.classList.remove('show');
    addForm.reset();
  }
});

const popupImage = document.querySelector('.popup__image');
const popupImageImg = document.querySelector('.popup__image-img');
const popupImageClose = document.querySelector('.popup__close-image');

document.addEventListener('click', function(e) {
  if (e.target.classList.contains('elements__card-image')) {
    popupImageImg.src = e.target.src;
    popupImageImg.alt = e.target.alt;
    popupImage.classList.add('show');
  }
});

popupImageClose.addEventListener('click', function() {
  popupImage.classList.remove('show');
  popupImageImg.src = '';
});

popupImage.addEventListener('click', function(e) {
  if (e.target === popupImage) {
    popupImage.classList.remove('show');
    popupImageImg.src = '';
  }
});

document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape' && popupImage.classList.contains('show')) {
    popupImage.classList.remove('show');
    popupImageImg.src = '';
  }
});