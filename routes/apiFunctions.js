const csv = require('csv-parser')
const fs = require('fs')
const geolib = require('geolib')

module.exports = {
    findNearestStore: function(userLat,userLong,cb){
        if(isNaN(userLat) || isNaN(userLong)){
            cb({error:'Invalid Params'})
        } else {
            //closestStore is gonna be our return obj with info for the user
            let closestStore = {
                distance: null
            }
            let stores = []
            //pulls all the cvs data and stores it into an array "stores"
            fs.createReadStream('CodeChallenge/pharmacies.csv')
            .pipe(csv())
            .on('data', (data) => stores.push(data))
            .on('end', () => {
                stores.map(store =>{
                    //retrieves distance between two lat/long coordinates in meters
                   let distance = geolib.getDistance(
                        {latitude: parseFloat(userLat), longitude: parseFloat(userLong)},
                        {latitude: parseFloat(store.latitude), longitude: parseFloat(store.longitude)}
                    )
                    //sets distance meters to miles
                    distance =  (distance * 0.000621371) 
                    console.log(store.name)
                    console.log(distance)
                    //sets our closestStore 
                    if(closestStore.distance === null || distance < closestStore.distance){
                        closestStore.name = store.name
                        closestStore.address = store.address
                        closestStore.city = store.city
                        closestStore.state = store.state
                        closestStore.zip = store.zip
                        closestStore.distance =  distance
                    }
                })
                cb({closestStore:closestStore})
        });
     }
    }
}