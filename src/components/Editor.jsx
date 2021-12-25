const Editor = ({ code, updateInput, editorStyle }) => {
  return (
    <>
      <div className="title">
        <i className="far fa-edit"></i> Editor
      </div>
      <textarea
        className="editor inner-container"
        value={code}
        onChange={updateInput}
        style={editorStyle}
      ></textarea>
    </>
  );
};

export default Editor;
