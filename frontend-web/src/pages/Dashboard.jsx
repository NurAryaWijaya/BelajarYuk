import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function Dashboard() {
    const { user, logout } = useContext(AuthContext);
    const navigate = useNavigate();

    const mapelList = ["Matematika", "Fisika", "B. Inggris", "B. Indonesia"];

    return (
        <div
        style={{
            minHeight: "100vh",
            backgroundColor: "#f5f6fa",
            display: "flex",
            justifyContent: "center",
            paddingTop: "40px",
        }}
        >
        {/* WRAPPER RESPONSIVE */}
        <div
            style={{
                width: "100%",
                maxWidth: "1200px",
                minWidth: "350px",
                padding: "0 20px",
                boxSizing: "border-box",
            }}
            >
            {/* Judul Welcome */}
            <h1
                style={{
                fontSize: "18px",
                color: "#5A78EF",
                fontWeight: "800",
                marginBottom: "15px",
                }}
            >
                Selamat datang di BelajarYuk
            </h1>

            {/* Card Biru */}
            <div
                style={{
                width: "100%",
                height: "180px",
                backgroundColor: user?.role === "teacher" ? "#D15AEF" : "#5A78EF",
                borderRadius: "15px",
                padding: "5px 25px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "flex-start",
                position: "relative",
                boxSizing: "border-box",
                }}
            >
                <h2
                style={{
                    fontSize: "24px",
                    fontWeight: "800",
                    color: "#FFFFFF",
                    marginBottom: "5px",
                }}
                >
                Hai, <span style={{ fontStyle: "italic" }}>{user?.name}</span>
                </h2>

                <p
                style={{
                    fontSize: "12px",
                    fontWeight: "800",
                    color: "#FFFFFF",
                    maxWidth: "700px",
                }}
                >
                Setiap halaman yang kamu pelajari hari ini adalah satu langkah lebih
                dekat menuju masa depan yang kamu cita-citakan.
                </p>

                {/* Logout */}
                <div
                onClick={logout}
                style={{
                    position: "absolute",
                    bottom: "15px",
                    right: "20px",
                    width: "75px",
                    height: "20px",
                    borderRadius: "5px",
                    backgroundColor: "#D9D9D9",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    cursor: "pointer",
                }}
                >
                <span
                    style={{
                    color: "#FF0000",
                    fontSize: "12px",
                    fontWeight: "600",
                    }}
                >
                    Log out
                </span>
                </div>
            </div>

            {/* Wrapper Maksimal 1200px untuk Mata Pelajaran */}
            <div
                style={{
                    width: "100%",
                    maxWidth: "800px",
                    padding: "0 20px",
                    margin: "40px auto 0 auto", // center horizontally
                    boxSizing: "border-box",
                }}
                >
                    {/* Judul Mata Pelajaran */}
                    <h2
                        style={{
                        textAlign: "center",
                        fontSize: "24px",
                        fontWeight: "800",
                        color: "#000000",
                        marginTop: "40px",
                        marginBottom: "25px",
                        }}
                    >
                        Mata Pelajaran
                    </h2>

                    {/* Grid Card Mata Pelajaran */}
                    <div
                    style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
                        gap: "20px",
                        justifyItems: "center",
                    }}
                    >
                    {mapelList.map((mapel, index) => (
                        <div
                        key={index}
                        style={{
                            width: "150px",
                            height: "200px",
                            backgroundColor: "#D9D9D9",
                            borderRadius: "10px",
                            display: "flex",
                            alignItems: "flex-end",
                            justifyContent: "center",
                            paddingBottom: "15px",
                            boxSizing: "border-box",
                            cursor: "pointer", // biar keliatan clickable
                        }}
                        onClick={() => navigate(`/mata-pelajaran/${encodeURIComponent(mapel)}`)}
                        >
                        <span
                            style={{
                            fontSize: "18px",
                            fontWeight: "800",
                            color: "#5A78EF",
                            }}
                        >
                            {mapel}
                        </span>
                        </div>
                    ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
