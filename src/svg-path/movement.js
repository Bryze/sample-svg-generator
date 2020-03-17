import Base from "./base";

class Movement extends Base {

    moveLeft = ({ rx, ry, distance }) => {
        return this.getMoveHorizontalString({
            rx,
            ry,
            distance,
            left: true
        });
    };

    moveRight = ({ rx, ry, distance }) => {
        return this.getMoveHorizontalString({
            rx,
            ry,
            distance,
            right: true
        });
    };

    turnBottomRight = ({ rx, ry }) => {
        return this.getSimpleArcString({
            rx,
            ry,
            tiltFromBottomRight: true
        });
    };

    turnBottomLeft = ({ rx, ry }) => {
        return this.getSimpleArcString({
            rx,
            ry,
            tiltFromBottomLeft: true
        });
    };

    turnTopLeft = ({ rx, ry }) => {
        return this.getSimpleArcString({
            rx,
            ry,
            tiltFromTopLeft: true
        });
    };

    turnTopRight = ({ rx, ry }) => {
        return this.getSimpleArcString({
            rx,
            ry,
            tiltFromTopRight: true
        });
    };

    moveUp = ({ height }) => {
        return this.getMoveVerticalString({
            height,
            up: true
        })
    }

    moveDown = ({ height }) => {
        return this.getMoveVerticalString({
            height,
            down: true
        })
    }

}

export default Movement;