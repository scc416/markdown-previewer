import { useReducer } from "react";
import startCode from "../startCode";

const UPDATE = "UPDATE";
const DRAGSTART = "STARTDRAG";
const DRAGMOVE = "DRAGMOVE";
const DRAGEND = "STARTEND";

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

  const { code, position } = state;

  return { code, position };
};

export default useData;
