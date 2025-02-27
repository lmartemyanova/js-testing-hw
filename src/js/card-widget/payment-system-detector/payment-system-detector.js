import { cardNumber } from '../dom-handler/dom-handler';

// const cardNumber = cardNumber;

export class PaymentSystemDetector {
    constructor(cardNumber) {
        this.cardNumber = cardNumber; // Номер карты
    }

    // Метод для определения, принадлежит ли карта к данной платежной системе
    isCardFromPaymentSystem(system) {
        switch (system) {
            case 'visa':
                return this.cardNumber.startsWith('4');
            case 'mastercard':
                return this.cardNumber.startsWith('51') || 
                       this.cardNumber.startsWith('52') || 
                       this.cardNumber.startsWith('53') || 
                       this.cardNumber.startsWith('54') || 
                       this.cardNumber.startsWith('55');
            case 'discover':
                return this.cardNumber.startsWith('6011') || 
                       this.cardNumber.startsWith('65');
            case 'jcb':
                return this.cardNumber.startsWith('35');
            case 'unionpay':
                return this.cardNumber.startsWith('62');
            case 'amex':
                return this.cardNumber.startsWith('34') || 
                       this.cardNumber.startsWith('37');
            case 'mir':
                return this.cardNumber.startsWith('220');
            default:
                return false;
        }
    }
}