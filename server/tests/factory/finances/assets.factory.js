import faker from "faker";
import models from "@models";

const { Asset } = models;

const createTestAsset = async ({
  financeid, userid, building, motorvehicle,
  generator, musicaleqpt, asabaproject, others, uploads, notes
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
    uploads: uploads || [JSON.parse(faker.datatype.json())],
    notes: notes || faker.random.alphaNumeric(10),
  });

  return (newAsset);
};

export default createTestAsset;
