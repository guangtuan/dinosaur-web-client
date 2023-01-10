export interface OsFile {
    name: string,
    fullpath: string
}

export type ReFile = {
    tag: "file" | "folder"

    osFile: OsFile

    parent: ReFile | null
}


export type ReResource = ReFile 