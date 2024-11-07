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
    town:{
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
    cpnum: {
        type: Number,
        required : true,
        length: 5,
    },
    phone: {
        type: Number,
        required: true,
        validate: {
            validator: function(v) {
                return v.toString().length === 10; 
            },
            message: props => `${props.value} no tiene 10 dígitos`
        }
    },
    email:{
        type: String,
        required: true,
        match: /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/,
        unique: true
    }
    
})
export default mongoose.model("Sucursales", subsidiarySchema);