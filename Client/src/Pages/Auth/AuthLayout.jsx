import "./Auth.css";

export default function AuthLayout({ children, title, subtitle, eyebrow }) {
    return (
        <div className="auth-page">

            {/* LEFT PANEL */}
            <div className="auth-left">
                <a className="auth-logo">
                    <div className="auth-logo-icon">🌿</div>
                    <span className="auth-logo-text">Expense Tracker</span>
                </a>

                <div className="auth-hero">
                    <div className="auth-hero-eyebrow">{eyebrow}</div>
                    <h1>{title}</h1>
                    <p>{subtitle}</p>
                </div>

                <div className="auth-stats">
                    <div className="auth-stat">
                        <div className="auth-stat-value"><span>₹</span>54,720</div>
                        <div className="auth-stat-label">Monthly Income</div>
                    </div>
                    <div className="auth-stat">
                        <div className="auth-stat-value">12</div>
                        <div className="auth-stat-label">Transactions</div>
                    </div>
                    <div className="auth-stat">
                        <div className="auth-stat-value"><span>61.8</span>%</div>
                        <div className="auth-stat-label">Savings Rate</div>
                    </div>
                </div>
            </div>

            {/* RIGHT PANEL */}
            <div className="auth-right">
                {children}
            </div>
        </div>
    );
}