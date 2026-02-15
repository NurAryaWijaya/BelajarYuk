import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import API from "../api/axios";
import { AuthContext } from "../context/AuthContext";

export default function DetailMateri() {
    const navigate = useNavigate();
    const { id } = useParams();
    const { user } = useContext(AuthContext); // ambil role user
    const [materi, setMateri] = useState(null);

    useEffect(() => {
        if (id) {
        API.get(`/materi/${id}`)
            .then(res => setMateri(res.data))
            .catch(err => console.error(err));
        }
    }, [id]);

    if (!materi) return <p>Loading...</p>;

    const handleDelete = async () => {
        if (window.confirm("Yakin ingin menghapus materi ini?")) {
        try {
            await API.delete(`/materi/${id}`);
            alert("Materi berhasil dihapus");
            navigate(-1); // kembali ke halaman sebelumnya
        } catch (err) {
            console.error(err);
            alert("Gagal menghapus materi");
        }
        }
    };

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
            position: "relative", // supaya tombol absolute bisa muncul di pojok
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

        {/* Kontainer Materi */}
        <div
            style={{
            width: "100%",
            maxWidth: "900px",
            display: "flex",
            flexDirection: "column",
            gap: "20px",
            }}
        >
            {/* Judul Materi */}
            <h1
            style={{
                fontSize: "32px",
                fontWeight: "800",
                color: "#5A78EF",
                textAlign: "left",
            }}
            >
            {materi.judul}
            </h1>

            {/* Isi Materi */}
            <p
            style={{
                fontSize: "24px",
                fontWeight: "400",
                color: "#000000",
                textAlign: "left",
                lineHeight: "1.6",
            }}
            >
            {materi.isi}
            </p>
        </div>

        {/* Tombol Hapus Materi (hanya guru) */}
        {user?.role === "teacher" && (
            <div
            onClick={handleDelete}
            style={{
                position: "absolute",
                bottom: "40px",
                left: "40px",
                width: "225px",
                height: "80px",
                backgroundColor: "#D15AEF",
                borderRadius: "10px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                fontSize: "24px",
                fontWeight: "800",
                color: "#FFFFFF",
                cursor: "pointer",
                transition: "all 0.2s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
            onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
            >
            Hapus Materi
            </div>
        )}
        </div>
    );
}
