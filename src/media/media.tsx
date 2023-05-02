import { useEffect, useState } from "react";
import { Button, Col, Row } from "@douyinfe/semi-ui";
import { Media, Series } from "./api";
import { Layout } from "@douyinfe/semi-ui";
import "./media.css";
import CreationMedia from "./creationMedia";
import { assoc } from "ramda";

const useMedia = () => {
  const [mediaList, setMediaList] = useState<Array<Media>>([]);

  return {
    mediaList,
    setMediaList,
  };
};

function MediaEntry() {
  const [showCreation, setShowCreation] = useState<boolean>(false);
  const { Header, Content, Footer } = Layout;
  return (
    <Layout className="media-layout">
      <Header>Header</Header>
      <Content>
        <div>content</div>
        {showCreation && (
          <CreationMedia
            showCreation={showCreation}
            setShowCreation={setShowCreation}
          />
        )}
      </Content>
      <Footer className="media-footer">
        <Button
          className="create-media"
          onClick={() => {
            setShowCreation(true);
          }}
        >
          create
        </Button>
      </Footer>
    </Layout>
  );
}

export default MediaEntry;
