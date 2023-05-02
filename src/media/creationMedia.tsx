import { Modal, Form, Input, Divider } from "@douyinfe/semi-ui";
import { Pack } from "./model";
import { assoc } from "ramda";
import { useState, Dispatch, SetStateAction } from "react";
import { Rating } from "@douyinfe/semi-ui";
import { IconStar } from "@douyinfe/semi-icons";

type MyProp = {
  showCreation: boolean;
  setShowCreation: Dispatch<SetStateAction<boolean>>;
};

const st = { fontSize: 24 };

const CreationMedia = (p: MyProp) => {
  const [pack, setPack] = useState<Pack>({
    c: false,
    name: undefined,
    cover: undefined,
    rating: undefined,
  });
  const { showCreation, setShowCreation } = p;
  const close = () => setShowCreation(false);
  return (
    <Modal
      closable={false}
      onOk={() => {
        console.log("save");
        close();
      }}
      onCancel={() => {
        console.log("cancel");
        close();
      }}
      visible={showCreation}
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
