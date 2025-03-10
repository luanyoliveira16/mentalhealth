import express from 'express';
import {
    createUsuario,
    getAllUsuarios,
    getUsuarioById,
    updateUsuario,
    deleteUsuario,
    loginUsuario,
    requestPasswordChange,
    verifyTokenAndUpdatePassword
} from '../controllers/userController.js';

const router = express.Router();

// Criar um novo usuário
router.post('/', createUsuario);
// Obter todos os usuários
router.get('/', getAllUsuarios);
// Obter um usuário por ID
router.get('/:id', getUsuarioById);
// Atualizar um usuário
router.put('/:id', updateUsuario);
// Deletar um usuário
router.delete('/:id', deleteUsuario);
// Realizar login
router.post('/login', loginUsuario);
// Recuperar senha por email
router.post('/request-password-change', requestPasswordChange);
// Confirmar token e alterar senha
router.post('/verify-token', verifyTokenAndUpdatePassword);

export default router;
