import { DOMHandler } from '../card-widget/dom-handler/dom-handler';

describe('App Initialization', () => {
    let container;
    let domHandler;

    beforeEach(() => {
        document.body.innerHTML = '<div id="app"></div>';
        container = document.getElementById('app');
        domHandler = new DOMHandler(container);
        domHandler.bindToDOM();
    });

    test('should render the form', () => {
        expect(container.querySelector('.card-form')).not.toBeNull();
        expect(container.querySelector('.card-number')).not.toBeNull();
        expect(container.querySelector('.submit')).not.toBeNull();
        expect(container.querySelector('.validation-message')).not.toBeNull();
    });

    test('should validate a correct card number and detect payment system', () => {
        const input = container.querySelector('.card-number');
        const button = container.querySelector('.submit');
        const resultMessage = container.querySelector('.validation-message');

        input.value = '4111111111111111'; // Visa test card
        button.click();

        expect(resultMessage.textContent).toContain('Номер карты валиден');
        expect(resultMessage.textContent).toContain('Visa');
    });

    test('should show error message for an invalid card number', () => {
        const input = container.querySelector('.card-number');
        const button = container.querySelector('.submit');
        const resultMessage = container.querySelector('.validation-message');

        input.value = '1234567890123456'; // Invalid card
        button.click();

        expect(resultMessage.textContent).toBe('Номер карты не валиден');
    });

    test('should show unknown payment system message for valid but unidentified cards', () => {
        const input = container.querySelector('.card-number');
        const button = container.querySelector('.submit');
        const resultMessage = container.querySelector('.validation-message');

        input.value = '7777777777777777'; // Valid checksum but unknown system
        button.click();

        expect(resultMessage.textContent).toContain('Номер карты валиден');
        expect(resultMessage.textContent).toContain('но невозможно определить платежную систему');
    });
});