import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function CaptainProtectWrapper({ children }) {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      navigate("/captain-login");
    }
  }, [token, navigate]);

  

  // Prevent rendering children if not logged in
  if (!token) return null;

  return <>{children}</>;
}

export default CaptainProtectWrapper;
