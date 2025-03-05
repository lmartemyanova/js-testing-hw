import { DOMHandler } from '../dom-handler';
import { ImageLoader } from '../../image-loader/image-loader';
import { PaymentSystemDetector } from '../../payment-system-detector/payment-system-detector';
import { CardValidator } from '../../card-validator/card-validator';

jest.mock('../../image-loader/image-loader');
jest.mock('../../payment-system-detector/payment-system-detector');
jest.mock('../../card-validator/card-validator');

describe('DOMHandler', () => {
    let domHandler;
    let parentElement;

    beforeEach(() => {
        
        ImageLoader.mockClear();
        PaymentSystemDetector.mockClear();
        CardValidator.mockClear();
        document.body.innerHTML = '<div class="container"></div>';
        parentElement = document.querySelector('.container');

        domHandler = new DOMHandler();
        domHandler.bindToDOM();

    });

    test('bindToDOM() добавляет разметку в контейнер', () => {
        expect(parentElement.innerHTML).toContain('Проверка номера кредитной карты');
        expect(parentElement.querySelector('.card-form')).not.toBeNull();
        expect(parentElement.querySelector('.card-number')).not.toBeNull();
        expect(parentElement.querySelector('.validate-button')).not.toBeNull();
        expect(ImageLoader).toHaveBeenCalledTimes(1);
    });

    test('Отображает корректное имя платежной системы', () => {
        const testCardNumber = '4111111111111111'; // Visa
        const expectedSystem = 'visa';
        const expectedDisplayName = 'Visa';

        CardValidator.mockImplementation(() => ({
            isValid: () => true,
        }));

        PaymentSystemDetector.mockImplementation(() => ({
            getPaymentSystem: () => expectedSystem,
        }));

        const input = parentElement.querySelector('.card-number');
        const form = parentElement.querySelector('.card-form');
        const resultMessage = parentElement.querySelector('.validation-message');

        input.value = testCardNumber;
        form.dispatchEvent(new Event('submit'));

        expect(resultMessage.textContent).toBe(
            `Номер карты валиден и относится к платежной системе ${expectedDisplayName}`
        );
    });

    test('Использует оригинальное имя системы, если оно отсутствует в correctSystemNames', () => {
        const testCardNumber = '9999999999999999'; // Номер, не относящийся к известным системам
        const expectedSystem = 'unknown';

        CardValidator.mockImplementation(() => ({
            isValid: () => true,
        }));

        PaymentSystemDetector.mockImplementation(() => ({
            getPaymentSystem: () => expectedSystem,
        }));

        const input = parentElement.querySelector('.card-number');
        const form = parentElement.querySelector('.card-form');
        const resultMessage = parentElement.querySelector('.validation-message');

        input.value = testCardNumber;
        form.dispatchEvent(new Event('submit'));

        expect(resultMessage.textContent).toBe(
            `Номер карты валиден и относится к платежной системе ${expectedSystem}`
        );
    });

    test('onSubmit() показывает сообщение о валидной карте с платежной системой', () => {
        const input = domHandler.inputElement;
        const form = domHandler.formElement;
        const resultMessage = domHandler.resultMessage;

        input.value = '4539148803436467'; // Visa

        CardValidator.mockImplementation(() => ({
            isValid: () => true,
        }));

        PaymentSystemDetector.mockImplementation(() => ({
            getPaymentSystem: () => 'visa',
        }));

        form.dispatchEvent(new Event('submit'));

        expect(resultMessage.textContent).toBe('Номер карты валиден и относится к платежной системе Visa');
    });

    test('onSubmit() показывает сообщение о валидной карте без платежной системы', () => {
        const input = domHandler.inputElement;
        const form = domHandler.formElement;
        const resultMessage = domHandler.resultMessage;

        input.value = '1234567890123456';

        CardValidator.mockImplementation(() => ({
            isValid: () => true,
        }));

        PaymentSystemDetector.mockImplementation(() => ({
            getPaymentSystem: () => null,
        }));

        form.dispatchEvent(new Event('submit'));

        expect(resultMessage.textContent).toBe('Номер карты валиден, но невозможно определить платежную систему');
    });

    test('onSubmit() показывает сообщение о невалидной карте', () => {
        const input = domHandler.inputElement;
        const form = domHandler.formElement;
        const resultMessage = domHandler.resultMessage;

        input.value = '1111111111111111';

        CardValidator.mockImplementation(() => ({
            isValid: () => false,
        }));

        form.dispatchEvent(new Event('submit'));

        expect(resultMessage.textContent).toBe('Номер карты не валиден');
    });

    test('onSubmit() вызывает обновление иконок платежных систем', () => {
        const input = domHandler.inputElement;
        const form = domHandler.formElement;

        input.value = '4539148803436467'; // Visa

        CardValidator.mockImplementation(() => ({
            isValid: () => true,
        }));

        PaymentSystemDetector.mockImplementation(() => ({
            getPaymentSystem: () => 'visa',
        }));

        ImageLoader.prototype.updatePaymentSystemIcons = jest.fn();

        form.dispatchEvent(new Event('submit'));

        expect(ImageLoader.prototype.updatePaymentSystemIcons).toHaveBeenCalled();
    });
});
