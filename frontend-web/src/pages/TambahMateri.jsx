import { useNavigate } from "react-router-dom";
import { useState, useContext } from "react";
import API from "../api/axios";
import { AuthContext } from "../context/AuthContext";

export default function TambahMateri() {
    const navigate = useNavigate();
    const { user } = useContext(AuthContext);

    const [kategori, setKategori] = useState("Matematika");
    const [judul, setJudul] = useState("");
    const [isi, setIsi] = useState("");

    const handleSubmit = async () => {
        if (!judul || !isi) {
            alert("Judul dan Isi materi harus diisi!");
            return;
        }
        try {
            await API.post("/materi", { kategori, judul, isi });
            alert("Materi berhasil ditambahkan!");
            navigate(-1); 
        } catch (err) {
            console.error(err);
            alert("Gagal menambahkan materi");
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
                position: "relative",
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

            {/* Form Container */}
            <div
                style={{
                    width: "100%",
                    maxWidth: "1000px",
                    display: "flex",
                    flexDirection: "column",
                    gap: "15px",
                    alignItems: "center",
                    flexWrap: "wrap",
                }}
            >
                {/* Kategori Dropdown */}
                <select
                    id="kategori"
                    value={kategori}
                    onChange={(e) => setKategori(e.target.value)}
                    style={{
                        minWidth: "350px",
                        width: "100%",
                        maxWidth: "980px",
                        height: "40px",
                        borderRadius: "5px",
                        padding: "0 10px",
                        fontSize: "16px",
                        backgroundColor: "#D9D9D9",
                        border: "none",
                        color: "#000000",
                    }}
                >
                    <option value="Matematika">Matematika</option>
                    <option value="Fisika">Fisika</option>
                    <option value="B. Inggris">B. Inggris</option>
                    <option value="B. Indonesia">B. Indonesia</option>
                </select>

                {/* Judul Materi */}
                <input
                    type="text"
                    placeholder="Judul Materi"
                    value={judul}
                    onChange={(e) => setJudul(e.target.value)}
                    style={{
                        minWidth: "350px",
                        width: "100%",
                        maxWidth: "980px",
                        height: "80px",
                        borderRadius: "10px",
                        padding: "0 20px",
                        fontSize: "24px",
                        fontWeight: "600",
                        boxSizing: "border-box",
                        backgroundColor: "#D9D9D9",
                        border: "none",
                        color: "#000000",
                    }}
                />

                {/* Isi Materi */}
                <textarea
                    placeholder="Isi Materi"
                    value={isi}
                    onChange={(e) => setIsi(e.target.value)}
                    style={{
                        minWidth: "350px",
                        width: "100%",
                        maxWidth: "980px",
                        height: "360px",
                        borderRadius: "10px",
                        padding: "20px",
                        fontSize: "24px",
                        fontWeight: "400",
                        boxSizing: "border-box",
                        resize: "none",
                        backgroundColor: "#D9D9D9",
                        border: "none",
                        color: "#000000",
                    }}
                />

                {/* Tombol Tambah Materi */}
                <div
                    onClick={handleSubmit}
                    style={{
                        minWidth: "350px",
                        width: "100%",
                        maxWidth: "350px",
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
                        alignSelf: "flex-end",
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
                    onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
                >
                    Tambah Materi
                </div>
            </div>
        </div>
    );
}
