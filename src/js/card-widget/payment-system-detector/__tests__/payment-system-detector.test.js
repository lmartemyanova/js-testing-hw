import { PaymentSystemDetector } from '../payment-system-detector';

describe('PaymentSystemDetector', () => {
    test('should detect Visa cards', () => {
        const detector = new PaymentSystemDetector('4111111111111111'); // Visa
        expect(detector.isCardFromPaymentSystem('visa')).toBe(true);
    });

    test('should detect MasterCard cards', () => {
        const detector = new PaymentSystemDetector('5105105105105100'); // MasterCard
        expect(detector.isCardFromPaymentSystem('mastercard')).toBe(true);
    });

    test('should detect Discover cards', () => {
        const detector = new PaymentSystemDetector('6011111111111117'); // Discover
        expect(detector.isCardFromPaymentSystem('discover')).toBe(true);
    });

    test('should detect JCB cards', () => {
        const detector = new PaymentSystemDetector('3530111333300000'); // JCB
        expect(detector.isCardFromPaymentSystem('jcb')).toBe(true);
    });

    test('should detect UnionPay cards', () => {
        const detector = new PaymentSystemDetector('6221260000000000'); // UnionPay
        expect(detector.isCardFromPaymentSystem('unionpay')).toBe(true);
    });

    test('should detect Amex cards', () => {
        const detector = new PaymentSystemDetector('371449635398431'); // American Express
        expect(detector.isCardFromPaymentSystem('amex')).toBe(true);
    });

    test('should detect Mir cards', () => {
        const detector = new PaymentSystemDetector('2202202202202202'); // Mir
        expect(detector.isCardFromPaymentSystem('mir')).toBe(true);
    });

    test('should return false for unknown payment systems', () => {
        const detector = new PaymentSystemDetector('9999999999999999'); // Несуществующая система
        expect(detector.isCardFromPaymentSystem('visa')).toBe(false);
        expect(detector.isCardFromPaymentSystem('mastercard')).toBe(false);
        expect(detector.isCardFromPaymentSystem('discover')).toBe(false);
        expect(detector.isCardFromPaymentSystem('jcb')).toBe(false);
        expect(detector.isCardFromPaymentSystem('unionpay')).toBe(false);
        expect(detector.isCardFromPaymentSystem('amex')).toBe(false);
        expect(detector.isCardFromPaymentSystem('mir')).toBe(false);
    });
});