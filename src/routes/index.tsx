import { createFileRoute } from "@tanstack/react-router";
import { App } from "@/pages/landing/main";
import { verifyAuthMain } from "@/utils/authGuard";

export const Route = createFileRoute("/")({
  beforeLoad: () => {
    verifyAuthMain();
  },
  component: App,
});
