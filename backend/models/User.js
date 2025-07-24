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
            validator: {
                validator: function (value) {
                    return value < new Date();
                },
                message: 'Date of birth must be before the current date'
            }
        },
        email: {
            type: String,
            require: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
        }
    },
    {
        timestamp: true
    }
);

export const User = mongoose.model('User', userSchema);