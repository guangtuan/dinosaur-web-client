import { useEffect, useMemo, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { ReFile, OsFile, ReResource, ReFolder } from "./ReFile";
import { List } from "@douyinfe/semi-ui";
import { IconMusic, IconImage, IconAlarm } from "@douyinfe/semi-icons";
import { useSearchParams } from "react-router-dom";
import { get } from "../lang/api";
import useRunOnce from "../lang/useRunOnce";

const API_RESOURCE_PREFIX = "/api/resources/";

const getIcon = (osFile: OsFile) => {
  const [_, suffix] = osFile.name.split(".");
  switch (suffix) {
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

  useEffect(() => runWhenMount(), /* run once */ []);

  return {
    on,
    setOn,
    resource,
    loadResources,
  };
};

const renderItem = (item: ReFile | ReFolder) => {
  return (
    <List.Item>
      {getIcon(item.osFile)}
      <span style={{ paddingLeft: "8px" }}>{item.osFile.name}</span>
    </List.Item>
  );
};

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
      <List
        bordered
        dataSource={resource?.children || []}
        renderItem={renderItem}
      />
    </div>
  );
};

export default SpaceDetail;
