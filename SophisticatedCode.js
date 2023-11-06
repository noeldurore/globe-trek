// Filename: SophisticatedCode.js
//
// Description: This code demonstrates a sophisticated and complex implementation of a credit card validation system.
// It utilizes various algorithms, regular expressions, and error handling to provide a comprehensive validation mechanism.
//
// Author: Your Name
// Date: January 1, 2022

// Utility function to validate a credit card number
function validateCreditCardNumber(cardNumber) {
  if (!/^\d{13,19}$/.test(cardNumber)) {
    throw new Error("Invalid card number. Must be a numeric value with 13-19 digits.");
  }

  // Luhn Algorithm check
  const digits = cardNumber.split('').map(Number).reverse();
  let sum = 0;
  for (let i = 0; i < digits.length; i++) {
    let digit = digits[i];
    if (i % 2 === 1) {
      digit *= 2;
      if (digit > 9) {
        digit -= 9;
      }
    }
    sum += digit;
  }
  if (sum % 10 !== 0) {
    throw new Error("Invalid card number. Failed Luhn Algorithm check.");
  }

  // Specific card network validations
  const firstTwoDigits = cardNumber.slice(0, 2);
  if (firstTwoDigits === '34' || firstTwoDigits === '37') {
    if (cardNumber.length !== 15) {
      throw new Error("Invalid card number. AMEX cards must have 15 digits.");
    }
  } else if (firstTwoDigits >= '51' && firstTwoDigits <= '55') {
    if (cardNumber.length !== 16) {
      throw new Error("Invalid card number. Mastercard cards must have 16 digits.");
    }
  } else if (cardNumber[0] === '4') {
    if (cardNumber.length !== 13 && cardNumber.length !== 16 && cardNumber.length !== 19) {
      throw new Error("Invalid card number. Visa cards must have 13, 16, or 19 digits.");
    }
  } else {
    throw new Error("Invalid card number. Unknown card network.");
  }

  // All validations passed
  return true;
}

// Example usage
const cardNumber = '45320151128336';
try {
  const isValid = validateCreditCardNumber(cardNumber);
  console.log(`The card number '${cardNumber}' is valid.`);
} catch (error) {
  console.error(`Error: ${error.message}`);
}