import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import Dashboard from "./Pages/Dashboard/Dashboard";
import Expenses from "./Pages/Expenses/Expenses";
import Reports from "./Pages/Reports/Reports";
import AIInsights from "./Pages/Ai-Insights/GetFinancialAI_Insights";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* ✅ Parent Layout */}
        <Route path="/" element={<Layout />}>
          {/* ✅ Child Pages */}
          <Route index element={<Dashboard />} />
          <Route path="expenses" element={<Expenses />} />
          <Route path="reports" element={<Reports />} />
          <Route path="ai-insights" element= {<AIInsights />} />
        </Route>

      </Routes>
    </BrowserRouter>
  );
}

export default App;