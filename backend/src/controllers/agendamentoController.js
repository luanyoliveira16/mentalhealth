import Agendamento from '../models/agendamentos.js';
import Usuario from '../models/userModel.js';
import ProfissionalSaude from '../models/profissionalModel.js';

const createAgendamento = async (req, res) => {
    try {
        const { paciente_id, profissional_id, data_agendamento, horario, status } = req.body;

        const agendamento = await Agendamento.create({
            paciente_id,
            profissional_id,
            data_agendamento,
            horario,
            status,
        });

        return res.status(201).json(agendamento);
    } catch (error) {
        return res.status(500).json({ message: 'Erro ao criar o agendamento', error });
    }
};

const getAllAgendamentosPaciente = async (req, res) => {
    try {
        const { paciente_id } = req.params;

        const agendamentos = await Agendamento.findAll({
            where: { paciente_id },
            include: [
                {
                    model: ProfissionalSaude,
                    as: 'profissional',  // Alias ajustado
                    attributes: ['id', 'nome', 'especialidade'],
                },
            ],
        });

        return res.status(200).json(agendamentos);
    } catch (error) {
        console.log('error: ', error);
        return res.status(500).json({ message: 'Erro ao obter agendamentos do paciente', error });
    }
};

const getAllAgendamentosProfissional = async (req, res) => {
    try {
        const { profissional_id } = req.params;

        const agendamentos = await Agendamento.findAll({
            where: { profissional_id },
            include: [
                {
                    model: Usuario,
                    as: 'paciente',
                    attributes: ['id', 'nome', 'email'],
                },
            ],
        });

        return res.status(200).json(agendamentos);
    } catch (error) {
        return res.status(500).json({ message: 'Erro ao obter agendamentos do profissional', error });
    }
};

const updateStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;

        console.log(`ID recebido: ${id}`);
        console.log(`Status recebido: ${status}`);

        const agendamento = await Agendamento.findByPk(id);
        if (!agendamento) {
            console.log(`Agendamento não encontrado com o ID: ${id}`);
            return res.status(404).json({ message: 'Agendamento não encontrado' });
        }

        if (agendamento.status !== status) {
            agendamento.status = status;
            await agendamento.save();

            console.log('Agendamento atualizado:', agendamento);
        } else {
            console.log("O status já está com o valor solicitado.");
        }

        return res.status(200).json(agendamento);
    } catch (error) {
        console.error('Erro ao atualizar o agendamento:', error);
        return res.status(500).json({
            message: 'Erro ao atualizar o agendamento',
            error: error.message,
        });
    }
};

const deleteAgendamento = async (req, res) => {
    try {
        const { id } = req.params;

        const agendamento = await Agendamento.findByPk(id);
        if (!agendamento) {
            return res.status(404).json({ message: 'Agendamento não encontrado' });
        }

        await agendamento.destroy();

        return res.status(200).json({ message: 'Agendamento deletado com sucesso' });
    } catch (error) {
        return res.status(500).json({ message: 'Erro ao deletar o agendamento', error });
    }
};

export default {
    createAgendamento,
    getAllAgendamentosPaciente,
    getAllAgendamentosProfissional,
    updateStatus,
    deleteAgendamento
};