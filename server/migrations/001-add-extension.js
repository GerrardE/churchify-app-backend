const isTestEnvironment = process.env.NODE_ENV === 'test';

export const up = (queryInterface) => {
  if (isTestEnvironment) {
    return new Promise(resolve => resolve(1));
  }
  return queryInterface
    .sequelize
    .query('CREATE EXTENSION IF NOT EXISTS citext WITH SCHEMA public;');
};

export const down = () => new Promise(resolve => resolve(1));
