
import {getRecording, getUser} from "../src/persistence";

describe("handleTrackRecordingView Tests", () => {
  it("Loads a recording document", async () => {
    const recording = await getRecording("recordingA");
    console.log("Got recording: ", recording);
    return expect(recording).toBeDefined();
  });

  it("Loads a user document", async () => {
    const user = await getUser("Joe");
    console.log("Got user: ", user);
    return expect(user).toBeDefined();
  });
});
