'use client'

import { MantineProvider } from "@mantine/core";
import { store as rootStore } from "@/store/rootStore";
import { Provider as StoreProvider } from "react-redux";

export const Providers: React.FC<React.PropsWithChildren> = ({ children }) => (
  <MantineProvider>
    <StoreProvider store={rootStore}>
      {children}
    </StoreProvider>
  </MantineProvider>
)