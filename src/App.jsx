import "./App.css";
import useData from "./hooks/useData";
import Preview from "./components/Preview";
import Editor from "./components/Editor";

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
  console.log(dragging);
  return (
    <main
      style={{
        userSelect: dragging ? "none" : "default",
        cursor: dragging ? "col-resize" : "default",
      }}
      onMouseMove={dragMove()}
      onMouseUp={dragEnd}
    >
      <div className="left container" style={{ width: position + "%" }}>
        <Editor {...{ code, updateInput, dragging }} />
      </div>
      <div
        className="border"
        style={{ left: position + "%" }}
        onMouseDown={dragStart}
        onTouchStart={dragStart}
        onTouchMove={dragMove(true)}
        onTouchEnd={dragEnd}
      >
        <div className="drag-label">
          <i className="fas fa-arrows-alt-h"></i>DRAG ME
        </div>
      </div>
      <div className="right container" style={{ width: 100 - position + "%" }}>
        <Preview {...{ code }} />
      </div>
    </main>
  );
};

export default App;
