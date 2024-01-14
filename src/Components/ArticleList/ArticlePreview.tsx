import React from "react";
import { IArticle } from "../..";
import {
  Box,
  Heading,
  useColorModeValue,
  Text,
  Flex,
  Tag,
  Button,
} from "@chakra-ui/react";

interface IArticleProps {
  item: IArticle;
}

const ArticlePreview: React.FC<IArticleProps> = ({ item }) => {
  return (
    <Box
      p={5}
      width={"100%"}
      bg={useColorModeValue("light.background", "dark.background")}
      color={useColorModeValue("light.primary", "dark.primary")}
    >
      <Heading size="lg" my={2}>
        {item.title}
      </Heading>
      <Text
        noOfLines={3}
        isTruncated
        color={useColorModeValue("light.text", "dark.text")}
      >
        {item.content}
      </Text>
      <Button variant={"link"} color={"inherit"}>
        ...See more.
      </Button>
      <Flex wrap="wrap" mt={2}>
        {item.tags.map((tag) => (
          <Tag key={tag} mr={2} mb={2} colorScheme="teal">
            {tag}
          </Tag>
        ))}
      </Flex>
      <Text color={useColorModeValue("light.text", "dark.text")}>
        Author: @{item.author}
      </Text>
    </Box>
  );
};

export default ArticlePreview;
