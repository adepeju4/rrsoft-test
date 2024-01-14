import { extendTheme, StyleFunctionProps, ThemeConfig } from "@chakra-ui/react";
import { mode } from "@chakra-ui/theme-tools";
const config: ThemeConfig = {
  initialColorMode: "system",
  useSystemColorMode: true,
};

export default extendTheme({
  config,
  colors: {
    gray: {
      100: "#f5f5f5",
      200: "#eeeeee",
      300: "#e0e0e0",
      400: "#bdbdbd",
      500: "#9e9e9e",
      600: "#757575",
      700: "#616161",
      800: "#424242",
      900: "#212121",
    },
    breakpoints: {
      sm: "320px",
      md: "768px",
      lg: "1024px",
      xl: "1440px",
    },
    light: {
      background: "#f5f5f5",
      text: "#424242",
      primary: "green",
      hover: "#62d47a",
    },
    dark: {
      background: "#212121",
      text: "#f5f5f5",
      primary: "#6EEB83",
      hover: "#7ff095",
    },
  },
  components: {
    Button: {
      variants: {
        link: {
          ":focus": {
            outline: "none",
            boxShadow: "none",
          },
        },

        custom: (props: StyleFunctionProps) => {
          return {
            bg: mode("light.primary", "dark.primary")(props),
            color: "white",
            _hover: {
              bg: mode("light.hover", "dark.hover")(props),
            },
          };
        },
      },
    },
    Input: {
      variants: {
        outline: (props: StyleFunctionProps) => ({
          field: {
            borderColor: mode("grey.700", "grey.500")(props),
          },
        }),
      },
    },
    Select: {
      variants: {
        outline: (props: StyleFunctionProps) => ({
          field: {
            borderColor: mode("grey.700", "grey.500")(props),
          },
        }),
      },
    },
    Textarea: {
      variants: {
        outline: (props: StyleFunctionProps) => ({
          borderColor: mode("grey.700", "grey.500")(props),
        }),
      },
    },
    Tag: {
      variants: {
        solid: (props: StyleFunctionProps) => ({
          bg: mode("gray.700", "gray.900")(props),
        }),
      },
    },
  },
  styles: {
    global: (props: StyleFunctionProps) => ({
      body: {
        bg: props.colorMode === "dark" ? "dark.background" : "light.background",
        color: props.colorMode === "dark" ? "dark.text" : "light.text",
      },
    }),
  },
});
