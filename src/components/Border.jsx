const Border = ({ dragStart, dragMove, dragEnd, borderClass }) => {
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
            <i className={borderClass}></i> DRAG ME
          </span>
        </div>
      </div>
    </>
  );
};

export default Border;
