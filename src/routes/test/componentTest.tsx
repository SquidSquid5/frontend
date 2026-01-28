import { createFileRoute } from "@tanstack/react-router";
import { FileInput } from "lucide-react";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";

export const Route = createFileRoute("/test/componentTest")({
	component: RouteComponent,
});

function RouteComponent() {
	return (
		<div className="min-h-screen bg-slate-50 p-20 flex flex-col items-center">
			<h1 className="text-2xl font-bold text-slate-800 mb-6 text-center">
				컴포넌트 테스트
			</h1>
			<div className="space-y-6">
				<div className="flex flex-col gap-2">
					<Input />
				</div>
				<div className="flex flex-col gap-2">
					<div className="flex gap-2">
						<Button variant="blue" size="md" label="테스트" />
					</div>
				</div>
			</div>
		</div>
	);
}
