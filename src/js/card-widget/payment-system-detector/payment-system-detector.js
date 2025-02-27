export class PaymentSystemDetector {
    constructor(cardNumber) {
        this.cardNumber = cardNumber; 
    }

    getPaymentSystem() {
        const systems = {
          visa: /^4/,
          mastercard: /^5[1-5]/,
          discover: /^(6011|65)/,
          jcb: /^35/,
          unionpay: /^62/,
          amex: /^(34|37)/,
          mir: /^220/,
      };
  
      for (const [system, pattern] of Object.entries(systems)) {
          if (pattern.test(this.cardNumber)) {
              return system;
          }
      }
      
      return null;
    }
}
