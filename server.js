// server.js
const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

const users = [
  {
    id: 1,
    email: 'gustavo@example.com',
    password: bcrypt.hashSync('123456', 8), // senha já criptografada
    name: 'Gustavo Loiola'
  }
];

// Rota de login
app.post('/login', (req, res) => {
  const { email, senha } = req.body;

  const user = users.find(u => u.email === email);
  if (!user) {
    return res.status(400).json({ message: 'Usuário não encontrado' });
  }

  const passwordIsValid = bcrypt.compareSync(senha, user.password);
  if (!passwordIsValid) {
    return res.status(401).json({ message: 'Senha inválida' });
  }

  const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
    expiresIn: 86400 // 24 horas
  });

  res.json({
    user: {
      name: user.name,
      email: user.email
    },
    token
  });
});

// Porta do servidor
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
