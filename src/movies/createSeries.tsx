import { Modal, Form, Input } from "@douyinfe/semi-ui";
import { Movie } from "./model";
import { assoc, mergeLeft } from "ramda";
import { useState, Dispatch, SetStateAction } from "react";
import Label from "@douyinfe/semi-ui/lib/es/form/label";
import { createMovie } from "./api";

type MyProp = {
  showCreation: boolean;
  setShowCreation: Dispatch<SetStateAction<boolean>>;
};

const st = { fontSize: 18 };

const label = mergeLeft(
  {
    marginBottom: 16,
    marginTop: 16,
  },
  st
);

const CreateSeries = (p: MyProp) => {
  const [pack, setPack] = useState<Movie>({
    name: undefined,
    cover: undefined,
  });

  const { showCreation, setShowCreation } = p;
  const close = () => setShowCreation(false);
  const onOk = async () => {
    await createMovie(pack);
    close();
  };
  return (
    <Modal
      title={"创建一个剧集"}
      closable={false}
      onOk={onOk}
      onCancel={() => {
        console.log("cancel");
        close();
      }}
      visible={showCreation}
    >
      <Form>
        <Label style={label}>名称</Label>
        <Input
          placeholder="name"
          value={pack.name}
          onChange={(v) => setPack(assoc("name", v, pack))}
        ></Input>
        <Label style={label}>封面链接</Label>
        <Input
          placeholder="cover"
          value={pack.cover}
          onChange={(v) => setPack(assoc("cover", v, pack))}
        ></Input>
      </Form>
    </Modal>
  );
};

export default CreateSeries;
