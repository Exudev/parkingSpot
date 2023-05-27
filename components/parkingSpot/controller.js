const store = require('./store');

function reserveParking(user, parkingSpot, time){
return new Promise((resolve,reject) => {
  if (!user || !parkingSpot ||!time) {
        console.error('[messageController] Theres no user or park or time selected');
        return reject('The provided data was incorrect');
}
    const fullReserve = {
           user: user,
           parkingSpot: parkingSpot,
           time: new Date(),
    };
store.reserve(fullReserve); 
console.log(fullReserve); 
resolve(fullReserve);
})
}
function getReserve(){
    return new Promise((resolve,reject) => {
        resolve(store.list());
    })
}
module.exports = {
    reserveParking,
    getReserve,
}


