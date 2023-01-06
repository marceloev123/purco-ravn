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

import dataProvider, { GraphQLClient } from "@pankod/refine-strapi-graphql";
import routerProvider from "@pankod/refine-react-router-v6";

const client = new GraphQLClient(process.env.HASURA_API as string);

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
        />
      </NotificationsProvider>
    </MantineProvider>
  );
}

export default App;
