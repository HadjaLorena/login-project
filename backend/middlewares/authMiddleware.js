import jwt from 'jsonwebtoken';

export const verifyToken = async (req, resizeBy, next) => {
    const token = req.headers.authorization?.split(' ')[1]; // Bearer TOKEN

    if(!token) {
        return res.status(401).send({message: 'Token not provided'});
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.userId = decoded.id;
        next();

    } catch (error) {
        console.log(error.message);
        res.status(500).send({message: 'Invalid token'});
    }
};