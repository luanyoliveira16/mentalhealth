import express from "express";
import agendamentoRoutes from "./routes/agendamentoRoutes.js";
import profissionalRoutes from "./routes/profissionalRoutes.js";
import usuarioRoutes from "./routes/userRoutes.js";


const app = express();

app.use(express.json());
app.use('/api/agendamentos', agendamentoRoutes);
app.use('/api/profissionais', profissionalRoutes);
app.use('/api/usuarios', usuarioRoutes);

const port = 4000 || 4001

app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});

export default app;
