import { ImageLoader } from '../image-loader';
import { PaymentSystemDetector } from '../../payment-system-detector/payment-system-detector';

describe('ImageLoader', () => {
    let container;
    let imageLoader;

    beforeEach(() => {
        document.body.innerHTML = '<div id="card-logo"></div>';
        container = document.getElementById('card-logo');
        imageLoader = new ImageLoader('4111111111111111'); // Тестовая карта Visa
    });

    test('should render payment system icons', () => {
        imageLoader.displayPaymentSystemIcons();
        expect(container.querySelectorAll('.payment-icon').length).toBeGreaterThan(0);
    });

    test('should update icons correctly for valid card', () => {
        imageLoader.displayPaymentSystemIcons();
        const detector = new PaymentSystemDetector('4111111111111111'); // Visa

        jest.spyOn(detector, 'isCardFromPaymentSystem').mockReturnValue('visa');

        imageLoader.updatePaymentSystemIcons();
        const activeIcons = container.querySelectorAll('.payment-icon.active');

        expect(activeIcons.length).toBe(1);
        expect(activeIcons[0].alt).toBe('visa');
    });

    test('should not highlight any icon for an invalid card', () => {
        imageLoader = new ImageLoader('1234567890123456'); // Некорректная карта
        imageLoader.displayPaymentSystemIcons();
        imageLoader.updatePaymentSystemIcons();

        const activeIcons = container.querySelectorAll('.payment-icon.active');
        expect(activeIcons.length).toBe(0);
    });
});