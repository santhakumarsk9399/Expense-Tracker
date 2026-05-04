import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthLayout from "./AuthLayout";
import "./Auth.css";

export default function ForgotPassword() {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        alert("Reset link sent!");
    };

    return (
        <AuthLayout
            eyebrow="Account Recovery"
            title={<>Reset your<br /><span>password</span></>}
            subtitle="We’ll send a reset link to your email."
        >
            <div className="auth-card">
                <h2 className="auth-card-title">Forgot Password</h2>

                <form className="auth-form" onSubmit={handleSubmit}>
                    <input
                        className="field-input"
                        type="email"
                        placeholder="Enter email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />

                    <button className="btn-primary">Send Reset Link</button>

                    <p className="auth-footer-link">
                        <button onClick={() => navigate("/login")}>
                            Back to Login
                        </button>
                    </p>
                </form>
            </div>
        </AuthLayout>
    );
}