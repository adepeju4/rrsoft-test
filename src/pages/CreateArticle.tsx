import { Box, Flex } from "@chakra-ui/react";
import typewriter from "../assets/images/typewriter.jpg";
import CreateArticleForm from "../Components/CreateArticle/CreateArticleForm";
import BreadcrumbNav from "../Components/CreateArticle/BreadcrumbNav";

function CreateArticle() {
  return (
    <Flex
      height={"100vh"}
      width={"100vw"}
      overflow={"hidden"}
      position={"relative"}
    >
      <BreadcrumbNav />
      <Flex
        height={"100%"}
        width={"100%"}
        justifyContent={"center"}
        flexDirection={{ base: "column", lg: "row" }}
      >
        <Flex
          backgroundImage={typewriter}
          backgroundSize={"cover"}
          backgroundPosition={"center"}
          backgroundRepeat={"no-repeat"}
          position={"relative"}
          flex={{ base: 0.2, lg: 0.3 }}
        >
          <Box
            position={"absolute"}
            width={"100%"}
            height={"100%"}
            bg={"rgba(0,0,0,.5)"}
          ></Box>
        </Flex>
        <Box
          flex={{ base: 0.8, lg: 0.7 }}
          display={"flex"}
          width="100%"
          justifyContent={"center"}
          alignItems={"center"}
          overflowY={"scroll"}
          paddingLeft={{ base: "10px", lg: "0" }}
        >
          <Flex
            height={"100%"}
            width={{ base: "auto", lg: "600px" }}
            alignItems={"center"}
          >
            <CreateArticleForm />
          </Flex>
        </Box>
      </Flex>
    </Flex>
  );
}

export default CreateArticle;
