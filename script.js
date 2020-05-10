'use strict';

const body = document.querySelector('.root');

const addButton = body.querySelector('.profile__add-button');
const editButton = body.querySelector('.profile__edit-button');

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

const imagePopup = body.querySelector('.popup_image');
const closeImageButton = imagePopup.querySelector('.popup__close-button');
const imagePopupTitle= imagePopup.querySelector('.popup__title'); 
const imagePopupImage= imagePopup.querySelector('.popup__image'); 
const cardsBlock = document.querySelector('.cards');


/*создаем карточки "из коробки"*/
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

function makeCard(item) {
  const cardTemplate = document.querySelector('#card').content;
  const card = cardTemplate.cloneNode(true);
  card.querySelector('.card__image').src = item.link;
  card.querySelector('.card__name').textContent = item.name;
    
  const likeButton = card.querySelector('.card__like-button');
  function like() {
    likeButton.classList.toggle('card__like-button_active');
  };
  likeButton.addEventListener('click', like);
    
  const removeButton = card.querySelector('.card__remove-button');
  function removeCard () {
    removeButton.closest('.card').remove();
  };
  removeButton.addEventListener('click', removeCard);

  const imagePopupButton = card.querySelector('.card__image');
  function zoom () {
    closeOpenPopup(imagePopup);
    imagePopupImage.src = item.link;
    imagePopupTitle.textContent = item.name;
  }
  imagePopupButton.addEventListener('click', zoom);

  return card;
};

сards.forEach(function(item){
  const newCard = makeCard(item);
  cardsBlock.append(newCard);
});
  
/*открываем/закрываем popup*/
function closeOpenPopup(section) { 
  section.classList.toggle('popup_opened'); 
  if (section.classList.contains('popup_opened')) {
    document.addEventListener('keyup', escClose)
  }
};

function escClose(event) { 
  if (event.keyCode === 27){ 
    const sectionToClose = document.querySelector('.popup_opened');
    sectionToClose.classList.toggle('popup_opened');
    document.removeEventListener('keyup', escClose)
  } 
}

editButton.addEventListener('click', () => closeOpenPopup(popup));
addButton.addEventListener('click', () => closeOpenPopup(newPlacePopup));
closePopupButton.addEventListener('click', () => closeOpenPopup(popup));
closeNewPlaceButton.addEventListener('click', () => closeOpenPopup(newPlacePopup));
closeImageButton.addEventListener('click', () => closeOpenPopup(imagePopup));

body.addEventListener('click', function (evt) { 
  if (evt.target.classList.contains('popup')) { 
    closeOpenPopup(evt.target); 
  } 
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
  const newCard = makeCard(item);
  cardsBlock.prepend(newCard);
  placeInput.value =''; 
  linkInput.value = ''; 
  closeOpenPopup(newPlacePopup);
};
placeForm.addEventListener('submit', newPlaceFormSubmitHandler); 
