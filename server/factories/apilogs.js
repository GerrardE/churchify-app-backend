import { v4 } from "uuid";
import randString from "@helpers/utilities";
import { stringify } from "flatted";

const apiLogFactory = (
  Controller, req, res, action, result,
  httpstatuscode = 200, statuscode = 200,
  reqstarttime = Date.now(), reqendtime = Date.now()
) => ({
  name: `${Controller.parameters.toLowerCase()}.${action}`,
  refid: randString(`${Controller.parameter.toUpperCase()}`),
  reqbody: JSON.stringify(req.body),
  resbody: JSON.stringify(res.body) || stringify(res),
  httpstatuscode,
  statuscode,
  message: (action === "getAll") ? `${Controller.parameters} ${result}` : `${Controller.parameter} ${result}`,
  apiref: v4(),
  url: `${req.method} ~ ${req.originalUrl}`,
  reqstarttime,
  reqendtime,
});

export default apiLogFactory;
