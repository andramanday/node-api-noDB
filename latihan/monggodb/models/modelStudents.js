import mongoose from 'mongoose'
import validator from 'validator'

const userSchema = new mongoose.Schema({
    name:{
        type: String,
        min: 10,
        required: true,
        unique: true,
         trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        validate: value => {
            if (!validator.isEmail(value)) {
                throw new Error({error: 'Invalid Email address'})
            }
        }
    },
    age: {
        type: Number,
        required: true,
    }

})

const ModelUser = mongoose.model('Student', userSchema)

module.exports = ModelUser