export class CardValidator {
    constructor(cardNumber) {
        this.cardNumber = cardNumber; 
    }

    validateCardNumberSymbols() {
        const regex = /^\d+$/; 
        return regex.test(this.cardNumber);
    }

    validateCardNumberLength() {
        return this.cardNumber.length === 16;
    }

    validateCardNumber() {
        let checksum = 0;

        const cardnumbers = this.cardNumber.split('').map(Number); 

        for (const [index, num] of cardnumbers.entries()) {
            if (index % 2 === 0) {
                let buffer = num * 2;
                checksum += buffer > 9 ? buffer - 9 : buffer;
            } else {
                checksum += num;
            }
        }
        return checksum % 10 === 0;
    }

    isValid() {
        return this.validateCardNumberSymbols() &&
               this.validateCardNumberLength() &&
               this.validateCardNumber();
    }
}
