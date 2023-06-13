import { useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { Configs } from "../../constants/Configs";

interface NotificationToastProps {
  toastText: string;
  isSuccessful: boolean;
}

export function NotificationToast({
  toastText,
  isSuccessful,
}: NotificationToastProps) {
  useEffect(() => {
    if (isSuccessful === true) {
      toast.success(toastText, {
        position: "top-right",
        autoClose: Number(Configs.ALERT_TIMEOUT),
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else if (isSuccessful === false) {
      toast.error(toastText, {
        position: "top-right",
        autoClose: Number(Configs.ALERT_TIMEOUT),
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  }, []);

  return (
    <ToastContainer
      toastStyle={{ backgroundColor: "#f7f1cf" }}
      position="top-right"
      autoClose={Number(Configs.ALERT_TIMEOUT)}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
    />
  );
}
