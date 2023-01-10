import EmailPassword from "supertokens-node/recipe/emailpassword";
import Session from "supertokens-node/recipe/session";
import { TypeInput } from "supertokens-node/types";
import Dashboard from "supertokens-node/recipe/dashboard";
import EmailVerification from "supertokens-node/recipe/emailverification";

require("dotenv").config();

export const SuperTokensConfig: TypeInput = {
  supertokens: {
    // this is the location of the SuperTokens core.
    connectionURI: process.env.SUPERTOKENS_CONNECTION_URI as string,
    apiKey: process.env.SUPERTOKENS_API_KEY as string,
  },
  appInfo: {
    appName: "SuperTokens Demo App",
    apiDomain: process.env.API_DOMAIN as string,
    websiteDomain: process.env.WEBSITE_DOMAIN as string,
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
