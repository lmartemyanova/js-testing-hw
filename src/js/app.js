// app.js
import { DOMHandler } from './card-widget/dom-handler/dom-handler';

// Находим контейнер для формы
const appContainer = document.querySelector('.container');

// Создаем экземпляр DOMHandler и привязываем к контейнеру

document.addEventListener('DOMContentLoaded', () => {
  const domHandler = new DOMHandler(appContainer);
  domHandler.bindToDOM();
});
