import React from "react";
import "./App.css";
import SuperTokens, {
  SuperTokensWrapper,
  getSuperTokensRoutesForReactRouterDom,
} from "supertokens-auth-react";
import { SessionAuth } from "supertokens-auth-react/recipe/session";
import { Routes, BrowserRouter as Router, Route } from "react-router-dom";
import { SuperTokensConfig } from "./config";

import { Refine } from "@pankod/refine-core";
import {
  NotificationsProvider,
  notificationProvider,
  MantineProvider,
  Global,
  Layout,
  LightTheme,
  ReadyPage,
  ErrorComponent,
} from "@pankod/refine-mantine";

import dataProvider, { GraphQLClient } from "@pankod/refine-strapi-graphql";
import routerProvider from "@pankod/refine-react-router-v6";
import LogoutButton from "LogoutButton";

const client = new GraphQLClient(process.env.HASURA_API as string);

SuperTokens.init(SuperTokensConfig);

function App() {
  return (
    <MantineProvider theme={LightTheme} withNormalizeCSS withGlobalStyles>
      <Global styles={{ body: { WebkitFontSmoothing: "auto" } }} />
      <NotificationsProvider position="top-right">
        <SuperTokensWrapper>
          <div className="App">
            <Router>
              <div className="fill">
                <Routes>
                  {/* This shows the login UI on "/auth" route */}
                  {getSuperTokensRoutesForReactRouterDom(
                    require("react-router-dom")
                  )}

                  <Route
                    path="/"
                    element={
                      /* This protects the "/" route so that it shows
                                  <Home /> only if the user is logged in.
                                  Else it redirects the user to "/auth" */
                      <SessionAuth>
                        <div>
                          <LogoutButton />
                          <Refine
                            dataProvider={dataProvider(client)}
                            notificationProvider={notificationProvider}
                            Layout={Layout}
                            ReadyPage={ReadyPage}
                            catchAll={<ErrorComponent />}
                            routerProvider={routerProvider}
                          />
                        </div>
                      </SessionAuth>
                    }
                  />
                </Routes>
              </div>
            </Router>
          </div>
        </SuperTokensWrapper>
      </NotificationsProvider>
    </MantineProvider>
  );
}

export default App;
