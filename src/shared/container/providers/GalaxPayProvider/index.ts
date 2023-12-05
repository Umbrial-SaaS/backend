import { container } from 'tsyringe';

import IGalaxPayProvider from './models/IGalaxPayProvider';
import GalaxPayProvider from './implementations/GalaxPayProvider';

container.registerSingleton<IGalaxPayProvider>(
  'GalaxPayProvider',
  GalaxPayProvider,
);
