import "reflect-metadata"

import ShowCorporationService from './ShowCorporationService';
import FakeCorporationsRepository from '../repositories/fakes/FakeCorporationsRepository';
import ICorporationsRepository from '../repositories/ICorporationsRepository';
import { fakeCorporationId } from "../repositories/fakes/seeds";

let listCorporationService: ShowCorporationService;
let fakeCorporationsRepository: ICorporationsRepository;
describe('ShowCorporationService', () => {
  beforeEach(() => {
    fakeCorporationsRepository = new FakeCorporationsRepository();

    listCorporationService = new ShowCorporationService(fakeCorporationsRepository);
  });

  it('1. Should list the corporations.', async () => {
    // ? Arrange    
    const spyIndex = jest.spyOn(fakeCorporationsRepository, 'findById')

    // ? Act
    await listCorporationService.execute({
      corporationId: fakeCorporationId
    });

    // ? Assert 
    expect(spyIndex).toHaveBeenCalled();
  });

});
