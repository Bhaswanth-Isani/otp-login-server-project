import * as mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    otp: {
        type: mongoose.Schema.Types.Number,
    }
});

export const User = mongoose.model("User", userSchema);