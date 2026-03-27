// import { useState } from "react";
// import "./aiInsights.css";
// import { FaExclamationTriangle, FaLightbulb, FaChartLine } from "react-icons/fa";
// const AIInsights = () => {

//     const [insight, setInsight] = useState(null);
//     const [loading, setLoading] = useState(false);

//     const fetchInsights = async () => {
//         setLoading(true);

//         const userId = "69b7a9944e393b6b2fc851d1";

//         const res = await fetch(`http://localhost:7000/expenses/getAiInsights?UserID=${userId}`);
//         const data = await res.json();
//         console.log(data)
//         setInsight(data.insights);
//         setLoading(false);
//     };
//     const formatInsights = (text) => {
//         if (!text) return {
//             overspending: [],
//             suggestions: [],
//             prediction: ""
//         };

//         const sections = {
//             overspending: [],
//             suggestions: [],
//             prediction: ""
//         };

//         const lines = text.split("\n");

//         let current = null; // ✅ important change

//         lines.forEach(line => {
//             const clean = line.trim();

//             if (clean.toLowerCase().includes("overspending")) {
//                 current = "overspending";
//             }
//             else if (clean.toLowerCase().includes("saving") || clean.toLowerCase().includes("suggest")) {
//                 current = "suggestions";
//             }
//             else if (clean.toLowerCase().includes("prediction")) {
//                 current = "prediction";
//             }
//             else if (clean && current) {   // ✅ prevent undefined
//                 if (current === "prediction") {
//                     sections.prediction += clean + " ";
//                 } else {
//                     sections[current].push(clean);
//                 }
//             }
//         });

//         return sections;
//       };
//     const parsed = formatInsights(insight);
//     return (
//         <div className="ai-page">

//             {/* HEADER */}
//             <div className="ai-header-top">
//                 <h2>🤖 AI Financial Insights</h2>
//                 <button onClick={fetchInsights}>
//                     {loading ? "Analyzing..." : "Generate Insights"}
//                 </button>
//             </div>

//             {/* SUMMARY CARDS */}
//             <div className="ai-summary">

//                 <div className="ai-card">
//                     <h4>Top Spending</h4>
//                     <p>Food 🍔</p>
//                 </div>

//                 <div className="ai-card">
//                     <h4>Risk Level</h4>
//                     <p className="danger">High</p>
//                 </div>

//                 <div className="ai-card">
//                     <h4>Saving Potential</h4>
//                     <p>₹2,000/month</p>
//                 </div>

//             </div>

//             {/* MAIN INSIGHT */}
//             <div className="ai-main-card">

//                 <h3>🧠 AI Analysis</h3>

//                 {!insight ? (
//                     <p>Click generate to get insights</p>
//                 ) : (
//                     <>
//                         {/* 🔴 Overspending */}
//                         <div className="ai-section danger">
//                             <h4>⚠️ Overspending</h4>
//                             {parsed.overspending.map((item, i) => (
//                                 <p key={i}>{item}</p>
//                             ))}
//                         </div>

//                         {/* 💡 Suggestions */}
//                         <div className="ai-section success">
//                             <h4>💡 Suggestions</h4>
//                             {parsed.suggestions.map((item, i) => (
//                                 <p key={i}>{item}</p>
//                             ))}
//                         </div>

//                         {/* 📈 Prediction */}
//                         <div className="ai-section info">
//                             <h4>📈 Prediction</h4>
//                             <p>{parsed.prediction}</p>
//                         </div>
//                     </>
//                 )}

//             </div>

//             {/* SUGGESTIONS + PREDICTION */}
//             <div className="ai-bottom">

//                 {/* 💡 Suggestions */}
//                 <div className="ai-suggestions">
//                     <h3>💡 Smart Suggestions</h3>

//                     <div className="suggestion-list">
//                         {parsed.suggestions.map((item, i) => (
//                             <div key={i} className="suggestion-card">
//                                 <span>✔</span>
//                                 <p>{item}</p>
//                             </div>
//                         ))}
//                     </div>
//                 </div>

//                 {/* 📈 Prediction */}
//                 <div className="ai-prediction">
//                     <h3>📈 Monthly Prediction</h3>

//                     <div className="prediction-box">
//                         <h2>₹68,000</h2>
//                         <p>Expected next month spend</p>
//                     </div>

//                 </div>

//             </div>

//             {/* CHAT BOX */}
//             <div className="ai-chat">
//                 <input placeholder="Ask anything about your finances..." />
//                 <button>➤</button>
//             </div>

//         </div>
//     );
// };

// export default AIInsights;

import { useState } from "react";
import "./aiInsights.css";

