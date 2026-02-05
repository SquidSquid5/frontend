/** biome-ignore-all lint/a11y/noLabelWithoutControl: <explanation> */

import { createFileRoute } from "@tanstack/react-router";
import { MessageCircle } from "lucide-react";
import { useRef } from "react";
import useAuthStore from "@/store/useAuthStore";

export const Route = createFileRoute("/")({ component: App });

interface loginType {
	userId: string;
	token: string;
	nickname: string;
}

function App() {
	const loginId = useRef<HTMLInputElement>(null);
	const loginPaw = useRef<HTMLInputElement>(null);
	const { userId, token, nickname } = useAuthStore();

	async function loginFn(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();
		try {
			const res = await fetch("http://localhost:8080/api/users/login", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					email: loginId.current?.value,
					password: loginPaw.current?.value,
				}),
			});
			const response: loginType = await res.json();
			const { userId, token, nickname } = response; //값이 잘 들어오는 부분 확인함,,
			console.log(response);
			useAuthStore.getState().setLogin(userId, token, nickname); //Zustand store의 setLogin 호출
			// window.location.href = "/home/";
			return true;
		} catch (error) {
			console.log("로그인 에러!!", error);
		}
	}
	console.log(userId);
	console.log(token);
	console.log(nickname);
	return (
		<div className="flex flex-col justify-center items-center min-h-screen bg-[linear-gradient(135deg,#667eea_0%,#764ba2_100%)] p-4">
			<div className="mb-8 flex flex-col items-center text-white">
				<div className="bg-white/20 p-3 rounded-full mb-7 backdrop-blur-sm">
					<MessageCircle size={35} color="#ffffff" strokeWidth={2} />
				</div>
				<h1 className="text-4xl font-bold tracking-tight mb-2">ChatFlow</h1>
				<p className="text-white/80 font-medium">실시간으로 소통하세요</p>
			</div>
			<div className="bg-white w-full max-w-105 rounded-[24px] shadow-2xl p-8">
				<h2 className="text-2xl font-bold text-gray-800 mb-5">로그인</h2>
				<form className="flex flex-col" onSubmit={loginFn}>
					<label className="mb-2 text-sm font-semibold text-gray-500 ml-1">
						아이디
					</label>
					<input
						ref={loginId}
						className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none focus:ring-2 focus:ring-indigo-400 transition-all placeholder:text-gray-300"
						placeholder="아이디를 입력하세요"
						type="text"
					/>
					<label className="mt-4 mb-2 text-sm font-semibold text-gray-500 ml-1">
						비밀번호
					</label>
					<input
						ref={loginPaw}
						className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none focus:ring-2 focus:ring-indigo-400 transition-all placeholder:text-gray-300"
						placeholder="비밀번호를 입력하세요"
						type="password"
					/>
					<p>test@example.com Test1234!</p>
					<button
						type="submit"
						className="mt-4 w-full py-3 bg-[linear-gradient(90deg,#667eea_0%,#764ba2_100%)] text-white font-bold rounded-xl hover:opacity-90 transition-opacity"
					>
						로그인
					</button>
				</form>
				<div className="mt-5 flex flex-col items-center gap-3">
					<button
						type="button"
						className="text-sm text-gray-400 hover:text-gray-600 transition-colors"
					>
						비밀번호를 잊으셨나요?
					</button>
					<div className="w-full pt-4 border-t border-gray-100 flex flex-col items-center gap-4">
						<p className="text-sm text-gray-400">아직 계정이 없으신가요?</p>
						<button
							type="button"
							className="w-full py-2 border-2 border-indigo-500 text-indigo-500 font-bold rounded-xl hover:bg-indigo-50 transition-colors"
						>
							회원가입
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}
