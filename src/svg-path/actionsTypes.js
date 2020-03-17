import Movement from "./movement";

export const TYPES = {
    MOVE_LEFT: "moveLeft",
    MOVE_RIGHT: "moveRight",
    TURN_BOTTOM_RIGHT: "turnBottomRight",
    TURN_TOP_LEFT: "turnTopLeft",
    TURN_BOTTOM_LEFT: "turnBottomLeft",
    TURN_TOP_RIGHT: "turnTopRight",
    MOVE_UP: "moveUp",
    MOVE_DOWN: "moveDown"
}

class ActionTypes {
    constructor() {
        this._movement = new Movement();
        this._functionMap = {
            [TYPES.MOVE_UP]: this._movement.moveUp,
            [TYPES.MOVE_DOWN]: this._movement.moveDown,
            [TYPES.MOVE_LEFT]: this._movement.moveLeft,
            [TYPES.MOVE_RIGHT]: this._movement.moveRight,
            [TYPES.TURN_BOTTOM_RIGHT]: this._movement.turnBottomRight,
            [TYPES.TURN_BOTTOM_LEFT]: this._movement.turnBottomLeft,
            [TYPES.TURN_TOP_LEFT]: this._movement.turnTopLeft,
            [TYPES.TURN_TOP_RIGHT]: this._movement.turnTopRight
        }
    }

    getActionReference(key) {
        return this._functionMap[key];
    }
}

export default ActionTypes;