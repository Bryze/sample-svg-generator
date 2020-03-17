import React, { useEffect, useState, useRef } from "react";
import Steps from "./steps";
import "./styles.css";
import { TYPES } from "./svg-path/actionsTypes";

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

const getDotIndexWhenThresholdReached = (distance) => {
  let index = null;
  if (16 < distance && distance < 365) {
    index = 0;
  } else if (365 < distance && distance < 770) {
    index = 1;
  } else if (770 < distance && distance < 1155) {
    index = 2;
  } else if (1155 < distance) {
    index = 3;
  }
  return index;
}

const MOVEMENT_CONFIG = {
  operations: [
    {
      action: TYPES.MOVE_DOWN,
      heightIndex: 0,
      dimensions: {
        height: (length) => length - RADIUS_Y
      },
      dotIndex: 0,
      dot: {
        xCoordinate: (width) => width / 2,
        yCoordinate: () => 20,
        radius: 5,
        generateDefaultDotUsingAttributes: ({ width }) => (
          <circle className={"marker0"}
            cx={width / 2}
            cy={20}
            r={5} />
        )
      }
    },
    {
      action: TYPES.TURN_BOTTOM_RIGHT,
      dimensions: {
        rx: RADIUS_X,
        ry: RADIUS_Y
      }
    },
    {
      action: TYPES.MOVE_LEFT,
      dimensions: {
        rx: RADIUS_X + 10,
        ry: RADIUS_Y + 10
      }
    },
    {
      action: TYPES.TURN_TOP_LEFT,
      dimensions: {
        rx: RADIUS_X,
        ry: RADIUS_Y
      }
    },
    {
      action: TYPES.MOVE_DOWN,
      heightIndex: 1,
      dimensions: {
        height: (length) => length - (RADIUS_Y * 2)
      },
      dotIndex: 1,
      dot: {
        xCoordinate: () => (RADIUS_X * 2) + 1,
        yCoordinate: () => 220,
        radius: 5,
        generateDefaultDotUsingAttributes: () => (
          <circle className={"marker0"}
            cx={(RADIUS_X * 2) + 1}
            cy={220}
            r={5} />
        )
      }
    },
    {
      action: TYPES.TURN_BOTTOM_LEFT,
      dimensions: {
        rx: RADIUS_X,
        ry: RADIUS_Y
      }
    },
    {
      action: TYPES.MOVE_RIGHT,
      dimensions: {
        rx: RADIUS_X + 10,
        ry: RADIUS_Y + 10
      }
    },
    {
      action: TYPES.TURN_TOP_RIGHT,
      dimensions: {
        rx: RADIUS_X,
        ry: RADIUS_Y
      }
    },
    {
      action: TYPES.MOVE_DOWN,
      heightIndex: 2,
      dimensions: {
        height: (length) => length - (RADIUS_Y * 2)
      },
      dotIndex: 2,
      dot: {
        xCoordinate: (width) => width / 2,
        yCoordinate: () => 470,
        radius: 5,
        generateDefaultDotUsingAttributes: ({ width }) => (
          <circle className={"marker0"}
            cx={width / 2}
            cy={470}
            r={5} />
        )
      }
    },
    {
      action: TYPES.TURN_BOTTOM_RIGHT,
      dimensions: {
        rx: RADIUS_X,
        ry: RADIUS_Y
      }
    },
    {
      action: TYPES.MOVE_LEFT,
      dimensions: {
        rx: RADIUS_X + 10,
        ry: RADIUS_Y + 10
      }
    },
    {
      action: TYPES.TURN_TOP_LEFT,
      dimensions: {
        rx: RADIUS_X,
        ry: RADIUS_Y
      }
    },
    {
      action: TYPES.MOVE_DOWN,
      heightIndex: 3,
      dimensions: {
        height: (length) => length - (RADIUS_Y)
      },
      dotIndex: 3,
      dot: {
        xCoordinate: () => (RADIUS_X * 2) + 1,
        yCoordinate: () => 700,
        radius: 5,
        generateDefaultDotUsingAttributes: () => (
          <circle className={"marker0"}
            cx={(RADIUS_X * 2) + 1}
            cy={700}
            r={5} />
        )
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
      elementHeights,
      offset: window.innerHeight / 2
    })
  }, [])

  return (
    <React.Fragment>
      <div className="second" />
      <div className="second" />
      <div className="second" />
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
              }}
              getDotIndexWhenThresholdReached={getDotIndexWhenThresholdReached} />
          </div>
        }
      </div>

      <div className="second" />
      <div className="second" />
    </React.Fragment>
  );
}
