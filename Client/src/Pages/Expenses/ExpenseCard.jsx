import "./expenses.css"
 function ExpenseCard({ records }) {
    //  const totalIncome = records.filter(r => r.type === "income").reduce((s, r) => s + r.amount, 0);
    //  const totalExpense = records.filter(r => r.type === "expense").reduce((s, r) => s + r.amount, 0);
    //  const balance = totalIncome - totalExpense;
console.log(records,"records")
     const totalIncome = records ? records.income :0 ;
     const totalExpense = records ? records.expense : 0;
     const balance = records ? records.balance : 0;
     const highest = records ? records.highest : 0;
     const fmt = (n) => "₹" + Number(n).toLocaleString("en-IN");
     return (
         <div className="exp-stats">
             <div className="exp-stat-card exp-stat-income">
                 <p className="exp-stat-label">Total Income</p>
                 <h2 className="exp-stat-value exp-val-green">{fmt(totalIncome)}</h2>
                 {/* <p className="exp-stat-sub">{records.filter(r => r.type === "income").length} transactions</p> */}
             </div>
             <div className="exp-stat-card exp-stat-total">
                 <p className="exp-stat-label">Total Expenses</p>
                 <h2 className="exp-stat-value exp-val-red">{fmt(totalExpense)}</h2>
                 {/* <p className="exp-stat-sub">{records.filter(r => r.type === "expense").length} transactions</p> */}
             </div>
             <div className="exp-stat-card exp-stat-balance">
                 <p className="exp-stat-label">Net Balance</p>
                 <h2 className={`exp-stat-value ${balance >= 0 ? "exp-val-green" : "exp-val-red"}`}>
                     {balance >= 0 ? "+" : ""}{fmt(balance)}
                 </h2>
                 <p className="exp-stat-sub">{balance >= 0 ? "You're saving 🎉" : "Overspending ⚠️"}</p>
             </div>
             <div className="exp-stat-card exp-stat-highest">
                 <p className="exp-stat-label">Highest Entry</p>
                 <h2 className="exp-stat-value">{fmt(highest)}</h2>
                 <p className="exp-stat-sub">Single transaction</p>
             </div>
         </div>
        // <div className="exp-stats">
        //     <div className="card green">₹{totalIncome}</div>
        //     <div className="card red">₹{totalExpense}</div>
        //     <div className="card">{balance}</div>
        // </div>
    );
}
export default ExpenseCard;