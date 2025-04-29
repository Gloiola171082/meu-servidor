import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import empresaRoutes from './routes/empresaRoutes.js';
import { errorMiddleware } from './middleware/errorMiddleware.js';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Usar as rotas de empresas
app.use('/', empresaRoutes);

// Middleware global de erro
app.use(errorMiddleware);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando na porta ${PORT}`);
});
