import faker from 'faker';
import models from '@models';

const { Config } = models;

const createTestConfig = async ({
  name, type, config
}) => {
  const newConfig = await Config.create({
    name: name || faker.random.alphaNumeric(6),
    type: type || faker.random.alphaNumeric(6),
    config: config || [{}]
  });

  return (newConfig);
};

export default createTestConfig;
