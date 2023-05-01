import { ReactElement } from "react";
import { Routes, Route, Outlet, Link } from "react-router-dom";
import { Nav } from "@douyinfe/semi-ui";
import { NavItemProps } from "@douyinfe/semi-ui/lib/es/navigation/Item";
import { SubNavProps } from "@douyinfe/semi-ui/lib/es/navigation/SubNav";
import Media from "./media/media";
import SpaceEntry from "./space/spaceEntry";
import SpaceDetail from "./spaceDetail/spaceDetail";

export default function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="space" element={<SpaceEntry />} />
          <Route path="media" element={<Media />} />
          <Route path="spaceDetail/*" element={<SpaceDetail />} />
        </Route>
      </Routes>
    </div>
  );
}

function Layout() {
  return (
    <div>
      <Nav
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
          { itemKey: "space", text: "Space" },
          { itemKey: "media", text: "Media" },
        ]}
      ></Nav>
      <Outlet />
    </div>
  );
}
