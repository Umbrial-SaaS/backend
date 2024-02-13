import Service from "@modules/v1/services/infra/data/entities/Service";

const fakeServiceId = 1

const fakeService = new Service();

Object.assign(fakeService, {
  id: fakeServiceId,

  active: true,
  name: 'Degradê',
  description: 'Corte degradê',
  price: 2500
});

export { fakeService, fakeServiceId };
