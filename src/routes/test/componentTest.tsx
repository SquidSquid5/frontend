import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";

export const Route = createFileRoute("/test/componentTest")({
	component: RouteComponent,
});

function RouteComponent() {
	const [count, setCount] = useState(0);
	function testButton() {
		setCount(count + 1);
	}

	function submitForm() {}

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
						<Button
							variant="blue"
							size="md"
							label="테스트"
							onClick={testButton}
						/>
						<p>{count}</p>
					</div>
				</div>
				<div>
					<form>
						<Button
							variant="grey"
							size="md"
							label="테테스슷트2"
							onClick={submitForm}
						/>
					</form>
				</div>
			</div>
		</div>
	);
}
