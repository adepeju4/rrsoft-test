import { useToast } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import tags from "../utils/randomTags";

import { IArticle, IUser } from "..";
import { v4 as uuidv4 } from "uuid";

type ToastType = "success" | "error";
export interface IJSONPlaceholderPost {
  userId: string;
  id: number;
  title: string;
  body: string;
}

const useFetch = <T>(url: string) => {
  const [data, setData] = useState<T[]>([]);
  const [isPending, setIsPending] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(url, {
      method: "GET",
      // credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        if (res.status > 399 && res.status < 200) {
          throw new Error("could not fetch data");
        }
        console.log(res);
        return res.json();
      })

      .then((data) => {
        if (data) {
          setData(data);
          setIsPending(false);
          setError(null);
        }
      })
      .catch((err) => {
        setError(err.message);
        setIsPending(false);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [url]);

  return { data, isPending, error };
};

export const useCustomToast = () => {
  const toast = useToast();

  const showToast = (message: string, type: ToastType) => {
    toast({
      title: type === "success" ? "Success" : "Error",
      description: message,
      status: type,
      duration: 5000,
      isClosable: true,
      position: "top-right",
    });
  };

  return showToast;
};

export function transformJsonData(
  data: IJSONPlaceholderPost[],
  users: IUser[],
) {
  console.log(users, "users HEREEEE");
  const contentTypes = ["Law", "Standard"];

  let contentType = contentTypes[0];
  return data.map((item) => {
    contentType = contentTypes[Math.floor(Math.random() * contentTypes.length)];
    const article: IArticle = {
      id: uuidv4(),
      contentType,
      title: item.title || "",
      author:
        users.find(
          (user: IUser) => user.id.toString() === item.userId.toString(),
        )?.name || item.id.toString(),
      articleRef: "",
      attorneyName: "",
      attorneyEmail: "",
      content: item.body || "",
      tags: getRandomTags(contentType),
      userId: item.userId,
    };
    return article;
  });
}
function getRandomTags(contentType: string) {
  const numberOfTags = Math.floor(Math.random() * tags.length);
  const randomTags = new Set();

  for (let i = 0; i < numberOfTags; i++) {
    const randomIndex = Math.floor(Math.random() * tags.length);
    randomTags.add(tags[randomIndex]);
  }

  if (contentType === "Law") {
    randomTags.add("#Law");
  }

  return [...randomTags] as string[];
}

export default useFetch;
