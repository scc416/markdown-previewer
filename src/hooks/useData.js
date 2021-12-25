import { useReducer, useEffect } from "react";
import startCode from "../constants/startCode";
import {
  UPDATE,
  DRAGSTART,
  DRAGMOVE,
  DRAGEND,
  UPDATEWIDTH,
} from "../constants/actionTypes";

const useData = () => {
  const { innerWidth, innerHeight } = window;

  const reducers = {
    [UPDATE]: (state, { code }) => {
      return { ...state, code };
    },
    [DRAGSTART]: (state) => {
      return { ...state, dragging: true };
    },
    [DRAGMOVE]: (state, { position }) => {
      const newPosition = position < 30 ? 30 : position > 70 ? 70 : position;
      return { ...state, position: newPosition, dragging: true };
    },
    [DRAGEND]: (state) => {
      return { ...state, dragging: false };
    },
    [UPDATEWIDTH]: (state) => {
      const row = innerWidth >= 576;
      return { ...state, row };
    },
  };

  const reducer = (state, action) => {
    return reducers[action.type](state, action) || state;
  };

  const [state, dispatch] = useReducer(reducer, {
    code: startCode,
    position: 50,
    dragging: false,
    row: innerWidth >= 576,
  });

  const handleResize = () => dispatch({ type: UPDATEWIDTH });
  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const { code, position, dragging, row } = state;

  const updateInput = (event) => {
    const code = event.target.value;
    dispatch({ type: UPDATE, code });
  };

  const dragStart = () => dispatch({ type: DRAGSTART });

  const dragMove = (touch) => {
    return (e) => {
      if (dragging) {
        if (row) {
          const posX = touch ? e.touches[0].clientX : e.clientX;
          const position = (posX / innerWidth) * 100;
          return dispatch({ type: DRAGMOVE, position });
        }
        const posY = touch ? e.touches[0].clientY : e.clientY;
        const position = (posY / innerHeight) * 100;
        return dispatch({ type: DRAGMOVE, position });
      }
    };
  };

  const dragEnd = () => dispatch({ type: DRAGEND });

  const mainStyle = {
    userSelect: dragging ? "none" : "default",
    cursor: dragging ? "col-resize" : "default",
  };
  const editorStyle = { cursor: dragging ? "col-resize" : "default" };

  const unit = row ? "Width" : "Height";
  const leftStyle = { [`min${unit}`] : position - 0.5 + "%" };
  const rightStyle = { [`max${unit}`]: 99.5 - position + "%" };

  return {
    code,
    position,
    updateInput,
    dragStart,
    dragMove,
    dragEnd,
    mainStyle,
    editorStyle,
    leftStyle,
    rightStyle
  };
};

export default useData;
