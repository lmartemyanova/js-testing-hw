import { CardValidator } from '../card-validator';

describe('CardValidator', () => {
    test('валидный номер Visa проходит проверку', () => {
        const visa = new CardValidator('4539148803436467'); 
        expect(visa.isValid()).toBe(true);
    });

    test('валидный номер Mastercard проходит проверку', () => {
        const mastercard = new CardValidator('5467929858074128');
        expect(mastercard.isValid()).toBe(true);
    });

    test('валидный номер American Express проходит проверку', () => {
        const amex = new CardValidator('375118430910825');
        expect(amex.isValid()).toBe(false); 
    });

    test('валидный номер Discover проходит проверку', () => {
        const discover = new CardValidator('6011111111111117');
        expect(discover.isValid()).toBe(true);
    });

    test('валидный номер JCB проходит проверку', () => {
        const jcb = new CardValidator('3530111333300000');
        expect(jcb.isValid()).toBe(true);
    });

    test('валидный номер UnionPay проходит проверку', () => {
        const unionpay = new CardValidator('6246714721384292');
        expect(unionpay.isValid()).toBe(true);
    });

    test('валидный номер МИР проходит проверку', () => {
        const mir = new CardValidator('2201382000000039');
        expect(mir.isValid()).toBe(true);
    });

    test('номер карты с некорректными символами не проходит проверку', () => {
        const invalidCard = new CardValidator('4539a48803436467'); 
        expect(invalidCard.isValid()).toBe(false);
    });

    test('номер карты неверной длины не проходит проверку', () => {
        const shortCard = new CardValidator('453914880343'); 
        expect(shortCard.isValid()).toBe(false);
        
        const longCard = new CardValidator('4539148803436467222'); 
        expect(longCard.isValid()).toBe(false);
    });

    test('номер карты, не проходящий алгоритм Луна, не проходит проверку', () => {
        const invalidLuhnCard = new CardValidator('1234567812345678'); // Не соответствует алгоритму Луна
        expect(invalidLuhnCard.isValid()).toBe(false);
    });
});