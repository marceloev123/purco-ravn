import React from "react";
import "./App.css";
import SuperTokens, {
  SuperTokensWrapper,
  getSuperTokensRoutesForReactRouterDom,
  getRoutingComponent,
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

import dataProvider, { GraphQLClient } from "@pankod/refine-hasura";
import routerProvider from "@pankod/refine-react-router-v6";
import LogoutButton from "LogoutButton";
import { ClaimsList } from "pages/claims/list";

const client = new GraphQLClient(process.env.HASURA_API as string);

SuperTokens.init(SuperTokensConfig);

console.log(getSuperTokensRoutesForReactRouterDom(require("react-router-dom")));
function App() {
  return (
    <MantineProvider theme={LightTheme} withNormalizeCSS withGlobalStyles>
      <Global styles={{ body: { WebkitFontSmoothing: "auto" } }} />
      <NotificationsProvider position="top-right">
        <SuperTokensWrapper>
          <div>
            <Refine
              dataProvider={dataProvider(client)}
              notificationProvider={notificationProvider}
              Layout={Layout}
              ReadyPage={ReadyPage}
              catchAll={<ErrorComponent />}
              routerProvider={{
                ...routerProvider,
                routes: getSuperTokensRoutesForReactRouterDom(
                  require("react-router-dom")
                ).map((route) => route.props),
              }}
              resources={[{ name: "claims", list: ClaimsList }]}
            />
          </div>
        </SuperTokensWrapper>
      </NotificationsProvider>
    </MantineProvider>
  );
}

export default App;
