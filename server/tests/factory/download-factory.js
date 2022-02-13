import faker from "faker";
import models from "@models";

const { Download } = models;

const createTestDownload = async ({
  userid, name, url, date, categoryid, notes
}) => {
  const newDownload = await Download.create({
    userid: userid || faker.datatype.uuid(),
    name: name || faker.random.alphaNumeric(6),
    url: url || faker.internet.url(),
    date: date || faker.datatype.datetime(),
    categoryid: categoryid || faker.datatype.number(),
    notes: notes || faker.random.alphaNumeric(6)
  });
  return (newDownload);
};

export default createTestDownload;
