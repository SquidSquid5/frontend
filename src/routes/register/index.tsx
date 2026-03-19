import { createFileRoute } from "@tanstack/react-router";
import RegisterMain from "@/pages/login/register/main";

export const Route = createFileRoute("/register/")({
  component: RegisterMain,
});
