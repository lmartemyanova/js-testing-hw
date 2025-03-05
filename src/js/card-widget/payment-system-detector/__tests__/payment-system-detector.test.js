import { PaymentSystemDetector } from '../payment-system-detector';

describe('PaymentSystemDetector', () => {
    test('Определение платежной системы Visa', () => {
        const detector = new PaymentSystemDetector('4539148803436467'); // Visa
        expect(detector.getPaymentSystem()).toBe('visa');
    });

    test('Определение платежной системы Mastercard', () => {
        const detector = new PaymentSystemDetector('5369837245476677'); // Mastercard
        expect(detector.getPaymentSystem()).toBe('mastercard');
    });

    test('Определение платежной системы American Express', () => {
        const detector = new PaymentSystemDetector('345936691151616'); // Amex
        expect(detector.getPaymentSystem()).toBe('amex');
    });

    test('Определение платежной системы Discover', () => {
        const detector = new PaymentSystemDetector('6011862929645991'); // Discover
        expect(detector.getPaymentSystem()).toBe('discover');
    });

    test('Определение платежной системы JCB', () => {
        const detector = new PaymentSystemDetector('3540674997221171'); // JCB
        expect(detector.getPaymentSystem()).toBe('jcb');
    });

    test('Определение платежной системы UnionPay', () => {
        const detector = new PaymentSystemDetector('6246714721384292'); // UnionPay
        expect(detector.getPaymentSystem()).toBe('unionpay');
    });

    test('Определение платежной системы МИР', () => {
        const detector = new PaymentSystemDetector('2202205943944468'); // МИР
        expect(detector.getPaymentSystem()).toBe('mir');
    });

    test('Неопределенный номер карты возвращает null', () => {
        const detector = new PaymentSystemDetector('9999999999999999'); // Несуществующая система
        expect(detector.getPaymentSystem()).toBeNull();
    });

    test('Пустая строка возвращает null', () => {
        const detector = new PaymentSystemDetector('');
        expect(detector.getPaymentSystem()).toBeNull();
    });
});
