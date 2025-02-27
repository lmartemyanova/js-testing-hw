import { PaymentSystemDetector } from '../payment-system-detector/payment-system-detector';
import { CardValidator } from '../card-validator/card-validator';

export class ImageLoader {
    constructor() {
        this.paymentSystems = [
            'visa',
            'mastercard',
            'discover',
            'jcb',
            'unionpay',
            'amex', 
            'mir'
        ];
        this.resultContainer = document.querySelector('.card-logos');
    }

    displayPaymentSystemIcons() {
        const iconsContainer = document.createElement('div');
        iconsContainer.classList.add('icons-container');

        this.paymentSystems.forEach(system => {
            const img = document.createElement('img');
            img.src = `./images/${system}.svg`;
            img.alt = system;
            img.classList.add('payment-icon', 'inactive'); 
            iconsContainer.appendChild(img);
        });
        this.resultContainer.innerHTML = '';
        this.resultContainer.appendChild(iconsContainer);
    }

    updatePaymentSystemIcons() {
        const cardNumber = document.querySelector('.card-number').value;
        const validator = new CardValidator(cardNumber);
        const detector = new PaymentSystemDetector(cardNumber);
        const detectedSystem = detector.getPaymentSystem();
        
        const isValid = validator.isValid();
    
        const icons = this.resultContainer.querySelectorAll('.payment-icon');
        icons.forEach(icon => {
            const system = icon.alt.toLowerCase(); 
            if (isValid && system === detectedSystem) {
                icon.classList.add('active'); 
                icon.classList.remove('inactive'); 
            } else {
                icon.classList.remove('active'); 
                icon.classList.add('inactive'); 
            }
        });
    }
}
