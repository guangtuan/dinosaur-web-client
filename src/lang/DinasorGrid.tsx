import { useEffect, useState } from "react";
import chunk from "./chunk";
import { Row, Col } from "@douyinfe/semi-ui";
import { WithId } from "./WithId";

type empty = () => JSX.Element;

export type GridProps<T extends WithId> = {
  data: Array<T>;
  size: number;
  render: (element: T) => JSX.Element;
  onEmpty: empty | undefined;
};

const onEmpty = (handler: empty | undefined) => {
  if (handler) {
    return handler();
  } else {
    return <div></div>;
  }
};

const DinasorGrid = <T extends WithId>(props: GridProps<T>) => {
  return props.data.length === 0 ? (
    onEmpty(props.onEmpty)
  ) : (
    <div>
      {chunk(props.data, props.size).map((rows, rowIndex) => {
        return (
          <Row key={`row-${rowIndex}`} gutter={[8, 8]}>
            {rows.map((ele: T) => (
              <Col span={6} style={{ maxWidth: 720 }} key={`wrapper-${ele.id}`}>
                {props.render(ele)}
              </Col>
            ))}
          </Row>
        );
      })}
    </div>
  );
};

export default DinasorGrid;
