const mongoose = require('mongoose')
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    passwordHash:{
        type: String,
        required: true,
    }
},{
    timestamps: true
})

userSchema.virtual('password').set(function(value){
    this.passwordHash = bcrypt.hashSync(value,10)
})

userSchema.methods.isPasswordCorrect = function(password){
    return bcrypt.compareSync(password, this.passwordHash)
}

const User = mongoose.model('User', userSchema);

module.exports = User;
