import { join } from 'path';
import { env } from 'process';
import { DataSource } from 'typeorm';

const appDataSource = new DataSource({
  type: 'postgres',
  url: env.DATABASE_URL,
  entities: [
    join(
      __dirname,
      '..',
      '..',
      '..',
      'modules',
      '**',
      'infra',
      'typeorm',
      'entities',
      `*.${env.JS_OR_TS}`,
    ),
  ],
  migrations: ['./src/shared/infra/typeorm/migrations/*.js'],
});

async function getConnection() {
  console.log('[BANCO DE DADOS 🎲] Tentando conectar.');
  try {
    await appDataSource.initialize();

    console.log(['[BANCO DE DADOS 🎲]: Rodando migrations...']);
    appDataSource.runMigrations();
    console.log(['[BANCO DE DADOS 🎲]: Migrations executadas!']);
  } catch (err) {
    console.error(err);
  }
  console.log('[BANCO DE DADOS 🎲]: Conectado com sucesso.');
}

getConnection();

export default appDataSource;
