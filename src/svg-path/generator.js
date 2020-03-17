import ActionTypes from "./actionsTypes";

const DEFAULT_HEIGHT = 190;

class Generator {
    constructor() {
        this._actionTypes = new ActionTypes();
    }

    path({
        attributes,
        movementConfig = {},
        overrides = {}
    }) {
        const { width, elementHeights } = attributes;
        const distanceToTraverse = parseInt(width / 2);
        let path = `M ${distanceToTraverse} 0`;
        movementConfig.operations.forEach(item => {
            let funcRef = this._actionTypes.getActionReference(item.action);
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
}

export default Generator;