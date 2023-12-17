const express = require('express');
const router = express.Router();
const schedule = require('../controllers/scheduleController')

// Rota para obter os horários disponíveis em uma data específica
router.get('/available-time/:data', schedule.availableTime);

// Rota para realizar um novo agendamento
router.post('/make-schedule', schedule.makeSchedule);

// Rota para obter os horários disponíveis da semana
router.get('/available-time/week', schedule.availableTimeForWeek);

// Outras rotas relacionadas a agendamentos podem ser adicionadas conforme necessário

module.exports = router;
