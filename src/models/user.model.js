import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        trim: true
    },
    email:{
        type: String,
        required: true,
        match: /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    street: {
        type: String,
        minLength: 5,
        maxLenght:100,
    },
    number: {
        type: Number,
    },
    colony:{
        type: String,
        minLength: 5,
        maxLenght:100,
    },
    cpnum:{
        type: Number,
        required : true,
        length: 5,
    },
    phone: {
        type: Number,
    },
    roles:{
        type: [String], 
        def:['user','admin','vendor'], 
        required: true,
    },
    photo:{
        type: String,
        required:false,
      },
    subsidiary: {
        type: String,
        required:false,
    },
    points:{
        type: Number
    }
},{
    timestamps: true
})

export default mongoose.model("Usuario", userSchema);