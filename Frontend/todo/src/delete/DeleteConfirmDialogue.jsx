import "./deleteDialog.css";

const DeleteConfirmDialog = ({ todo, onConfirm, onCancel }) => {
  if (!todo) return null;

  return (
    <div className="dialog-overlay">
      <div className="dialog-box">
        <h3>Delete Todo</h3>
        <p>Are you sure you want to delete:</p>
        <strong>{todo.text}</strong>

        <div className="dialog-actions">
          <button className="cancel-btn" onClick={onCancel}>
            Cancel
          </button>
          <button className="delete-btn" onClick={onConfirm}>
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmDialog;
