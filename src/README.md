# Проект "Mesto"
#### Автор: Евгения Ольта 

Вторая работа в рамках курса "Базовый JavaScript и работа с браузером".


## Описание проекта

Проект представляет собой одностраничный сайт, созданный с использованием HTML и CSS и JS.
Весь код написан по методологии БЭМ. Структура стилей построена по правилам Nested БЭМ.

При написании кода были использованы:

### Флексбокс-верстка.
Работа  с гибким контейнером и гибкими элементами позволила переопределять порядок элементов, автоматически определять размеры элементов так, чтобы они вписывались в  пространство блока, определять размеры по оси контейнера и по оси перпендикулярной ей.

### Позиционирование.
Особого внимания заслуживает использование абсолютного позиционирования (position: absolute), вырывающего из потока элемента, а также позиционирования fixed, позволившее оформить секцию "popup", как это предполагает макет в Figma.

### Гриды.
Grid использовался для создания сетки с фотографиями, что позволило сделать галерею гибкой и красочной при небольшом объеме CSS-кода.

### JS.
За счет подключения кода java-script, сайт становится интерактивным: пользователь может добавить и удалить фоторафию, поставить лайк, посмотреть фотографию в попапе, отредактировать данные своего профиля. Все это достигается с помощью методов, циклов (for, forEach) и функций, а сами элементы фотокарточек являются массивом объектов.

### Валидация форм.
Все формы на странице проходят "живую" валидацию. И "отзывчиво" сообщают пользователю об ошибках в тексте поля.

### Иное.
Особого внимания заслуживает работа с векторными изображениями, их оптимизация и подключение специального шрифта для сайта.
Кроме того, данный сайт является адаптивным и демонстрирует корректную работу на самых разных девайсах.


## В перспективе

### Улучшить кроссбраузерность
Задействовав вендорные префиксы ( -webkit-, -moz-,-о- и другие), обеспечить читабельность всех элеменетов проекта в разных браузерах.

### "Повысить градус отзывчивости"
Поработать над плавностью переходов от макета сайта для одного устройства к макету для другого устройства.

### Прокачать Java-script
По мере прохождения курса, "оживлять" сайт, прорабатывая JS-код и добавляя функции, вызываемые новыми событиями ("event") на сайте.


#### Ссылка на GitHub Pages
https://evgeniyaolta.github.io/mesto/index.html