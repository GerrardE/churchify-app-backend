import { createTestUser, createTestFellowship, createTestCountry, createTestState, createTestCity, createTestZone, createTestBranch, createTestCategory, createTestDownload } from "./index";

const setup = async () => {
    const testCountry = await createTestCountry({});
    const testState = await createTestState({ countryId: testCountry.id });
    const testCity = await createTestCity({ stateId: testState.id, countryId: testCountry.id });
    const testZone = await createTestZone({ country: testCountry.id });
    const testBranch = await createTestBranch({ zoneid: testZone.id });
    const testUser = await createTestUser({ zoneid: testZone.id, branchid: testBranch.id, city: testCity.id, state: testState.id, country: testCountry.id, password: "testingpassword" });
    const testCategory = await createTestCategory({ userid: testUser.id });
    const testDownload = await createTestDownload({ userid: testUser.id, categoryid: testCategory.id });
    const testFellowship = await createTestFellowship({ userid: testUser.id, branchid: testBranch.id, city: testCity.id, state: testState.id, country: testCountry.id});
    
    return {
        country: testCountry,
        state: testState,
        city: testCity,
        zone: testZone,
        branch: testBranch,
        user: testUser,
        category: testCategory,
        download: testDownload,
        fellowship: testFellowship
    }
};

export default setup;
