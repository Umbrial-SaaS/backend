/* eslint-disable global-require */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable import/prefer-default-export */
import 'reflect-metadata';
import Fastify from 'fastify';
import '@shared/infra/prisma';
import '@shared/container';
import userRoutes from '@modules/v1/users/infra/http/routes/users.routes';
import process from 'process';
import AppError from '@shared/errors/AppError';
import os from 'os';
import fastifyCors from 'fastify-cors'; // Importe o pacote fastify-cors
import { env } from '@config/env';
import sellerRoutes from '@modules/v1/sellers/infra/http/routes/sellers.routes';
import fastifyJwt from '@fastify/jwt';
import authPlugin from './auth';

const server = Fastify({});

server.register(fastifyCors, {
  origin: '*',
});

server.register(fastifyJwt, {
  secret: env.JWT_SECRET,
});
server.register(userRoutes, {
  prefix: 'v1/users',
});
server.register(sellerRoutes, {
  prefix: 'v1/sellers',
});

server.get('/health', (req, reply) => {
  const instanceName = os.hostname();
  const platform = os.platform();
  const totalMemory = os.totalmem();
  const freeMemory = os.freemem();

  const cpus = os.cpus();
  const cpuData = cpus.map((cpu, index) => {
    return {
      id: index,
      model: cpu.model,
      speed: cpu.speed,
    };
  });

  const healthcheckData = {
    status: 'OK',
    instance: instanceName,
    platform,
    memory: {
      total: Math.round(totalMemory / 1024 / 1024),
      free: Math.round(freeMemory / 1024 / 1024),
    },
  };

  reply.code(200).send({
    status: 'OK',
    instance: instanceName,
    platform,
    memory: {
      total: totalMemory,
      free: freeMemory,
    },
    cpu: cpuData,
  });
});

server.setErrorHandler((error, _, reply) => {
  if (error instanceof AppError) {
    return reply.status(error.statusCode).send({
      status: 'error',
      message: error.message,
      errorName: error.errorName,
    });
  }

  console.error(error);

  return reply.status(500).send(error);
});

server.listen({
  port: Number(process.env.PORT) || 3337,
});
console.log(
  `[SERVIDOR] Servidor iniciado em .${Number(process.env.PORT) || 3337}`,
);

export { server };
