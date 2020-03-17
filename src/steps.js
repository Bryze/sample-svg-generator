import React, { useRef, useState, useEffect, useCallback, Fragment } from "react";
import "./styles.css";
import { useInView } from "react-intersection-observer";
import Generator from "./svg-path/generator";

const resetDots = ({ config, ref, activeIndex }) => {
  const totalDots = config.filter((item) => !!item.dot).length;
  for (let i = 0; i < totalDots; i++) {
    if ((i !== activeIndex && activeIndex !== null) || (activeIndex === null)) {
      ref.current[i].style.display = "none";
      ref.current[`c-${i}`].style.display = "none";
    }
  }
}

export default function Steps({
  attributes,
  movementConfig = {},
  overrides = {},
  getDotIndexWhenThresholdReached = () => { }
}) {

  const svgPath = useRef();
  const svgRef = useRef();
  const dotRef = useRef({});
  const [pathLength, setPathLength] = useState(0);
  const [containerRef, inView] = useInView({});

  const generator = new Generator();

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

    const drawLength = pathLength * svgScrollPercentage - attributes.offset;
    const dotIndex = getDotIndexWhenThresholdReached(drawLength);
    resetDots({ config: movementConfig.operations, ref: dotRef, activeIndex: dotIndex });

    if (drawLength > -1 && dotIndex !== null) {
      dotRef.current[dotIndex].style.display = null;
      dotRef.current[`c-${dotIndex}`].style.display = null;
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
                return (
                  <Fragment>
                    {
                      item.dot.generateDefaultDotUsingAttributes({
                        width: attributes.width
                      })
                    }
                    <circle
                      cx={item.dot.xCoordinate(attributes.width)}
                      cy={item.dot.yCoordinate()}
                      ref={node => dotRef.current[item.dotIndex] = node}
                      r={item.dot.radius}
                      style={{ display: "none" }}
                      key={index}
                      fill="none"
                      ng-attr-stroke="{{config.c1}}"
                      sng-attr-stroke-width="{{config.width}}"
                      stroke="#ed6c0db3" strokeWidth="2">
                      <animate attributeName="r" calcMode="spline"
                        values="0;20" keyTimes="0;1" dur="1.5"
                        keySplines="0 0.2 0.8 1"
                        begin="-0.5s" repeatCount="indefinite" />
                      <animate attributeName="opacity" calcMode="spline"
                        values="1;0" keyTimes="0;1" dur="1.5"
                        keySplines="0.2 0 0.8 1"
                        begin="-0.5s" repeatCount="indefinite" />
                    </circle>
                    <circle
                      cx={item.dot.xCoordinate(attributes.width)}
                      cy={item.dot.yCoordinate()}
                      ref={node => dotRef.current[`c-${item.dotIndex}`] = node}
                      r={item.dot.radius}
                      style={{ display: "none" }}
                      key={index}
                      fill="none"
                      ng-attr-stroke="{{config.c1}}"
                      sng-attr-stroke-width="{{config.width}}"
                      stroke="#ed6c0db3" strokeWidth="2">
                      <animate attributeName="r" calcMode="spline"
                        values="0;20" keyTimes="0;1" dur="1.5"
                        keySplines="0 0.2 0.8 1"
                        begin="0s" repeatCount="indefinite" />
                      <animate attributeName="opacity" calcMode="spline"
                        values="1;0" keyTimes="0;1" dur="1.5"
                        keySplines="0.2 0 0.8 1"
                        begin="0s" repeatCount="indefinite" />
                    </circle>
                  </Fragment>
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
            generator.path({
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
            generator.path({
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
