export type RegisterUserInput = {
    input: {
        name: string;
        email: string;
    }
}

export type LoginUserInput = {
    input: {
        email: string;
        otp: string;
    }
}