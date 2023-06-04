import { useEffect, useState } from "react";
import { Button, Col, Row } from "@douyinfe/semi-ui";
import { Layout } from "@douyinfe/semi-ui";
import { MovieDisplay } from "./model";
import DinasorGrid from "../lang/DinasorGrid";
import CreateSeries from "./createSeries";
import useRunOnce from "../lang/useRunOnce";
import { listMovie } from "./api";

const useMovies = () => {
  const [movieList, setMovieList] = useState<Array<MovieDisplay>>([]);

  const refresh = async () => {
    const series = await listMovie();
    setMovieList(series);
  };

  const runWhenMount = useRunOnce(refresh);

  useEffect(() => runWhenMount(), []);

  return {
    movieList: movieList,
    refresh,
  };
};

const footerStyle = {
  width: "100%",
  padding: "8px",
  display: "flex",
  justifyContent: "center",
};

const renderMovie = (s: MovieDisplay): JSX.Element => {
  return <div>{s.name}</div>;
};

function MovieEntry() {
  const [showCreation, setShowCreation] = useState<boolean>(false);
  const { Header, Content, Footer } = Layout;
  const { movieList: movieList, refresh } = useMovies();
  return (
    <Layout className="media-layout">
      <Header>Header</Header>
      <Content>
        <div>content</div>
        <DinasorGrid
          data={movieList}
          size={4}
          render={renderMovie}
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

export default MovieEntry;
