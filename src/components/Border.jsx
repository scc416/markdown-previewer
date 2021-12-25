const Border = ({ position, dragStart, dragMove, dragEnd }) => {
  return (
    <>
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
    </>
  );
};

export default Border;
