import { useState, useEffect } from "react";
import "./expenses.css";
import ExpenseCard from "./ExpenseCard";
import TransactionTabs from "./TransactionTabs";
import Toolbar from "./Toolbar";
import TransactionTable from "./TransactionTable";
import TransactionModal from "./TransactionModal";
import { addExpense, deleteExpense, fetchExpenses } from "../../Services/ExpenseService";
import { useExpense } from "../../Context/ExpenseContext";
import { EXPENSE_CATEGORIES, INCOME_SOURCES, CATEGORY_META, EMPTY_FORM } from "../../Constants/ExpenseConstants";

function Expenses() {
  // const [records, setRecords] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editId, setEditId] = useState(null);
  const [form, setForm] = useState(EMPTY_FORM);
  const [deleteId, setDeleteId] = useState(null);
  const [search, setSearch] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [filterCat, setFilterCat] = useState("All");
  const [sortBy, setSortBy] = useState("date");
  const [expensesList, setExpensesList] = useState([])


  const { summary, loading, recentTransactions, expenses, TotalTransactions, setExpenses, fetchAllExpenses } = useExpense();
  // console.log(summary, loading, recentTransactions, expenses, TotalTransactions)
  const [filters, setFilters] = useState({
    search: "",
    type: "all",
    category: "All",
    sortBy: "date"
  });

  const currentCats = form.type === "expense" ? EXPENSE_CATEGORIES : INCOME_SOURCES;

  const openAdd = () => { setForm(EMPTY_FORM); setEditId(null); setShowModal(true); };
  const openEdit = (rec) => { setForm({ ...rec }); setEditId(rec.id); setShowModal(true); };
  const closeModal = () => { setShowModal(false); setEditId(null); };

  const switchType = (t) => {
    setForm(f => ({ ...f, type: t, category: t === "expense" ? "Food" : "Salary" }));
  };
  const dummyuser = {
    _id: "69b7a9944e393b6b2fc851d1"
  };

  localStorage.setItem("user", JSON.stringify(dummyuser));
  const user = JSON.parse(localStorage.getItem("user"));

  // useEffect(() => {
  //   const loadExpenses = async () => {
  //     const data = await fetchExpenses(user._id);
  //     setExpenses(data.data);
  //   };

  //   loadExpenses();
  // }, []);
  const handleSave = async (data) => {
    try {
      if (!data.title || !data.amount || !data.date) {
        alert("Please fill required fields");
        return;
      }

      const payload = {
        Title: data.title,
        Amount: Number(data.amount),
        Category: data.category,
        Type: data.type,
        Date: data.date,
        Notes: data.note
      };

      // ✅ Step 1: Save
      await addExpense(payload);
      await fetchAllExpenses();
      setShowModal(false);

    } catch (err) {
      console.error(err);
    }
  };


  const handleDelete = async () => {
    try {
      const res = await deleteExpense(deleteId);
      await fetchAllExpenses();
      setDeleteId(null);

    } catch (err) {
      console.error(err);
    }
  };
  console.log(expenses)
  const filtered = (expenses || [])
    .filter(r => filters.type === "all" || r.Type === filters.type)
    .filter(r => filters.category === "All" || r.Category === filters.category)
    .filter(r =>
      (r.Title || "").toLowerCase().includes((filters.search || "").toLowerCase())
    )
    .sort((a, b) => {
      if (filters.sortBy === "date") {
        return new Date(b.Date) - new Date(a.Date);
      } else {
        return b.Amount - a.Amount;
      }
    });
  console.log(filtered);
  const fmt = (n) => "₹" + Number(n).toLocaleString("en-IN");

  return (
    <div className="exp-page">

      {/* ── HEADER ── */}
      <div className="exp-header">
        <div>
          <span className="exp-badge">TRACKER</span>
          <h1 className="exp-title">Transactions</h1>
        </div>
        <button className="exp-add-btn" onClick={openAdd}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
            <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
          </svg>
          Add Transaction
        </button>
      </div>

      {/* ── STAT CARDS ── */}
      <ExpenseCard records={summary} />


      {/* ── TABLE CARD ── */}
      <div className="exp-table-card">

        {/* TYPE TABS */}
        <TransactionTabs records={expenses} filterType={filters.type} setFilters={setFilters} />


        {/* SEARCH + FILTER */}
        <Toolbar filters={filters} setFilters={setFilters} records={expenses} />

        {/* TABLE */}
        {filtered.length === 0 ? (
          <div className="exp-empty">
            <div className="exp-empty-icon">🧾</div>
            <p>No transactions found</p>
            <span>Try adjusting your search or filters</span>
          </div>
        ) : (

          <TransactionTable
            filtered={filtered}
            openEdit={openEdit}
            setDeleteId={setDeleteId}
            CATEGORY_META={CATEGORY_META}
            fmt={fmt}
          />
        )}

        <div className="exp-table-footer">
          Showing <strong>{filtered.length}</strong> of <strong>{expenses?.length}</strong> transactions
          {filterCat !== "All" && (
            <span className="exp-filter-tag">{filterCat} <button onClick={() => setFilterCat("All")}>×</button></span>
          )}
        </div>
      </div>

      {/* ── ADD / EDIT MODAL ── */}
      <TransactionModal
        showModal={showModal}
        onClose={closeModal}
        onSave={handleSave}
        editId={editId}
        initialForm={form}
        switchType={switchType}
        expenseCategories={EXPENSE_CATEGORIES}
        incomeCategories={INCOME_SOURCES}
        currentCats={currentCats}
        CATEGORY_META={CATEGORY_META}
      />

      {/* ── DELETE CONFIRM ── */}
      {deleteId && (
        <div className="exp-modal-overlay" onClick={() => setDeleteId(null)}>
          <div className="exp-modal exp-modal-sm" onClick={e => e.stopPropagation()}>
            <div className="exp-delete-icon">🗑️</div>
            <h3>Delete Transaction?</h3>
            <p>This action cannot be undone.</p>
            <div className="exp-modal-footer">
              <button className="exp-btn-cancel" onClick={() => setDeleteId(null)}>Cancel</button>
              <button className="exp-btn-danger" onClick={handleDelete}>Yes, Delete</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}


export default Expenses;