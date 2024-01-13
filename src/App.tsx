import { store } from "./lib/store";
import { StoreProvider } from "easy-peasy";
import { ChakraProvider } from "@chakra-ui/react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import ArticleList from "./pages/ArticleList";
import CreateArticle from "./pages/createArticle";
import Error404 from "./pages/404";
import themeConfig from "./lib/themeConfig";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <ArticleList />,
    },
    {
      path: "/create",
      element: <CreateArticle />,
    },
    {
      path: "/*",
      element: <Error404 />,
    },
  ]);

  return (
    <ChakraProvider theme={themeConfig}>
      <StoreProvider store={store}>
        <RouterProvider router={router} />
      </StoreProvider>
    </ChakraProvider>
  );
}

export default App;
