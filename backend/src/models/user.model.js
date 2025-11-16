import mongoose, {Schema} from "mongoose";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: function () {
            return this.authProvider === "local"
        },
        select: false
    },
    profileImage: {
        type: String
    },
    authProvider: {
        type: String,
        enum: ["local", "google"],
        default: "local"
    },
    refreshToken: {
        type: String,
        select: false
    }

}, {timestamps: true})

userSchema.index({email: 1})
// hash password
userSchema.pre("save", async function(next){
    if (!this.isModified("password") || this.authProvider !== "local") {
        return next()
    }
    this.password = await bcrypt.hash(this.password, 10)
    next()
})
// compare password
userSchema.methods.isPasswordCorrect = async function (password) {
    return await bcrypt.compare(password, this.password)
}

// access token generate
userSchema.methods.generateAccessToken = function() {
    return jwt.sign(
        {
            _id: this._id,
            email: this.email,
            username: this.username
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY
        }
    )
}

// refresh token generate
userSchema.methods.generateRefreshToken = function() {
    return jwt.sign(
        {
            _id: this._id,
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY
        }
    )
}

export const User = mongoose.model("User", userSchema)