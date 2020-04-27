const body = document.querySelector('.root');

const popup = body.querySelector('.popup');
const picPopup = popup.querySelector('.popup__image');
const newPlacePopup = body.querySelector('.popup_newplace');

const popupTitle= body.querySelector('.popup__title'); 
const formList = body.querySelector('.popup__list');
const formPlace = body.querySelector('.popup__container');
const nameInput = popup.querySelector('[name="name"]');
const descriptionInput = popup.querySelector('[name="description"]');

const name = body.querySelector('.profile__name');
const description = body.querySelector('.profile__description');

const popupSaveButton= body.querySelector('.popup__save-button'); 
const closeButton = body.querySelector('.popup__close-button');
const addButton = body.querySelector('.profile__add-button');
const editButton = body.querySelector('.profile__edit-button');

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
    const elementTemplate = document.querySelector('#card').content;
    const elements = document.querySelector('.elements');
    const element = elementTemplate.cloneNode(true);
    element.querySelector('.element__image').src = item.link;
    element.querySelector('.element__name').textContent = item.name;
    
    const likeButton = element.querySelector('.element__like-button');
    likeButton.addEventListener('click', function () {
        likeButton.classList.toggle('element__like-button_active');
        likeButton.classList.toggle('element__like-button_disactive');
        });
    
    const removeButton = element.querySelector('.element__remove-button');
    removeButton.addEventListener('click', function(){
        removeButton.parentElement.remove();
    });
    const imagePopupButton = element.querySelector('.element__image');
    imagePopupButton.addEventListener('click', 
    function() {
    openPopup(popup);
    });
    imagePopupButton.addEventListener('click', 
    function imagePopup() {
        picPopup.classList.add('popup__image_image');
        picPopup.classList.remove('popup__image_main');
        formPlace.classList.add('popup__container_image');
        formPlace.classList.remove('popup__container_main');
        formList.classList.add('popup__list_image');
        popupTitle.classList.add('popup__title_image');
        picPopup.src = item.link;
        popupTitle.textContent = item.name;
    });
    elements.prepend(element);
    return element;
};

сards.forEach(makeCard);

/*открываем popup*/
function openPopup(popup) {
    popup.classList.remove('popup_closed');
    popup.classList.add('popup_opened');
};

editButton.addEventListener('click', function() {
    openPopup(popup);
  });
addButton.addEventListener('click', function() {
    openPopup(popup);
  });

/*наполянем popupProfile*/
function openProfile() {
    picPopup.classList.add('popup__image_main');
    formList.classList.remove('popup__list_image');
    formList.classList.add('popup__list_main');
    popup.classList.add('popup_profile');
    formPlace.classList.add('popup__container_main');
    popupTitle.classList.add('popup__title_main');
    formPlace.classList.remove('popup__container_image');
    popupTitle.textContent = 'Редактировать профиль';
    popupSaveButton.textContent = 'Сохранить';
    nameInput.value ='Жак-Ив Кусто';
    descriptionInput.value = 'Исследователь океана';
};
editButton.addEventListener('click', 
  function() {
    openProfile(popup);
});

/*наполняем popupNewPlace*/
function openNewPlace(popup) {
    formList.classList.add('popup__list_main');
    formList.classList.remove('popup__list_image');
    picPopup.classList.add('popup__image_main');
    formPlace.append(formList);
    popup.classList.add('popup_newplace');
    formPlace.classList.add('popup__container_main');
    popupTitle.classList.add('popup__title_main');
    formPlace.classList.remove('popup__container_image');
    popupTitle.textContent = 'Новое место';
    popupSaveButton.textContent = 'Создать';
    nameInput.placeholder= 'Название';
    descriptionInput.placeholder= 'Ссылка на картинку';
    nameInput.value ='';
    descriptionInput.value = '';
};
addButton.addEventListener('click', function() {
    openNewPlace(popup);
  });

/*закрываем popup*/
closeButton.addEventListener('click', function() {
    closePopup(popup);
  });
  function closePopup(popup) {
    popup.classList.add('popup_closed');
    popup.classList.remove('popup_opened');
    setTimeout(removeClasses, 500);
};

/*удаляем классы*/
function removeClasses() {
    picPopup.classList.remove('popup__image_image');
    picPopup.classList.remove('popup__image_main');
    formList.classList.remove('popup__list_main');
    formList.classList.remove('popup__list_image');
    popupTitle.classList.remove('popup__title_image');
    popup.classList.remove('popup_profile');
    popup.classList.remove('popup_newplace');
}

/*работаем с формой*/
function formSubmitHandler (evt) { 
    evt.preventDefault(); 
    if (popup.classList.contains('popup_profile'))    
    {name.textContent = nameInput.value; 
    description.textContent= descriptionInput.value; 
    popup.classList.remove('popup_opened'); 
    popup.classList.add('popup_closed');
    popup.classList.remove('popup_profile'); };
    }
function formSubmitHandlerElse (evt) { 
    evt.preventDefault(); 
    if (popup.classList.contains('popup_newplace'))    
    {let item = {
        name: `${nameInput.value}`,
        link: `${descriptionInput.value}`
    };
    makeCard (item);
    popup.classList.remove('popup_opened'); 
    popup.classList.add('popup_closed');
    popup.classList.remove('popup_newplace');}
    };

 formPlace.addEventListener('submit', formSubmitHandler); 
 formPlace.addEventListener('submit', formSubmitHandlerElse); 
 