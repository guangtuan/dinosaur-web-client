import { useEffect, useState } from "react";
import { Card, Col, Row, Input, Button, Empty, Toast } from "@douyinfe/semi-ui";
import "./spaceEntry.css";
import { SpaceCreation, type SpaceVo } from "./space";
import { Link } from "react-router-dom";
import useRunOnce from "../lang/useRunOnce";
import chunk from "../lang/chunk";
import { get, post, put } from "../lang/api";

/**
 * 获得已经定义好的 space 的状态
 */
const useSpaces = () => {
  const [spaces, setSpaces] = useState<Array<SpaceVo>>([]);

  const getLastedSpaces = async () => {
    const result = (await get({
      url: {
        base: "/api/space",
        params: {},
      },
    })) as Array<SpaceVo>;
    setSpaces(result || []);
  };

  const runWhenMount = useRunOnce(() => getLastedSpaces());

  useEffect(() => runWhenMount(), /* run once */ []);

  const [editingId, setEditingId] = useState<string>();

  const modifyInLocal =
    (id: string) => (fn: (prevData: SpaceVo) => SpaceVo) => {
      setSpaces((it) => it.map((it) => (it.id === id ? fn(it) : it)));
    };

  const updateToServer = async (data: SpaceVo) => {
    await put({
      url: {
        base: `api/space/${data.id}`,
      },
      body: data,
    });
    await getLastedSpaces();
  };

  return {
    spaces,
    getLastedSpaces,
    modifyInLocal,
    updateToServer,
    editingId,
    setEditingId,
  };
};

/**
 * 创建新 space
 */
const useCreatingSpace = () => {
  const empty: SpaceCreation = { name: "", physicsPath: "" };
  const [pack, setPack] = useState<SpaceCreation>({
    name: "",
    physicsPath: "",
  });

  const startCreating = () => setPack(empty);

  const postToServer = async () => {
    await post({
      url: {
        base: `/api/space`,
      },
      body: pack,
    });
    setPack({ name: "", physicsPath: "" });
  };

  return { startCreating, pack, setPack, postToServer };
};

function SpaceEntry() {
  const {
    spaces,
    getLastedSpaces,
    modifyInLocal,
    updateToServer,
    editingId,
    setEditingId,
  } = useSpaces();

  const { startCreating, pack, setPack, postToServer } = useCreatingSpace();

  const doUpdate = async (e: SpaceVo) => {
    await updateToServer(e);
    await getLastedSpaces();
  };

  const doCreate = async () => {
    await postToServer();
    await getLastedSpaces();
  };

  const modifyPhysicsPathOfExistSpace =
    (id: string) => (eventValue: string) => {
      modifyInLocal(id)((space) => ({ ...space, physicsPath: eventValue }));
    };

  return (
    <div className="App" style={{ width: 1280 }}>
      {spaces.length > 0 ? (
        chunk(spaces, 4).map((rows, rowIndex) => {
          return (
            <Row key={`row-${rowIndex}`} gutter={[8, 8]}>
              {rows.map((ele) => {
                return (
                  <Col
                    span={6}
                    style={{ maxWidth: 720 }}
                    key={`wrapper-${ele.id}`}
                  >
                    <Card
                      bordered={true}
                      headerLine={true}
                      title={ele.name}
                      key={`card-${ele.id}`}
                    >
                      <Input
                        value={ele.physicsPath}
                        onFocus={() => {
                          setEditingId(ele.id);
                        }}
                        onChange={modifyPhysicsPathOfExistSpace(ele.id)}
                      ></Input>
                      <Row gutter={[8, 8]} style={{ marginTop: 16 }}>
                        <Col span={12}>
                          <Link
                            to={`spaceDetail?space=${ele.name}&on=${ele.physicsPath}`}
                          >
                            <Button>view</Button>
                          </Link>
                        </Col>
                        {editingId === ele.id && (
                          <Col span={12}>
                            <Button onClick={() => doUpdate(ele)}>save</Button>
                          </Col>
                        )}
                      </Row>
                    </Card>
                  </Col>
                );
              })}
            </Row>
          );
        })
      ) : (
        <div>
          <Empty title={"没有空间数据"} description="暂时没有任何的空间" />
        </div>
      )}
      <div style={{ margin: "8px", padding: "6px 24px" }}>
        {pack && (
          <div>
            <Input
              placeholder="起个名字吧"
              value={pack.name}
              onChange={(value) => setPack({ ...pack, name: value })}
            ></Input>
            <Input
              style={{ marginTop: "8px" }}
              placeholder="输入物理路径"
              value={pack.physicsPath}
              onChange={(value) => setPack({ ...pack, physicsPath: value })}
            ></Input>
            <Button
              style={{ margin: "8px", padding: "6px 24px" }}
              theme="solid"
              type="primary"
              onClick={doCreate}
            >
              保存
            </Button>
          </div>
        )}
      </div>
      {!pack && (
        <Button
          disabled={!!pack}
          style={{ margin: "8px", padding: "6px 24px" }}
          theme="solid"
          type="primary"
          onClick={startCreating}
        >
          新建一个
        </Button>
      )}
    </div>
  );
}

export default SpaceEntry;
