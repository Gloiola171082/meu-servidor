const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

const JWT_SECRET = process.env.JWT_SECRET || 'minhasecretkeyultrasegura';

// Usuário de exemplo
const users = [
  {
    cpf: '945.443.873-53',
    password: '1q2w3e4r5t',
  },
];

// Empresas em memória
const empresas = [];

// Login
app.post('/login', (req, res) => {
  const { cpf, password } = req.body;
  const user = users.find((u) => u.cpf === cpf && u.password === password);

  if (!user) {
    return res.status(401).json({ message: 'CPF ou senha inválidos.' });
  }

  const token = jwt.sign({ cpf: user.cpf }, JWT_SECRET, { expiresIn: '1h' });

  return res.json({ token });
});

// Cadastro de Empresa
app.post('/empresa', (req, res) => {
  const { nome, cnpj } = req.body;

  if (!nome || !cnpj) {
    return res.status(400).json({ message: 'Nome e CNPJ são obrigatórios.' });
  }

  empresas.push({ nome, cnpj });

  console.log('Empresas cadastradas:', empresas); // Para monitorar no console
  return res.status(201).json({ message: 'Empresa cadastrada com sucesso!' });
});

// Para testar se está online
app.get('/', (req, res) => {
  res.send('API Funcionando!');
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
