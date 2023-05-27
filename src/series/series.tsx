import { useEffect, useState } from "react";
import { Button, Col, Row } from "@douyinfe/semi-ui";
import { Layout } from "@douyinfe/semi-ui";
import { SeriesDisplay } from "./model";
import DinasorGrid from "../lang/DinasorGrid";
import CreateSeries from "./createSeries";
import useRunOnce from "../lang/useRunOnce";
import { listSeries } from "./api";

const useSeries = () => {
  const [seriesList, setSeriesList] = useState<Array<SeriesDisplay>>([]);

  const refresh = async () => {
    const series = await listSeries();
    setSeriesList(series);
  };

  const runWhenMount = useRunOnce(refresh);

  useEffect(() => runWhenMount(), []);

  return {
    seriesList,
    refresh,
  };
};

const footerStyle = {
  width: "100%",
  padding: "8px",
  display: "flex",
  justifyContent: "center",
};

const renderSeries = (s: SeriesDisplay): JSX.Element => {
  return <div>{s.name}</div>;
};

function SeriesEntry() {
  const [showCreation, setShowCreation] = useState<boolean>(false);
  const { Header, Content, Footer } = Layout;
  const { seriesList, refresh } = useSeries();
  return (
    <Layout className="media-layout">
      <Header>Header</Header>
      <Content>
        <div>content</div>
        <DinasorGrid
          data={seriesList}
          size={4}
          render={renderSeries}
          onEmpty={() => <div></div>}
        ></DinasorGrid>
        {showCreation && (
          <CreateSeries
            showCreation={showCreation}
            setShowCreation={setShowCreation}
          />
        )}
      </Content>
      <Footer style={footerStyle}>
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

export default SeriesEntry;
