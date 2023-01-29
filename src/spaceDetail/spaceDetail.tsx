import { useEffect, useMemo, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { ReFile, ReResource, ReFolder, OsFile } from "./ReFile";
import {
  RadioGroup,
  Radio,
  Space,
  Button,
  Table
} from "@douyinfe/semi-ui";
import {
  IconMusic,
  IconImage,
  IconAlarm,
  IconFolder,
  IconPlayCircle
} from "@douyinfe/semi-icons";
import { useSearchParams } from "react-router-dom";
import { get } from "../lang/api";
import useRunOnce from "../lang/useRunOnce";

const API_RESOURCE_PREFIX = "/api/resources/";

const getFileIcon = (suffix: string) => {
  switch (suffix) {
    case "ts":
    case "mp4":
    case "rmvb":
      return <IconPlayCircle style={{ color: "#673AB7" }} />
    case "mp3":
      return <IconMusic style={{ color: "#6A3AC7" }} />;
    case "jpg":
    case "jpeg":
    case "png":
    case "webp":
    case "bmp":
      return <IconImage style={{ color: "#9C27B0" }} />;
    default:
      return <IconAlarm></IconAlarm>;
  }
};

const useResource = () => {
  const [resource, setResource] = useState<ReResource>();
  const [searchParams, setSearchParams] = useSearchParams();
  const [on, setOn] = useState<string>(searchParams.get("on") || "");

  const loadResources = async (on: string) => {
    const result = (await get({
      url: {
        base: API_RESOURCE_PREFIX,
        params: {
          on,
        },
      },
    })) as ReResource;
    setResource(result);
  };

  const runWhenMount = useRunOnce(() => loadResources(on));

  useEffect(() => runWhenMount(), /* run once */[]);

  return {
    on,
    setOn,
    resource,
    loadResources,
  };
};

type RenderAbleItem = {
  type: 'file' | 'folder',
  name: string,
  suffix: string,
}

const convert = (
  f: ReFile | ReFolder,
  index: number,
  arr: Array<ReFile | ReFolder>
): RenderAbleItem => {
  const [_, suffix] = f.osFile.name.split(".");

  return {
    type: f.tag,
    name: f.osFile.name,
    suffix: suffix || ''
  }
}

const columns = [
  {
    title: '文件',
    render: (text: string, record: RenderAbleItem, index: number) => {
      if (record.type === 'folder') {
        return (
          <Space>
            <IconFolder style={{ color: "#CDDC39" }} />
            <span style={{ paddingLeft: "8px" }}>{record.name}</span>
          </Space>
        )
      } else {
        return (
          <Space>
            {getFileIcon(record.suffix)}
            <span style={{ paddingLeft: "8px" }}>{record.name}</span>
          </Space>
        )
      }
    },
  },
  {
    title: '标记为',
    render: (text: string, record: RenderAbleItem, index: number) => {
      if (record.type === 'folder') {
        return (
          <Space>

          </Space>
        )
      } else {
        return (
          <RadioGroup
            type='button'
            buttonSize='small'
            defaultValue={1}
          >
            <Radio value={1}>剧集</Radio>
            <Radio value={2}>电影</Radio>
            <Radio value={3}>图片</Radio>
            <Radio value={4}>音乐</Radio>
          </RadioGroup>
        )
      }
    },
  },
  {
    title: '操作',
    render: (text: string, record: RenderAbleItem, index: number) => {
      if (record.type === 'folder') {
        return (
          <Space>

          </Space>
        )
      } else {
        return (
          <Space>
            <Button type="secondary">播放</Button>
          </Space>
        )
      }
    },
  }
]

/**
 * url: space/63c249e21a2c97e086b4bdda?on=C:%5CUsers%5Cgrant%5CPictures
 * url: space/${spaceId}?on=${on}
 *
 * 拿这个 on 去发请求，列出 on 下边的数据
 */
const SpaceDetail = () => {
  let { spaceId } = useParams<"spaceId">();
  let { resource } = useResource();
  console.log(spaceId);

  return (
    <div>
      <Table
        pagination={false}
        dataSource={(resource?.children || []).map(convert)}
        columns={columns}
      />
    </div>
  );
};

export default SpaceDetail;
