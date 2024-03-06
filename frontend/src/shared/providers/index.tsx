import { MantineProvider, createTheme } from "@mantine/core";
import { FC, PropsWithChildren } from "react";
import '@mantine/core/styles.css';
import { Notifications } from "@mantine/notifications";

const theme = createTheme({});

const Providers: FC<PropsWithChildren> = ({children}) => {
    return (
        <MantineProvider theme={theme}>
            <Notifications/>
            {children}
        </MantineProvider>
    )
} 

export {Providers}