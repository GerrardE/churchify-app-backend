import faker from "faker";
import models from "@models";

const { Attendance } = models;

const createTestAttendance = async ({
  userid, children, women, men, eventid, preacherid, branchid, zoneid, date, notes
}) => {
  const newAttendance = await Attendance.create({
    userid: userid || faker.datatype.number(),
    children: children || faker.datatype.number(),
    women: women || faker.datatype.number(),
    men: men || faker.datatype.number(),
    eventid: eventid || faker.datatype.number(),
    preacherid: preacherid || faker.datatype.number(),
    branchid: branchid || faker.datatype.number(),
    zoneid: zoneid || faker.datatype.number(),
    date: date || faker.date.recent(),
    notes: notes || faker.random.alphaNumeric(10),
  });

  return (newAttendance);
};

export default createTestAttendance;
