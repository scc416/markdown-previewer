import "./App.css";

function App() {
  return (
    <div id="app">
      <div
        className="container"
        onMouseMove={() => console.log("onMouseMove")} // onMouseMove = { this.props.dragMove }
        onMouseUp={() => console.log("onMouseUp")} // onMouseUp = { this.props.dragEnd }
      >
        <div
          id="left"
          // style = {{ width: this.props.position.toString() + "%"}}
        >
          <div className="editor-title">
            <i className="far fa-edit"></i> Editor
          </div>
          <textarea
            id="editor"
            // value={this.props.code}
            // onChange={this.props.update}
          ></textarea>
        </div>
        <div
          id="border"
          // style = {{left: this.props.position.toString() + "%"}}
          // onMouseDown = {this.props.dragStart}
        >
          <div className="textbox">
            <i className="fas fa-arrows-alt-h"></i>DRAG ME
          </div>
        </div>
        <div
          id="right"
          // style={{ width: (100 - this.props.position).toString() + "%" }}
        >
          <div className="previewer-title">
            <i className="fas fa-eye"></i> Preview
          </div>
          <div id="preview" />
        </div>
      </div>
    </div>
  );
}

export default App;
