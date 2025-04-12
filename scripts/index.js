const editButton = document.querySelector(".profile__info-edit");
const popup = document.querySelector(".popup");
const closeButton = document.querySelector(".popup__close");
const form = document.querySelector(".popup__form");
const nameField = document.querySelector(".popup__form-input[name='name']");
const aboutField = document.querySelector(".popup__form-input[name='about']");
const profileName = document.querySelector(".profile__info-name");
const profileHeading = document.querySelector(".profile__info-heading");
const saveButton = document.querySelector(".popup__send");

// Open the popup and pre-fill form fields
editButton.addEventListener("click", function () {
  nameField.value = profileName.textContent;
  aboutField.value = profileHeading.textContent;
  popup.classList.add("show");
});

// Close the popup
closeButton.addEventListener("click", function () {
  popup.classList.remove("show");
});

// Save profile info and update tooltip (title)
saveButton.addEventListener("click", function (event) {
  event.preventDefault();

  const newName = nameField.value.trim();
  const newAbout = aboutField.value.trim();

  if (newName && newAbout) {
    profileName.textContent = newName;
    profileName.title = newName; // Update tooltip

    profileHeading.textContent = newAbout;
    profileHeading.title = newAbout; // Update tooltip

    popup.classList.remove("show");
    form.reset();
  }
});

// Toggle like button fill color
document.querySelectorAll(".elements__card-like").forEach((heart) => {
  heart.addEventListener("click", () => {
    if (heart.style.fill === "black") {
      heart.style.fill = "white";
      heart.style.stroke = "black";
    } else {
      heart.style.fill = "black";
      heart.style.stroke = "black";
    }
  });
});
