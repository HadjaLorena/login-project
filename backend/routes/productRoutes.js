import express from 'express';
import{
    getAllProducts,
    createProduct,
    updateProduct,
    deleteProduct
} from '../controllers/productController.js';
import { verifyToken } from '../middlewares/authMiddleware.js';

const router = express.Router();

// Public route
router.get('/', getAllProducts);

// Protected routes
router.post('/', verifyToken, createProduct); // Route for create product
router.put('/:id', verifyToken, updateProduct); // Route for update product
router.delete('/:id', verifyToken, deleteProduct); // Route for delete product

export default router;