// @ts-ignore
import express from "express";
import expressAsyncHandler = require("express-async-handler");

import {User} from "../schema/UserSchema";

export const otpRoute = express.Router();

const registerOtp = expressAsyncHandler(async (req: any, res) => {
    const {otp, userId} = req.body;

    if(!otp || !userId) {
        res.status(400);
        throw new Error("Please add all fields");
    }

    const user = await User.findByIdAndUpdate(userId, {otp}, {new: true});

    if (user) {
        res.status(200);
        res.json({
            updated: true,
        });
    } else {
        res.status(400);
        throw new Error("Can not update");
    }
});

otpRoute.post("/", registerOtp);