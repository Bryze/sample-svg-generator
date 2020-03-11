import React, { useRef, useState, useEffect, useCallback } from "react";
import "./styles.css";
import {
  computePath
} from "./selectors";

export default function Steps({
  attributes,
  movementConfig = {},
  overrides = {}
}) {

  const svgPath = useRef();
  const svgRef = useRef();
  const [pathLength, setPathLength] = useState(0);

  useEffect(() => {
    if (svgPath.current) {
      setPathLength(svgPath.current.getTotalLength());
    }
  }, [svgPath]);

  const onScroll = useCallback(() => {
    if (!svgPath.current) {
      return;
    }
    // What % down is it?
    // https://stackoverflow.com/questions/2387136/cross-browser-method-to-determine-vertical-scroll-percentage-in-javascript/2387222#2387222
    // Had to try three or four differnet methods here. Kind of a cross-browser nightmare.
    const scrollPercentage =
      (document.documentElement.scrollTop + document.body.scrollTop) /
      (document.documentElement.scrollHeight -
        document.documentElement.clientHeight);
    const { y, height, top } = svgRef.current.getBoundingClientRect();
    // Length to offset the dashes
    const drawLength = pathLength * scrollPercentage;
    // Draw in reverse
    svgPath.current.style.strokeDashoffset = pathLength - drawLength;

    // When complete, remove the dash array, otherwise shape isn't quite sharp
    // Accounts for fuzzy math
    if (scrollPercentage >= 0.99) {
      svgPath.current.style.strokeDasharray = "none";
    } else {
      svgPath.current.style.strokeDasharray = `${pathLength} ${pathLength}`;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathLength]);

  useEffect(() => {
    if (pathLength) {
      window.addEventListener("scroll", onScroll);
      return () => {
        window.removeEventListener("scroll", onScroll);
      }
    }
    return () => {
      window.removeEventListener("scroll", onScroll);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathLength]);

  return (
    <svg
      ref={svgRef}
      height={attributes.height}>
      <path
        fill="none"
        stroke="rgba(0,0,0)"
        strokeWidth="1.2"
        d={
          computePath({
            attributes,
            overrides,
            movementConfig
          })
        }
      />
      <path
        ref={svgPath}
        fill="none"
        stroke="red"
        strokeWidth="1.2"
        d={
          computePath({
            attributes,
            overrides,
            movementConfig
          })
        }
      />
    </svg>
  );
}
