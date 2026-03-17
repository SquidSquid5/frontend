import { createFileRoute } from "@tanstack/react-router";
import LoginMain from "@/pages/login/logIn/main";

export const Route = createFileRoute("/login/")({
  component: LoginMain,
});
