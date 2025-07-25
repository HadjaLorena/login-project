import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

// Ensures that dotenv gets the .env from the project root, even if it is inside /backend
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
dotenv.config({ path: join(__dirname, '..', '.env') });

// Exports variables from .env
export const DB_USER = process.env.DB_USER;
export const DB_PASS = process.env.DB_PASS;
export const PORT = process.env.PORT_BACKEND;
export const JWT_SECRET = process.env.JWT_SECRET;