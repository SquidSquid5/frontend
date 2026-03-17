import { createFileRoute } from "@tanstack/react-router";
import { App } from "@/pages/home/main";

export const Route = createFileRoute("/")({ component: App });
