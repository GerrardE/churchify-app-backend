import faker from 'faker';
import models from '@models';

const { State } = models;

const createTestState = async ({
  name,
  countryId,
  countryCode,
  fipsCode,
  iso2,
  flag,
  wikiDataId,
}) => {
  const newState = await State.create({
    name: name || faker.random.alphaNumeric(6),
    country_id: countryId || 1,
    country_code: countryCode || 1,
    fips_code: fipsCode || 1,
    iso2: iso2 || 'iso',
    flag: flag || 20,
    wikiDataId: wikiDataId || faker.random.alphaNumeric(6),
  });

  return newState;
};

export default createTestState;
