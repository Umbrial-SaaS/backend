import { Connection } from 'typeorm';
import { Seeder, Factory } from 'typeorm-seeding';

import Environment from '@modules/v1products/infra/typeorm/entities/Environment';

import environmentsList from '../helpers/environmentsList';

export default class CreateEnvironment implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<void> {
    await connection
      .createQueryBuilder()
      .insert()
      .into(Environment)
      .values(environmentsList)
      .execute();
  }
}
