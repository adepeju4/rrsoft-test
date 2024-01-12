import { createStore, action, Action } from "easy-peasy";
import { IArticle } from "..";

interface StoreState {
  articles: IArticle[];
  activeArticle: IArticle | null;
  changeActiveArticle: Action<StoreState, IArticle>;
}

export const store = createStore<StoreState>({
  articles: [],
  activeArticle: null,
  changeActiveArticle: action((state, payload: IArticle) => {
    state.activeArticle = payload;
  }),
});
