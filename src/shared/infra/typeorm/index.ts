import { createConnection } from 'typeorm';

console.log('[BANCO DE DADOS 🎲] Tentando conectar.');

async function getConnection() {
  createConnection()
    .then(() => {
      console.log('[BANCO DE DADOS 🎲] Conectado com sucesso!');
    })
    .catch(err => console.error(err));
}

getConnection();
