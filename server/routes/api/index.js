import express from "express";
import userRouter from "./users";
import roleRouter from "./roles";
import permissionRouter from "./permissions";
import zoneRouter from "./zones";
import branchRouter from "./branches";
import fellowshipRouter from "./fellowships";
import eventRouter from "./events";
import categoryRouter from "./categories";
import downloadRouter from "./downloads";
import preacherRouter from "./preachers";
import configRouter from "./configs";
import countryRouter from "./countries";
import stateRouter from "./states";
import cityRouter from "./cities";
import dashboardRouter from "./dashboard";
import apilogRouter from "./apilogs";
import activityTypesRouter from "./activitytypes";
import trainingTypesRouter from "./trainingtypes";
import {
  assetRouter, paymentRouter, remunerationRouter, financeRouter, receiptRouter
} from "./finances";
import {
  membershipRouter,
  attendanceRouter, activityRouter, freportRouter,
  trainingRouter, groupRouter
} from "./reports";

const apiRouter = express.Router();

apiRouter.get("/", (req, res, next) => res.status(200).send("Welcome to the Churchify-App API"));

apiRouter.use("/users", userRouter);
apiRouter.use("/roles", roleRouter);
apiRouter.use("/permissions", permissionRouter);
apiRouter.use("/zones", zoneRouter);
apiRouter.use("/branches", branchRouter);
apiRouter.use("/fellowships", fellowshipRouter);
apiRouter.use("/events", eventRouter);
apiRouter.use("/categories", categoryRouter);
apiRouter.use("/downloads", downloadRouter);
apiRouter.use("/preachers", preacherRouter);
apiRouter.use("/configs", configRouter);
apiRouter.use("/countries", countryRouter);
apiRouter.use("/states", stateRouter);
apiRouter.use("/cities", cityRouter);
apiRouter.use("/dashboard", dashboardRouter);
apiRouter.use("/apilogs", apilogRouter);
apiRouter.use("/activitytypes", activityTypesRouter);
apiRouter.use("/trainingtypes", trainingTypesRouter);
apiRouter.use("/finances", financeRouter);
apiRouter.use("/finance/assets", assetRouter);
apiRouter.use("/finance/receipts", receiptRouter);
apiRouter.use("/finance/remunerations", remunerationRouter);
apiRouter.use("/finance/payments", paymentRouter);
apiRouter.use("/memberships", membershipRouter);
apiRouter.use("/activityreports", activityRouter);
apiRouter.use("/freports", freportRouter);
apiRouter.use("/trainingreports", trainingRouter);
apiRouter.use("/groups", groupRouter);
apiRouter.use("/attendances", attendanceRouter);

export default apiRouter;
