import { PaymentSystemDetector } from '../payment-system-detector/payment-system-detector';
import { CardValidator } from '../card-validator/card-validator';
import { cardNumber } from '../dom-handler/dom-handler';

// const cardNumber = cardNumber;

export class ImageLoader {
    constructor(cardNumber) {
        this.cardNumber = cardNumber; 
        this.paymentSystems = [
            'visa',
            'mastercard',
            'discover',
            'jcb',
            'unionpay',
            'amex', 
            'mir'
        ];
        this.resultContainer = document.getElementById('card-logo'); // Элемент для отображения иконки
    }

    // Метод для отображения цветных иконок карт
    displayPaymentSystemIcons() {
        const iconsContainer = document.createElement('div');
        iconsContainer.classList.add('icons-container');

        // Перебираем все платежные системы и создаем элементы img
        this.paymentSystems.forEach(system => {
            const img = document.createElement('img');
            img.src = `./images/${system}.svg`;
            img.alt = system;
            img.classList.add('payment-icon', 'inactive'); // Изначально все иконки черно-белые
            iconsContainer.appendChild(img);
        });

        // Очищаем предыдущие иконки и добавляем новые
        this.resultContainer.innerHTML = '';
        this.resultContainer.appendChild(iconsContainer);
    }

    // Метод для проверки номера карты и обновления иконок
    updatePaymentSystemIcons() {
        const validator = new CardValidator(this.cardNumber);
        const detector = new PaymentSystemDetector(this.cardNumber);
        
        // Проверяем валидность номера карты
        const isValid = validator.isValid();
    
        // Обновляем цвет иконок в зависимости от валидности
        const icons = this.resultContainer.querySelectorAll('.payment-icon');
        icons.forEach(icon => {
            const system = icon.alt.toLowerCase(); // Получаем название платежной системы из атрибута alt
            if (isValid && detector.isCardFromPaymentSystem(system)) {
                icon.classList.add('active'); // Добавляем класс для активной иконки
                icon.classList.remove('inactive'); // Убираем класс для неактивной иконки
            } else {
                icon.classList.remove('active'); // Убираем класс для активной иконки
                icon.classList.add('inactive'); // Добавляем класс для неактивной иконки
            }
        });
    }
}
