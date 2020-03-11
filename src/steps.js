import React from "react";
import "./styles.css";
import {
  computePath
} from "./selectors";

export default function Steps({
  attributes,
  movementConfig = {},
  overrides = {}
}) {
  return (
    <svg height={attributes.height}>
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
    </svg>
  );
}
