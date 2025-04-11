const editButton = document.querySelector(".profile__info-edit_button");
const popup = document.querySelector(".popup");
const closeButton = document.querySelector(".popup__close-button");
const form = document.querySelector(".popup__form");
const nameField = document.querySelector(".popup__form-input[name='name']");
const aboutField = document.querySelector(".popup__form-input[name='about']");
const profileName = document.querySelector(".profile__info-name");
const profileHeading = document.querySelector(".profile__info-heading");
const saveButton = document.querySelector(".popup__send-button");

// Abre el popup
editButton.addEventListener("click", function () {
  // Pre-fill form fields with current values
  nameField.value = profileName.textContent;
  aboutField.value = profileHeading.textContent;
  popup.classList.add("show");
});

// Cierra el popup
closeButton.addEventListener("click", function () {
  popup.classList.remove("show");
});

// Guarda los datos y actualiza el perfil
saveButton.addEventListener("click", function (event) {
  event.preventDefault();
  const newName = nameField.value.trim();
  const newAbout = aboutField.value.trim();

  if (newName && newAbout) {
    profileName.textContent = newName;
    profileHeading.textContent = newAbout;
    popup.classList.remove("show");
    form.reset();
  }
});
document.querySelectorAll(".elements__card-like").forEach((heart) => {
  heart.addEventListener("click", () => {
    if (heart.style.fill === "black") {
      heart.style.fill = "white"; // Resetear a blanco si es negro
      heart.style.stroke = "black"; // Mantener el borde negro
    } else {
      heart.style.fill = "black"; // Cambiar a negro al hacer click
      heart.style.stroke = "black"; // Mantener el borde negro
    }
  });
});
