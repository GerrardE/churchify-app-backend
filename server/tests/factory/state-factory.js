import faker from "faker";
import models from "@models";

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
    country_id: countryId || 2,
    country_code: countryCode || 2,
    fips_code: fipsCode || 2,
    iso2: iso2 || "iso",
    flag: flag || 20,
    wikiDataId: wikiDataId || faker.random.alphaNumeric(6),
  });

  return newState;
};

export default createTestState;
