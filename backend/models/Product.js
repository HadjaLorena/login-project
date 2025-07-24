import mongoose from "mongoose";

const productSchema = mongoose.Schema(
    {
        productId: {
            type: String,
            required: true,
            unique: true,
        },    
        name: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        price: {
            type: Number,
            required: true,
        },
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        }
    },
    {
        timestamp: true
    }
);

export const Product = mongoose.model('Product', productSchema);