import TransactionRow from "./TransactionRow";
import "./expenses.css"

function TransactionTable({ filtered, openEdit, setDeleteId, CATEGORY_META, fmt }) {
    return (
        <div className="exp-table-wrap">
            <table className="exp-table">
                <thead>
                    <tr>
                        <th>Type</th>
                        <th>Title</th>
                        <th>Category</th>
                        <th>Date</th>
                        <th>Note</th>
                        <th className="exp-th-amount">Amount</th>
                        <th className="exp-th-actions">Actions</th>
                    </tr>
                </thead>

                <tbody>
                    {filtered?.map((rec, i) => (
                        <TransactionRow
                            key={rec._id || i}  
                            rec={rec}
                            index={i}
                            openEdit={openEdit}
                            setDeleteId={setDeleteId}
                            CATEGORY_META={CATEGORY_META}
                            fmt={fmt}
                        />
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default TransactionTable;