export type RenderAbleFile = {
  type: "file";
  name: string;
  suffix: string;
  remote: string;
  size: string;
};

type RenderAbleFolder = {
  type: "folder";
  name: string;
};

export type RenderAbleItem = RenderAbleFile | RenderAbleFolder;
