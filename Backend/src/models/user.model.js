import mongoose, { mongo, Schema } from "mongoose";
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },
    username: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true
    }
}, {timestamps: true})

// encrypt password before saving it
userSchema.pre("save", async function (next) {
    if(!this.isModified("password")) return next();
    this.password = await bcrypt.hash(this.password, 8)
    next()
})

userSchema.methods.isPasswordCorrect = async function (password) {
    return await bcrypt.compare(password, this.password)
}

userSchema.methods.generateToken = function (){
    return jwt.sign({_id: this._id},
        process.env.TOKEN_SECRET,
        {expiresIn: '24h'}
    )
}

const User = mongoose.model('User', userSchema)

export default User
