const { get } = require("http");

const user = [];


function seeAllUsers(){
    return user;
}

module.exports = {
    list: seeAllUsers,
}