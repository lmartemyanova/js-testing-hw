// app.js
import { DOMHandler } from './card-widget/dom-handler/dom-handler';

// Находим контейнер для формы
const appContainer = document.getElementById('container');

// Создаем экземпляр DOMHandler и привязываем к контейнеру
const domHandler = new DOMHandler(appContainer);
domHandler.bindToDOM();
