import mongoose from "mongoose";

const userSchema = mongoose.Schema(
    {
        firstName: {
            type: String,
            required: true,
        },
        lastName: {
            type: String,
            required: true,
        },
        cpf: {
            type: String,
            required: true,
            unique: true,
        },
        birthDate: {
            type: Date,
            required: true,
        },
        email: {
            type: String,
            require: true,
        },
        password: {
            type: String,
            required: true,
        }
    }
);