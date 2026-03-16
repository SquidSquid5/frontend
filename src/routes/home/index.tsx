import { createFileRoute } from "@tanstack/react-router";
import useAuthStore from "@/store/useAuthStore";

export const Route = createFileRoute("/home/")({
	component: Index,
});

function Index() {
	const { isLoggedIn, token, userId, nickname } = useAuthStore();
	console.log(token, userId, nickname, isLoggedIn);
	// return <div>{isLoggedIn ? <p>index</p> : (window.location.href = "/")}</div>;
	// return <div>{isLoggedIn ? <p>index</p> : <p> 로그인 해주세용</p>}</div>;
	return isLoggedIn ? (
		<div>
			<p className="text-">index</p>
		</div>
	) : (
		window.location.href
	);
}

export default Index;
