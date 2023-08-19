const mongoose = require('mongoose');
const cities = require('./cities');
const {places,descriptors} = require('./seedHelpers');
const Campground = require('../models/campground');

/*
const connection = mongoose.createConnection('mongodb://127.0.0.1:27017').on('open',()=>{
    console.log("Connected to DATABASE!");
}).on('error',()=>{
    console.log("Couldn't Connect to DATABASE!");
});
*/

mongoose.connect('mongodb://127.0.0.1:27017/Yelp-Camp');

const db = mongoose.connection;
db.on("error",console.error.bind(console,"connection error:"));
db.once("open", ()=>{
    console.log("Database connected");
});

const sample = array => array[Math.floor(Math.random()*array.length)];

const seedDB = async () => {
    await Campground.deleteMany({});
    for( let i = 0; i < 50; i++ ){
        const random1000 = Math.floor( Math.random()*1000);
        const price = Math.floor(Math.random()*20)+1;
        //console.log( random1000 );
        //console.log( `Hey there ${random1000}` );
        const camp = new Campground({
            location:`${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)}, ${sample(places)}`,
            image: `https://source.unsplash.com/collection/9046579/1600x900`,
            description:`Lorem ipsum dolor sit, amet consectetur adipisicing elit. Tempore modi voluptates fuga, ad sit voluptatibus facere, suscipit dolorem officia vel quidem. Fuga asperiores perspiciatis necessitatibus ea quis at recusandae architecto.`,
            price
        })
        await camp.save();
    }
}

seedDB().then( () => {
    mongoose.connection.close();
});