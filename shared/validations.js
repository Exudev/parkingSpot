function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    // Test the email against the regex pattern
    return emailRegex.test(email);
}


function isValidPhoneNumber(phoneNumber) {
    const phoneRegex = /^\+\d{1,3}\d{3,14}$/;
    return phoneRegex.test(phoneNumber);
}

function checkPasswordPatterns(password) {
    const easyPatterns = [
      /\d{4,}/,             // Matches four or more consecutive digits
      /(.)\1{2,}/,          // Matches three or more consecutive repeated characters
      /(1234|5678)/,        // Matches the sequence "1234" or "5678"
      /(.)\1{1,}(.?)\2{1,}/ // Matches two or more consecutive repeated characters with any characters in between
    ];
  
    for (const pattern of easyPatterns) {
      if (pattern.test(password)) {
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
validPassword: checkPasswordPatterns,
validText: doesNotHaveNumber,
}

