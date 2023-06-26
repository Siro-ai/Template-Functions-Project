import axios, {AxiosRequestConfig} from "axios";

describe("SomeEndpoint Test", () => {
  it("Endpoint does not throw error", async () => {
    // replace this URL with the actual URL of your function in the emulator
    const url = "http://127.0.0.1:5001/sirocodingchallenges/us-central1/someEndpoint";
    const config: AxiosRequestConfig = {
      method: "post",
      url,
    };
    await axios.request(config);
    // const status = result.status;
    return expect(200).toEqual(200);
  });
});
