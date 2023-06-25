/* eslint-disable import/prefer-default-export */
import 'reflect-metadata';
import 'dotenv/config';
// import express from 'express';
import Fastify from 'fastify';

import '@shared/infra/typeorm';
import '@shared/container';
import userRoutes from '@modules/users/infra/http/routes/users.routes';
import process from 'process';
import AppError from '@shared/errors/AppError';
import authPlugin from './auth';

const server = Fastify({});

server.register(authPlugin); // Registrar o plugin de autenticação

server.register(userRoutes, {
  prefix: 'users',
});

server.setErrorHandler((error, req, reply) => {
  if (error instanceof AppError) {
    return reply.status(error.statusCode).send({
      status: 'error',
      message: error.message,
      errorName: error.errorName,
    });
  }

  return reply.status(500).send({
    status: 'error',
    error,
  });
});

server.listen({
  port: Number(process.env.PORT) || 3337,
});
console.log(
  `[SERVIDOR] Servidor iniciado em .${Number(process.env.PORT) || 3337}`,
);

export { server };
