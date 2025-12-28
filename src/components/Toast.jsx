import { useEffect } from "react";

function Toast({ message, type = "success", onClose, duration = 3000 }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      if (onClose) onClose();
    }, duration); // 3 seconds (adjust as needed)

    return () => clearTimeout(timer);
  }, [onClose, duration]);

  return (
    <div className={`toast ${type}`} role="alert ">
      {message}
    </div>
  );
}

export default Toast;
