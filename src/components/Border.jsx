const Border = ({ position, dragStart, dragMove, dragEnd }) => {
  return (
    <>
      <div
        className="border"
        onMouseDown={dragStart}
        onTouchStart={dragStart}
        onTouchMove={dragMove(true)}
        onTouchEnd={dragEnd}
      >
        <div className="drag-label">
          <span>
            <i className="fas fa-arrows-alt-h"></i>DRAG ME
          </span>
        </div>
      </div>
    </>
  );
};

export default Border;
