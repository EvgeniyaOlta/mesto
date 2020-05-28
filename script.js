'use strict';

import {Card} from './Card.js';
import {FormValidator} from './FormValidator.js';

const body = document.querySelector('.root');

const addButton = body.querySelector('.profile__add-button');
const editButton = body.querySelector('.profile__edit-button');

const cardsBlock = body.querySelector('.cards');

const popup = body.querySelector('.popup');
const name = body.querySelector('.profile__name');
const description = body.querySelector('.profile__description');
const form = body.querySelector('.popup__container');
const nameInput = popup.querySelector('[name="name"]');
const descriptionInput = popup.querySelector('[name="description"]');
const closePopupButton = body.querySelector('.popup__close-button');

const newPlacePopup = body.querySelector('.popup_newplace');
const closeNewPlaceButton = newPlacePopup.querySelector('.popup__close-button');
const placeForm = newPlacePopup.querySelector('.popup__container');
const placeInput = newPlacePopup.querySelector('[name="placename"]');
const linkInput = newPlacePopup.querySelector('[name="link"]');

export const imagePopup = body.querySelector('.popup_image');
const closeImageButton = imagePopup.querySelector('.popup__close-button');
export const imagePopupTitle= imagePopup.querySelector('.popup__title'); 
export const imagePopupImage= imagePopup.querySelector('.popup__image'); 

const сards = [ 
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
]; 

/*открываем/закрываем popup*/
function escClose(event) { 
  if (event.keyCode === 27){ 
    const sectionToClose = document.querySelector('.popup_opened');
    closeOpenPopup(sectionToClose);
  } 
}
function correctInputs() {
  nameInput.value = name.textContent; 
  descriptionInput.value = description.textContent;  
  placeInput.value =''; 
  linkInput.value = ''; 
}
export function closeOpenPopup(section) { 
  correctInputs();
  section.classList.toggle('popup_opened'); 
  if (section.classList.contains('popup_opened')) {
    document.addEventListener('keyup', escClose);
  }
  else {document.removeEventListener('keyup', escClose)
  }
};
editButton.addEventListener('click', () => closeOpenPopup(popup));
addButton.addEventListener('click', () => closeOpenPopup(newPlacePopup));
closePopupButton.addEventListener('click', () => closeOpenPopup(popup));
closeNewPlaceButton.addEventListener('click', () => closeOpenPopup(newPlacePopup));
closeImageButton.addEventListener('click', () => closeOpenPopup(imagePopup));
function overlayClose(event) { 
  if (event.target.classList.contains('popup')) { 
    closeOpenPopup(event.target); 
  } 
}
body.addEventListener('click', overlayClose); 

/*создаем карточки "из коробки"*/
сards.forEach((item) => {
  const card = new Card(item, '.card-template');
  const newCard = card.generateCard();

  document.querySelector('.cards').append(newCard);
});

/*редактируем данные профиля*/
function profileFormSubmitHandler(evt) { 
  evt.preventDefault(); 
  name.textContent = nameInput.value; 
  description.textContent= descriptionInput.value; 
  closeOpenPopup(popup);
};
form.addEventListener('submit', profileFormSubmitHandler); 

/*добавляем новую карточку*/
function newPlaceFormSubmitHandler(evt) { 
  evt.preventDefault(); 
  const item = {
    name: placeInput.value,
    link: linkInput.value
  };
  const card = new Card(item, '.card-template');
  const addNewCard = card.generateCard();
  cardsBlock.prepend(addNewCard); 
  placeInput.value =''; 
  linkInput.value = ''; 
  closeOpenPopup(newPlacePopup);
};
placeForm.addEventListener('submit', newPlaceFormSubmitHandler); 

/*вызов функции enableValidation*/
const formList = Array.from(document.querySelectorAll('.popup__container'));  
formList.forEach((form) => {
  const valid = new FormValidator ({
    inputSelector: '.popup__input', 
    inputErrorClass: 'popup__input_with-error', 
    errorClass: 'popup__input-error_active', 
    submitButtonSelector: '.popup__save-button', 
    activeButtonClass: 'popup__save-button_active' 
  }, form)
  valid.enableValidation();
});