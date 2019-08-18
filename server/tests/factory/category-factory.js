import faker from 'faker';
import models from '@models';

const { Category } = models;

const createTestCategory = async ({
  userId, name, description
}) => {
  const newCategory = await Category.create({
    userId: userId || faker.random.uuid(),
    name: name || faker.random.alphaNumeric(6),
    description: description || faker.random.alphaNumeric(6)
  });

  return (newCategory);
};

export default createTestCategory;
