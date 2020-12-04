import faker from 'faker';
import models from '@models';

const { Country } = models;

const createTestCountry = async ({
  name,
  countryId,
  countryCode,
  fipsCode,
  iso2,
  iso3,
  phonecode,
  capital,
  currency,
  native,
  region,
  subregion,
  emoji,
  emojiU,
  flag,
  wikiDataId,
}) => {
  const newCountry = await Country.create({
    name: name || faker.random.alphaNumeric(6),
    country_id: countryId || 1,
    country_code: countryCode || 1,
    fips_code: fipsCode || 1,
    iso2: iso2 || 'iso',
    iso3: iso3 || 'iso',
    phonecode: phonecode || '+234',
    capital: capital || faker.random.alphaNumeric(6),
    currency: currency || faker.random.alphaNumeric(6),
    native: native || faker.random.alphaNumeric(6),
    region: region || faker.random.alphaNumeric(6),
    subregion: subregion || faker.random.alphaNumeric(6),
    emoji: emoji || faker.random.alphaNumeric(6),
    emojiU: emojiU || faker.random.alphaNumeric(6),
    flag: flag || 20,
    wikiDataId: wikiDataId || faker.random.alphaNumeric(6),
  });

  return newCountry;
};

export default createTestCountry;
