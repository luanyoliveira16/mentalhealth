import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const ProfissionalSaude = sequelize.define('ProfissionalSaude', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    nome: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    especialidade: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    registro_profissional: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    descricao: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    preco: {
        type: DataTypes.FLOAT,
        allowNull: true,
    },
    foto: {
        type: DataTypes.STRING(255),
        allowNull: true,
    },
    email: {
        type: DataTypes.STRING(255),
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true,
        }
    },
    senha: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    telefone: {
        type: DataTypes.STRING(20),
        allowNull: true,
    }
}, {
    tableName: 'profissionais_saude',
    timestamps: true,
});

export default ProfissionalSaude;