import { MantineProvider, createTheme } from "@mantine/core";
import { FC, PropsWithChildren } from "react";
import '@mantine/core/styles.css';

const theme = createTheme({});

const Providers: FC<PropsWithChildren> = ({children}) => {
    return (
        <MantineProvider theme={theme}>
            {children}
        </MantineProvider>
    )
} 

export {Providers}