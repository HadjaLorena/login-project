import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import {User} from '../models/User.js';

export const register = async (req, res) => {
    const {firstName, lastName, cpf, birthDate, email, password} = req.body;

    try {
        const userExists = await User.findOne({$or: [{email}, {cpf}]});

        if(userExists){
            return res.status(400).send({message: 'Email or CPF already registered'});
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = {
            firstName,
            lastName,
            cpf,
            birthDate,
            email,
            password: hashedPassword
        };

        const user = await User.create(newUser);
        res.status(201).send({message: 'User registered successfully'});

        
    } catch (error) {
        console.log(error.message);
        res.status(500).send({message: error.message});
    }
};

export const login = async (req, res) => {
    const {email, password} = req.body;

    try {
        const user = await User.findOne({email});

        if(!user) {
            return res.status(404).send({message: 'User not found'});
        }
        const valid = await bcrypt.compare(password, user.password);

        if(!valid) {
            return res.status(400).send({message: 'Incorrect password'});
        }

        const token = jwt.sign({id: user._id}, process.env.JWT_SECRET, {
            expiresIn: '1h'
        });

        res.json({token});
        
    } catch (error) {
        console.log(error.message);
        res.status(500).send({message: error.message});
    }
}