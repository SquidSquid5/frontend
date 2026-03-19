import useAuthStore from "@/store/useAuthStore";

function Home() {
  const { isLoggedIn, token, nickname } = useAuthStore();
  console.log(token, nickname, isLoggedIn);

  return (
    <div>
      <p className="text-">index</p>
    </div>
  );
}

export default Home;
