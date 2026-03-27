import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;
const API = `${API_URL}/expenses`;
const token = localStorage.getItem("token");
// ✅ GET
export const fetchExpenses = async (userId) => {
  const res = await axios.get(`${API}/GetExpense?UserID=${userId}`);
  return res?.data || []; // ✅ THIS IS THE FIX
};

// ✅ POST
export const addExpense = async (payload) => {

  const res = await axios.post(
    `${API}/AddExpense`,
    payload,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
      }
    }
  );

  return res.data;
};
export const updateExpense = async (id, payload) => {

  const res = await axios.put(
    `${API}/AddExpense`,
    payload,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
      }
    }
  );

  return res.data;
};

export const deleteExpense = async (id)=>
  {
  const res = await axios.delete(
    `${API}/DeleteExpense?id=${id}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
      }
    }
  );

  return res.data;
  }
