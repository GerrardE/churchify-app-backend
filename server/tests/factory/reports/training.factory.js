import faker from "faker";
import models from "@models";

const { Training } = models;

const createTestTraining = async ({
  userid, trainees, converts, branchid, trainingtypeid, date, zoneid, notes
}) => {
  const newTraining = await Training.create({
    userid: userid || faker.datatype.number(),
    trainees: trainees || faker.datatype.number(),
    converts: converts || faker.datatype.number(),
    branchid: branchid || faker.datatype.number(),
    trainingtypeid: trainingtypeid || faker.datatype.number(),
    date: date || faker.date.recent(),
    zoneid: zoneid || faker.datatype.number(),
    notes: notes || faker.random.alphaNumeric(10),
  });

  return (newTraining);
};

export default createTestTraining;
