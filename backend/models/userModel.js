const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    name: {
        type: String,
        default: 'user',
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password:{
        type : String,
        required : true
    },
    is_verified: {
        type: Number,
        default: 1,
        required: true
    },
    notes: [
        {
            heading: {
                type : String,
                required : true
            },
            description : {
                type : String,
                required : true
            }
        }
    ]

})

module.exports = mongoose.model('user', userSchema)