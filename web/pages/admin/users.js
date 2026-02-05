import { useEffect, useState } from "react";
import api from "../../services/api";
import Layout from "../../components/Layout";
import ProtectedRoute from "../../components/ProtectedRoute";

export default function UsersAdmin() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const res = await api.get("/admin/users");
        if (mounted) setUsers(res.data || []);
      } catch (err) {
        if (mounted) setError(err?.response?.data?.error || "Failed to load users");
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => (mounted = false);
  }, []);

  return (
    <ProtectedRoute>
      <Layout>
        <h2 style={{ color: "#063c91" }}>Users & Subscriptions</h2>
        {error && <div style={{ color: "#c00", padding: 12, background: "#fee", borderRadius: 8, marginBottom: 16 }}>{error}</div>}
        {loading && <p>Loading users...</p>}
        {!loading && users.length === 0 && <p>No users found</p>}
        {!loading && users.length > 0 && (
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr style={{ borderBottom: "2px solid #ddd", background: "#f9f9f9" }}>
                  <th style={{ padding: 12, textAlign: "left" }}>Name</th>
                  <th style={{ padding: 12, textAlign: "left" }}>Email</th>
                  <th style={{ padding: 12, textAlign: "left" }}>Role</th>
                  <th style={{ padding: 12, textAlign: "left" }}>Subscription</th>
                </tr>
              </thead>
              <tbody>
                {users.map(u => (
                  <tr key={u.id} style={{ borderBottom: "1px solid #eee" }}>
                    <td style={{ padding: 12 }}>{u.full_name}</td>
                    <td style={{ padding: 12 }}>{u.email}</td>
                    <td style={{ padding: 12 }}>{u.role}</td>
                    <td style={{ padding: 12 }}>{u.subscription_expiry ? new Date(u.subscription_expiry).toLocaleDateString() : "Inactive"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Layout>
    </ProtectedRoute>
  );
}
