export interface IArticle {
  id: string;
  contentType: string;
  title: string;
  author: string;
  articleRef: string;
  attorneyName: string;
  attorneyEmail: string;
  content: string;
  tags: Array<string>;
  userId: string;
}

export interface IComment {
  id: number;
  body: string;
  userId: number;
  articleId: number;
  postedDate: Date;
}

export interface IUser {
  id: number;
  name: string;
  username: string;
  email: string;
  address: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: {
      lat: string;
      lng: string;
    };
  };
  phone: string;
  website: string;
  company: {
    name: string;
    catchPhrase: string;
    bs: string;
  };
}
