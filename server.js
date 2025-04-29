import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Banco de dados em memória
const empresas = [];

// Rota para testar se o servidor está online
app.get('/', (req, res) => {
  res.send('Servidor funcionando! 🚀');
});

// Rota para cadastrar uma nova empresa
app.post('/empresa', (req, res, next) => {
  try {
    const { nome, cnpj } = req.body;

    if (!nome || !cnpj) {
      return res.status(400).json({ success: false, message: 'Nome e CNPJ são obrigatórios.' });
    }

    // Verifica se o CNPJ já está cadastrado
    const empresaExistente = empresas.find(empresa => empresa.cnpj === cnpj);
    if (empresaExistente) {
      return res.status(409).json({ success: false, message: 'CNPJ já cadastrado.' });
    }

    empresas.push({ nome, cnpj });

    console.log(`[NOVO CADASTRO] Empresa: ${nome}, CNPJ: ${cnpj}`);
    console.log(`[BASE ATUALIZADA] Total de empresas: ${empresas.length}`);

    return res.status(201).json({ success: true, message: 'Empresa cadastrada com sucesso!' });
  } catch (error) {
    next(error);
  }
});

// Rota para listar todas as empresas
app.get('/empresas', (req, res, next) => {
  try {
    return res.json({ success: true, data: empresas });
  } catch (error) {
    next(error);
  }
});

// Middleware global para tratamento de erros
app.use((err, req, res, next) => {
  console.error('[ERRO NO SERVIDOR]', err.stack);
  res.status(500).json({ success: false, message: 'Erro interno do servidor.' });
});

// Porta para funcionar tanto local quanto no Render
const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando na porta ${PORT}`);
});
