import {LoginUserInput, RegisterUserInput} from "../types/UserTypes";
import {User} from "../schema/UserSchema";
import {ApolloError} from "apollo-server-core";

export const resolvers = {
    Query: {
        users: () => {
            return "Hello"
        }
    },
    Mutation: {
        registerUser: async (_:any, {input: {name, email}}: RegisterUserInput) => {
            const user = await User.create({
                name,
                email,
            });

            if(user) {
                return {
                    id: user.id,
                    email: user.email,
                    name: user.name,
                }
            } else {
                throw new ApolloError("Invalid data", "INVALID_DATA");
            }
        },
        loginUser: async (_:any, {input: {email, otp}}: LoginUserInput) => {
            const user = await User.findOne({email});

            if(user && user.otp === otp) {
                return {
                    id: user.id,
                    name: user.name,
                    email: user.email,
                }
            } else {
                throw new ApolloError("Invalid OTP", "INVALID_OTP");
            }
        }
    }
};