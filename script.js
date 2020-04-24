let body = document.querySelector('.root');
let popup = body.querySelector('.popup');
const editButton = body.querySelector('.profile__edit-button');
const closeButton = body.querySelector('.popup__close-button');
let name = body.querySelector('.profile__name');
let description = body.querySelector('.profile__description');
let formElement = body.querySelector('.popup__container');
let nameInput = popup.querySelector('[name="name"]');
let descriptionInput = popup.querySelector('[name="description"]');

let newplacePopup = body.querySelector('.newplace-popup');
const addButton = body.querySelector('.profile__add-button');
const closenewplaceButton = body.querySelector('.newplace-popup__close-button');
let formPlace = body.querySelector('.newplace-popup__container');
let placenameInput = newplacePopup.querySelector('[name="placename"]');
let linkInput = newplacePopup.querySelector('[name="link"]');



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


function openPopup() {
    popup.classList.add('popup_opened');
    popup.classList.remove('popup_closed');
}
editButton.addEventListener('click', openPopup);

function closePopup() {
    popup.classList.remove('popup_opened');
    popup.classList.add('popup_closed');
}
closeButton.addEventListener('click', closePopup);

function formSubmitHandler (evt) {
    evt.preventDefault();    
    name.textContent = nameInput.value;
    description.textContent= descriptionInput.value;
    popup.classList.remove('popup_opened');
    popup.classList.add('popup_closed');
 }
formElement.addEventListener('submit', formSubmitHandler);




function opennewplacePopup() {
    newplacePopup.classList.add('newplace-popup_opened');
    newplacePopup.classList.remove('newplace-popup_closed');
}
addButton.addEventListener('click', opennewplacePopup);

function closenewplacePopup() {
    newplacePopup.classList.remove('newplace-popup_opened');
    newplacePopup.classList.add('newplace-popup_closed');
}
closenewplaceButton.addEventListener('click', closenewplacePopup);

function formPlaceSubmitHandler (evt) {
    evt.preventDefault(); 

    const elementTemplate = document.querySelector('#card').content;
    
    const elements = document.querySelector('.elements');
    const element = elementTemplate.cloneNode(true);
    
    element.querySelector('.element__image').src = `${linkInput.value}`;
    element.querySelector('.element__name').textContent = `${placenameInput.value}`;
    
    elements.prepend (element);

    newplacePopup.classList.remove('newplace-popup_opened');
    newplacePopup.classList.add('newplace-popup_closed');
};

formPlace.addEventListener('submit', formPlaceSubmitHandler);


let likebuttonCollection = document.querySelectorAll('.element__like-button'),
    index, button;

for (index = 0; index < likebuttonCollection.length; index++) {
    likeButton = likebuttonCollection[index];
    likeButton.addEventListener('click', function (evt) {
        const likeEventTarget = evt.target;
        likeEventTarget.classList.toggle('element__like-button_active');
        likeEventTarget.classList.toggle('element__like-button_disactive');
        });
}

let removebuttonCollection = document.querySelectorAll('.element__remove-button'),
    ind, but;

for (ind = 0; ind < removebuttonCollection.length; ind++) {
    removeButton = removebuttonCollection[ind];
    removeButton.addEventListener('click', function (evt) {
        const removeEventTarget = evt.target; 
        const removeElement = removeEventTarget.parentElement;
        removeElement.remove();
        });
}