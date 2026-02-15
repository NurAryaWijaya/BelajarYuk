import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/axios";
import { AuthContext } from "../context/AuthContext";

export default function Register() {
    const navigate = useNavigate();
    const { login } = useContext(AuthContext);

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        role: "student",
    });

    const handleChange = (e) => {
        setFormData({
        ...formData,
        [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (roleType) => {
        try {
        const res = await API.post("/auth/register", {
            ...formData,
            role: roleType,
        });

        login(res.data);
        navigate("/dashboard");
        } catch (err) {
        alert("Register gagal");
        console.log(err);
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
                Sign Up
            </h2>


            <input
            type="text"
            name="name"
            placeholder="Nama"
            value={formData.name}
            onChange={handleChange}
            style={inputStyle}
            />

            <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            style={inputStyle}
            />

            <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            style={inputStyle}
            />

            <button
            style={{ ...buttonStyle, backgroundColor: "#D15AEF" }}
            onClick={() => handleSubmit("teacher")}
            >
            Daftar sebagai Guru
            </button>

            <button
            style={{ ...buttonStyle, backgroundColor: "#5A78EF" }}
            onClick={() => handleSubmit("student")}
            >
            Daftar sebagai Murid
            </button>

            <p style={{ marginTop: "10px", color: "black" }}>
            Sudah punya akun?{" "}
            <span
                onClick={() => navigate("/login")}
                style={{
                color: "#5A78EF",
                cursor: "pointer",
                fontWeight: "bold",
                }}
            >
                Login
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


