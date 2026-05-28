import useAuthStore from "@/store/useAuthStore";

function Home() {
  const { isLoggedIn, token, nickname } = useAuthStore();
  console.log(token, nickname, isLoggedIn);

  return (
    <div className="flex flex-row min-h-full">
      <div className="min-h-full bg-white">
        <div>
          <p>{nickname}</p>
        </div>
      </div>
      <p className="text-">index</p>
    </div>
  );
}

export default Home;
