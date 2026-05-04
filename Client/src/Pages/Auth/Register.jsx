// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import AuthLayout from "./AuthLayout";
// import "./Auth.css";

// export default function Register() {
//     const navigate = useNavigate();
//     const [password, setPassword] = useState("");

//     const handleSubmit = (e) => {
//         e.preventDefault();
//         navigate("/login");
//     };

//     return (
//         <AuthLayout
//             eyebrow="Join Users"
//             title={<>Your financial<br /><span>journey</span> starts here.</>}
//             subtitle="Track, save and grow your money."
//         >
//             <div className="auth-card">
//                 <h2 className="auth-card-title">Create account</h2>

//                 <form className="auth-form" onSubmit={handleSubmit}>
//                     <input className="field-input" placeholder="First Name" required />
//                     <input className="field-input" placeholder="Last Name" required />

//                     <input className="field-input" type="email" placeholder="Email" required />

//                     <input
//                         className="field-input"
//                         type="password"
//                         placeholder="Password"
//                         value={password}
//                         onChange={(e) => setPassword(e.target.value)}
//                     />

//                     <button className="btn-primary">Register</button>

//                     <p className="auth-footer-link">
//                         Already have an account?{" "}
//                         <button onClick={() => navigate("/login")}>
//                             Login
//                         </button>
//                     </p>
//                 </form>
//             </div>
//         </AuthLayout>
//     );
// }
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import AuthLayout from "./AuthLayout";
import "./Auth.css";
import { registerAPI } from "../../Services/AuthService";
import { IconLock, IconEyeOff, IconEye } from "./Icons";
export default function Register() {
    const navigate = useNavigate();

    const [form, setForm] = useState({
        firstName: "",
        mobile: "",
        email: "",
        password: "",
        confirmPassword: ""
    });

    const [showPw, setShowPw] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const { name, mobile, email, password, confirmPassword } = form;

        // 🔥 Validation
        if (!name || !mobile || !email || !password || !confirmPassword) {
            toast.error("All fields are required ❌");
            return;
        }

        if (password.length < 6) {
            toast.error("Password must be at least 6 characters ❌");
            return;
        }

        if (password !== confirmPassword) {
            toast.error("Passwords do not match ❌");
            return;
        }
        const payload = {
            name: name,
            email: email,
            mobile: mobile,
            password: password
        }
        const res = await registerAPI(payload);
        console.log(res)
        toast.success("Registered successfully 🎉");

        // redirect after delay
        setTimeout(() => {
            navigate("/login");
        }, 1500);
    };

    return (
        <AuthLayout
            eyebrow="Join Users"
            title={<>Your financial<br /><span>journey</span> starts here.</>}
            subtitle="Track, save and grow your money."
        >
            <div className="auth-card">
                <h2 className="auth-card-title">Create account</h2>

                <form className="auth-form" onSubmit={handleSubmit}>

                    <input
                        className="field-input"
                        name="name"
                        placeholder="Name"
                        onChange={handleChange}
                    />

                    <input
                        className="field-input"
                        name="mobile"
                        placeholder="mobile"
                        onChange={handleChange}
                    />

                    <input
                        className="field-input"
                        name="email"
                        type="email"
                        placeholder="Email"
                        onChange={handleChange}
                    />

                    {/* PASSWORD */}
                    <div className="input-wrapper">
                        <input
                            className="field-input"
                            name="password"
                            type={showPw ? "text" : "password"}
                            placeholder="Password"
                            onChange={handleChange}
                        />
                        {/* <button
                            type="button"
                            className="input-toggle"
                            onClick={() => setShowPw(prev => !prev)}
                        >
                            {showPw ? "🙈" : "👁️"}
                        </button> */}
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

                        {/* 

                        <button
                            type="button"
                            className="input-toggle"
                            onClick={() => setShowPw(prev => !prev)}
                        >
                            {showPw ? <IconEyeOff /> : <IconEye />}
                        </button> */}
                    </div>

                    {/* CONFIRM PASSWORD */}
                    <div className="input-wrapper">
                        <input
                            className="field-input"
                            name="confirmPassword"
                            type={showConfirm ? "text" : "password"}
                            placeholder="Confirm Password"
                            onChange={handleChange}
                        />

                        <span className="input-icon">
                            <IconLock />
                        </span>
                        <button
                            type="button"
                            className="input-toggle"
                            onClick={() => setShowConfirm(prev => !prev)}
                        >
                            {showConfirm ? <IconEyeOff /> : <IconEye />}
                        </button>
                    </div>

                    <button className="btn-primary">Register</button>

                    <p className="auth-footer-link">
                        Already have an account?{" "}
                        <button type="button" onClick={() => navigate("/login")}>
                            Login
                        </button>
                    </p>

                </form>
            </div>
        </AuthLayout>
    );
}