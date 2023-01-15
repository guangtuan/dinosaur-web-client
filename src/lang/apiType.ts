export type Url = {
  base: string;
  params?: object;
};

export type PostContext = {
  url: Url;
  body: any;
};

export type PutContext = {
  url: Url;
  body: any;
};

export type GetContext = {
  url: Url;
};
