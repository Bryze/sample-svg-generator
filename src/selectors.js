import {
  moveVertical,
  moveLeft,
  moveRight,
  turnBottomLeft,
  turnBottomRight,
  turnTopLeft,
  turnTopRight
} from "./svg-base";

const DEFAULT_HEIGHT = 190;

export const ACTION_TYPES = {
  MOVE_VERTICAL: "moveVertical",
  MOVE_LEFT: "moveLeft",
  MOVE_RIGHT: "moveRight",
  TURN_BOTTOM_RIGHT: "turnBottomRight",
  TURN_TOP_LEFT: "turnTopLeft",
  TURN_BOTTOM_LEFT: "turnBottomLeft",
  TURN_TOP_RIGHT: "turnTopRight"
}

export const FUNCTION_MAP = {
  [ACTION_TYPES.MOVE_VERTICAL]: moveVertical,
  [ACTION_TYPES.MOVE_LEFT]: moveLeft,
  [ACTION_TYPES.MOVE_RIGHT]: moveRight,
  [ACTION_TYPES.TURN_BOTTOM_RIGHT]: turnBottomRight,
  [ACTION_TYPES.TURN_BOTTOM_LEFT]: turnBottomLeft,
  [ACTION_TYPES.TURN_TOP_LEFT]: turnTopLeft,
  [ACTION_TYPES.TURN_TOP_RIGHT]: turnTopRight
};

export const computePath = ({
  attributes,
  movementConfig = {},
  overrides = {}
}) => {
  const { width, elementHeights } = attributes;
  const distanceToTraverse = parseInt(width / 2);
  let path = `M ${distanceToTraverse} 0`;
  movementConfig.operations.forEach(item => {
    let funcRef = FUNCTION_MAP[item.action];
    let height = DEFAULT_HEIGHT;
    if (
      overrides.height &&
      item.heightIndex !== undefined &&
      typeof item.dimensions.height === "function") {
      height = item.dimensions.height(elementHeights[item.heightIndex]);
    }
    const computedPath = funcRef({
      ...item.dimensions,
      distance: distanceToTraverse,
      height
    });
    path = `${path} ${computedPath}`;
  });
  return path;
};