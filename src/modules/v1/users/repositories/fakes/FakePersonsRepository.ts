
import IPersonsRepository from '../IPersonsRepository';
import ICreatePersonDTO from '../../dtos/ICreatePersonDTO';

import Person from '../../infra/data/entities/Person';

class FakePersonsRepository implements IPersonsRepository {
  private persons: Person[] = [];
  public create(data: ICreatePersonDTO): Person {
    const user = new Person();
    Object.assign(user, data);

    this.persons.push(user);

    return user || null;
  }

  public async save(user: Person): Promise<void> {
    this.persons.push(user);
  }
}

export default FakePersonsRepository;
