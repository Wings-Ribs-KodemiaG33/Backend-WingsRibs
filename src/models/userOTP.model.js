
import mongoose from "mongoose"

const UserOTPVerifySchema = new mongoose.Schema({
    userID: String,
    OTP: String,
    createdAt: Date,
    expiresAt:Date,
})


export default mongoose.model("OTP", UserOTPVerifySchema)