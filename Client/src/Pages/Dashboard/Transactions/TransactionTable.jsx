import { useState } from "react";
import "../../../components/Css/Dashboard/transactiontable.css"
// import "./transaction.css";

const TransactionTable = ({ transactions }) => {
    const [search, setSearch] = useState("");
    const [data, setData] = useState([]);

    // 🔍 FILTER LOGIC
    const filteredData = transactions?.filter((item) =>
        item.Title?.toLowerCase().includes(search.toLowerCase())
    );
console.log(transactions)
    return (
        <div className="table-container">

            {/* HEADER */}
            <div className="table-header">
                <div>
                    <h3>Transaction Records</h3>
                    <p>Complete list of all financial transactions</p>
                </div>

                <div className="table-actions">
                    <input
                        type="text"
                        placeholder="Search"
                        onChange={(e) => setSearch(e.target.value)}
                    />

                    <button className="filter-btn">⚙ Filter</button>
                </div>
            </div>

            {/* TABLE */}
            <table>
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Description</th>
                        <th>Category</th>
                        <th>Amount</th>
                        {/* <th>Status</th>
                        <th>+</th> */}
                    </tr>
                </thead>

                <tbody>
                    {filteredData?.map((item, index) => (
                        <tr key={index}>
                            <td>{item.Date}</td>
                            <td>{item.Title}</td>

                            <td>
                                <span className="category">{item.Category}</span>
                            </td>

                            <td
                                className={item.Type !== "expense" ? "amount green" : "amount red"}
                            >
                                {item.Type !== "expense" ? "+" : "-"}₹{item.Amount}
                            </td>

                            {/* <td>
                                <span
                                    className={`status ${item.status === "Completed"
                                            ? "completed"
                                            : "pending"
                                        }`}
                                >
                                    {item.status}
                                </span>
                            </td>

                            <td>⋮</td> */}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default TransactionTable;