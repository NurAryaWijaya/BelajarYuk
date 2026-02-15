import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import API from "../api/axios"; 
import { AuthContext } from "../context/AuthContext";

export default function MataPelajaran() {
    const navigate = useNavigate();
    const { kategori } = useParams();
    const { user } = useContext(AuthContext);

    const [materiList, setMateriList] = useState([]);

    useEffect(() => {
        if (kategori) {
        API.get(`/materi/kategori/${kategori}`)
            .then(res => setMateriList(res.data))
            .catch(err => console.error(err));
        }
    }, [kategori]);

    return (
        <div
        style={{
            minHeight: "100vh",
            backgroundColor: "#f5f6fa",
            padding: "40px 20px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            boxSizing: "border-box",
        }}
        >
        {/* Back Button */}
        <button
            onClick={() => navigate(-1)}
            style={{
            alignSelf: "flex-start",
            marginBottom: "20px",
            padding: "10px 15px",
            fontSize: "14px",
            fontWeight: "600",
            borderRadius: "5px",
            border: "none",
            backgroundColor: "#D9D9D9",
            color: "#000000",
            cursor: "pointer",
            }}
        >
            Kembali
        </button>

        {/* Judul Mata Pelajaran */}
        <h1
            style={{
            fontSize: "32px",
            fontWeight: "800",
            color: "#5A78EF",
            textAlign: "left",
            marginBottom: "20px",
            width: "100%",
            maxWidth: "880px",
            }}
        >
            {kategori}
        </h1>

        {/* Grid utama */}
        <div
            style={{
            width: "100%",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(350px, 880px))",
            gap: "20px",
            justifyContent: "center",
            }}
        >
            {materiList.map((materi, index) => (
            <div
                key={index}
                style={{
                width: "100%",
                height: "80px",
                borderRadius: "10px",
                backgroundColor: "#D9D9D9",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                padding: "0 20px",
                boxSizing: "border-box",
                fontSize: "18px",
                fontWeight: "600",
                color: "#000000",
                cursor: "pointer",
                transition: "all 0.2s",
                boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
                }}
                onClick={() => navigate(`/materi/detail/${materi._id}`)}
                onMouseEnter={e => {
                e.currentTarget.style.transform = "scale(1.02)";
                e.currentTarget.style.backgroundColor = "#C7C7C7";
                }}
                onMouseLeave={e => {
                e.currentTarget.style.transform = "scale(1)";
                e.currentTarget.style.backgroundColor = "#D9D9D9";
                }}
            >
                {materi.judul}
            </div>
            ))}

            {/* Tombol Tambah Materi - hanya untuk guru */}
            {user?.role === "teacher" && (
            <div
                style={{
                width: "100%",
                height: "80px",
                backgroundColor: "#D15AEF",
                borderRadius: "10px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "24px",
                fontWeight: "800",
                color: "#FFFFFF",
                cursor: "pointer",
                transition: "all 0.2s",
                boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
                }}
                onClick={() => navigate("/tambah-materi", { state: { kategori } })}
                onMouseEnter={e => (e.currentTarget.style.transform = "scale(1.05)")}
                onMouseLeave={e => (e.currentTarget.style.transform = "scale(1)")}
            >
                Tambah Materi
            </div>
            )}
        </div>
        </div>
    );
}
