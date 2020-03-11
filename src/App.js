import React, { useEffect, useState, useRef } from "react";
import Steps from "./steps";
import "./styles.css";
import {
  ACTION_TYPES
} from "./selectors";

const SAMPLE_ITEMS = [
  {
    className: "first"
  },
  {
    className: "second"
  },
  {
    className: "third"
  },
  {
    className: "fourth"
  }
];

const RADIUS_X = 10;
const RADIUS_Y = 10;

const MOVEMENT_CONFIG = {
  operations: [
    {
      action: ACTION_TYPES.MOVE_VERTICAL,
      heightIndex: 0,
      dimensions: {
        height: (length) => length - RADIUS_Y 
      }
    },
    {
      action: ACTION_TYPES.TURN_BOTTOM_RIGHT,
      dimensions: {
        rx: RADIUS_X,
        ry: RADIUS_Y
      }
    },
    {
      action: ACTION_TYPES.MOVE_LEFT,
      dimensions: {
        rx: RADIUS_X + 10,
        ry: RADIUS_Y + 10
      }
    },
    {
      action: ACTION_TYPES.TURN_TOP_LEFT,
      dimensions: {
        rx: RADIUS_X,
        ry: RADIUS_Y
      }
    },
    {
      action: ACTION_TYPES.MOVE_VERTICAL,
      heightIndex: 1,
      dimensions: {
        height: (length) => length - (RADIUS_Y*2) 
      }
    },
    {
      action: ACTION_TYPES.TURN_BOTTOM_LEFT,
      dimensions: {
        rx: RADIUS_X,
        ry: RADIUS_Y
      }
    },
    {
      action: ACTION_TYPES.MOVE_RIGHT,
      dimensions: {
        rx: RADIUS_X + 10,
        ry: RADIUS_Y + 10
      }
    },
    {
      action: ACTION_TYPES.TURN_TOP_RIGHT,
      dimensions: {
        rx: RADIUS_X,
        ry: RADIUS_Y
      }
    },
    {
      action: ACTION_TYPES.MOVE_VERTICAL,
      heightIndex: 2,
      dimensions: {
        height: (length) => length - (RADIUS_Y*2) 
      }
    },
    {
      action: ACTION_TYPES.TURN_BOTTOM_RIGHT,
      dimensions: {
        rx: RADIUS_X,
        ry: RADIUS_Y
      }
    },
    {
      action: ACTION_TYPES.MOVE_LEFT,
      dimensions: {
        rx: RADIUS_X + 10,
        ry: RADIUS_Y + 10
      }
    },
    {
      action: ACTION_TYPES.TURN_TOP_LEFT,
      dimensions: {
        rx: RADIUS_X,
        ry: RADIUS_Y
      }
    },
    {
      action: ACTION_TYPES.MOVE_VERTICAL,
      heightIndex: 3,
      dimensions: {
        height: (length) => length - (RADIUS_Y) 
      }
    }
  ]
};

export default function App() {

  const containerRef = useRef();
  const loopRef = useRef({});
  const [attributes, setAttributes] = useState(null);

  useEffect(() => {
    const elementHeights = Object.values(loopRef.current).map((item) => {
      return item.clientHeight;
    })
    setAttributes({
      width: containerRef.current.clientWidth,
      height: containerRef.current.clientHeight,
      elementHeights
    })
  }, [])

  return (
    <div ref={containerRef} className={"container"}>
      {
        SAMPLE_ITEMS.map((item, index) => (
          <div
            key={index}
            className={item.className}
            ref={node => loopRef.current[index] = node} />
        ))
      }
      {
        attributes &&
        <div className={"svgContainer"}>
          <Steps
            movementConfig={MOVEMENT_CONFIG}
            attributes={attributes}
            overrides={{
              height: true
            }} />
        </div>
      }
    </div>
  );
}
