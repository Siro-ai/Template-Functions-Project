import * as functions from "firebase-functions";

// assumes the request has been authenticated, the caller has the required permissions
export const someEndpoint = functions.https.onRequest(async (request, response) => {
  if (request.method === "POST") {
    try {
      // TODO: Do something


      response.status(200).send("No errors!");
    } catch (e) {
      functions.logger.error(e);
      response.status(500).send("We messed up :(");
    }
  } else {
    response.status(400).send("only POST requests are allowed");
  }
});
