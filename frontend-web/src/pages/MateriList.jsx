import { useEffect, useState, useContext } from "react";
import API from "../api/axios";
import { AuthContext } from "../context/AuthContext";

export default function MateriList() {
    const [materi, setMateri] = useState([]);
    const { user } = useContext(AuthContext);

    useEffect(() => {
        fetchMateri();
    }, []);

    const fetchMateri = async () => {
        try {
        const res = await API.get("/materi");
        setMateri(res.data);
        } catch (err) {
        console.log(err);
        }
    };

    return (
        <div>
        <h2>Daftar Materi</h2>

        {user?.role === "teacher" && (
            <button>+ Tambah Materi</button>
        )}

        {materi.map((item) => (
            <div key={item._id}>
            <h3>{item.judul}</h3>
            <p>{item.kategori}</p>
            </div>
        ))}
        </div>
    );
}
