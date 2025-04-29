import { Router } from 'express';
import { cadastrarEmpresa, listarEmpresas, testarServidor } from '../controllers/empresaController.js';

const router = Router();

// Rota para testar o servidor
router.get('/', testarServidor);

// Rota para cadastrar uma nova empresa
router.post('/empresa', cadastrarEmpresa);

// Rota para listar todas as empresas
router.get('/empresas', listarEmpresas);

export default router;
