import express from 'express';
import {
    createProfissional,
    getAllProfissionais,
    getProfissionalById,
    updateProfissional,
    deleteProfissional,
} from '../controllers/profissionalController.js';

const router = express.Router();

// Criar um novo profissional de saúde
router.post('/', createProfissional);
// Obter todos os profissionais de saúde
router.get('/', getAllProfissionais);
// Obter profissional de saúde por ID
router.get('/:id', getProfissionalById);
// Atualizar um profissional de saúde
router.put('/:id', updateProfissional);
// Deletar um profissional de saúde
router.delete('/:id', deleteProfissional);

export default router;
