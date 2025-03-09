import express from "express";
import agendamentoRoutes from "./routes/agendamentoRoutes.js";
import profissionalRoutes from "./routes/profissionalRoutes.js";
import usuarioRoutes from "./routes/userRoutes.js";
import dotenv from 'dotenv';
import cors from 'cors';


const app = express();

dotenv.config();

app.use(cors());
app.use(express.json());
app.use('/api/agendamentos', agendamentoRoutes);
app.use('/api/profissionais', profissionalRoutes);
app.use('/api/usuarios', usuarioRoutes);

const port = 4000 || 4001

app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});

export default app;
