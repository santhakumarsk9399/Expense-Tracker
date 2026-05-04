import React, { createContext, useContext, useState, useEffect } from "react";
import { fetchExpenses } from "../Services/ExpenseService";
import calculateSummary from "../Utils/ExpenseUtils"
const ExpenseContext = createContext();

export const ExpenseProvider = ({ children }) => {
  const [transactions, setTransactions] = useState([]);
  const [summary, setSummary] = useState({
    income: 0,
    expense: 0,
    savings: 0,
    balance: 0,
    highest: 0
  });
  // const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [expenses, setExpenses] = useState([]);
  // const [recentTransactions, setRecentTransactions] = useState([]);


  const dummyuser = {
    _id: "69b7a9944e393b6b2fc851d1"
  };

  localStorage.setItem("user", JSON.stringify(dummyuser));
  const user = JSON.parse(localStorage.getItem("user"));
  // 🔥 FETCH DATA
  const loadExpenses = async () => {
    try {
      setLoading(true);
      const data = await fetchExpenses(user._id);
      // console.log(data)
      setExpenses(data);
      setTransactions(data);

      const summaryData = calculateSummary(data);
      // console.log(summaryData)
      setSummary(summaryData);

    } catch (err) {
      setError("Failed to load expenses");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    if (user?._id) loadExpenses();
  }, []);


  // const fetchAllExpenses = async () => {
  //   const user = JSON.parse(localStorage.getItem("user"));

  //   if (!user?._id) return;

  //   const res = await fetchExpenses(user._id);
  //   const data = res.data || [];
  //   return data;
  // };

  const fetchAllExpenses = async () => {
    const user = JSON.parse(localStorage.getItem("user"));

    if (!user?._id) return;

    try {
      setLoading(true);
      const data = await fetchExpenses(user._id); // ✅ FIXED
      setTransactions(data);
      setExpenses(data);

      const summaryData = calculateSummary(data);
      setSummary(summaryData);

    } catch (err) {
      setError("Failed to fetch expenses");
    } finally {
      setLoading(false);
    }

  };

  // useEffect(() => {
  //   if (transactions.length > 0) {
  //     const summaryData = calculateSummary(transactions);
  //     setSummary(summaryData);
  //   }
  // }, [transactions]);

  // const recentTransactions = transactions
  //   .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
  //   .slice(0, 6);
  const recentTransactions = [...transactions] // ✅ clone first
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 6);
  // total transactions
  const TotalTransactions = transactions;
  return (
    <ExpenseContext.Provider
      value={{
        transactions,
        summary,
        loading,
        error,
        expenses,
        setExpenses,
        loadExpenses,
        recentTransactions,
        TotalTransactions,
        fetchAllExpenses,
        setTransactions
      }}
    >
      {children}
    </ExpenseContext.Provider>
  );
};

export const useExpense = () => useContext(ExpenseContext);