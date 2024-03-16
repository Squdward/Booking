import { MantineProvider, createTheme } from "@mantine/core";
import { FC, PropsWithChildren } from "react";
import '@mantine/core/styles.css';
import '@mantine/notifications/styles.css';
import { Notifications } from "@mantine/notifications";

const theme = createTheme({});

const AppProviders: FC<PropsWithChildren> = ({children}) => {
    return (
        <MantineProvider theme={theme}>
            <Notifications position="top-right" />
            {children}
        </MantineProvider>
    )
} 

export {AppProviders as Providers}