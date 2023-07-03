import FakeFontsRepository from '../repositories/fakes/FakeFontsRepository';

import ListFontsService from './ListFontsService';

let fakeFontsRepository: FakeFontsRepository;

let listFontsService: ListFontsService;

describe('ListFontsService', () => {
  beforeEach(() => {
    fakeFontsRepository = new FakeFontsRepository();
    listFontsService = new ListFontsService(fakeFontsRepository);
  });

  it('1. Should be able to create a new user without: email, password and profile_photo.', async () => {
    // ? Arrange

    // ? Act
    await listFontsService.execute();

    // ? Assert
    expect(fakeFontsRepository.index).toBeCalled();
  });
});
