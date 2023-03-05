import { useEffect, useState } from "react";
import { ReFile, ReFolder, ReResource } from "./ReFile";
import { Button, Radio, RadioGroup, Space, Table } from "@douyinfe/semi-ui";
import {
  IconAlarm,
  IconFolder,
  IconImage,
  IconMusic,
  IconPlayCircle,
  IconText,
} from "@douyinfe/semi-icons";
import { useSearchParams } from "react-router-dom";
import { get } from "../lang/api";
import useRunOnce from "../lang/useRunOnce";
import { RenderAbleItem } from "./renderAbleFile";
import last from "../lang/array";

const API_RESOURCE_PREFIX = "/api/resources/";

const getFileIcon = (suffix: string) => {
  switch (suffix) {
    case "ts":
    case "mp4":
    case "rmvb":
    case "mkv":
      return <IconPlayCircle style={{ color: "#673AB7" }} />;
    case "mp3":
      return <IconMusic style={{ color: "#6A3AC7" }} />;
    case "jpg":
    case "jpeg":
    case "png":
    case "webp":
    case "bmp":
      return <IconImage style={{ color: "#9C27B0" }} />;
    case "ass":
      return <IconText></IconText>;
    default:
      return <IconAlarm></IconAlarm>;
  }
};

const useResource = () => {
  const [resource, setResource] = useState<ReResource>();
  const [searchParams, setSearchParams] = useSearchParams();
  const [on, setOn] = useState<string>(searchParams.get("on") || "");
  const [space, setSpace] = useState<string>(searchParams.get("space") || "");

  const loadResources = async (on: string) => {
    const result = (await get({
      url: {
        base: API_RESOURCE_PREFIX,
        params: {
          on,
          space,
        },
      },
    })) as ReResource;
    setResource(result);
  };

  const runWhenMount = useRunOnce(() => loadResources(on));

  useEffect(() => runWhenMount(), /* run once */ []);

  return {
    on,
    setOn,
    resource,
    loadResources,
  };
};

const convert = (
  f: ReFile | ReFolder,
  index: number,
  arr: Array<ReFile | ReFolder>
): RenderAbleItem => {
  const suffix = last(f.osFile.name.split("."));

  if (f.tag === "file") {
    return {
      type: f.tag,
      name: f.osFile.name,
      suffix: suffix,
      remote: f.remote,
      size: f.osFile.size.readable,
    };
  } else {
    return {
      type: f.tag,
      name: f.osFile.name,
    };
  }
};

const columns = [
  {
    title: "文件",
    render: (text: string, record: RenderAbleItem, index: number) => {
      if (record.type === "folder") {
        return (
          <Space>
            <IconFolder style={{ color: "#CDDC39" }} />
            <span style={{ paddingLeft: "8px" }}>{record.name}</span>
          </Space>
        );
      } else {
        return (
          <Space>
            {getFileIcon(record.suffix)}
            <span style={{ paddingLeft: "8px" }}>{record.name}</span>
          </Space>
        );
      }
    },
  },
  {
    title: "标记为",
    render: (text: string, record: RenderAbleItem, index: number) => {
      if (record.type === "folder") {
        return <Space></Space>;
      } else {
        return (
          <RadioGroup type="button" buttonSize="small" defaultValue={1}>
            <Radio value={1}>剧集</Radio>
            <Radio value={2}>电影</Radio>
            <Radio value={3}>图片</Radio>
            <Radio value={4}>音乐</Radio>
          </RadioGroup>
        );
      }
    },
  },
  {
    title: "操作",
    render: (text: string, record: RenderAbleItem, index: number) => {
      if (record.type === "folder") {
        return <Space></Space>;
      } else {
        return (
          <Space>
            <Button
              type="secondary"
              onClick={() => {
                window.open("potplayer://" + record.remote);
              }}
            >
              使用 potPlayer 播放
            </Button>
          </Space>
        );
      }
    },
  },
];

/**
 * url: space/63c249e21a2c97e086b4bdda?on=C:%5CUsers%5Cgrant%5CPictures
 * url: space/${spaceId}?on=${on}
 *
 * 拿这个 on 去发请求，列出 on 下边的数据
 */
const SpaceDetail = () => {
  let { resource } = useResource();

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
