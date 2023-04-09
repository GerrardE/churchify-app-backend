import faker from "faker";
import models from "@models";

const { Remuneration } = models;

const createTestRemuneration = async ({
  financeid, userid,
  pastorpayed,
  fulltimepastorcount,
  uploads, notes
}) => {
  const newRemuneration = await Remuneration.create({
    userid: userid || faker.datatype.number(),
    financeid: financeid || faker.datatype.number(),
    pastorpayed: pastorpayed || faker.datatype.boolean(),
    fulltimepastorcount: fulltimepastorcount || faker.datatype.number(),
    uploads: uploads || [JSON.parse(faker.datatype.json())],
    notes: notes || faker.random.alphaNumeric(10),
  });

  return (newRemuneration);
};

export default createTestRemuneration;
