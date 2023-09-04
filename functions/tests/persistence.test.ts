
import {getUser} from "../src/persistence";

describe("handleTrackRecordingView Tests", () => {
  it("Loads a user document", async () => {
    const user = await getUser("Joe");
    console.log("Got user: ", user);
    return expect(user).toBeDefined();
  });
});
