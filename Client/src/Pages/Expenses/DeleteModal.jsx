import "./expenses.css"
export default function DeleteModal({ onClose, onConfirm }) {
    return (
        <div className="modal">
            <h3>Delete?</h3>
            <button onClick={onConfirm}>Yes</button>
            <button onClick={onClose}>Cancel</button>
        </div>
    );
  }