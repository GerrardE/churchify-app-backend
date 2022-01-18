import faker from "faker";
import models from "@models";

const { TrainingType } = models;

const createTestTrainingType = async ({
  userid, branchid, name, notes
}) => {
  const newTrainingType = await TrainingType.create({
    userid: userid || faker.datatype.uuid(),
    branchid: branchid || 1,
    name: name || faker.random.alphaNumeric(6),
    notes: notes || faker.random.alphaNumeric(6)
  });

  return (newTrainingType);
};

export default createTestTrainingType;
