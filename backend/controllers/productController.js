import {Product} from '../models/Product.js';

export const getAllProducts = async (req, res) => {
    try {
        const products = await Product.find();
        res.json(products); 

    } catch (error) {
        console.log(error.message);
        res.status(500).send({message: error.message});
    }
};

export const createProduct = async (req, res) => {
    const {productId, name, description, price} = req.body;

    try {
        const existing = await Product.findOne({productId});

        if(existing) {
            return res.status(400).send({message: 'This productId is already in use'});
        }

        const newProduct = {
            productId,
            name,
            description,
            price,
            userId: req.userId
        };

        const product = await Product.create(newProduct);
        res.status(201).json(product);

    } catch (error) {
        console.log(error.message);
        res.status(500).send({message: error.message});
    }
};

export const updateProduct = async (req, res) => {
    const {id} = req.params;

    try {
        const product = await Product.findOneAndUpdate(
            {_id: id, userId: req.userId}, // Only the user who created the product can delete or edit it
            req.body,
            {new: true}
        );

        if(!product) {
            return res.status(403).send({message: 'Access denied or product not found'});
        }

        res.json(product);
        
    } catch (error) {
        console.log(error.message);
        res.status(500).send({message: error.message});
    }
};

export const deleteProduct = async (req, res) => {
    const {id} = req.params;

    try {
        const product = await Product.findOneAndDelete({_id: id, userId: req.userId});

        if(!product) {
            return res.status(403).send({message: 'Access denied or product not found'});
        }

        res.status(200).send({message: 'Product deleted successfully'});
        
    } catch (error) {
        console.log(error.message);
        res.status(500).send({message: error.message});
    }
};