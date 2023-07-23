import faker from "faker";
import models from "@models";

const { Asset } = models;

const createTestAsset = async ({
  financeid, userid, building, motorvehicle,
  generator, musicaleqpt, asabaproject, others, buffer, originalname, mimetype, notes
}) => {
  const newAsset = await Asset.create({
    userid: userid || faker.datatype.number(),
    financeid: financeid || faker.datatype.number(),
    building: building || faker.datatype.number(),
    motorvehicle: motorvehicle || faker.datatype.number(),
    generator: generator || faker.datatype.number(),
    musicaleqpt: musicaleqpt || faker.datatype.number(),
    asabaproject: asabaproject || faker.datatype.number(),
    others: others || faker.datatype.number(),
    buffer: buffer || faker.random.alphaNumeric(100),
    originalname: originalname || faker.datatype.string(),
    mimetype: mimetype || "image/png",
    notes: notes || faker.random.alphaNumeric(10),
  });

  return (newAsset);
};

export default createTestAsset;
