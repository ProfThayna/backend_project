const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const connection = require('./src/config/database')

// Middleware para processar corpos das requisições JSON
app.use(bodyParser.json());

const calendarRoutes = require('./src/routes/calendarRoutes'); 
app.use('/api/agendamento', calendarRoutes);

// Rota de exemplo para testar o servidor
app.get('/', (req, res) => {
  res.send('Servidor Node.js funcionando!');
});

// Iniciar o servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
