import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/axios";
import { AuthContext } from "../context/AuthContext";

export default function Login() {
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await API.post("/auth/login", {
                email,
                password,
            });

            login(res.data);
            navigate("/dashboard");
        } catch (err) {
            alert("Login gagal");
        }
    };

    return (
        <div
            style={{
                height: "100vh",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "#f5f6fa",
            }}
        >
            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: "15px",
                }}
            >
                <h2
                    style={{
                        marginBottom: "10px",
                        color: "#5A78EF",
                        fontWeight: "bold",
                    }}
                >
                    Sign In
                </h2>

                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    style={inputStyle}
                />

                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    style={inputStyle}
                />

                <button
                    style={{ ...buttonStyle, backgroundColor: "#5A78EF" }}
                    onClick={handleSubmit}
                >
                    Login
                </button>

                <p style={{ marginTop: "10px", color: "black" }}>
                    Belum punya akun?{" "}
                    <span
                        onClick={() => navigate("/register")}
                        style={{
                            color: "#5A78EF",
                            cursor: "pointer",
                            fontWeight: "bold",
                        }}
                    >
                        Daftar
                    </span>
                </p>
            </div>
        </div>
    );
}

const inputStyle = {
    width: "300px",
    height: "50px",
    borderRadius: "15px",
    border: "1px solid #D9D9D9",
    padding: "0 15px",
    fontSize: "16px",
    outline: "none",
    backgroundColor: "white",
    boxSizing: "border-box",
    color: "#7A7A7A",
};

const buttonStyle = {
    width: "300px",
    height: "50px",
    borderRadius: "15px",
    border: "none",
    color: "white",
    fontSize: "16px",
    fontWeight: "bold",
    cursor: "pointer",
};
