import mongoose from "mongoose";

const subsidiarySchema = new mongoose.Schema({
    name: {
        type: String,
        required : true,
        minLength: 5,
        maxLenght:100,
    },
    street: {
        type: String,
        required : true,
        minLength: 5,
        maxLenght:100,
    },
    colony:{
        type: String,
        required : true,
        minLength: 5,
        maxLenght:100,
    },
    state: {
        type: String,
        required : true,
        minLength: 5,
        maxLenght:100,
    },
    email:{
        type: String,
        required: true,
        match: /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/,
        unique: true
    },
    phone: {
        type: Number,
        required: true,
        validate: {
            validator: function(v) {
                return v.length === 10;  // Validador para longitud exacta
            },
            message: props => `${props.value} `
        }
    }
    
})
export default mongoose.model("Sucursales", subsidiarySchema);