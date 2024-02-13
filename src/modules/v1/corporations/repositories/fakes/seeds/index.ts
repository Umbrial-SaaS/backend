import Corporation from '@modules/v1/corporations/infra/data/entities/Corporation';
import CorporationStaff from '@modules/v1/corporations/infra/data/entities/CorporationStaff';
import CorporationStaffService from '@modules/v1/corporations/infra/data/entities/CorporationStaffService';
import { fakeService, fakeServiceId } from '@modules/v1/services/repositories/fakes/seeds';
import { fakeUserId } from '@modules/v1/users/repositories/fakes/seeds';
import CorporationRolesEnum from '@shared/enums/CorporationRolesEnum';

const fakeCorporationId = 'asdasdasdasdasdasdas';
const fakeCorporationStaffId = '12312';
const fakeCorporationStaffServiceId = '1232222312312';

const fakeCorporationStaffService = new CorporationStaffService()
const fakeCorporationStaff = new CorporationStaff()

const fakeCorporation = new Corporation();
Object.assign(fakeCorporation, {
  id: fakeCorporationId,
  name: 'Montserrat',
  description: "Description",
  instagram: "@instagram",
  corporationStaff: [fakeCorporationStaff]

});

Object.assign(fakeCorporationStaffService, {
  id: fakeCorporationStaffServiceId,
  active: true,
  price: 3500,
  duration: 45,
  corporationStaffId: fakeCorporationStaffId,
  serviceId: fakeServiceId,
  service: fakeService
});

Object.assign(fakeCorporationStaff, {
  id: fakeCorporationStaffId,
  active: true,
  role: CorporationRolesEnum.Staff,
  userId: fakeUserId,
  corporationId: fakeCorporationId,
  services: [
    fakeCorporationStaffService
  ]
});

export { fakeCorporation, fakeCorporationId, fakeCorporationStaffId };
