import axios, {AxiosRequestConfig} from "axios";

describe("SomeEndpoint Test", () => {
  it("Endpoint does not throw error", async () => {
    // replace this URL with the actual URL of your function in the emulator
    const url = "http://localhost:5001/default/us-central1/someEndpoint";
    const config: AxiosRequestConfig = {
      method: "post",
      url,
    };
    const response = await axios.request(config);
    // const status = result.status;
    return expect(response.status).toEqual(200);
  });
});
