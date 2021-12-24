import "./App.css";
import useData from "./hooks/useData";
import { marked } from "marked";

const createMarkup = (__html) => {
  return { __html };
};

const App = () => {
  const {
    code,
    position,
    updateInput,
    dragStart,
    dragMove,
    dragEnd,
    dragging,
  } = useData();
  return (
    <main
      style={{
        userSelect: !dragging,
        cursor: dragging ? "col-resize" : "default",
      }}
    >
      <div className="container" onMouseMove={dragMove()} onMouseUp={dragEnd}>
        <div className="left" style={{ width: position + "%" }}>
          <div className="editor-title">
            <i className="far fa-edit"></i> Editor
          </div>
          <textarea
            className="editor"
            value={code}
            onChange={updateInput}
            disabled={dragging}
          ></textarea>
        </div>
        <div
          className="border"
          style={{ left: position + "%" }}
          onMouseDown={dragStart}
          onTouchStart={dragStart}
          onTouchMove={dragMove(true)}
          onTouchEnd={dragEnd}
        >
          <div className="textbox">
            <i className="fas fa-arrows-alt-h"></i>DRAG ME
          </div>
        </div>
        <div className="right" style={{ width: 100 - position + "%" }}>
          <div className="previewer-title">
            <i className="fas fa-eye"></i> Preview
          </div>
          <div
            className="preview"
            dangerouslySetInnerHTML={createMarkup(
              marked(code, {
                breaks: true,
              })
            )}
          />
        </div>
      </div>
    </main>
  );
};

export default App;
