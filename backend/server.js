import app from './src/app.js';
import sequelize from './src/config/database.js';

const PORT = process.env.PORT || 3000;
sequelize.sync()
    .then(() => {
        console.log('Banco de dados conectado.');
        app.listen(PORT, () => {
            console.log(`Servidor rodando na porta ${PORT}`);
        });
    })
    .catch((error) => {
        console.error('Erro ao conectar ao banco de dados:', error);
    });
