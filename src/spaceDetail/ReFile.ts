interface OsFile {
    name: string,
    fullpath: string
}

export class ReFile {
    tag: string = "file"

    osFile: OsFile
    
    parent: ReFolder

    constructor(
        osFile : OsFile,
        parent: ReFolder,
    ) {
        this.osFile = osFile
        this.parent = parent
    }
}

export class ReFolder {
    tag: string = "folder"

    osFile: OsFile

    constructor(osFile: OsFile) {
        this.osFile = osFile
    }
}

export OsFile

export type ReResource = ReFile | ReFolder 