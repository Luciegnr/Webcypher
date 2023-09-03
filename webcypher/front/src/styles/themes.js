/**
 * theme for MUI
 * TODO: create a theme object as per designs
 */
import { createTheme } from "@material-ui/core";
// import { purple, green, orange, deepOrange } from "@material-ui/core/colors";

// Global styles can be moved to a separate file for ease of maintenance.

export const dark = () => (createTheme({
    palette: {
        type: 'dark',
        primary: {
            main: "#040f3d",
        },
        secondary: {
            main: "#757575",
        },
    },
    typography: {
        button: {
        },
    }
}))

export const light = () => (createTheme({
    palette: {
        type: 'light',
        primary: {
            main: "#4bffa5",
        },
        secondary: {
            main: "#040f3d",
        },
    }//,
}))
