import {
  Flex,
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
  Tag,
  TagCloseButton,
  TagLabel,
} from "@chakra-ui/react";
import { ChangeEvent, useState } from "react";
import { IArticle } from "../..";

interface ITagInputProps {
  article: IArticle;
  setArticle: React.Dispatch<React.SetStateAction<IArticle>>;
}

const TagInput: React.FC<ITagInputProps> = ({ article, setArticle }) => {
  const [inputValue, setInputValue] = useState<string>("");

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();

      if (inputValue && !article.tags.includes(inputValue.trim())) {
        const updatedTags = new Set(article.tags);
        updatedTags.add("#" + inputValue.trim());
        setArticle({ ...article, tags: [...updatedTags] });
        setInputValue("");
      }
    }
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const removeTag = (tagToRemove: string) => {
    const updatedTags = new Set(...article.tags);
    updatedTags.delete(tagToRemove);
    setArticle({ ...article, tags: [...updatedTags] });
  };

  return (
    <FormControl>
      <FormLabel>
        Tags
        <Input
          value={inputValue}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          placeholder="Enter tags"
          mt={2}
        />
        <FormHelperText>Press Enter</FormHelperText>
        <Flex wrap="wrap" gap={2} minH={"40px"} paddingTop={"10px"}>
          {[...article.tags].map((tag, index) => (
            <Tag size="md" key={index} borderRadius="full" variant={"solid"}>
              <TagLabel>{tag}</TagLabel>
              {tag !== "#Law" && (
                <TagCloseButton onClick={() => removeTag(tag)} />
              )}
            </Tag>
          ))}
        </Flex>
      </FormLabel>
    </FormControl>
  );
};

export default TagInput;
