const Editor = ({ code, updateInput, dragging }) => {
  return (
    <>
      <div className="title">
        <i className="far fa-edit"></i> Editor
      </div>
      <textarea
        className="editor inner-container"
        value={code}
        onChange={updateInput}
        style={{ cursor: dragging ? "col-resize" : "default" }}
      ></textarea>
    </>
  );
};

export default Editor;
