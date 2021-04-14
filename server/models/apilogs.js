module.exports = (sequelize, DataTypes) => {
  const ApiLogs = sequelize.define("ApiLogs", {
    name: DataTypes.STRING,
    refid: DataTypes.STRING,
    reqbody: DataTypes.TEXT,
    resbody: DataTypes.TEXT,
    httpstatuscode: DataTypes.STRING,
    statuscode: DataTypes.STRING,
    message: DataTypes.TEXT,
    apiref: DataTypes.STRING,
    url: DataTypes.STRING,
    reqstarttime: DataTypes.DATE,
    reqendtime: DataTypes.DATE
  }, {});
  ApiLogs.associate = () => {};
  return ApiLogs;
};
