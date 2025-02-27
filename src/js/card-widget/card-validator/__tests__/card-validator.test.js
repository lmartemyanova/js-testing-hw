import { CardValidator } from '../card-validator';

describe('CardValidator', () => {
    test('validateCardNumberSymbols should return true for numbers only', () => {
        const validator = new CardValidator('4111111111111111');
        expect(validator.validateCardNumberSymbols()).toBe(true);
    });

    test('validateCardNumberSymbols should return false for non-numeric characters', () => {
        const validator = new CardValidator('4111a11111111111');
        expect(validator.validateCardNumberSymbols()).toBe(false);
    });

    test('validateCardNumberLength should return true for 16-digit number', () => {
        const validator = new CardValidator('4111111111111111');
        expect(validator.validateCardNumberLength()).toBe(true);
    });

    test('validateCardNumberLength should return false for number with wrong length', () => {
        const validator = new CardValidator('41111111111');
        expect(validator.validateCardNumberLength()).toBe(false);
    });

    test('validateCardNumber should correctly validate card numbers using Luhn algorithm', () => {
        const validCard = new CardValidator('4111111111111111'); // Валидная карта
        const invalidCard = new CardValidator('4111111111111122'); // Невалидная карта

        expect(validCard.validateCardNumber()).toBe(true);
        expect(invalidCard.validateCardNumber()).toBe(false);
    });

    test('isValid should return true for a fully valid card number', () => {
        const validator = new CardValidator('4111111111111111');
        expect(validator.isValid()).toBe(true);
    });

    test('isValid should return false if card number has non-numeric characters', () => {
        const validator = new CardValidator('4111a11111111111');
        expect(validator.isValid()).toBe(false);
    });

    test('isValid should return false if card number length is incorrect', () => {
        const validator = new CardValidator('41111111111');
        expect(validator.isValid()).toBe(false);
    });

    test('isValid should return false if card number fails Luhn check', () => {
        const validator = new CardValidator('4111111111111122');
        expect(validator.isValid()).toBe(false);
    });
});