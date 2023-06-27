import * as functions from "firebase-functions";

// assumes the request has been authenticated, the caller has the required permissions
export const someEndpoint = functions.https.onRequest(async (request, response) => {
  try {
    // TODO: Do something


    response.status(200).send("No errors!");
  } catch (e) {
    response.status(500).send("We messed up :(");
  }
});
