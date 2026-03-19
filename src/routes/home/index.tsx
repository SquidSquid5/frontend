import { createFileRoute } from "@tanstack/react-router";
import Home from "@/pages/home/main";
import { verifyAuthHome } from "@/utils/authGuard";

export const Route = createFileRoute("/home/")({
  beforeLoad: () => {
    verifyAuthHome();
  },
  component: Home,
});
