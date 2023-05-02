import { useEffect, useState } from "react";
import { Button, Col, Row } from "@douyinfe/semi-ui";
import { Media, Series } from "./api";
import { Layout } from "@douyinfe/semi-ui";
import "./media.css";
import CreationMedia from "./creationMedia";
import { assoc } from "ramda";
import { Pack } from "./model";

const useMedia = () => {
  const [mediaList, setMediaList] = useState<Array<Media>>([]);

  return {
    mediaList,
    setMediaList,
  };
};

function MediaEntry() {
  const [pack, setPack] = useState<Pack>({
    c: false,
    name: undefined,
    cover: undefined,
    rating: undefined,
  });
  const { Header, Content, Footer } = Layout;
  return (
    <Layout className="media-layout">
      <Header>Header</Header>
      <Content>
        <div>content</div>
        {pack.c && (
          <CreationMedia pack={pack} setPack={setPack}></CreationMedia>
        )}
      </Content>
      <Footer className="media-footer">
        <Button
          className="create-media"
          onClick={() => {
            setPack(assoc("c", true, pack));
          }}
        >
          create
        </Button>
      </Footer>
    </Layout>
  );
}

export default MediaEntry;
