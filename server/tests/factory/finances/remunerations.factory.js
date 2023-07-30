import faker from "faker";
import models from "@models";

const { Remuneration } = models;

const createTestRemuneration = async ({
  financeid, userid,
  pastorpayed,
  fulltimepastorcount,
  buffer, mimetype, originalname, notes
}) => {
  const newRemuneration = await Remuneration.create({
    userid: userid || faker.datatype.number(),
    financeid: financeid || faker.datatype.number(),
    pastorpayed: pastorpayed || faker.datatype.boolean(),
    fulltimepastorcount: fulltimepastorcount || faker.datatype.number(),
    buffer: buffer || faker.random.alphaNumeric(100),
    originalname: originalname || faker.datatype.string(),
    mimetype: mimetype || "image/png",
    notes: notes || faker.random.alphaNumeric(10),
  });

  return (newRemuneration);
};

export default createTestRemuneration;
