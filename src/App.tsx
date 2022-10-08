import { useRef, useState } from "react";
import { Card, Col, Row, Input, Button, Empty } from "@douyinfe/semi-ui";
import "./App.css";
import { load, type ReSpace } from "./space";

const chunk = (arr: Array<ReSpace>, size: number): Array<Array<ReSpace>> => {
  const ret = [];
  for (let i = 0; i < arr.length; i = i + size) {
    ret.push([...arr.slice(i, i + size)]);
  }
  return ret;
};

const useSpaces = () => {
  const [spaces, setSpaces] = useState<Array<ReSpace>>([]);

  const loadAndSet = () => load()
    .then(setSpaces)
    .catch(console.log.bind(console, "space load error"))

  const loadedFlag = useRef<Promise<void> | undefined>(undefined)
  if (!loadedFlag.current) {
     loadedFlag.current = loadAndSet()
  }

  const modify = (id: string) => {
    return (over: (it: ReSpace) => ReSpace) => setSpaces(
      (prev) => prev.map(it => it._id === id ? over(it) : it)
    )
  }

  const saveNewSpace = (ele: ReSpace) => {
    fetch(`api/space/${ele._id}`, {
      method: "put",
      body: JSON.stringify(ele),
    })
      .then(loadAndSet, console.log.bind(console, "save space error"))
  }

  const _postNewSpace = (_ele: Partial<ReSpace>) => {
    throw new Error('does not implement')
  }

  return { spaces, setSpaces, modify, saveNewSpace }
}

function App() {
  const { spaces, modify: modifySpace, saveNewSpace: save } = useSpaces();
  const [editing, setEditing] = useState<string>();

  const handleChange = (id: string) => (eventValue: string) => {
    modifySpace(id)(
      it => ({ ...it, physicsPath: eventValue })
    )
  };

  return (
    <div className="App">
      {spaces.length > 0 ? (
        chunk(spaces, 4).map((rows, rowIndex) => {
          return (
            <Row key={`row-${rowIndex}`} gutter={[8, 8]}>
              {rows.map((ele) => {
                return (
                  <Col
                    span={6}
                    style={{ maxWidth: 720 }}
                    key={`wrapper-${ele._id}`}
                  >
                    <Card
                      bordered={true}
                      headerLine={true}
                      title={ele.name}
                      key={`card-${ele._id}`}
                    >
                      <Input
                        value={ele.physicsPath || ""}
                        onFocus={() => {
                          setEditing(ele._id);
                        }}
                        onChange={handleChange(ele._id)}
                      ></Input>
                      <Row gutter={[8, 8]} style={{ marginTop: 16 }}>
                        <Col span={12}>
                          <Button>view</Button>
                        </Col>
                        {editing === ele._id && (
                          <Col span={12}>
                            <Button onClick={() => save(ele)}>save</Button>
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
          <div>
            <Button
              style={{ margin: "8px", padding: "6px 24px" }}
              theme="solid"
              type="primary"
            >
              新建一个
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
