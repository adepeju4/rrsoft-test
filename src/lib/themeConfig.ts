import { extendTheme, StyleFunctionProps, ThemeConfig } from "@chakra-ui/react";

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
    light: {
      background: "#f5f5f5",
      text: "#424242",
      primary: "#6EEB83",
    },
    dark: {
      background: "#212121",
      text: "#f5f5f5",
      primary: "#6EEB83",
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
      },
    },
  },
  styles: {
    global: (props: StyleFunctionProps) => {
      console.log(props, "props");
      return {
        body: {
          bg:
            props.colorMode === "dark" ? "dark.background" : "light.background",
          color: props.colorMode === "dark" ? "dark.text" : "light.text",
        },
      };
    },
  },
});
