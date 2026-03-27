import "./expenses.css"
function TransactionRow({ rec, index, openEdit, setDeleteId, CATEGORY_META, fmt }) {
    // console.log(rec)
    const meta = CATEGORY_META[rec.category] || CATEGORY_META.Other;
    const isInc = rec.Type === "income";

    return (
        <tr
            className="exp-row"
            style={{ animationDelay: `${index * 35}ms` }}
        >
            <td>
                <span className={`exp-type-badge ${isInc ? "exp-type-inc" : "exp-type-exp"}`}>
                    {isInc ? "↑ Income" : "↓ Expense"}
                </span>
            </td>

            <td>
                <div className="exp-title-cell">
                    <div className="exp-cat-dot" style={{ background: meta.color }} />
                    <span className="exp-row-title">{rec.Title}</span>
                </div>
            </td>

            <td>
                <span
                    className="exp-cat-chip"
                    style={{ background: meta.color + "18", color: meta.color }}
                >
                    {meta.icon} {rec.Category}
                </span>
            </td>

            <td className="exp-date">
                {new Date(rec.Date).toLocaleDateString("en-IN", {
                    day: "numeric",
                    month: "short",
                    year: "numeric"
                })}
            </td>

            <td className="exp-note">
                {rec.Notes || <span className="exp-note-empty">—</span>}
            </td>

            <td className={`exp-amount ${isInc ? "exp-amount-inc" : "exp-amount-exp"}`}>
                {isInc ? "+" : "−"}{fmt(rec.Amount)}
            </td>

            <td>
                <div className="exp-actions">
                    <button className="exp-btn-edit" onClick={() => openEdit(rec)}>
                        Edit
                    </button>

                    <button className="exp-btn-delete" onClick={() => setDeleteId(rec._id)}>
                        Delete
                    </button>
                </div>
            </td>
        </tr>
    );
}

export default TransactionRow;