// AdminRoute.jsx
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";

export default function AdminRoute({ children }) {
  const { user, loading } = useAuth();
  const [isAdmin, setIsAdmin] = useState(null);

  useEffect(() => {
    if (!user) return;

    async function checkAdmin() {
      const ref = doc(db, "users", user.uid);
      const snap = await getDoc(ref);

      console.log("UID", user.uid);
      console.log("Doc exist", snap.exists());
      console.log("Data:", snap.data());

      if (snap.exists() && snap.data().role === "admin") {
        setIsAdmin(true);
      } else {
        setIsAdmin(false);
      }
    }

    checkAdmin();
  }, [user]);

  if (loading || isAdmin === null) return <p>Loading...</p>;

  if (!user || !isAdmin) return <Navigate to="/" replace />;

  return children;
}
