import { useReducer } from "react";
import startCode from "../constants/startCode";
import { UPDATE, DRAGSTART, DRAGMOVE, DRAGEND } from "../constants/actionTypes";

const useData = () => {
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
  };

  const reducer = (state, action) => {
    return reducers[action.type](state, action) || state;
  };

  const [state, dispatch] = useReducer(reducer, {
    code: startCode,
    position: 50,
    dragging: false,
  });

  const { code, position, dragging } = state;

  const updateInput = (event) => {
    const code = event.target.value;
    dispatch({ type: UPDATE, code });
  };

  const dragStart = () => dispatch({ type: DRAGSTART });

  const dragMove = (touch) => {
    return (e) => {
      if (dragging) {
        const posX = touch ? e.touches[0].clientX : e.clientX;
        const position = (posX / window.innerWidth) * 100;
        dispatch({ type: DRAGMOVE, position });
      }
    };
  };

  const dragEnd = () => dispatch({ type: DRAGEND });

  return {
    code,
    position,
    updateInput,
    dragStart,
    dragMove,
    dragEnd,
    dragging,
  };
};

export default useData;
