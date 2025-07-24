import {DB_USER, DB_PASS} from '../settings.js'

export const uri = `mongodb+srv://${DB_USER}:${DB_PASS}@loginwithjwt.ao4o0nk.mongodb.net/jwt-collection?retryWrites=true&w=majority&appName=LoginWithJWT`;