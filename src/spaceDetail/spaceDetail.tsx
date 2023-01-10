import { useEffect, useMemo, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { ReFile, OsFile } from './ReFile'
import { List } from '@douyinfe/semi-ui';
import {
    IconMusic,
    IconImage,
    IconAlarm
} from '@douyinfe/semi-icons';

const parent: ReFile = {
    tag: "folder",
    osFile: {
        name: 'test',
        fullpath: "/mnt/inner/test"
    },
    parent: null
}

const mockData: Array<ReFile> = [
    {
        tag: "file",
        osFile: {
            name: 'my heart will go on.mp3',
            fullpath: "/mnt/inner/test/my heart will go on.mp3",
        },
        parent: parent
    },
    {
        tag: "file",
        osFile: {
            name: 'cover.jpg',
            fullpath: "/mnt/inner/test/cover.jpg",
        },
        parent: parent
    },
]

const getIcon = (osFile: OsFile) => {
    const [_, suffix] = osFile.name.split(".")
    switch (suffix) {
        case "mp3":
            return <IconMusic style={{ color: '#6A3AC7' }} />;
        case "jpg":
            return <IconImage style={{ color: '#9C27B0' }} />;
        default:
            return <IconAlarm></IconAlarm>
    }
}

const renderItem = (item: ReFile) => {
    return <List.Item>
        {getIcon(item.osFile)}
        <span style={{ paddingLeft: "8px" }}>{item.osFile.name}</span>
    </List.Item >
}

const SpaceDetail = () => {
    let { spaceId } = useParams<"spaceId">();
    console.log(spaceId)

    return <div>
        <List
            bordered
            dataSource={mockData}
            renderItem={renderItem}
        />
    </div>
}

export default SpaceDetail

