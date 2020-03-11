import React from "react";
import "./styles.css";
import {
  moveVertical,
  moveLeft,
  moveRight,
  turnBottomLeft,
  turnBottomRight,
  turnTopLeft,
  turnTopRight
} from "./svg-base";

const MENU_ITEMS = [1, 2, 3, 4];

const HEIGHT = 190;
const RADIUS_X = 10;
const RADIUS_Y = 10;

const LEFT_MARGIN = 160;

const BASIC_PATH_CONFIG = {
  rx: RADIUS_X,
  ry: RADIUS_Y,
  distance: LEFT_MARGIN,
  height: HEIGHT
};

const FUNCTION_MAP = {
  moveVertical: moveVertical,
  moveLeft: moveLeft,
  moveRight: moveRight,
  turnBottomRight: turnBottomRight,
  turnBottomLeft: turnBottomLeft,
  turnTopLeft: turnTopLeft,
  turnTopRight: turnTopRight
};

const MOVEMENT_CONFIG = {
  dimensions: BASIC_PATH_CONFIG,
  operations: [
    "moveVertical",
    "turnBottomRight",
    "moveLeft",
    "turnTopLeft",
    "moveVertical",
    "turnBottomLeft",
    "moveRight",
    "turnTopRight",
    "moveVertical",
    "turnBottomRight",
    "moveLeft",
    "turnTopLeft",
    "moveVertical"
  ]
};

const computePath = () => {
  let path = "M 160 0";
  MOVEMENT_CONFIG.operations.forEach(keyword => {
    let funcRef = FUNCTION_MAP[keyword];
    const computedPath = funcRef(MOVEMENT_CONFIG.dimensions);
    path = `${path} ${computedPath}`;
  });
  return path;
};

export default function App() {
  return (
    <div className="App">
      <svg height="900">
        <path
          fill="none"
          stroke="rgba(0,0,0)"
          strokeWidth="1.2"
          //a rx ry x-axis-rotation large-arc-flag sweep-flag dx dy
          d={computePath()}
        />
      </svg>
    </div>
  );
}
