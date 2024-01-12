export interface IArticle {
  id: number;
  title: string;
  body: string;
  userId: number;
  publishedDate?: Date;
  lastModified?: Date;
  comments?: IComment[];
}

export interface IComment {
  id: number;
  body: string;
  userId: number;
  articleId: number;
  postedDate: Date;
}
