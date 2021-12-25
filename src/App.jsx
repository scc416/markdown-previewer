import "./App.css";
import useData from "./hooks/useData";
import Preview from "./components/Preview";
import Editor from "./components/Editor";
import Border from "./components/Border";

const App = () => {
  const {
    code,
    updateInput,
    dragStart,
    dragMove,
    dragEnd,
    mainStyle,
    editorStyle,
    leftStyle,
    rightStyle,
    borderClass
  } = useData();

  return (
    <main style={mainStyle} onMouseMove={dragMove()} onMouseUp={dragEnd}>
      <div className="left container" style={leftStyle}>
        <Editor {...{ code, updateInput, editorStyle }} />
      </div>
      <Border {...{ dragStart, dragMove, dragEnd, borderClass }} />
      <div className="right container" style={rightStyle}>
        <Preview {...{ code }} />
      </div>
    </main>
  );
};

export default App;
