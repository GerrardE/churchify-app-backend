import faker from "faker";
import models from "@models";

const { ActivityType } = models;

const createTestActivityType = async ({
  userid, branchid, name, notes
}) => {
  const newActivityType = await ActivityType.create({
    userid: userid || faker.datatype.uuid(),
    branchid: branchid || 1,
    name: name || faker.random.alphaNumeric(6),
    notes: notes || faker.random.alphaNumeric(6)
  });

  return (newActivityType);
};

export default createTestActivityType;
