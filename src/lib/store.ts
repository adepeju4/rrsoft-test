import { createStore, action, Action, persist } from "easy-peasy";
import { IArticle, IUser } from "..";

export interface IModel {
  articles: IArticle[];

  userArticles: IArticle[];
  setNewArticle: Action<IModel, IArticle>;
  fetchArticles: Action<IModel, IArticle[]>;
  users: IUser[];
  fetchUsers: Action<IModel, IUser[]>;
  searchTerm: string;
  setSearchTerm: Action<IModel, IModel["searchTerm"]>;
}

export const store = createStore<IModel>(
  persist(
    {
      articles: [],

      users: [],
      searchTerm: "",

      userArticles: [],

      setNewArticle: action((state, payload: IArticle) => {
        state.userArticles.unshift(payload);
      }),

      fetchArticles: action((state, payload: IArticle[]) => {
        state.articles = payload;
      }),

      fetchUsers: action((state, payload: IUser[]) => {
        state.users = payload;
      }),

      setSearchTerm: action((state, payload: IModel["searchTerm"]) => {
        state.searchTerm = payload;
      }),
    },
    {
      storage: "localStorage",
    },
  ),
);
