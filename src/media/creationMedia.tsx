import { Modal, Form, Input, Button, Divider } from "@douyinfe/semi-ui";
import { Pack } from "./model";
import { assoc } from "ramda";
import { Dispatch } from "react";
import { Rating } from "@douyinfe/semi-ui";
import { IconStar } from "@douyinfe/semi-icons";

type MyProp = {
  pack: Pack;
  setPack: Dispatch<Pack>;
};

const CreationMedia = (p: MyProp) => {
  const { pack, setPack } = p;
  const st = { fontSize: 24 };
  return (
    <Modal
      onOk={() => {
        console.log("save");
        // TODO: call and create
        setPack(assoc("c", false, pack));
      }}
      onCancel={() => {
        console.log("cancel");
        setPack(assoc("c", false, pack));
      }}
      visible={true}
    >
      <Form>
        <Divider />
        <Input
          style={st}
          placeholder="name"
          value={pack.name}
          onChange={(v) => setPack(assoc("name", v, pack))}
        ></Input>
        <Divider />
        <Input
          style={assoc("marginTop", "8px", st)}
          placeholder="cover"
          value={pack.cover}
          onChange={(v) => setPack(assoc("cover", v, pack))}
        ></Input>
        <Divider />
        <Rating
          value={pack.rating || 0}
          style={{ color: "rgba(var(--semi-blue-5), 1)", marginTop: "8px" }}
          size={48}
          allowHalf
          character={<IconStar style={st} />}
          onChange={(v) => setPack(assoc("rating", v, pack))}
        />
      </Form>
    </Modal>
  );
};

export default CreationMedia;
