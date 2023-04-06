import {
  createTestUser, createTestFellowship, createTestCountry,
  createTestState, createTestCity, createTestZone,
  createTestBranch, createTestCategory, createTestDownload,
  createTestAsset, createTestFinance, createTestPayment,
  createTestReceipt, createTestRemuneration, createTestPreacher,
  createTestMembership, createTestFreport, createTestActivity,
  createTestAttendance, createTestTraining, createTestGroup,
  createTestEvent, createTestActivityType, createTestTrainingType,
} from "./index";

const setup = async () => {
  const testCountry = await createTestCountry({});
  const testState = await createTestState({ countryId: testCountry.id });
  const testCity = await createTestCity({ stateId: testState.id, countryId: testCountry.id });
  const testZone = await createTestZone({ country: testCountry.id });
  const testBranch = await createTestBranch({ zoneid: testZone.id });
  const testUser = await createTestUser({
    zoneid: testZone.id,
    branchid: testBranch.id,
    city: testCity.id,
    state: testState.id,
    country: testCountry.id,
    password: "testingpassword"
  });
  const testCategory = await createTestCategory({ userid: testUser.id });
  const testDownload = await createTestDownload({
    userid: testUser.id,
    categoryid: testCategory.id
  });
  const testEvent = await createTestEvent({
    userid: testUser.id,
    branchid: testBranch.id,
    country: testCountry.id
  });
  const testFellowship = await createTestFellowship({
    userid: testUser.id,
    branchid: testBranch.id,
    city: testCity.id,
    state: testState.id,
    country: testCountry.id
  });
  const testPreacher = await createTestPreacher({
    userid: testUser.id,
    branchid: testBranch.id,
    city: testCity.id,
    state: testState.id,
    country: testCountry.id
  });
  const testFinance = await createTestFinance({
    userid: testUser.id,
    zoneid: testZone.id,
    branchid: testBranch.id,
    preacherid: testPreacher.id,
  });
  const testAsset = await createTestAsset({
    userid: testUser.id,
    financeid: testFinance.id
  });
  const testReceipt = await createTestReceipt({
    userid: testUser.id,
    financeid: testFinance.id
  });
  const testRemuneration = await createTestRemuneration({
    userid: testUser.id,
    financeid: testFinance.id
  });
  const testPayment = await createTestPayment({
    userid: testUser.id,
    financeid: testFinance.id
  });
  const testActivityType = await createTestActivityType({
    userid: testUser.id,
    branchid: testBranch.id
  });
  const testTrainingType = await createTestTrainingType({
    userid: testUser.id,
    branchid: testBranch.id
  });
  const testMembership = await createTestMembership({
    userid: testUser.id,
    branchid: testBranch.id,
    zoneid: testZone.id
  });
  const testFreport = await createTestFreport({
    userid: testUser.id,
    branchid: testBranch.id,
    zoneid: testZone.id,
    fellowshipid: testFellowship.id,
  });
  const testActivity = await createTestActivity({
    userid: testUser.id,
    branchid: testBranch.id,
    activitytypeid: testActivityType.id,
    zoneid: testZone.id
  });
  const testAttendance = await createTestAttendance({
    userid: testUser.id,
    branchid: testBranch.id,
    zoneid: testZone.id,
    preacherid: testPreacher.id,
    eventid: testEvent.id
  });
  const testTraining = await createTestTraining({
    userid: testUser.id,
    branchid: testBranch.id,
    trainingtypeid: testTrainingType.id,
    zoneid: testZone.id
  });
  const testGroup = await createTestGroup({
    userid: testUser.id,
    branchid: testBranch.id,
    zoneid: testZone.id
  });

  return {
    country: testCountry,
    state: testState,
    city: testCity,
    zone: testZone,
    branch: testBranch,
    user: testUser,
    category: testCategory,
    download: testDownload,
    fellowship: testFellowship,
    preacher: testPreacher,
    finance: testFinance,
    asset: testAsset,
    payment: testPayment,
    remuneration: testRemuneration,
    receipt: testReceipt,
    freport: testFreport,
    group: testGroup,
    activity: testActivity,
    attendance: testAttendance,
    training: testTraining,
    membership: testMembership,
    evnt: testEvent,
    trainingtype: testTrainingType,
    activitytype: testActivityType,
  };
};

export default setup;
