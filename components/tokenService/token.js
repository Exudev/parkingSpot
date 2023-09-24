const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const Model = require ('./model');

function generateActivateAccountToken(userId) {
        try{ 
            var val = Math.floor(1000 + Math.random() * 9000);
            const currentDate = new Date();
            const expirationDate = new Date(currentDate);
            expirationDate.setDate(expirationDate.getDate() + 1);
            
            const newToken = new Model({
               type: 'activate-account',
               token: val,
               user:  userId,
               DateGenerate:currentDate,
               ExpirationDate: expirationDate,
            });
            newToken.save();
            return val;

        }catch(error){
            console.error('Error occurred during creating token:', error);
            return false;
        }

}


function generateTokenLink(link, token) {
    const tokenLink = link + "/" + token;
    return tokenLink;
}



module.exports ={
    createActivateAccountToken :generateActivateAccountToken,
    createTokenLink: generateTokenLink,
}