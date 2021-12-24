import "./App.css";
import useData from "./hooks/useData";
import { marked } from "marked";

const createMarkup = (__html) => {
  return { __html };
};

const App = () => {
  const { code, position, updateInput, dragStart, dragMove, dragEnd, dragging } =
    useData();
  return (
    <div id="app" style={{userSelect: !dragging}}>
      <div className="container" onMouseMove={dragMove()} onMouseUp={dragEnd}>
        <div id="left" style={{ width: position + "%" }}>
          <div className="editor-title">
            <i className="far fa-edit"></i> Editor
          </div>
          <textarea id="editor" value={code} onChange={updateInput} disabled={dragging}></textarea>
        </div>
        <div
          id="border"
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
        <div id="right" style={{ width: 100 - position + "%" }}>
          <div className="previewer-title">
            <i className="fas fa-eye"></i> Preview
          </div>
          <div
            id="preview"
            dangerouslySetInnerHTML={createMarkup(
              marked(code, {
                breaks: true,
              })
            )}
          />
        </div>
      </div>
    </div>
  );
};

export default App;
