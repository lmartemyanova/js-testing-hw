import { DOMHandler } from './card-widget/dom-handler/dom-handler';

export const app = () => {
  document.addEventListener('DOMContentLoaded', () => {
    const appContainer = document.querySelector('.container');
    const domHandler = new DOMHandler(appContainer);
    domHandler.bindToDOM();
  })
};
