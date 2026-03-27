
import "./expenses.css"
function TransactionTabs({ records = [], filterType, setFilters }) {
    // console.log(records, filterType, setFilters)
    return (
        <div className="exp-type-tabs">
            {[
                { key: "all", label: "All", count: records.length },
                { key: "expense", label: "Expenses", count: records.filter(r => r.Type === "expense").length },
                { key: "income", label: "Income", count: records.filter(r => r.Type === "income").length },
            ].map(t => (
                <button
                    key={t.key}
                    className={`exp-type-tab ${filterType === t.key ? "exp-type-tab-active" : ""}`}
                    onClick={() => setFilters(f => ({ ...f, type: t.key, category: "All" }))}
                >
                    {t.key === "expense" && <span className="exp-tab-dot exp-dot-red" />}
                    {t.key === "income" && <span className="exp-tab-dot exp-dot-green" />}

                    {t.label}
                    <span className="exp-tab-count">{t.count}</span>
                </button>
            ))}
        </div>
    );
  }
export default TransactionTabs;