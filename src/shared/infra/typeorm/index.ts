import { join } from 'path';
import { DataSource } from 'typeorm';
import { env } from '../../../config/env';

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
  migrations: [`./src/shared/infra/typeorm/migrations/*.${env.JS_OR_TS}`],
});

async function getConnection() {
  console.log('[BANCO DE DADOS 🎲] Tentando conectar.');
  try {
    await appDataSource.initialize();

    console.log(['[BANCO DE DADOS 🎲]: Rodando migrations...']);
    appDataSource.runMigrations();
    console.log(['[BANCO DE DADOS 🎲]: Migrations executadas!']);
    console.log('[BANCO DE DADOS 🎲]: Conectado com sucesso.');
  } catch (err) {
    console.error(err);
  }
}

getConnection();

export default appDataSource;
