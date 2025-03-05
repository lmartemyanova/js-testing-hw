import { DOMHandler } from '../card-widget/dom-handler/dom-handler';
import { app } from '../app';

jest.mock('../card-widget/dom-handler/dom-handler');

describe('app.js', () => {
    beforeEach(() => {
        DOMHandler.mockClear();
        document.body.innerHTML = '<div class="container"></div>';
        jest.resetModules();
        app();
    });

    test('Инициализируется DOMHandler при загрузке страницы', () => {
        document.dispatchEvent(new Event('DOMContentLoaded'));
        expect(DOMHandler).toHaveBeenCalledTimes(1);

        const instance = DOMHandler.mock.instances[0];
        expect(instance.bindToDOM).toHaveBeenCalled();
    });

    test('DOMHandler привязывается к .container', () => {
        const container = document.querySelector('.container');
        new DOMHandler(container).bindToDOM();

        expect(DOMHandler).toHaveBeenCalledWith(container);
    });

    test('Не инициализируется, если контейнер отсутствует', () => {
        document.body.innerHTML = ''; 
        jest.resetModules(); 

        app();

        expect(DOMHandler).not.toHaveBeenCalled();
    });
});
