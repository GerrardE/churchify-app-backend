module.exports = (sequelize, DataTypes) => {
  const ApiLogs = sequelize.define('ApiLogs', {
    name: DataTypes.STRING,
    refid: DataTypes.STRING,
    reqbody: DataTypes.STRING,
    resbody: DataTypes.STRING,
    httpstatuscode: DataTypes.STRING,
    statuscode: DataTypes.STRING,
    message: DataTypes.STRING,
    apiref: DataTypes.STRING,
    url: DataTypes.STRING,
    reqstarttime: DataTypes.DATE,
    reqendtime: DataTypes.DATE
  }, {});
  ApiLogs.associate = () => {};
  return ApiLogs;
};
