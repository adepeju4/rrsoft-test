import { useEffect, useState } from "react";
import useFetch, {
  IJSONPlaceholderPost,
  transformJsonData,
} from "../../lib/hooks";
import baseUrl from "../../utils/baseUrl";
import { useStoreState } from "easy-peasy";
import { IModel } from "../../lib/store";
import { Flex, Spinner, VStack, Text } from "@chakra-ui/react";
import ArticlePreview from "./ArticlePreview";
import { Actions, useStoreActions } from "easy-peasy";
import { IArticle, IUser } from "../..";
import Nav from "./Nav";

function Articles() {
  const setArticles = useStoreActions(
    (actions: Actions<IModel>) => actions.fetchArticles,
  );

  const setUsers = useStoreActions(
    (actions: Actions<IModel>) => actions.fetchUsers,
  );

  const articles = useStoreState((state: IModel) => state.articles);
  const userArticles = useStoreState((state: IModel) => state.userArticles);
  const searchTerm = useStoreState((state: IModel) => state.searchTerm);

  const [filteredArticles, setFilteredArticles] = useState<IArticle[]>([]);
  const [dataParserLoading, setdataParserLoading] = useState<boolean>(false);
  const [anyLoading, setAnyLoading] = useState<boolean>(false);
  const { isPending: dataIsPending, data } = useFetch<IJSONPlaceholderPost>(
    baseUrl + "posts",
  );
  const { isPending: usersPending, data: users } = useFetch<IUser>(
    baseUrl + "users",
  );

  function handleSearch() {
    const filtered = articles.filter(
      (article) =>
        article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        article.author.toLowerCase().includes(searchTerm.toLowerCase()),
    );

    setFilteredArticles(filtered);
  }

  useEffect(() => {
    setAnyLoading(dataIsPending || usersPending || dataParserLoading);
  }, [dataParserLoading, dataIsPending, usersPending]);

  useEffect(() => {
    if (users && data) {
      setdataParserLoading(true);
      let newData: IArticle[] = transformJsonData(data, users);

      if (userArticles.length) {
        newData = [...userArticles, ...newData];
      }
      setArticles(newData);
      setFilteredArticles(newData);
      setdataParserLoading(false);
    }
  }, [data, users, setArticles, userArticles]);

  useEffect(() => {
    if (users) {
      setUsers(users);
    }
  }, [users, setUsers]);

  return anyLoading ? (
    <Flex
      width={"100vw"}
      height={"100vh"}
      justifyContent={"center"}
      alignItems={"center"}
    >
      <Spinner />
    </Flex>
  ) : (
    <Flex width={"100vw"} height={"100vh"} flexDirection={"column"}>
      <Nav handleSearch={handleSearch} />
      <VStack overflowY="auto">
        {filteredArticles.length ? (
          filteredArticles.map((article) => {
            return <ArticlePreview item={article} key={article.id} />;
          })
        ) : (
          <Text> Welp! there's nothing here </Text>
        )}
      </VStack>
    </Flex>
  );
}

export default Articles;
