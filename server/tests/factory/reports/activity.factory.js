import faker from "faker";
import models from "@models";

const { Activity } = models;

const createTestActivity = async ({
  userid, activitytypeid, special, branchid, council, project, notes, date, zoneid
}) => {
  const newActivity = await Activity.create({
    userid: userid || faker.datatype.number(),
    council: council || faker.datatype.number(),
    special: special || faker.datatype.number(),
    project: project || faker.datatype.number(),
    branchid: branchid || faker.datatype.number(),
    activitytypeid: activitytypeid || faker.datatype.number(),
    date: date || faker.date.recent(),
    zoneid: zoneid || faker.datatype.number(),
    notes: notes || faker.random.alphaNumeric(10),
  });

  return (newActivity);
};

export default createTestActivity;
