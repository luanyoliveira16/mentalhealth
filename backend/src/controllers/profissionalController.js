import ProfissionalSaude from '../models/profissionalModel.js';

// Função 'to' para tratamento de erros
function to(promise) {
    return promise
        .then(data => [null, data])
        .catch(error => [error]);
}

export const createProfissional = async (req, res) => {
    console.log(req.body)
    try {
        const { nome, especialidade, registro_profissional, descricao, preco, foto, email, senha, telefone } = req.body;

        if (!nome || !especialidade || !registro_profissional || !email || !senha) {
            return res.status(400).json({ message: 'Campos obrigatórios estão faltando.' });
        }

        const [err, profissional] = await to(ProfissionalSaude.create({
            nome,
            especialidade,
            registro_profissional,
            descricao,
            preco,
            foto,
            email,
            senha,
            telefone
        }));

        if (err) {
            console.error('Erro ao salvar profissional de saúde:', err);
            return res.status(500).json({ message: 'Erro ao salvar profissional de saúde' });
        }

        res.status(201).json(profissional);
    } catch (error) {
        console.error('Erro inesperado:', error);
        res.status(500).json({ message: 'Erro ao salvar profissional de saúde' });
    }
};


export const getAllProfissionais = async (req, res) => {
    try {
        const profissionais = await ProfissionalSaude.findAll();
        return res.status(200).json(profissionais);
    } catch (error) {
        return res.status(500).json({ message: 'Erro ao obter profissionais', error });
    }
};

export const getProfissionalById = async (req, res) => {
    try {
        const { id } = req.params;
        const profissional = await ProfissionalSaude.findByPk(id);

        if (!profissional) {
            return res.status(404).json({ message: 'Profissional não encontrado' });
        }

        return res.status(200).json(profissional);
    } catch (error) {
        return res.status(500).json({ message: 'Erro ao obter profissional', error });
    }
};

export const updateProfissional = async (req, res) => {
    try {
        const { id } = req.params;
        const { nome, especialidade, registro_profissional, descricao, preco, foto, email, senha, telefone } = req.body;

        const profissional = await ProfissionalSaude.findByPk(id);
        if (!profissional) {
            return res.status(404).json({ message: 'Profissional não encontrado' });
        }

        profissional.nome = nome || profissional.nome;
        profissional.especialidade = especialidade || profissional.especialidade;
        profissional.registro_profissional = registro_profissional || profissional.registro_profissional;
        profissional.descricao = descricao || profissional.descricao;
        profissional.preco = preco || profissional.preco;
        profissional.foto = foto || profissional.foto;
        profissional.email = email || profissional.email;
        profissional.telefone = telefone || profissional.telefone;

        if (senha) {
            profissional.senha = senha;  // Senha sem criptografia
        }

        await profissional.save();

        return res.status(200).json(profissional);
    } catch (error) {
        return res.status(500).json({ message: 'Erro ao atualizar profissional', error });
    }
};

export const deleteProfissional = async (req, res) => {
    try {
        const { id } = req.params;

        const profissional = await ProfissionalSaude.findByPk(id);
        if (!profissional) {
            return res.status(404).json({ message: 'Profissional não encontrado' });
        }

        await profissional.destroy();

        return res.status(200).json({ message: 'Profissional deletado com sucesso' });
    } catch (error) {
        return res.status(500).json({ message: 'Erro ao deletar profissional', error });
    }
};