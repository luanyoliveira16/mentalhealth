import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";
import Usuario from "./userModel.js";
import ProfissionalSaude from "./profissionalModel.js";

const Agendamento = sequelize.define('Agendamento', {
    paciente_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    profissional_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    data_agendamento: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    horario: {
        type: DataTypes.TIME,
        allowNull: false,
    },
    status: {
        type: DataTypes.ENUM('compareceu', 'faltou'),
        allowNull: false,
    },
}, {
    timestamps: false,
});

Agendamento.belongsTo(Usuario, { foreignKey: 'paciente_id', as: 'paciente' });
Agendamento.belongsTo(ProfissionalSaude, { foreignKey: 'profissional_id', as: 'profissional' });

export default Agendamento;