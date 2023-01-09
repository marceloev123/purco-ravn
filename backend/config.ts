import EmailPassword from "supertokens-node/recipe/emailpassword";
import Session from "supertokens-node/recipe/session";
import { TypeInput } from "supertokens-node/types";
import Dashboard from "supertokens-node/recipe/dashboard";
import EmailVerification from "supertokens-node/recipe/emailverification";

export const SuperTokensConfig: TypeInput = {
  supertokens: {
    // this is the location of the SuperTokens core.
    connectionURI:
      "https://dev-fb374cd18df611edbe491f2084ae5133-us-east-1.aws.supertokens.io:3569",
    apiKey: "q2qPdvEA=rAmjMYc1o3bFN6nl-y79C",
  },
  appInfo: {
    appName: "SuperTokens Demo App",
    apiDomain: "http://localhost:3001",
    websiteDomain: "http://localhost:3000",
  },
  // recipeList contains all the modules that you want to
  // use from SuperTokens. See the full list here: https://supertokens.com/docs/guides
  recipeList: [
    EmailPassword.init(),
    Session.init({
      jwt: {
        enable: true,
      },
      override: {
        functions: function (originalImplementation) {
          return {
            ...originalImplementation,
            createNewSession: async function (input) {
              input.accessTokenPayload = {
                ...input.accessTokenPayload,
                "https://hasura.io/jwt/claims": {
                  "x-hasura-user-id": input.userId,
                  "x-hasura-default-role": "admin",
                  "x-hasura-allowed-roles": ["admin"],
                },
              };

              return originalImplementation.createNewSession(input);
            },
          };
        },
      },
    }),
    EmailVerification.init({
      mode: "REQUIRED",
    }),
    Dashboard.init({
      apiKey: "q2qPdvEA=rAmjMYc1o3bFN6nl-y79C",
    }),
  ],
};
