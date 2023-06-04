import { ReactElement } from "react";
import { Routes, Route, Outlet, Link } from "react-router-dom";
import { Nav } from "@douyinfe/semi-ui";
import { NavItemProps } from "@douyinfe/semi-ui/lib/es/navigation/Item";
import { SubNavProps } from "@douyinfe/semi-ui/lib/es/navigation/SubNav";
import SeriesEntry from "./series";
import MovieEntry from "./movies";
import SpaceEntry from "./space/spaceEntry";
import SpaceDetail from "./spaceDetail/spaceDetail";
import "./app.css";

export default function App() {
  return (
    <div className="app-container">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="space" element={<SpaceEntry />} />
          <Route path="series" element={<SeriesEntry />} />
          <Route path="movie" element={<MovieEntry />} />
          <Route path="spaceDetail/*" element={<SpaceDetail />} />
        </Route>
      </Routes>
    </div>
  );
}

function Layout() {
  return (
    <div className="app-box">
      <Nav
        className="app-nav"
        mode={"horizontal"}
        renderWrapper={({
          itemElement,
          isSubNav,
          isInSubNav,
          props,
        }: {
          itemElement: ReactElement;
          isInSubNav: boolean;
          isSubNav: boolean;
          props: NavItemProps | SubNavProps;
        }) => {
          const to = (props.itemKey as string) || "";
          return (
            <Link style={{ textDecoration: "none" }} to={to}>
              {itemElement}
            </Link>
          );
        }}
        items={[
          { itemKey: "space", text: "空间" },
          { itemKey: "series", text: "剧集" },
          { itemKey: "movie", text: "电影" },
        ]}
      ></Nav>
      <Outlet />
    </div>
  );
}
