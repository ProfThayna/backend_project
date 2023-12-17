const connection = require('../config/database')

const schedule = {
  // Método para obter os horários disponíveis em uma data específica
  availableTime: async function(data) {
    return new Promise((resolve, reject) => {
      const query = 'SELECT time FROM calendar WHERE data = ? AND available = true';
      connection.query(query, [data], (err, results) => {
        if (err) {
          reject(err);
        } else {
          const availableTime = results.map((result) => result.time);
          resolve(availableTime);
        }
      });
    });
  },

  availableTimeForWeek: async function(startDate, endDate) {
    return new Promise((resolve, reject) => {
      const query = `
        SELECT week_day, GROUP_CONCAT(time SEPARATOR ',') AS availableTime
        FROM calendar
        WHERE date BETWEEN ? AND ?
        GROUP BY week_day;
      `;
      
      connection.query(query, [startDate, endDate], (err, results) => {
        if (err) {
          reject(err);
        } else {
          const weekAvailability = {};
          results.forEach(row => {
            weekAvailability[row.week_day] = row.availableTime.split(',');
          });
          resolve(weekAvailability);
        }
      });
    });
  },

  // Método para criar um novo agendamento
  makeSchedule: async function(data, time) {
    return new Promise((resolve, reject) => {
      const query = 'INSERT INTO calendar (data, time) VALUES (?, ?, ?)';
      connection.query(query, [data, time], (err, results) => {
        if (err) {
          reject(err);
        } else {
          resolve(results);
        }
      });
    });
  },

  // Outros métodos do model podem ser adicionados conforme necessário
};

module.exports = {
    schedule,
}
