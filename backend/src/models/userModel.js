import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const Usuario = sequelize.define('Usuario', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    nome: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING(255),
        unique: true,
        allowNull: false,
    },
    senha: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    data_nascimento: {
        type: DataTypes.DATE,
        allowNull: true,
    },
    genero: {
        type: DataTypes.STRING(20),
        allowNull: true,
    },
    foto: {
        type: DataTypes.STRING(255),
        allowNull: true,
    }
}, {
    tableName: 'usuarios',
    timestamps: true,
});

export default Usuario;