import { createPortal } from "react-dom";
import "../Css/logoutmodal.css";

// const LogoutModal = ({ isOpen, onConfirm, onCancel }) => {
//   // if (!isOpen) return null;

//   return (
//     <div className="modal-overlay">
//       <div className="modal">
//         <div className="modal-icon">
//           {/* logout SVG icon */}
//         </div>
//         <h3>Sign out of Expense Tracker?</h3>
//         <p>You'll need to sign in again to access your dashboard and transactions.</p>
//         <div className="modal-actions">
//           <button className="btn-cancel" onClick={onCancel}>Stay signed in</button>
//           <button className="btn-logout" onClick={onConfirm}>Yes, sign out</button>
//         </div>
//       </div>
//     </div>
//   );
// };



const LogoutModal = ({ onConfirm, onCancel }) => {
  return createPortal(
    <div className="logout-modal" onClick={onCancel}>
      <div className="logout-box" onClick={(e) => e.stopPropagation()}>
        <h3>Logout</h3>
        <p>Are you sure you want to logout?</p>

        <div className="logout-actions">
          <button className="yes-btn" onClick={onConfirm}>
            Yes
          </button>
          <button className="cancel-btn" onClick={onCancel}>
            Cancel
          </button>
        </div>
      </div>
    </div>,
    document.body   // 🔥 KEY FIX
  );
};

export default LogoutModal;

