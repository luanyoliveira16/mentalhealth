import Usuario from '../models/userModel.js';
import jwt from 'jsonwebtoken';
import nodemailer from 'nodemailer';
import dotenv from "dotenv";

dotenv.config()

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

const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.SENHA_APP,
    },
});

const sendEmail = async (email, token) => {
    const mailOptions = {
        from: 'mentalhealthcontato@gmail.com',
        to: email,
        subject: 'Alteração de Senha',
        text: `Sua senha foi alterada. Aqui está o token para autenticação: ${token}`,
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log('E-mail enviado com sucesso!');
    } catch (error) {
        console.error('Erro ao enviar o e-mail:', error);
    }
};
export const requestPasswordChange = async (req, res) => {
    const { email } = req.body;

    try {
        const usuario = await Usuario.findOne({ where: { email } });
        if (!usuario) {
            return res.status(404).json({ message: 'Usuário não encontrado com esse e-mail' });
        }

        const token = jwt.sign({ id: usuario.id }, 'seu_segredo', { expiresIn: '1h' });

        await sendEmail(usuario.email, token);

        return res.status(200).json({ message: 'Token enviado para o e-mail' });
    } catch (error) {
        return res.status(500).json({ message: 'Erro ao enviar o token', error });
    }
};

export const verifyTokenAndUpdatePassword = async (req, res) => {
    const { token, novaSenha } = req.body;

    try {
        if (!token) {
            return res.status(400).json({ message: 'Token é obrigatório' });
        }

        if (!novaSenha) {
            return res.status(400).json({ message: 'Nova senha é obrigatória' });
        }

        const decoded = jwt.verify(token, 'seu_segredo');
        const usuarioId = decoded.id;

        const usuario = await Usuario.findByPk(usuarioId);
        if (!usuario) {
            return res.status(404).json({ message: 'Usuário não encontrado' });
        }

        usuario.senha = novaSenha;

        await usuario.save();

        return res.status(200).json({ message: 'Senha alterada com sucesso' });
    } catch (error) {
        if (error instanceof jwt.JsonWebTokenError) {
            return res.status(400).json({ message: 'Token inválido' });
        }
        return res.status(500).json({ message: 'Erro ao alterar a senha', error });
    }
};
