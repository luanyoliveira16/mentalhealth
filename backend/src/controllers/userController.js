import Usuario from '../models/userModel.js';

export const createUsuario = async (req, res) => {
    try {
        let usuarios = req.body;

        if (!Array.isArray(usuarios)) {
            usuarios = [usuarios];
        }

        usuarios.forEach(usuario => {
            if (!usuario.nome || usuario.nome.trim() === '') {
                return res.status(400).json({ message: "O campo 'nome' é obrigatório" });
            }
        });

        const resultado = await Usuario.bulkCreate(usuarios);

        return res.status(201).json({ message: 'Usuários criados com sucesso!', usuarios: resultado });
    } catch (error) {
        console.error('Erro ao criar usuários:', error);
        return res.status(500).json({ message: "Erro ao criar usuários", error });
    }
};


export const getAllUsuarios = async (req, res) => {
    try {
        const usuarios = await Usuario.findAll();

        return res.status(200).json(usuarios);
    } catch (error) {
        return res.status(500).json({ message: 'Erro ao obter usuários', error });
    }
};

export const getUsuarioById = async (req, res) => {
    try {
        const { id } = req.params;
        const usuario = await Usuario.findByPk(id);

        if (!usuario) {
            return res.status(404).json({ message: 'Usuário não encontrado' });
        }

        return res.status(200).json(usuario);
    } catch (error) {
        return res.status(500).json({ message: 'Erro ao obter usuário', error });
    }
};

export const updateUsuario = async (req, res) => {
    try {
        const { id } = req.params;
        const { nome, email, senha, data_nascimento, genero, foto } = req.body;

        const usuario = await Usuario.findByPk(id);
        if (!usuario) {
            return res.status(404).json({ message: 'Usuário não encontrado' });
        }

        usuario.nome = nome || usuario.nome;
        usuario.email = email || usuario.email;
        usuario.data_nascimento = data_nascimento || usuario.data_nascimento;
        usuario.genero = genero || usuario.genero;
        usuario.foto = foto || usuario.foto;

        if (senha) {
            usuario.senha = senha;
        }

        await usuario.save();

        return res.status(200).json(usuario);
    } catch (error) {
        return res.status(500).json({ message: 'Erro ao atualizar usuário', error });
    }
};

export const deleteUsuario = async (req, res) => {
    try {
        const { id } = req.params;

        const usuario = await Usuario.findByPk(id);
        if (!usuario) {
            return res.status(404).json({ message: 'Usuário não encontrado' });
        }

        await usuario.destroy();

        return res.status(200).json({ message: 'Usuário deletado com sucesso' });
    } catch (error) {
        return res.status(500).json({ message: 'Erro ao deletar usuário', error });
    }
};

export const loginUsuario = async (req, res) => {
    try {
        const { email, senha } = req.body;

        const usuario = await Usuario.findOne({ where: { email } });

        if (!usuario) {
            return res.status(404).json({ message: 'Usuário não encontrado' });
        }

        if (senha !== usuario.senha) {
            return res.status(400).json({ message: 'Senha inválida' });
        }

        return res.status(200).json({
            message: 'Login realizado com sucesso',
            userId: usuario.id,
            name: usuario.name,
            image: usuario.image
        });
    } catch (error) {
        return res.status(500).json({ message: 'Erro ao realizar login', error });
    }
};
