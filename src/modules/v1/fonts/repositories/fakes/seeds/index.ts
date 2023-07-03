import Font from '@modules/v1/fonts/infra/data/entities/Font';

const fakeFontId = 'asdasdasdasdasdasdas';

const fakeFonts = new Font();

Object.assign(fakeFonts, {
  id: fakeFontId,
  name: 'Montserrat',
});

export { fakeFonts, fakeFontId };
