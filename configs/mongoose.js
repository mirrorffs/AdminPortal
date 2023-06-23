const mongoose = require('mongoose');

const url = 'mongodb+srv://mirror:1234@cluster0.vpn52ur.mongodb.net/'

async function mongo() {
        await mongoose.connect(url);
  }
mongo().then(()=>{
    console.log('Connected to mongoDB')
}).catch((error)=>{
    console.log('Unable to connect to mongoDB', error)
})
