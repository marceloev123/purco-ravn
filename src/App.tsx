import React from "react";

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
import { ClaimsList } from "pages/claims/list";

const client = new GraphQLClient(process.env.REACT_APP_API_URL as string, {
  headers: {
    "x-hasura-admin-secret": process.env
      .REACT_APP_HASURA_GRAPHQL_ADMIN_SECRET as string,
  },
});

function App() {
  return (
    <MantineProvider theme={LightTheme} withNormalizeCSS withGlobalStyles>
      <Global styles={{ body: { WebkitFontSmoothing: "auto" } }} />
      <NotificationsProvider position="top-right">
        <Refine
          dataProvider={dataProvider(client)}
          notificationProvider={notificationProvider}
          Layout={Layout}
          ReadyPage={ReadyPage}
          catchAll={<ErrorComponent />}
          routerProvider={routerProvider}
          resources={[{ name: "claims", list: ClaimsList }]}
        />
      </NotificationsProvider>
    </MantineProvider>
  );
}

export default App;
