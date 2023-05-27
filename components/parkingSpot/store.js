const { get } = require("http");

const list = [];

function ReserveParkingSpot(fullReserve){
    list.push(fullReserve);
}

function seeAllReserved(){
    return list;
}

module.exports = {
    reserve: ReserveParkingSpot,
    list: seeAllReserved,
}