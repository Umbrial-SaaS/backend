import "reflect-metadata"

import ListCorporationsService from './ListCorporationsService';
import FakeCorporationsRepository from '../repositories/fakes/FakeCorporationsRepository';
import ICorporationsRepository from '../repositories/ICorporationsRepository';

let listCorporationService: ListCorporationsService;
let fakeCorporationsRepository: ICorporationsRepository;
describe('ListCorporationsService', () => {
  beforeEach(() => {
    fakeCorporationsRepository = new FakeCorporationsRepository();

    listCorporationService = new ListCorporationsService(fakeCorporationsRepository);
  });

  it('1. Should list the corporations.', async () => {
    // ? Arrange   
    const spyIndex = jest.spyOn(fakeCorporationsRepository, 'index')

    // ? Act
    const corporations = await listCorporationService.execute();

    // ? Assert
    expect(corporations).toBeInstanceOf(Array);
    expect(spyIndex).toHaveBeenCalled();
  });

});
