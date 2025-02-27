// import { cardNumber } from '../dom-handler/dom-handler';

// const cardNumber = cardNumber;

export class CardValidator {
    constructor(cardNumber) {
        this.cardNumber = cardNumber; // получаем номер карточки из модуля domHandler в виде числа
    }

    validateCardNumberSymbols() {
        const regex = /^\d+$/; // Регулярное выражение для проверки, что строка состоит только из цифр
        return regex.test(this.cardNumber);
    }

    validateCardNumberLength() {
        return this.cardNumber.length === 16;
    }

    // validateCardNumber() {
    //     // Здесь храним контрольную сумму
    //     let checksum = 0;
    //     // Переводим номер карточки в массив чисел
    //     const cardnumbers = this.cardNumber.map(Number);
        
    //     // Проходимся по каждому числу
    //     for (const [index, num] of cardnumbers.entries()) {
    //         // Если index чётный, значит число стоит на нечётной позиции
    //         // Так получается потому что считаем с нуля
    //         if (index % 2 === 0) {
    //         let buffer = num * 2;
    //         // Если удвоенное число больше 9, то вычитаем из него 9 и прибавляем к контрольной сумме
    //         // Если нет, то сразу прибавляем к контрольной сумме
    //         buffer > 9 ? checksum += buffer - 9 : checksum += buffer;
    //         }
    //         // Если число стоит на чётной позиции, то прибавляем его к контрольной сумме
    //         else {
    //         checksum += num;
    //         }
    //     }
    //     // Если контрольная сумма делится без остатка на 10, то номер карты правильный
    //     return checksum % 10 === 0 ? true : false;
    // }



    validateCardNumber() {
        // Здесь храним контрольную сумму
        let checksum = 0;
        // Переводим номер карточки в массив чисел
        const cardnumbers = this.cardNumber.split('').map(Number); // Преобразуем строку в массив чисел

        // Проходимся по каждому числу
        for (const [index, num] of cardnumbers.entries()) {
            // Если index чётный, значит число стоит на нечётной позиции
            // Так получается потому что считаем с нуля
            if (index % 2 === 0) {
                let buffer = num * 2;
                // Если удвоенное число больше 9, то вычитаем из него 9 и прибавляем к контрольной сумме
                // Если нет, то сразу прибавляем к контрольной сумме
                checksum += buffer > 9 ? buffer - 9 : buffer;
            } else {
                // Если число стоит на чётной позиции, то прибавляем его к контрольной сумме
                checksum += num;
            }
        }
        // Если контрольная сумма делится без остатка на 10, то номер карты правильный
        return checksum % 10 === 0;
    }

    isValid() {
        return this.validateCardNumberSymbols() &&
               this.validateCardNumberLength() &&
               this.validateCardNumber();
    }
}