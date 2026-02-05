import Link from "next/link";
import { useEffect, useState } from "react";
import api from "../services/api";

export default function Navbar() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await api.get("/auth/me");
        setUser(res.data.user || res.data);
      } catch (err) {
        setUser(null);
      }
    };
    fetchUser();
  }, []);

  return (
    <nav style={{ padding: 15, background: "#003366", color: "#fff" }}>
      <Link href="/dashboard">Dashboard</Link> |{" "}
      <Link href="/subjects">Subjects</Link>
      {user?.role === "admin" && (
        <>
          {" "}
          |{" "}
          <Link href="/admin" style={{ color: "#ffcc00", fontWeight: "bold" }}>
            🔧 Admin Panel
          </Link>
        </>
      )}
      {" "}
      |{" "}
      <a
        onClick={() => {
          localStorage.removeItem("token");
          window.location.href = "/login";
        }}
        style={{ cursor: "pointer" }}
      >
        Logout
      </a>
    </nav>
  );
}
