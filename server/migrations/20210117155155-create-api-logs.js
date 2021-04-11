module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('ApiLogs', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
    name: {
      type: Sequelize.STRING,
    },
    refid: {
      type: Sequelize.STRING,
    },
    reqbody: {
      type: Sequelize.TEXT,
    },
    resbody: {
      type: Sequelize.TEXT,
    },
    httpstatuscode: {
      type: Sequelize.STRING,
    },
    statuscode: {
      type: Sequelize.STRING,
    },
    message: {
      type: Sequelize.TEXT,
    },
    apiref: {
      type: Sequelize.STRING,
    },
    url: {
      type: Sequelize.STRING,
    },
    reqstarttime: {
      type: Sequelize.DATE,
    },
    reqendtime: {
      type: Sequelize.DATE,
    },
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE,
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE,
    },
  }),
  down: queryInterface => queryInterface.dropTable('ApiLogs'),
};
