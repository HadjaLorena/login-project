import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

// Garante que o dotenv pegue o .env da raiz do projeto, mesmo estando dentro de /backend
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
dotenv.config({ path: join(__dirname, '..', '.env') });

// Exporta as variáveis do .env
export const DB_USER = process.env.DB_USER;
export const DB_PASS = process.env.DB_PASS;
export const PORT = process.env.PORT;