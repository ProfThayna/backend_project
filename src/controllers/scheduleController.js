const schedule = require('../model/calendarModel');
const pool = require('../config/db')

// Função para obter os horários disponíveis em uma data específica
async function availableTime(req, res) {
  try {
    const { data } = req.params;
    const time = await schedule.availableTime(data); 
    res.json({ availableTime: time });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao obter horários disponíveis.' });
  }
}

// Função para realizar o agendamento
async function makeSchedule(req, res) {
  try {
    const { data, time} = req.body;
    await schedule.makeSchedule(data, time);
    res.json({ message: 'Agendamento realizado com sucesso.' });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao realizar o agendamento.' });
  }
}


async function availableTimeForWeek() {
  try {
    // Consulta ao banco de dados para obter os horários disponíveis para a semana
    // Aqui você deve executar a consulta SQL apropriada para buscar os horários desejados
    const query = `
      SELECT week_day, GROUP_CONCAT(time SEPARATOR ',') AS available
      FROM calendar
      WHERE date BETWEEN '2023-12-17' AND '2023-12-24'
      GROUP BY week_day;
    `;

    const result = await pool.query(query);
    
    // Formatando os resultados da consulta para retornar um objeto com os horários disponíveis por dia
    const weekAvailability = {};
    result.forEach(row => {
      weekAvailability[row.week_day] = row.available.split(',');
    });

    return weekAvailability;
  } catch (error) {
    throw new Error('Erro ao obter horários disponíveis da semana.');
  }
}

// Outras funções do controller podem ser adicionadas conforme necessário

module.exports = {
  availableTime,
  makeSchedule,
  availableTimeForWeek
};
