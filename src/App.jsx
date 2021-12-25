import "./App.css";
import useData from "./hooks/useData";
import Preview from "./components/Preview";
import Editor from "./components/Editor";
import Border from "./components/Border";

const App = () => {
  const {
    code,
    position,
    updateInput,
    dragStart,
    dragMove,
    dragEnd,
    mainStyle,
    editorStyle
  } = useData();
  return (
    <main
      style={mainStyle}
      onMouseMove={dragMove()}
      onMouseUp={dragEnd}
    >
      <div className="left container" style={{ width: position + "%" }}>
        <Editor {...{ code, updateInput, editorStyle }} />
      </div>
      <Border {...{ position, dragStart, dragMove, dragEnd }} />
      <div className="right container" style={{ width: 100 - position + "%" }}>
        <Preview {...{ code }} />
      </div>
    </main>
  );
};

export default App;
