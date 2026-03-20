import 'dotenv/config'

import express from 'express'

import './config/connection.js'

import bookmarkRoutes from './routes/bookmarkRoutes.js'
import userRoutes from './routes/userRoutes.js'

const app = express();
const PORT = process.env.PORT || 3000;
 
app.use(express.json());
 
app.use('/api/notes', bookmarkRoutes);
app.use('/api/users', userRoutes);
 
app.listen(PORT, () => console.log(`Listening on http://localhost:${PORT}`));