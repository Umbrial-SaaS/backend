import { PrismaClient } from '@prisma/client';
import { promisify } from 'node:util';
import { exec } from 'node:child_process';

const execAsync = promisify(exec);

const prisma = new PrismaClient();
console.log('Migrations');
execAsync('npx prisma db push', {
  env: process.env,
});
export default prisma;
