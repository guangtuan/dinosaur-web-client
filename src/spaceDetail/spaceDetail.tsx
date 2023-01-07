import { useEffect, useMemo, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { ReFolder, ReFile, OsFile } from './ReFile.ts'

const parent = new ReFolder(
    {
        name: 'test',
        fullpath: "/mnt/inner/test"
    }
)

const mockData = [
    new ReFile(
        {
            name: 'my heart will go on.mp3',
            fullpath: "/mnt/inner/test/my heart will go on.mp3"
        },
        parent: parent
    ),
    new ReFile(
        {
            name: 'aaa.mp3',
            fullpath: "/mnt/inner/test/aaa.mp3"
        },
        parent: parent
    )
]

const SpaceDetail = () => {
    let { spaceId } = useParams<"spaceId">();
    console.log(spaceId)

    return <div></div>
}

export default SpaceDetail