const AIInsights = () => {
  const [insight, setInsight] = useState(null);
  const [loading, setLoading] = useState(false);
  const [chatInput, setChatInput] = useState("");
  const [chatMessages, setChatMessages] = useState([]);

  const fetchInsights = async () => {
    setLoading(true);
    const userId = "69b7a9944e393b6b2fc851d1";
    const res = await fetch(`http://localhost:7000/expenses/getAiInsights?UserID=${userId}`);
    const data = await res.json();
    setInsight(data.insights);
    setLoading(false);
  };

  const formatInsights = (text) => {
    if (!text) return { overspending: [], suggestions: [], prediction: "" };
    const sections = { overspending: [], suggestions: [], prediction: "" };
    const lines = text.split("\n");
    let current = null;
    lines.forEach((line) => {
      const clean = line.trim();
      if (clean.toLowerCase().includes("overspending")) current = "overspending";
      else if (clean.toLowerCase().includes("saving") || clean.toLowerCase().includes("suggest")) current = "suggestions";
      else if (clean.toLowerCase().includes("prediction")) current = "prediction";
      else if (clean && current) {
        if (current === "prediction") sections.prediction += clean + " ";
        else sections[current].push(clean);
      }
    });
    return sections;
  };

  const parsed = formatInsights(insight);

  return (
    <div className="ai-page">
      {/* HEADER */}
      <div className="ai-header-top">
        <div className="ai-title-group">
          <span className="ai-title-badge">AI-POWERED</span>
          <h2 className="ai-title">Financial Intelligence</h2>
        </div>
        <button className="ai-generate-btn" onClick={fetchInsights} disabled={loading}>
          {loading ? (
            <span className="ai-loading">
              <span className="ai-spinner" /> Analyzing...
            </span>
          ) : (
            <>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>
              Generate Insights
            </>
          )}
        </button>
      </div>

      {/* SUMMARY CARDS */}
      <div className="ai-summary">
        <div className="ai-stat-card ai-stat-food">
          <div className="ai-stat-icon">🍔</div>
          <div className="ai-stat-info">
            <p className="ai-stat-label">Top Spending</p>
            <p className="ai-stat-value">Food & Dining</p>
          </div>
          <div className="ai-stat-bar"><div className="ai-stat-fill" style={{ width: "72%" }} /></div>
        </div>

        <div className="ai-stat-card ai-stat-risk">
          <div className="ai-stat-icon">⚡</div>
          <div className="ai-stat-info">
            <p className="ai-stat-label">Risk Level</p>
            <p className="ai-stat-value ai-risk-high">High</p>
          </div>
          <div className="ai-risk-dots">
            {[1, 2, 3, 4, 5].map((d) => (
              <span key={d} className={`ai-dot ${d <= 4 ? "ai-dot-active" : ""}`} />
            ))}
          </div>
        </div>

        <div className="ai-stat-card ai-stat-saving">
          <div className="ai-stat-icon">💰</div>
          <div className="ai-stat-info">
            <p className="ai-stat-label">Saving Potential</p>
            <p className="ai-stat-value">₹2,000<span>/mo</span></p>
          </div>
          <p className="ai-stat-sub">+12% vs last month</p>
        </div>
      </div>

      {/* MAIN INSIGHT */}
      <div className="ai-main-card">
        <div className="ai-main-header">
          <h3>🧠 AI Analysis</h3>
          {insight && <span className="ai-fresh-badge">Fresh · Just now</span>}
        </div>

        {!insight ? (
          <div className="ai-empty-state">
            <div className="ai-empty-icon">✦</div>
            <p>Click <strong>Generate Insights</strong> to analyze your spending patterns</p>
          </div>
        ) : (
          <div className="ai-sections-grid">
            <div className="ai-section ai-section-danger">
              <div className="ai-section-tag">⚠ Overspending</div>
              {parsed.overspending.map((item, i) => (
                <p key={i} className="ai-section-text">• {item}</p>
              ))}
            </div>

            <div className="ai-section ai-section-success">
              <div className="ai-section-tag">💡 Suggestions</div>
              {parsed.suggestions.map((item, i) => (
                <p key={i} className="ai-section-text">• {item}</p>
              ))}
            </div>

            <div className="ai-section ai-section-info ai-section-full">
              <div className="ai-section-tag">📈 Prediction</div>
              <p className="ai-section-text">{parsed.prediction}</p>
            </div>
          </div>
        )}
      </div>

      {/* BOTTOM GRID */}
      <div className="ai-bottom">
        <div className="ai-suggestions-panel">
          <h3>💡 Smart Suggestions</h3>
          <div className="suggestion-list">
            {parsed.suggestions.length > 0 ? (
              parsed.suggestions.map((item, i) => (
                <div key={i} className="suggestion-card">
                  <div className="suggestion-check">✓</div>
                  <p>{item}</p>
                </div>
              ))
            ) : (
              <p className="ai-empty-sub">Generate insights to see suggestions</p>
            )}
          </div>
        </div>

        <div className="ai-prediction-panel">
          <h3>📈 Monthly Prediction</h3>
          <div className="prediction-box">
            <p className="prediction-label">Expected next month</p>
            <h2 className="prediction-amount">₹68,000</h2>
            <div className="prediction-trend">
              <span className="trend-up">↑ 6.2%</span> vs this month
            </div>
          </div>
          <div className="prediction-mini-grid">
            <div className="prediction-mini">
              <p>Food</p>
              <strong>₹18k</strong>
            </div>
            <div className="prediction-mini">
              <p>Bills</p>
              <strong>₹12k</strong>
            </div>
            <div className="prediction-mini">
              <p>Travel</p>
              <strong>₹9k</strong>
            </div>
            <div className="prediction-mini">
              <p>Other</p>
              <strong>₹29k</strong>
            </div>
          </div>
        </div>
      </div>

      {/* CHAT */}
      <div className="ai-chat">
        <div className="ai-chat-avatar">🤖</div>
        <input
          className="ai-chat-input"
          placeholder="Ask anything about your finances..."
          value={chatInput}
          onChange={(e) => setChatInput(e.target.value)}
        />
        <button className="ai-chat-send">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
        </button>
      </div>
    </div>
  );
};

export default AIInsights;
