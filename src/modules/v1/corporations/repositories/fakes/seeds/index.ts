import Corporation from '@modules/v1/corporations/infra/data/entities/Corporation';

const fakeCorporationId = 'asdasdasdasdasdasdas';

const fakeCorporation = new Corporation();

Object.assign(fakeCorporation, {
  id: fakeCorporationId,
  name: 'Montserrat',
  description: "Description",
  instagram: "@instagram"
});

export { fakeCorporation, fakeCorporationId };
