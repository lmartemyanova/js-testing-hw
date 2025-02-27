import { DOMHandler } from '../dom-handler';

describe('DOMHandler', () => {
    let container;
    let domHandler;

    beforeEach(() => {
        document.body.innerHTML = '<div id="app"></div>';
        container = document.getElementById('app');
        domHandler = new DOMHandler(container);
        domHandler.bindToDOM();
    });

    test('should render the form correctly', () => {
        expect(container.innerHTML).toContain('card-form');
        expect(container.querySelector('.card-number')).not.toBeNull();
        expect(container.querySelector('.submit')).not.toBeNull();
    });

    test('should handle form submission with valid card', () => {
        const input = container.querySelector('.card-number');
        input.value = '4111111111111111'; // Валидный номер карты Visa

        const form = container.querySelector('.card-form');
        form.dispatchEvent(new Event('submit'));

        expect(container.innerHTML).toContain('Номер карты валиден');
    });

    test('should handle form submission with invalid card', () => {
        const input = container.querySelector('.card-number');
        input.value = '1234567890123456'; // Невалидный номер карты

        const form = container.querySelector('.card-form');
        form.dispatchEvent(new Event('submit'));

        expect(container.innerHTML).toContain('Номер карты не валиден');
    });
});