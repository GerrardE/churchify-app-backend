import faker from 'faker';
import models from '@models';

const { Category } = models;

const createTestCategory = async ({
  userid, name, notes
}) => {
  const newCategory = await Category.create({
    userid: userid || faker.random.uuid(),
    name: name || faker.random.alphaNumeric(6),
    notes: notes || faker.random.alphaNumeric(6)
  });

  return (newCategory);
};

export default createTestCategory;
