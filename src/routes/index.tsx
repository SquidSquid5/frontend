/** biome-ignore-all lint/a11y/noLabelWithoutControl: <explanation> */
import { createFileRoute } from "@tanstack/react-router";
import { MessageCircle, Shield, Users, Zap } from "lucide-react";
import { useRef } from "react";

export const Route = createFileRoute("/")({ component: App });

function App() {
	const loginId = useRef<HTMLInputElement>(null);
	const loginPaw = useRef<HTMLInputElement>(null);

	return (
		<div className="min-h-screen bg-white text-slate-900">
			<div>
				<header className="flex items-center justify-between px-8 py-6 max-w-7xl mx-auto">
					<div className="flex items-center gap-2 group cursor-pointer">
						<div className="w-9 h-9 bg-blue-600 rounded-full flex items-center justify-center">
							<MessageCircle className="w-5 h-5 text-white fill-current" />
						</div>
						<span className="text-xl font-bold tracking-tight">이음</span>
					</div>
					<div className="flex items-center gap-6">
						<button
							type="button"
							className="text-slate-500 font-medium hover:text-blue-600"
						>
							로그인
						</button>
						<button
							type="button"
							className="bg-blue-600 text-white px-5 py-2.5 rounded-xl font-semibold hover:bg-blue-700 transition-all shadow-md shadow-blue-100"
						>
							시작하기
						</button>
					</div>
				</header>

				{/* Hero Section */}
				<main className="flex flex-col items-center px-4 pt-20 pb-24 text-center">
					<div className="inline-flex items-center gap-1.5 bg-blue-100/50 backdrop-blur-sm text-blue-600 px-4 py-1.5 rounded-full text-sm font-bold mb-8">
						<Zap className="w-3.5 h-3.5 fill-current" />
						<span>더 쉽고, 더 빠른 소통</span>
					</div>

					<h1 className="text-5xl md:text-6xl font-black mb-6 leading-[1.15] tracking-tight">
						사람과 사람을
						<br />
						<span className="text-blue-600 text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-500">
							이어주는
						</span>{" "}
						공간
					</h1>

					<p className="text-slate-400 text-lg mb-10 max-w-md mx-auto font-medium leading-relaxed">
						채팅방을 만들고, 팀원을 초대하고,
						<br />
						실시간으로 대화를 나눠보세요.
					</p>

					<div className="flex flex-col sm:flex-row gap-4 mb-24">
						<button
							type="button"
							className="bg-blue-600 text-white px-8 py-3 rounded-2xl font-bold text-lg hover:bg-blue-700 transition-all shadow-xl shadow-blue-200/50 hover:-translate-y-1"
						>
							시작하기
						</button>
						<button
							type="button"
							className="bg-white/80 backdrop-blur-md text-slate-700 px-8 py-4 rounded-2xl font-bold text-lg border border-slate-200 hover:bg-slate-50 transition-all"
						>
							로그인
						</button>
					</div>

					<div className="relative w-full max-w-2xl bg-[#F9FAFB] backdrop-blur-xl rounded-3xl shadow-[0_40px_100px_-20px_rgba(0,0,0,0.1)] border border-[#E5E8EB] overflow-hidden mb-32">
						<div className="bg-white px-6 py-4 border-b border-slate-100 flex items-center justify-center relative text-left">
							<div className="flex gap-2 absolute left-6">
								<div className="w-3 h-3 rounded-full bg-[#FF5F57]"></div>
								<div className="w-3 h-3 rounded-full bg-[#FEBC2E]"></div>
								<div className="w-3 h-3 rounded-full bg-[#28C840]"></div>
							</div>
							<p className="text-sm font-medium text-[#8B95A1]">개발팀 채널</p>
						</div>
						<div className="p-10 flex flex-col gap-6 text-left">
							<div className="self-center bg-slate-200/40 backdrop-blur-sm px-4 py-1.5 rounded-full text-[11px] text-slate-400 font-bold">
								이서연 님이 입장했습니다.
							</div>

							<div className="flex gap-4 items-start">
								<div className="w-11 h-11 rounded-full bg-red-400 flex items-center justify-center text-white font-black text-sm shadow-sm">
									이
								</div>
								<div>
									<div className="text-[12px] font-bold text-slate-400 mb-1.5 ml-1 text-left">
										이서연
									</div>
									<div className="bg-white border border-slate-100 px-5 py-2.5 rounded-3xl rounded-tl-none text-[15px] font-medium text-slate-700 shadow-sm">
										오늘 배포 언제 하나요? 🚀
									</div>
								</div>
							</div>

							<div className="flex flex-col items-end">
								<div className="bg-blue-600 text-white px-6 py-2.5 rounded-3xl rounded-tr-none text-[15px] font-medium shadow-lg max-w-[85%] leading-relaxed">
									오후 4시에 진행할게요! 확인 부탁드려요 😊
								</div>
							</div>
						</div>
					</div>

					{/* Features Grid */}
					<div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl w-full px-4 ">
						<FeatureCard
							icon={<MessageCircle className="w-6 h-6 text-blue-500" />}
							bg="bg-blue-50/70"
							title="실시간 채팅"
							desc="메시지를 빠르게 주고받으며 팀과 소통하세요."
						/>
						<FeatureCard
							icon={<Users className="w-6 h-6 text-purple-500" />}
							bg="bg-purple-50/70"
							title="채팅방 관리"
							desc="원하는 주제의 채팅방을 직접 만들고 관리하세요."
						/>
						<FeatureCard
							icon={<Shield className="w-6 h-6 text-emerald-500" />}
							bg="bg-emerald-50/70"
							title="입퇴장 알림"
							desc="멤버의 입장과 퇴장을 실시간으로 확인하세요."
						/>
					</div>
				</main>

				<footer className="py-12 text-center text-slate-400 text-sm font-medium border-t border-slate-100">
					© 2025 이음. All rights reserved.
				</footer>
			</div>
		</div>
	);
}

function FeatureCard({ icon, bg, title, desc }) {
	return (
		<div className="bg-white p-9 rounded-3xl shadow-sm border border-slate-50 flex flex-col items-start text-left hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
			<div
				className={`w-14 h-14 ${bg} rounded-2xl flex items-center justify-center mb-5`}
			>
				{icon}
			</div>
			<h3 className="font-bold text-xl mb-1">{title}</h3>
			<p className="text-slate-400 text-[15px] leading-relaxed font-medium">
				{desc}
			</p>
		</div>
	);
}
