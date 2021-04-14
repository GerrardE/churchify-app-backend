import faker from "faker";
import models from "@models";

const { City } = models;

const createTestCity = async ({
  name,
  stateCode,
  stateId,
  countryId,
  countryCode,
  latitude,
  longitude,
  flag,
  wikiDataId,
}) => {
  const newCity = await City.create({
    name: name || faker.random.alphaNumeric(6),
    state_id: stateId || 2,
    state_code: stateCode || faker.random.alphaNumeric(6),
    country_id: countryId || 2,
    country_code: countryCode || 2,
    latitude: latitude || 20.1,
    longitude: longitude || 20.1,
    flag: flag || 20,
    wikiDataId: wikiDataId || faker.random.alphaNumeric(6),
  });

  return newCity;
};

export default createTestCity;
