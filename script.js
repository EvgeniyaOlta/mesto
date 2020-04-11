let body = document.querySelector('.root');
let popup = body.querySelector('.popup');
let editButton = body.querySelector('.edit-button');

function openPopup() {
    popup.classList.add('popup_opened');
}
editButton.addEventListener('click', openPopup);

let closeButton = body.querySelector('.close-button'); 
function closePopup() {
    popup.classList.remove('popup_opened');
}
closeButton.addEventListener('click', closePopup);

let formElement = body.querySelector('.popup__container');
function formSubmitHandler (evt) {
    evt.preventDefault();
    let nameInput = body.querySelector('.popup__name');
    let descriptionInput = body.querySelector('.popup__description');
    let name = body.querySelector('.profile__name');
    let description = body.querySelector('.profile__description');
    name.textContent = nameInput.value;
    description.textContent= descriptionInput.value;
    popup.classList.remove('popup_opened');
 }
formElement.addEventListener('submit', formSubmitHandler);



