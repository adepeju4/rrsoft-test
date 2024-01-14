import {
  Box,
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Select,
  Spinner,
  Textarea,
} from "@chakra-ui/react";
import { ChangeEvent, useState, useEffect, FormEvent } from "react";
import { IArticle } from "../..";
import baseUrl from "../../utils/baseUrl";
import { useCustomToast } from "../../lib/hooks";
import { Actions, useStoreActions } from "easy-peasy";
import { IModel } from "../../lib/store";
import { useNavigate } from "react-router-dom";
import TagInput from "./TagInput";
import { v4 as uuidv4 } from "uuid";

interface IFormError {
  contentType: boolean;
  title: boolean;
  author: boolean;
  articleRef: boolean;
  attorneyName: boolean;
  attorneyEmail: boolean;
  content: boolean;
}

enum contenTypeEnum {
  Law = "Law",
  Standard = "Standard",
}

enum descriptionLimitEnum {
  Law = 250,
  Standard = 600,
}

function CreateArticleForm() {
  const showToast = useCustomToast();

  const setNewArticle = useStoreActions(
    (actions: Actions<IModel>) => actions.setNewArticle,
  );
  const navigate = useNavigate();
  const [descriptionType, setDescriptionType] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [data, setData] = useState<IArticle | null>(null);
  const [error, setError] = useState<string>("");
  const [invalidReference, setInvalidReference] = useState<boolean>(false);
  const [wordCount, setWordCount] = useState<number>(0);

  const [formError, setFormError] = useState({
    contentType: false,
    title: false,
    author: false,
    articleRef: false,
    attorneyName: false,
    attorneyEmail: false,
    content: false,
  });

  const [article, setArticle] = useState<IArticle>({
    id: uuidv4(),
    userId: uuidv4(),
    contentType: contenTypeEnum.Standard,
    title: "",
    author: "",
    articleRef: "",
    attorneyName: "",
    attorneyEmail: "",
    content: "",
    tags: [],
  });

  const defaultLawTag = "#Law";

  function handleInputChange(
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
    target: keyof IArticle,
  ) {
    const { value } = e.target;

    if (target === "contentType") {
      const updatedTags = new Set(article.tags);
      if (value === contenTypeEnum.Law) {
        updatedTags.add(defaultLawTag);
      } else {
        updatedTags.delete(defaultLawTag);
      }

      setArticle({
        ...article,
        contentType: value,
        tags: [...updatedTags],
      });
    } else {
      setArticle({
        ...article,
        [target]: value,
      });
    }

    if (target === "content") {
      const splitted = value.trim().split(" ");
      setWordCount(splitted.length === 1 && !splitted[0] ? 0 : splitted.length);
    }

    if (target === "articleRef") {
      const validRef = isValidHttpsUrl(value);

      if (!validRef) {
        setInvalidReference(true);
      } else setInvalidReference(false);
    }
  }

  function handleFormError(
    target: keyof IFormError,
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
  ) {
    const { value } = e.target;
    setFormError({
      ...formError,
      [target]: value ? false : true,
    });
  }

  function isContentInvalid() {
    if (article.contentType === contenTypeEnum.Law) {
      return wordCount > 250;
    }
    return wordCount > 600;
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setIsLoading(true);

    if (article.contentType === contenTypeEnum.Standard) {
      setArticle({
        ...article,
        articleRef: "",
        attorneyEmail: "",
        attorneyName: "",
      });
    }

    await fetch(baseUrl + "posts", {
      method: "POST",
      body: JSON.stringify(article),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((res) => {
        if (res.status > 399 && res.status < 200) {
          setError("Something unexpected happened");
        }
        return res.json();
      })
      .then((dt) => {
        if (dt) {
          setData(dt);
          setIsLoading(false);
        }
      });
  }

  function isValidHttpsUrl(value: IArticle["articleRef"]) {
    const regex = /^https:\/\/[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}(\/.*)?$/;
    return regex.test(value);
  }

  useEffect(() => {
    if (article.contentType === contenTypeEnum.Law)
      setDescriptionType("Law Article Snippet");
    else setDescriptionType("Description");
  }, [article]);

  useEffect(() => {
    if (error) showToast(error, "error");
  }, [error, showToast]);

  useEffect(() => {
    console.log(article, "mmm");
    if (data) {
      setNewArticle(article);
      navigate("/");
    }
  }, [data, article, setNewArticle, navigate]);

  return (
    <form onSubmit={handleSubmit} className="fixedHeightForm">
      <FormControl isInvalid={formError.contentType}>
        <FormLabel>
          Content Type
          <Select
            isRequired
            title="Content-Type"
            placeholder=" Select the type of content you want to create."
            onChange={(e) => handleInputChange(e, "contentType")}
            onBlur={(e) => handleFormError("contentType", e)}
          >
            <option value={contenTypeEnum.Law}>Law</option>
            <option value={contenTypeEnum.Standard}>Standard</option>
          </Select>
        </FormLabel>

        <Box minH="20px">
          {formError.contentType && (
            <FormErrorMessage>Content Type is required.</FormErrorMessage>
          )}
        </Box>
      </FormControl>

      <FormControl isInvalid={formError.title}>
        <FormLabel>
          Title
          <Input
            type="text"
            value={article.title}
            isRequired
            onChange={(e) => handleInputChange(e, "title")}
            onBlur={(e) => handleFormError("title", e)}
            placeholder="Enter the title of the article."
          />
        </FormLabel>
        <Box minH="20px">
          {formError.title && (
            <FormErrorMessage>Title is required.</FormErrorMessage>
          )}
        </Box>
      </FormControl>

      <FormControl isInvalid={formError.author}>
        <FormLabel>
          Author
          <Input
            type="text"
            value={article.author}
            isRequired
            onChange={(e) => handleInputChange(e, "author")}
            onBlur={(e) => handleFormError("author", e)}
            placeholder="Enter Your Full Name"
          />
        </FormLabel>
        <Box minH="20px">
          {formError.author && (
            <FormErrorMessage>Author name is required.</FormErrorMessage>
          )}
        </Box>
      </FormControl>

      {article.contentType === contenTypeEnum.Law && (
        <>
          <FormControl isInvalid={formError.attorneyName}>
            <FormLabel>
              Attorney Name
              <Input
                type="text"
                value={article.attorneyName}
                isRequired
                onChange={(e) => handleInputChange(e, "attorneyName")}
                onBlur={(e) => handleFormError("attorneyName", e)}
                placeholder="Enter Full Name of Attorney"
              />
            </FormLabel>
            <Box minH="20px">
              {formError.attorneyName && (
                <FormErrorMessage>Attorney name is required.</FormErrorMessage>
              )}
            </Box>
          </FormControl>

          <FormControl isInvalid={formError.attorneyEmail}>
            <FormLabel>
              Attorney Email
              <Input
                type="text"
                value={article.attorneyEmail}
                isRequired
                onChange={(e) => handleInputChange(e, "attorneyEmail")}
                onBlur={(e) => handleFormError("attorneyEmail", e)}
                placeholder="Enter Attorney's Email"
              />
            </FormLabel>
            <Box minH="20px">
              {formError.attorneyEmail && (
                <FormErrorMessage>Attorney email is required.</FormErrorMessage>
              )}
            </Box>
          </FormControl>

          <FormControl isInvalid={formError.articleRef || invalidReference}>
            <FormLabel>
              Law Article Reference
              <Input
                type="text"
                value={article.articleRef}
                isRequired
                onChange={(e) => handleInputChange(e, "articleRef")}
                onBlur={(e) => handleFormError("articleRef", e)}
                placeholder="Enter link to law article"
              />
            </FormLabel>
            <Box minH="20px">
              {formError.articleRef && (
                <FormErrorMessage>
                  Article Reference is required.
                </FormErrorMessage>
              )}
              {invalidReference && (
                <FormErrorMessage>
                  Article Reference must be a valid link.
                </FormErrorMessage>
              )}
            </Box>
          </FormControl>
        </>
      )}

      <FormControl
        isInvalid={formError.content || isContentInvalid()}
        position={"relative"}
      >
        <FormLabel>
          {descriptionType}
          <Textarea
            variant={"outline"}
            value={article.content}
            isRequired
            onChange={(e) => handleInputChange(e, "content")}
            onBlur={(e) => handleFormError("content", e)}
          />
          <Box position={"absolute"} bottom={"0"} right={"12px"}>
            {wordCount}/
            {article.contentType === contenTypeEnum.Law
              ? descriptionLimitEnum.Law
              : descriptionLimitEnum.Standard}
          </Box>
        </FormLabel>
        <Box minH="20px">
          {formError.content && (
            <>
              <FormErrorMessage>
                {descriptionType} is required.
              </FormErrorMessage>
              <FormErrorMessage paddingBottom={"10px"}>
                {article.contentType === contenTypeEnum.Law &&
                  descriptionType + " should also be less than 250 words."}
              </FormErrorMessage>
            </>
          )}
        </Box>
      </FormControl>

      <TagInput article={article} setArticle={setArticle} />

      <Flex justifyContent={"center"} width={"100%"} padding={"20px"}>
        <Button
          type="submit"
          variant={"custom"}
          isLoading={isLoading}
          size={"md"}
        >
          {isLoading ? <Spinner /> : "Submit"}
        </Button>
      </Flex>
    </form>
  );
}

export default CreateArticleForm;
