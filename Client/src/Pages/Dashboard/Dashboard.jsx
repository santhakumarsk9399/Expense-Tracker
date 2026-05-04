
import "../../components/Css/Dashboard/dashboard.css"
import TransactionTable from "./Transactions/TransactionTable";
import BarChartData from "./Charts/BarChart";
import CardsContainer from "./Cards/CardsContainer";
import { useExpense } from "../../Context/ExpenseContext";
import getCategoryData from "../../Services/getCategoryData";
import PieChartComponent from "./Charts/PieChart";
import AreaChartComponent from "./Charts/AreaChart";
import { useNavigate } from "react-router-dom";
import { useEffect, useMemo } from "react";

const data = [
  { name: "Sales", income: 1900, expense: 1100 },
  { name: "Services", income: 1200, expense: 800 },
  { name: "Payroll", income: 1500, expense: 1000 },
  { name: "Operating", income: 2500, expense: 2000 },
  { name: "Training", income: 2000, expense: 1500 },
];


const Dashboard = () => {
  const navigate = useNavigate();
  const { summary, loading, recentTransactions, expenses, TotalTransactions, fetchAllExpenses } = useExpense();
  useEffect(() => {
    console.log(TotalTransactions)
    if (!TotalTransactions || TotalTransactions.length === 0) {
      const user = JSON.parse(localStorage.getItem("user"));
      fetchAllExpenses(user._id);
    }
  }, []);

  const chartData = getCategoryData(TotalTransactions || []);
  // console.log(TotalTransactions)
  return (
    
    <div className="dashboard">
      {/* 🔹 CARDS */}
      <CardsContainer carddata={summary} transactions={TotalTransactions} />

      {/* 🔹 SECTION 2 */}
      <div className="section-two">

        {/* BAR CHART */}
        <BarChartData data={chartData || []} />


        {/* PIE CHART */}
        <PieChartComponent data={chartData || []} />


        {/* AI PANEL */}
        <div className="card ai-panel">
          <div className="ai-header">
            <div className="ai-icon">✨</div>
            <h3>Hello, Santha 👋</h3>
            <p>I’m your AI Financial Advisor</p>
          </div>

          <div className="ai-actions">
            <button>📊 Analyze trends</button>
            <button>💡 Save suggestions</button>
            <button>📄 Generate report</button>
          </div>

          <button className="ai-main-btn" onClick={() => navigate('/ai-insights')}>
            Get AI Insights 🚀
          </button>
        </div>

      </div>

      {/* 🔹 SECTION 3 */}
      <div className="section-three">

        {/* AREA CHART */}
        <div className="card">
          <h3>Monthly Trend</h3>
          <AreaChartComponent data={TotalTransactions || []} />

        </div>

        {/* TRANSACTIONS */}
        <TransactionTable compact transactions={recentTransactions} />

      </div>

    </div>
  );
};

export default Dashboard;