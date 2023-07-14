function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    // Test the email against the regex pattern
    return emailRegex.test(email);
}


function isValidPhoneNumber(phoneNumber) {
    const phoneRegex = /^\+\d{1,3}\d{3,14}$/;
    return phoneRegex.test(phoneNumber);
}

function validatePassword(password) {
  // Check if password is at least 6 characters long
  if (password.length < 6) {
    return false;
  }

  // Check for consecutive patterns
  for (let i = 0; i < password.length - 2; i++) {
    const charCode1 = password.charCodeAt(i);
    const charCode2 = password.charCodeAt(i + 1);
    const charCode3 = password.charCodeAt(i + 2);

    if (
      charCode2 - charCode1 === 1 &&  // Check for consecutive incrementing ASCII codes
      charCode3 - charCode2 === 1
    ) {
      return false;
    }

    if (
      charCode1 - charCode2 === 1 &&  // Check for consecutive decrementing ASCII codes
      charCode2 - charCode3 === 1
    ) {
      return false;
    }
  }

  return true;
}
  
function doesNotHaveNumber(string) {
    const numberRegex = /\d/;
    return !numberRegex.test(string);
}
  
module.exports = {
validMail:isValidEmail, 
validPhone: isValidPhoneNumber,
validPassword: validatePassword,
validText: doesNotHaveNumber,
}

