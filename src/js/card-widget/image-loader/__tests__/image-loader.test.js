import { ImageLoader } from '../image-loader';
import { PaymentSystemDetector } from '../../payment-system-detector/payment-system-detector';
import { CardValidator } from '../../card-validator/card-validator';

jest.mock('../../payment-system-detector/payment-system-detector');
jest.mock('../../card-validator/card-validator');

describe('ImageLoader', () => {
    let imageLoader;
    let resultContainer;

    beforeEach(() => {
        document.body.innerHTML = '<div class="card-logos"></div>';
        resultContainer = document.querySelector('.card-logos');
        imageLoader = new ImageLoader();
        imageLoader.resultContainer = resultContainer;
    });

    test('displayPaymentSystemIcons() создает иконки платежных систем', () => {
        imageLoader.displayPaymentSystemIcons();

        const icons = resultContainer.querySelectorAll('.payment-icon');
        expect(icons.length).toBe(imageLoader.paymentSystems.length);

        imageLoader.paymentSystems.forEach((system, index) => {
            expect(icons[index].src).toContain(`/images/${system}.svg`);
            expect(icons[index].alt).toBe(system);
            expect(icons[index].classList.contains('inactive')).toBe(true);
        });
    });

    test('updatePaymentSystemIcons() правильно активирует иконку для валидной карты', () => {
        document.body.innerHTML += '<input class="card-number" value="4539148803436467" />'; // Visa

        CardValidator.mockImplementation(() => ({
            isValid: () => true, 
        }));

        PaymentSystemDetector.mockImplementation(() => ({
            getPaymentSystem: () => 'visa', 
        }));

        imageLoader.displayPaymentSystemIcons();
        imageLoader.updatePaymentSystemIcons();

        const activeIcon = resultContainer.querySelector('.payment-icon.active');
        expect(activeIcon).not.toBeNull();
        expect(activeIcon.alt).toBe('visa');
    });

    test('updatePaymentSystemIcons() не активирует иконку, если карта невалидна', () => {
        document.body.innerHTML += '<input class="card-number" value="1234567890123456" />';

        CardValidator.mockImplementation(() => ({
            isValid: () => false, 
        }));

        PaymentSystemDetector.mockImplementation(() => ({
            getPaymentSystem: () => null, 
        }));

        imageLoader.displayPaymentSystemIcons();
        imageLoader.updatePaymentSystemIcons();

        const activeIcons = resultContainer.querySelectorAll('.payment-icon.active');
        expect(activeIcons.length).toBe(0);
    });

    test('updatePaymentSystemIcons() сбрасывает предыдущие активные иконки', () => {
        document.body.innerHTML += '<input class="card-number" value="4539148803436467" />'; // Visa

        CardValidator.mockImplementation(() => ({
            isValid: () => true,
        }));

        PaymentSystemDetector.mockImplementation(() => ({
            getPaymentSystem: () => 'visa',
        }));

        imageLoader.displayPaymentSystemIcons();
        imageLoader.updatePaymentSystemIcons();

        let activeIcon = resultContainer.querySelector('.payment-icon.active');
        expect(activeIcon).not.toBeNull();
        expect(activeIcon.alt).toBe('visa');

        document.querySelector('.card-number').value = '5369837245476677'; // Mastercard

        PaymentSystemDetector.mockImplementation(() => ({
            getPaymentSystem: () => 'mastercard',
        }));

        imageLoader.updatePaymentSystemIcons();

        activeIcon = resultContainer.querySelector('.payment-icon.active');
        expect(activeIcon).not.toBeNull();
        expect(activeIcon.alt).toBe('mastercard');

        const inactiveVisa = resultContainer.querySelector('.payment-icon[alt="visa"]');
        expect(inactiveVisa.classList.contains('inactive')).toBe(true);
    });
});
