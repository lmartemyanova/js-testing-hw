import { PaymentSystemDetector } from '../payment-system-detector/payment-system-detector';
import { ImageLoader } from '../image-loader/image-loader';
import { CardValidator } from '../card-validator/card-validator';

export class DOMHandler {
    constructor() {
        this.parentElement = document.querySelector('.container');
    }

    static get markup() {
        return `
        <h1>Проверка номера кредитной карты</h1>
        <form class="card-form">
            <div class="card-logos">

            </div>
            <input type="text" class="card-number" placeholder="4111111111111111" required maxlength="19">

            <button type="submit" class="validate-button">Click to validate</button>
        </form>

        <div class="result">
            <div class="validation-message"></div>
        </div>`;
    }

    bindToDOM() {
        this.parentElement.innerHTML = DOMHandler.markup;

        this.formElement = this.parentElement.querySelector('.card-form');
        this.inputElement = this.parentElement.querySelector('.card-number');
        this.submitButton = this.parentElement.querySelector('.submit');
        this.resultMessage = this.parentElement.querySelector('.validation-message');

        const imageLoader = new ImageLoader();
        imageLoader.displayPaymentSystemIcons();

        this.formElement.addEventListener('submit', (e) => this.onSubmit(e));
    }

    onSubmit(e) {
        e.preventDefault();
        const imageLoader = new ImageLoader();
        
        const cardNumber = this.inputElement.value.trim();
        const validator = new CardValidator(cardNumber);
        const detector = new PaymentSystemDetector(cardNumber);

        const correctSystemNames = {
          visa: 'Visa',
          mastercard: 'MasterCard',
          discover: 'Discover',
          jcb: 'JCB',
          unionpay: 'UnionPay',
          amex: 'AmEx',
          mir: 'МИР'
        };

        if (validator.isValid()) {
            const paymentSystem = detector.getPaymentSystem();
            if (paymentSystem) {
              const displayName = correctSystemNames[paymentSystem] || paymentSystem;
              this.resultMessage.textContent = `Номер карты валиден и относится к платежной системе ${displayName}`;
            } else {
                this.resultMessage.textContent = `Номер карты валиден, но невозможно определить платежную систему`;
            }
        } else {
            this.resultMessage.textContent = `Номер карты не валиден`;
        }
        
        imageLoader.updatePaymentSystemIcons();
    }
}
