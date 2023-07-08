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
import fontsRoutes from '@modules/v1/fonts/infra/http/routes/fonts.routes';
import multipart from '@fastify/multipart';
import productsRoutes from '@modules/v1/products/infra/http/routes/products.routes';
import multer from 'fastify-multer';

const { pipeline } = require('stream');
const util = require('util');
const fs = require('fs');

const pump = util.promisify(pipeline);
const server = Fastify({
  logger: true,
});
server.register(fastifyCors, {
  origin: '*',
});
server.register(require('@fastify/multipart'));

server.register(fastifyJwt, {
  secret: env.JWT_SECRET,
});
server.register(userRoutes, {
  prefix: 'v1/users',
});
server.register(sellerRoutes, {
  prefix: 'v1/sellers',
});

server.post('/upload', async function (req, reply) {
  // process a single file
  // also, consider that if you allow to upload multiple files
  // you must consume all files otherwise the promise will never fulfill
  const data = await req.file();

  console.log({ data });
  console.log({ body: req.body });

  // to accumulate the file in memory! Be careful!
  //
  // await data.toBuffer() // Buffer
  //
  // or

  await pump(data.file, fs.createWriteStream(`uploads/${data.filename}`));

  // be careful of permission issues on disk and not overwrite
  // sensitive files that could cause security risks

  // also, consider that if the file stream is not consumed, the promise will never fulfill

  reply.send();
});

server.register(fontsRoutes, {
  prefix: 'v1/fonts',
});
server.register(productsRoutes, {
  prefix: 'v1/products',
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
