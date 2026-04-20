import { alertType } from "@/components/AlertCustom";
import { useState } from "react";

function useAlert() {
  const [alertData, setAlertData] = useState<null | {
    title: string;
    description: string;
    variant?: boolean;
  }>(null);
  const [isOpen, setIsOpen] = useState(false);

  function showAlert({ title, description, variant }: alertType) {
    if (variant) {
      setAlertData({ title, description, variant });
    } else {
      setAlertData({ title, description });
    }
    setIsOpen(true);
  }

  function closeAlert() {
    setAlertData(null);
    setIsOpen(false);
  }

  return { showAlert, closeAlert, isOpen, alertData };
}

export default useAlert;
