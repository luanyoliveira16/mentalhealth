import express from 'express';
const router = express.Router();
import AgendamentoController from '../controllers/agendamentoController.js';

// Criar agendamento
router.post('/', AgendamentoController.createAgendamento);
// Obter agendamentos de um paciente específico
router.get('/paciente/:paciente_id', AgendamentoController.getAllAgendamentosPaciente);
// Obter agendamentos de um profissional específico
router.get('/profissional/:profissional_id', AgendamentoController.getAllAgendamentosProfissional);
// Atualizar status de um agendamento
router.put('/:id', AgendamentoController.updateStatus);
// Deletar agendamento
router.delete('/:id', AgendamentoController.deleteAgendamento);

export default router;
