import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthLayout from "./AuthLayout";
import "./Auth.css";
import { IconLock, IconEyeOff, IconEye } from "./Icons";
import {  loginAPI } from "../../Services/AuthService";
import { useAuth } from "../../Context/AuthContext";

export default function Login() {
    const navigate = useNavigate();
    const { login } = useAuth();
    const [showPw, setShowPw] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async(e) => {
        try {
            e.preventDefault();
            if (!email || ! password) {
                alert("Please fill required fields");
                return;
            }

            const payload = {
                email: email,
                password: password
            };
            let res = await loginAPI(payload);
            console.log(res);
            login(res);
            navigate("/", { replace: true });
         
        } catch (error) {
            console.error(err);
        }
    };
    return (
        <AuthLayout
            eyebrow="AI-Powered Finance"
            title={<>Track every rupee,<br />own every <span>goal.</span></>}
            subtitle="Smart insights and real-time trends help you understand your money."
        >
            <div className="auth-card">
                <h2 className="auth-card-title">Welcome back</h2>

                <form className="auth-form" onSubmit={handleSubmit}>
                    <div className="field-group">
                        <label className="field-label">Email</label>
                        <input
                            className="field-input"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>

                    <div className="field-group">
                        <label className="field-label">Password</label>

                        <div className="input-wrapper">
                            <input
                                className="field-input"
                                type={showPw ? "text" : "password"}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />

                            <span className="input-icon">
                                <IconLock />
                            </span>

                            <button
                                type="button"
                                className="input-toggle"
                                onClick={() => setShowPw(prev => !prev)}
                            >
                                {showPw ? <IconEyeOff /> : <IconEye />}
                            </button>
                        </div>
                    </div>
                    

                    <button className="btn-primary">Login</button>

                    <p className="auth-footer-link">
                        Don't have an account?{" "}
                        <button
                            type="button"
                            onClick={() => navigate("/register")}
                        >
                            Register
                        </button>
                    </p>

                    <p className="auth-footer-link">
                        <button
                            type="button"
                            onClick={() => navigate("/forgot")}
                        >
                            Forgot Password?
                        </button>
                    </p>
                </form>
            </div>
        </AuthLayout>
    );
}