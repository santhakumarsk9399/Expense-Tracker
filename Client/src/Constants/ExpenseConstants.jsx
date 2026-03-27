// src/constants/expenseConstants.js

export const EXPENSE_CATEGORIES = [
    "Food", "Transport", "Shopping", "Bills", "Health", "Travel", "Entertainment", "Other"
];

export const INCOME_SOURCES = [
    "Salary", "Freelance", "Business", "Investment", "Rental", "Gift", "Refund", "Other"
];

export const CATEGORY_META = {
    Food: { icon: "🍔", color: "#f97316" },
    Transport: { icon: "🚗", color: "#3b82f6" },
    Shopping: { icon: "🛍️", color: "#ec4899" },
    Bills: { icon: "📄", color: "#6366f1" },
    Health: { icon: "💊", color: "#22c55e" },
    Travel: { icon: "✈️", color: "#14b8a6" },
    Entertainment: { icon: "🎬", color: "#a855f7" },
    Salary: { icon: "💼", color: "#10b981" },
    Freelance: { icon: "💻", color: "#06b6d4" },
    Business: { icon: "🏢", color: "#6366f1" },
    Investment: { icon: "📈", color: "#f59e0b" },
    Rental: { icon: "🏠", color: "#8b5cf6" },
    Gift: { icon: "🎁", color: "#f43f5e" },
    Refund: { icon: "🔄", color: "#64748b" },
    Other: { icon: "📦", color: "#94a3b8" },
};

export const EMPTY_FORM = {
    type: "expense",
    title: "",
    category: "Food",
    amount: "",
    date: "",
    note: ""
};