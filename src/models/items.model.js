import { MongoOIDCError } from "mongodb";
import mongoose from "mongoose"

const itemSchema = new mongoose.Schema({
    item: {
        type: String,
        required: true,
        minLength: 3,
        maxLenght:150,
    },
    subsidiary:{
        type: String,
        minLength: 3,
        maxLenght:150,
        required: false,
   },
   photo:{
     type: String,
     required:false,
   },
   price:{
       type: Number,
       required: true,
   },
   discount:{
    type: Number,
    required: false,
   },
    description:{
         type: String,
         required: true,
    },
    category:{
        type: String,
        required: true,
    },
    timecook:{
        type: Number,
        required: true,
    },
    showitem:{
        type: Boolean,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now,
    }, 
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Administrador",
    }
},{
    timestamps: true
});

export default mongoose.model("Productos", itemSchema);

