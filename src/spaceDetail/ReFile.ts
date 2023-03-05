export type FileSize = {
  origin: number;

  readable: string;
};

export type OsFile = {
  size: FileSize;
  name: string;
  fullpath: string;
};

export type ReFile = {
  tag: "file";

  osFile: OsFile;

  remote: string;
};

export type ReFolder = {
  tag: "folder";

  osFile: OsFile;
};

export type ReResource = {
  on: string;
  children: Array<ReFolder | ReFile>;
};
