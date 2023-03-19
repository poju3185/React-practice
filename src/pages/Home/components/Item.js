const Item = ({ id, note, date, time, deleteData, submittingStatus }) => {
  function deleteItem() {
    submittingStatus.current = true;
    deleteData(function (prev) {
      return prev.filter((item) => item.id !== id);  // 用filter進行刪除
    });
  }
  return (
    <div className="item">
      <div>
        <p>{note}</p>
        <p>{`${date} ${time}`}</p>
      </div>
      <button onClick={deleteItem} className="remove">
        刪除
      </button>
    </div>
  );
};

export default Item;
