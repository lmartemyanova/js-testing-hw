// import { PaymentSystemDetector } from '../payment-system-detector/payment-system-detector';
// import { ImageLoader } from '../image-loader/image-loader';
// import { CardValidator } from '../card-validator/card-validator';

// export class DOMHandler {
//     constructor(parentElement) {
//         this.parentElement = parentElement;

//         this.onSubmit = this.onSubmit.bind(this);
//     }

//     static get markup() {
//         return `
//         <form class="card-form">
//             ${new ImageLoader.displayPaymentSystemIcons()}
//             <input type="text" class="card-number" placeholder="Введите номер карты" required>
//             <button type="submit" class="submit">Проверить</button>
//         </form>
//         `
//     }

//     static get markupResult() {
//         return `
//         <div class="result">
//             ${new ImageLoader.updatePaymentSystemIcons()}
//             <div class="validation-message"></div>
//         </div>
//         `
//     }

//     static get selector() {
//         return '.card-form';
//     }

//     static get inputSelector() {
//         return '.card-number';
//     }

//     static get submitSelector() {
//         return '.submit';
//     }

//     static get validationSelector() {
//         return '.validation-message';
//     }

//     bindToDOM() {
//         this.parentElement.innerHTML = DOMHandler.markup;

//         this.element = this.parentElement.querySelector(DOMHandler.selector);
//         this.inputEl = this.parentElement.querySelector(DOMHandler.inputSelector);
//         this.submitBtn = this.parentElement.querySelector(DOMHandler.submitSelector);

//         this.element.addEventListener('submit', this.onSubmit);
//     }

//     onSubmit(e) {
//         e.preventDefault();

//         const cardNumber = this.inputEl.value;

//         const validator = new CardValidator(cardNumber);
//         const detector = new PaymentSystemDetector(cardNumber);

//         if (validator.isValid() && detector.isCardFromPaymentSystem() != false) {
//             this.parentElement.innerHTML = DOMHandler.markupResult;

//             this.resultMessage = this.parentElement.querySelector(DOMHandler.validationSelector);
//             this.resultMessage.innerHTML = `
//             Номер карты валиден и относится к платежной системе ${detector.isCardFromPaymentSystem}
//             `
//         } else if (validator.isValid() && detector.isCardFromPaymentSystem() == false) {
//             this.parentElement.innerHTML = DOMHandler.markupResult;

//             this.resultMessage = this.parentElement.querySelector(DOMHandler.validationSelector);
//             this.resultMessage.innerHTML = `
//             Номер карты валиден, но невозможно определить платежную систему
//             `
//         } else {
//             this.parentElement.innerHTML = DOMHandler.markupResult;

//             this.resultMessage = this.parentElement.querySelector(DOMHandler.validationSelector);
//             this.resultMessage.innerHTML = `
//             Номер карты не валиден
//             `
//         }
//     }
// }




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
                <img src="visa.png" alt="Visa">
                <img src="mastercard.png" alt="MasterCard">
                <img src="amex.png" alt="American Express">
                <img src="discover.png" alt="Discover">
            </div>

            <label for="card-number">Card number</label>
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

        this.formElement.addEventListener('submit', (e) => this.onSubmit(e));
    }

    onSubmit(e) {
        e.preventDefault();
        const cardNumber = this.inputElement.value.trim();
        const validator = new CardValidator(cardNumber);
        const detector = new PaymentSystemDetector(cardNumber);

        if (validator.isValid()) {
            const paymentSystem = detector.isCardFromPaymentSystem();
            if (paymentSystem) {
                this.resultMessage.textContent = `Номер карты валиден и относится к платежной системе ${paymentSystem}`;
            } else {
                this.resultMessage.textContent = `Номер карты валиден, но невозможно определить платежную систему`;
            }
        } else {
            this.resultMessage.textContent = `Номер карты не валиден`;
        }

        const imageLoader = new ImageLoader(cardNumber);
        imageLoader.updatePaymentSystemIcons();
    }
}
