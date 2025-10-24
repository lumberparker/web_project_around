// Funciones para manejar popups
export function openPopup(popup) {
  popup.classList.add('show');
  document.addEventListener('keydown', handleEscapeKey);
}

export function closePopup(popup) {
  popup.classList.remove('show');
  document.removeEventListener('keydown', handleEscapeKey);
}

function handleEscapeKey(event) {
  if (event.key === 'Escape') {
    const openPopup = document.querySelector('.popup.show');
    if (openPopup) {
      closePopup(openPopup);
    }
  }
}

// Función para cerrar popup al hacer clic en overlay
export function closePopupOnOverlayClick(event) {
  if (event.target.classList.contains('popup') || 
      event.target.classList.contains('popup__add') || 
      event.target.classList.contains('popup__image')) {
    closePopup(event.target);
    
    // Limpiar imagen ampliada si es necesario
    if (event.target.classList.contains('popup__image')) {
      const img = event.target.querySelector('.popup__image-img');
      if (img) img.src = '';
    }
  }
}

// Función para abrir imagen en popup
export function openImagePopup(name, link) {
  const imagePopup = document.querySelector('.popup__image');
  const popupImage = imagePopup.querySelector('.popup__image-img');
  
  popupImage.src = link;
  popupImage.alt = `Imagen de ${name}`;
  
  openPopup(imagePopup);
}
