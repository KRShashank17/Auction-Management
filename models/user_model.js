import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import joi from "joi";
import passwordComplexity from "joi-password-complexity";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    address : {
        type: String,
        required: true
    },
    date : {
        type: String,
        required: true
    },
    minAmount: {
        type: String,
        required: true
    },
    maxAmount: {
        type: String,
        required: true
    }
});

userSchema.methods.generateAuthToken = function () {
    const token = jwt.sign(
        { _id: this._id }, 
        process.env.JWTPRIVATEKEY, 
        { expiresIn: "7d"}
    )
    return token
}

const validate = (data) => {
    const schema = joi.object({
        name: joi.string().required().label("Name"),
        email: joi.string().email().required().label("Email"),
        password: joi.string().required().label("Password"),
        address: joi.string().required().label("Address"),
        date: joi.string().required().label("Date"),
        minAmount: joi.string().required().label("Min Amount"),
        maxAmount: joi.string().required().label("Max Amount")
    })
}

const User = mongoose.model("User", userSchema);
export default {User , validate}