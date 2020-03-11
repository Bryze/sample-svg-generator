export const moveVertical = ({ height }) => {
  return `v ${height}`;
};

const genArc = ({
  rx,
  ry,
  tiltFromTopRight,
  tiltFromBottomRight,
  tiltFromBottomLeft,
  tiltFromTopLeft
}) => {
  let path = "";
  if (tiltFromBottomRight) {
    path = `a ${rx} ${ry} 0 0 1 -${rx} ${ry}`;
  }
  if (tiltFromTopLeft) {
    path = `a ${rx} ${ry} 0 0 0 -${rx} ${ry}`;
  }
  if (tiltFromBottomLeft) {
    path = `a ${rx} ${ry} 0 0 0 ${rx} ${ry}`;
  }
  if (tiltFromTopRight) {
    path = `a ${rx} ${ry} 0 0 1 ${rx} ${ry}`;
  }
  return path;
};

const moveHorizontal = ({ rx, ry, distance, left, right }) => {
  let path = "";
  let computedDistanceToTravel = distance;
  if (rx && ry) {
    computedDistanceToTravel = distance - rx - ry - 1;
  }
  if (left) {
    path = `h -${computedDistanceToTravel}`;
  }
  if (right) {
    path = `h ${computedDistanceToTravel}`;
  }
  return path;
};

export const moveLeft = ({ rx, ry, distance }) => {
  return moveHorizontal({ rx, ry, distance, left: true });
};

export const moveRight = ({ rx, ry, distance }) => {
  return moveHorizontal({ rx, ry, distance, right: true });
};

export const turnBottomRight = ({ rx, ry }) => {
  return genArc({
    rx,
    ry,
    tiltFromBottomRight: true
  });
};

export const turnBottomLeft = ({ rx, ry }) => {
  return genArc({
    rx,
    ry,
    tiltFromBottomLeft: true
  });
};

export const turnTopLeft = ({ rx, ry }) => {
  return genArc({
    rx,
    ry,
    tiltFromTopLeft: true
  });
};

export const turnTopRight = ({ rx, ry }) => {
  return genArc({
    rx,
    ry,
    tiltFromTopRight: true
  });
};
