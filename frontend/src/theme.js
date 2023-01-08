import {createTheme} from "@mui/material";


export const theme = createTheme(
        {
            palette: {
                primary: {
                    main: "#0C406A",
                },
                secondary: {
                    main: "#5198BF",
                },
                divider: "#b5b5b5",
                background: {
                    paper: "#FFFFFF",
                    default: "#F5F5F5",
                },
                action: {
                    active: "#000000",
                },
                accent: {
                    main: "#6F3316",
                    light: "#99582A",
                },
            },
            components: {
                MuiFilledInput: {
                    styleOverrides: {
                        root: {
                            borderRadius: 4,
                            backgroundColor: "#F2F2F2",
                            // ".MuiFilledInput-input": {
                            //   borderRadius: 16,
                            // }
                        },
                    },
                    defaultProps: {
                        disableUnderline: true,
                    },
                },
                MuiButton: {
                    defaultProps: {
                        variant: "contained",
                    },
                    styleOverrides: {
                        root: {},
                    },
                },
            },
            typography: {
                // fontFamily: "Roboto",
                h2: {
                    fontSize: "44px",
                    lineHeight: "84px",
                    fontWeight: 500,
                    color: "#5198BF",
                },
                h3: {
                    fontSize: "36px",
                    lineHeight: 1,
                },
                h4: {
                    fontSize: "34px",
                    fontWeight: 500,
                    lineHeight: "47.6px",
                    color: "#5198BF",
                    textAlign: "center",
                },
                h5: {
                    fontSize: "24px",
                    fontWeight: 400,
                    lineHeight: "33.6px",
                },
                h6: {
                    fontSize: "20px",
                    lineHeight: "28px",
                    color: "#000000",
                    fontWeight: 500,
                    textAlign: "center",
                },
                body1: {
                    fontSize: "14px",
                    fontWeight: 400,
                    lineHeight: "19.6px",
                    color: "text.secondary",
                },
                body2: {
                    fontSize: "16px",
                    fontWeight: 400,
                    lineHeight: "22.4px",
                },
                subtitle1: {
                    fontSize: "16px",
                    fontWeight: 500,
                    lineHeight: "22.4px",
                    color: "#000000 87%",
                    textAlign: "center",
                },
                subtitle2: {
                    fontSize: "14px",
                    color: "#000000",
                },
            },
        } // ptPT
        );