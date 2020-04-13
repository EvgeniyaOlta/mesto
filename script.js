let body = document.querySelector('.root');
let popup = body.querySelector('.popup');
const editButton = body.querySelector('.profile__edit-button');
const closeButton = body.querySelector('.popup__close-button');
let name = body.querySelector('.profile__name');
let description = body.querySelector('.profile__description');
let formElement = body.querySelector('.popup__container');
let nameInput = popup.querySelector('[name="name"]');
let descriptionInput = popup.querySelector('[name="description"]');

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



