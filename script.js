const body = document.querySelector('.root');

const addButton = body.querySelector('.profile__add-button');
const editButton = body.querySelector('.profile__edit-button');

const popup = body.querySelector('.popup');
const name = body.querySelector('.profile__name');
const description = body.querySelector('.profile__description');
const formPlace = body.querySelector('.popup__container');
const nameInput = popup.querySelector('[name="name"]');
const descriptionInput = popup.querySelector('[name="description"]');
const closePopupButton = body.querySelector('.popup__close-button');

const newPlacePopup = body.querySelector('.popup_newplace');
const closeNewPlaceButton = newPlacePopup.querySelector('.popup__close-button');
const placeFormPlace = newPlacePopup.querySelector('.popup__container');
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
  likeButton.addEventListener('click', function() {
    likeButton.classList.toggle('card__like-button_active');
    likeButton.classList.toggle('card__like-button_disactive');
  });
    
  const removeButton = card.querySelector('.card__remove-button');
  removeButton.addEventListener('click', function() {
    removeButton.parentElement.remove();
  });

  const imagePopupButton = card.querySelector('.card__image');
  imagePopupButton.addEventListener('click', function() {
    closeOpenPopup(imagePopup);
  });
  imagePopupButton.addEventListener('click', function imagePopup() {
    imagePopupImage.src = item.link;
    imagePopupTitle.textContent = item.name;
  });
  return card;
};

сards.forEach(function(item){
  const newCard = makeCard(item);
  cardsBlock.append(newCard);
});
  
/*открываем/закрываем popup*/
function closeOpenPopup(section) {
  section.classList.toggle('popup_opened');
};

editButton.addEventListener('click', function() {
  closeOpenPopup(popup);
});
addButton.addEventListener('click', function() {
  closeOpenPopup(newPlacePopup);
});
closePopupButton.addEventListener('click', function() {
  closeOpenPopup(popup);
});
closeNewPlaceButton.addEventListener('click', function() {
  closeOpenPopup(newPlacePopup);
});
closeImageButton.addEventListener('click', function() {
  closeOpenPopup(imagePopup);
});
body.addEventListener('click', function (evt) {
  if (evt.target.classList.contains('popup')) {
    closeOpenPopup(evt.target);
  }
});
body.addEventListener('keyup', function (evt) {
  if ((evt.key === 'Enter')&&((newPlacePopup.classList.contains('popup_opened'))||
  (popup.classList.contains('popup_opened'))||(imagePopup.classList.contains('popup_opened')))) {
    popupToClose = body.querySelector('.popup_opened');
    console.log(evt.currentTarget);
    closeOpenPopup(popupToClose);
  }
});

/*редактируем данные профиля*/
function profileFormSubmitHandler(evt) { 
  evt.preventDefault(); 
  name.textContent = nameInput.value; 
  description.textContent= descriptionInput.value; 
  closeOpenPopup(popup);
};
formPlace.addEventListener('submit', profileFormSubmitHandler); 

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
placeFormPlace.addEventListener('submit', newPlaceFormSubmitHandler); 
