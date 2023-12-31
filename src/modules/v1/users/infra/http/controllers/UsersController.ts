/* eslint-disable import/no-extraneous-dependencies */
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import AuthenticateUserService, {
  AuthenticateUserReq,
} from '@modules/v1/users/services/AuthenticateUserService';
import { FastifyRequest, FastifyReply } from 'fastify';
import { z, number } from 'zod';
import GoogleAuthenticateUserService, {
  GoogleAuthenticateUserReq,
} from '@modules/v1/users/services/GoogleAuthenticateUserService';
import ShowUserService, {
  ShowUserServiceReq,
} from '../../../services/ShowUserService';
import FindUserService, {
  FindUserServiceReq,
} from '../../../services/FindUserService';
import CreateUserService, {
  CreateUserServiceReq,
} from '../../../services/CreateUserService';

export default class UsersController {
  public async create(
    req: FastifyRequest<{ Body: CreateUserServiceReq }>,
    res: FastifyReply,
  ): Promise<FastifyReply> {
    const schema = z.object({
      personData: z.object({
        firstName: z.string(),
        lastName: z.string(),
        phoneNumber: z.string(),
      }),
      email: z.string().email(),
      password: z.string().min(8).max(20),
    });
    const body = schema.parse(req.body);

    const createUserService = container.resolve(CreateUserService);

    const user = await createUserService.execute(body);

    return res.send(classToClass(user));
  }

  public async auth(
    req: FastifyRequest<{ Body: AuthenticateUserReq }>,
    res: FastifyReply,
  ): Promise<FastifyReply> {
    const authenticateUserService = container.resolve(AuthenticateUserService);
    const data = await authenticateUserService.execute(req.body);

    return res.send(classToClass(data));
  }

  // TODO: Separar isso
  public async googleAuth(
    req: FastifyRequest<{ Body: GoogleAuthenticateUserReq }>,
    res: FastifyReply,
  ): Promise<FastifyReply> {
    const authenticateUserService = container.resolve(
      GoogleAuthenticateUserService,
    );
    const data = await authenticateUserService.execute({
      accessToken: req.body.accessToken,
      redirectUri: req.body.redirectUri,
    });

    return res.send(classToClass(data));
  }

  public async show(
    req: FastifyRequest<{ Params: ShowUserServiceReq }>,
    res: FastifyReply,
  ): Promise<void> {
    const showUserService = container.resolve(ShowUserService);
    const user = await showUserService.execute({
      userId: req.params.userId,
    });

    return res.send(classToClass(user));
  }

  public async find(
    req: FastifyRequest<{ Querystring: FindUserServiceReq }>,
    res: FastifyReply,
  ): Promise<void> {
    const findUserService = container.resolve(FindUserService);

    const { email, phone } = req.query;
    const user = await findUserService.execute({
      email: email as string,
      phone: phone as string,
    });

    res.send(classToClass(user));
  }

  // public async update(
  //   req: FastifyRequest<{ Body: UpdateUserServiceReq }>,
  //   res: FastifyReply,
  // ): Promise<void> {
  //   const updateUserService = container.resolve(UpdateUserService);

  //   let filename: string | undefined;
  //   if (req.file) {
  //     filename = req.file.filename;
  //   }

  //   const user = await updateUserService.execute({
  //     user_id: req.user.id,
  //     profile_photo: filename,
  //     deleted: req.body.deleted,
  //     email: req.body.email,
  //     name: req.body.name,
  //     password: req.body.password,
  //     phone: req.body.phone,
  //   });

  //   res.json(classToClass(user));
  // }
}
