class Base {
    getMoveVerticalString({ height, up, down }) {
        let path = "v ";
        if(up) {
            path = `${path} -${height}`
        }
        if(down) {
            path = `${path} ${height}`;
        }
        return path;
    };

    getSimpleArcString({
        rx,
        ry,
        tiltFromTopRight,
        tiltFromBottomRight,
        tiltFromBottomLeft,
        tiltFromTopLeft
    }) {
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

    getMoveHorizontalString({ rx, ry, distance, left, right }) {
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
}

export default Base;