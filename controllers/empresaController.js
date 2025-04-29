import { empresas, adicionarEmpresa } from '../models/empresaModel.js';

export const testarServidor = (req, res) => {
  res.send('Servidor funcionando! 🚀');
};

export const cadastrarEmpresa = (req, res, next) => {
  try {
    const { nome, cnpj } = req.body;

    if (!nome || !cnpj) {
      return res.status(400).json({ success: false, message: 'Nome e CNPJ são obrigatórios.' });
    }

    const empresaExistente = empresas.find(empresa => empresa.cnpj === cnpj);
    if (empresaExistente) {
      return res.status(409).json({ success: false, message: 'CNPJ já cadastrado.' });
    }

    adicionarEmpresa({ nome, cnpj });

    console.log(`[NOVO CADASTRO] Empresa: ${nome}, CNPJ: ${cnpj}`);
    console.log(`[BASE ATUALIZADA] Total de empresas: ${empresas.length}`);

    return res.status(201).json({ success: true, message: 'Empresa cadastrada com sucesso!' });
  } catch (error) {
    next(error);
  }
};

export const listarEmpresas = (req, res, next) => {
  try {
    res.json({ success: true, data: empresas });
  } catch (error) {
    next(error);
  }
};
