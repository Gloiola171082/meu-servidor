import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const empresas = []; // Banco de dados em memória

// Rota para testar se o servidor está online
app.get('/', (req, res) => {
  res.send('Servidor funcionando! 🚀');
});

// Rota para cadastrar uma nova empresa
app.post('/empresa', (req, res) => {
  const { nome, cnpj } = req.body;

  if (!nome || !cnpj) {
    return res.status(400).json({ message: 'Nome e CNPJ são obrigatórios.' });
  }

  empresas.push({ nome, cnpj });

  console.log('Empresas cadastradas:', empresas);

  return res.status(201).json({ message: 'Empresa cadastrada com sucesso!' });
});

// Rota para listar todas as empresas
app.get('/empresas', (req, res) => {
  return res.json(empresas);
});

// Porta para funcionar tanto local quanto no Render
const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
