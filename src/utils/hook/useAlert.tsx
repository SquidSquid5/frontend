import { useState } from "react";
import type { alertType } from "@/components/AlertCustom";

function useAlert() {
  const [alertData, setAlertData] = useState<null | {
    title: string;
    description: string;
    variant?: boolean;
    onCustomClose?: () => void;
  }>(null);

  function showAlert({
    title,
    description,
    variant,
    onCustomClose,
  }: alertType) {
    setAlertData({ title, description, variant, onCustomClose });
  }

  function closeAlert() {
    setAlertData(null);
  }

  return { showAlert, closeAlert, alertData };
}

export default useAlert;
