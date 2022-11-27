import { useEffect, useMemo, useRef, useState } from "react";
import { useParams } from "react-router-dom";


const SpaceDetail = () => {
    let { spaceId } = useParams<"spaceId">();
    console.log(spaceId)

    return <div></div>
}

export default SpaceDetail

