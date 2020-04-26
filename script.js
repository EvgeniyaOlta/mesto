let body = document.querySelector('.root');

let popup = body.querySelector('.popup');
const closeButton = body.querySelector('.popup__close-button');
let formElement = body.querySelector('.popup__container');
const editButton = body.querySelector('.profile__edit-button');
let name = body.querySelector('.profile__name');
let description = body.querySelector('.profile__description');

let nameInput = popup.querySelector('[name="name"]');
let descriptionInput = popup.querySelector('[name="description"]');

let newplacePopup = body.querySelector('.newplace-popup');
const closenewplaceButton = body.querySelector('.newplace-popup__close-button');
const addButton = body.querySelector('.profile__add-button');
let formPlace = body.querySelector('.newplace-popup__container');
let placenameInput = newplacePopup.querySelector('[name="placename"]');
let linkInput = newplacePopup.querySelector('[name="link"]');

let imagePopup = body.querySelector('.image-popup');
const imageCloseButton = body.querySelector('.image-popup__close-button');


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

сards.forEach(function (item) {
    const elementTemplate = document.querySelector('#card').content;
    
    const elements = document.querySelector('.elements');
    const element = elementTemplate.cloneNode(true);
    
    element.querySelector('.element__image').src = item.link;
    element.querySelector('.element__name').textContent = item.name;
    
    elements.append(element);
});


/*открываем popup*/
function openPopup(anyPopup) {
    anyPopup.classList.remove(`${anyPopup.classList.item(0)}` + '_closed');
    anyPopup.classList.add(`${anyPopup.classList.item(0)}` + '_opened');
};

editButton.addEventListener('click', function() {
    openPopup(popup);
  });

addButton.addEventListener('click', function() {
    openPopup(newplacePopup);
  });


/*закрываем popup*/
function closePopup(anyPopup) {
    anyPopup.classList.add(`${anyPopup.classList.item(0)}` + '_closed');
    anyPopup.classList.remove(`${anyPopup.classList.item(0)}` + '_opened');
};

closeButton.addEventListener('click', function() {
    closePopup(popup);
  });

closenewplaceButton.addEventListener('click', function() {
    closePopup(newplacePopup);
  });

imageCloseButton.addEventListener('click', function() {
    closePopup(imagePopup);
  });


/*редактируем данные профиля через форму*/
function formSubmitHandler (evt) {
    evt.preventDefault();    
    name.textContent = nameInput.value;
    description.textContent= descriptionInput.value;
    popup.classList.remove('popup_opened');
    popup.classList.add('popup_closed');
 }
formElement.addEventListener('submit', formSubmitHandler);


/*создаем новую фотокарточку*/
function formPlaceSubmitHandler (evt) {
    evt.preventDefault(); 

    const elementTemplate = document.querySelector('#card').content;
    
    const elements = document.querySelector('.elements');
    const element = elementTemplate.cloneNode(true);
    const elementLikeButton = element.querySelector('.element__like-button');
    const elementRemoveButton = element.querySelector('.element__remove-button');
    const elementImage = element.querySelector('.element__image');
    
    element.querySelector('.element__image').src = `${linkInput.value}`;
    element.querySelector('.element__name').textContent = `${placenameInput.value}`;
    elementLikeButton.addEventListener('click', function (evt) {
        const likeEventTarget = evt.target;
        likeEventTarget.classList.toggle('element__like-button_active');
        likeEventTarget.classList.toggle('element__like-button_disactive');
    });
    elementRemoveButton.addEventListener('click', function (evt) {
        const removeEventTarget = evt.target; 
        const removeElement = removeEventTarget.parentElement;
        removeElement.remove();
    });

    elementImage.addEventListener('click', function (evt) {
        const imageTarget = evt.target;
        imageContainer = imageTarget.parentElement;
        imageSrc = imageTarget.src;
        imageName = imageContainer.querySelector('.element__name').textContent;

        const imagePopup = document.querySelector('.image-popup');
        imagePopup.querySelector('.image-popup__image').src = imageSrc;
        imagePopup.querySelector('.image-popup__title').textContent = imageName; 
    

        imagePopup.classList.remove('image-popup_closed');
        imagePopup.classList.add('image-popup_opened'); 
    });

    elements.prepend (element);
    newplacePopup.classList.remove('newplace-popup_opened');
    newplacePopup.classList.add('newplace-popup_closed');
};
formPlace.addEventListener('submit', formPlaceSubmitHandler);


/*ставим лайки*/
const likebuttonCollection = document.querySelectorAll('.element__like-button');

for (let index = 0; index < likebuttonCollection.length; index++) {
    likeButton = likebuttonCollection[index];
    likeButton.addEventListener('click', function (evt) {
        const likeEventTarget = evt.target;
        likeEventTarget.classList.toggle('element__like-button_active');
        likeEventTarget.classList.toggle('element__like-button_disactive');
        });
}

/*удаляем фотокарточки*/
const removebuttonCollection = document.querySelectorAll('.element__remove-button');

for (let index = 0; index < removebuttonCollection.length; index++) {
    removeButton = removebuttonCollection[index];
    removeButton.addEventListener('click', function (evt) {
        const removeEventTarget = evt.target; 
        const removeElement = removeEventTarget.parentElement;
        removeElement.remove();
        });
};


/*открываем zoom*/
const imagePopupCollection = document.querySelectorAll('.element__image');

for (let index = 0; index < imagePopupCollection.length; index++) {
    imagePopupButton = imagePopupCollection[index];
    imagePopupButton.addEventListener('click', function (evt) {
        const imageTarget = evt.target;
        imageContainer = imageTarget.parentElement;
        imageSrc = imageTarget.src;
        imageName = imageContainer.querySelector('.element__name').textContent;

        const imagePopup = document.querySelector('.image-popup');
        imagePopup.querySelector('.image-popup__image').src = imageSrc;
        imagePopup.querySelector('.image-popup__title').textContent = imageName; 
    
        imagePopup.classList.remove('image-popup_closed');
        imagePopup.classList.add('image-popup_opened'); 
    });
};



