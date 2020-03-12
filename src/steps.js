import React, { useRef, useState, useEffect, useCallback } from "react";
import "./styles.css";
import {
  computePath
} from "./selectors";
import { useInView } from "react-intersection-observer";

export default function Steps({
  attributes,
  movementConfig = {},
  overrides = {}
}) {

  const svgPath = useRef();
  const svgRef = useRef();
  const [pathLength, setPathLength] = useState(0);
  const [containerRef, inView, entry] = useInView({});
  const [coloredPathLength, setColoredPathLength] = useState(0);

  useEffect(() => {
    if (svgPath.current) {
      setPathLength(svgPath.current.getTotalLength());
    }
  }, [svgPath]);

  const onScroll = useCallback(() => {
    if (!svgPath.current) {
      return;
    }

    const { y, height } = svgRef.current.getBoundingClientRect();

    // Length to offset the dashes
    const svgScrollPercentage = (window.innerHeight - y) / height;

    const drawLength = pathLength * svgScrollPercentage - (window.innerHeight / 2);
    
    if(drawLength>-1) {
      setColoredPathLength(drawLength);
    }

    svgPath.current.style.strokeDashoffset = pathLength - drawLength;
    svgPath.current.style.strokeDasharray = `${pathLength} ${pathLength}`;

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathLength]);

  useEffect(() => {
    if (inView) {
      window.addEventListener("scroll", onScroll);
      return () => {
        window.removeEventListener("scroll", onScroll);
      }
    }
    return () => {
      window.removeEventListener("scroll", onScroll);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView]);

  return (
    <div ref={containerRef}>
      <svg
        ref={svgRef}
        width={attributes.width}
        height={attributes.height}>
        <g fill="white" stroke="black" strokeWidth="1">
          {
            movementConfig.operations.map((item, index) => {
              if (item.dot) {
                let fill = "none";
                if(item.dot.threshold(coloredPathLength)) {
                  fill = "red"
                }
                return (
                  <circle
                    key={index}
                    fill={fill}
                    cx={item.dot.xCoordinate(attributes.width)}
                    cy={item.dot.yCoordinate()}
                    r={item.dot.radius}
                    />
                );
              } else {
                return null;
              }
            })
          }
        </g>
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
    </div>
  );
}
