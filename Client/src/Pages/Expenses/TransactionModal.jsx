import { useState, useEffect } from "react";

export default function TransactionModal({
    showModal,
    onClose,
    onSave,
    editId,
    initialForm,
    switchType,
    expenseCategories,
    incomeCategories,
    CATEGORY_META
}) {

    const [form, setForm] = useState(initialForm);
    const currentCats =
        form.type === "expense"
            ? expenseCategories
            : incomeCategories;

    useEffect(() => {
        setForm(f => ({
            ...f,
            category: currentCats[0]
        }));
    }, [form.type]);
    if (!showModal) return null;

    return (
        <div className="exp-modal-overlay" onClick={onClose}>
            <div className="exp-modal" onClick={e => e.stopPropagation()}>

                <div className="exp-modal-header">
                    <h3>{editId ? "Edit Transaction" : "New Transaction"}</h3>
                    <button className="exp-modal-close" onClick={onClose}>✕</button>
                </div>

                {/* ── TYPE TOGGLE ── */}
                <div className="exp-toggle-wrap">
                    <div className="exp-toggle-track">

                        <button
                            className={`exp-toggle-btn ${form.type === "expense" ? "exp-toggle-active-exp" : ""}`}
                            onClick={() =>
                                setForm(f => ({
                                    ...f,
                                    type: "expense",
                                    category: currentCats[0]
                                }))
                            }
                        >
                            Expense
                        </button>

                        <button
                            className={`exp-toggle-btn ${form.type === "income" ? "exp-toggle-active-inc" : ""}`}
                            onClick={() =>
                                setForm(f => ({
                                    ...f,
                                    type: "income",
                                    category: incomeCategories[0]   // ✅ dynamic default
                                  }))
                            }
                        >
                            Income
                        </button>

                    </div>
                </div>

                <div className="exp-modal-body">
                    <div className="exp-form-row">
                        <label>Title <span>*</span></label>
                        <input
                            className="exp-input"
                            placeholder={form.type === "expense" ? "e.g. Grocery shopping" : "e.g. Monthly salary"}
                            value={form.title}
                            onChange={e => setForm(f => ({ ...f, title: e.target.value }))}
                        />
                    </div>

                    <div className="exp-form-2col">
                        <div className="exp-form-row">
                            <label>Amount (₹) <span>*</span></label>
                            <input
                                className="exp-input"
                                type="number"
                                placeholder="0.00"
                                value={form.amount}
                                onChange={e => setForm(f => ({ ...f, amount: e.target.value }))}
                            />
                        </div>
                        <div className="exp-form-row">
                            <label>Date <span>*</span></label>
                            <input
                                className="exp-input"
                                type="date"
                                value={form.date}
                                onChange={e => setForm(f => ({ ...f, date: e.target.value }))}
                            />
                        </div>
                    </div>

                    <div className="exp-form-row">
                        <label>{form.type === "expense" ? "Category" : "Source"}</label>
                        <div className="exp-cat-grid">
                            {currentCats.map(c => {
                                const meta = CATEGORY_META[c] || CATEGORY_META.Other;
                                const sel = form.category === c;
                                return (
                                    <button
                                        key={c}
                                        className={`exp-cat-btn ${sel ? "exp-cat-selected" : ""}`}
                                        style={sel ? { borderColor: meta.color, background: meta.color + "15", color: meta.color } : {}}
                                        onClick={() => setForm(f => ({ ...f, category: c }))}
                                    >
                                        {meta.icon} {c}
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    <div className="exp-form-row">
                        <label>Note</label>
                        <input
                            className="exp-input"
                            placeholder="Optional note..."
                            value={form.note}
                            onChange={e => setForm(f => ({ ...f, note: e.target.value }))}
                        />
                    </div>
                </div>

                <div className="exp-modal-footer">
                    <button className="exp-btn-cancel" onClick={onClose}>Cancel</button>
                    <button
                        className={`exp-btn-save ${form.type === "income" ? "exp-btn-save-inc" : ""}`}
                        onClick={() => {
                            console.log("clicked", form);
                            onSave(form);
                          }}
                    >
                        {editId ? "Save Changes" : `Add ${form.type === "income" ? "Income" : "Expense"}`}
                    </button>
                </div>
            </div>
        </div>
        // <div className="exp-modal-overlay" onClick={onClose}>
        //     <div className="exp-modal" onClick={e => e.stopPropagation()}>

        //         {/* HEADER */}
        //         <div className="exp-modal-header">
        //             <h3>{editId ? "Edit Transaction" : "New Transaction"}</h3>
        //             <button className="exp-modal-close" onClick={onClose}>✕</button>
        //         </div>

        //         {/* TYPE TOGGLE */}
        //         <div className="exp-toggle-wrap">
        //             <div className="exp-toggle-track">
        //                 <button
        //                     className={`exp-toggle-btn ${form.type === "expense" ? "exp-toggle-active-exp" : ""}`}
        //                     onClick={() => switchType("expense")}
        //                 >
        //                     Expense
        //                 </button>

        //                 <button
        //                     className={`exp-toggle-btn ${form.type === "income" ? "exp-toggle-active-inc" : ""}`}
        //                     onClick={() => switchType("income")}
        //                 >
        //                     Income
        //                 </button>
        //             </div>
        //         </div>

        //         {/* BODY */}
        //         <div className="exp-modal-body">

        //             <input
        //                 className="exp-input"
        //                 placeholder="Title"
        //                 value={form.title}
        //                 onChange={e => setForm(f => ({ ...f, title: e.target.value }))}
        //             />

        //             <input
        //                 className="exp-input"
        //                 type="number"
        //                 placeholder="Amount"
        //                 value={form.amount}
        //                 onChange={e => setForm(f => ({ ...f, amount: e.target.value }))}
        //             />

        //             <input
        //                 className="exp-input"
        //                 type="date"
        //                 value={form.date}
        //                 onChange={e => setForm(f => ({ ...f, date: e.target.value }))}
        //             />

        //             {/* CATEGORY */}
        //             <div className="exp-cat-grid">
        //                 {currentCats.map(c => {
        //                     const meta = CATEGORY_META[c] || {};
        //                     return (
        //                         <button
        //                             key={c}
        //                             className="exp-cat-btn"
        //                             onClick={() => setForm(f => ({ ...f, category: c }))}
        //                         >
        //                             {meta.icon} {c}
        //                         </button>
        //                     );
        //                 })}
        //             </div>

        //         </div>

        //         {/* FOOTER */}
        //         <div className="exp-modal-footer">
        //             <button className="exp-btn-cancel" onClick={onClose}>Cancel</button>

        //             <button
        //                 className="exp-btn-save"
        //                 onClick={() => onSave(form)}
        //             >
        //                 {editId ? "Save Changes" : "Add Transaction"}
        //             </button>
        //         </div>

        //     </div>
        // </div>
    );
}