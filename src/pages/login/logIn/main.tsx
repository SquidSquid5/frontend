import { Link, useNavigate } from "@tanstack/react-router";
import axios from "axios";
import { ArrowLeft, Eye, EyeOff } from "lucide-react"; // 눈 아이콘 추가
import { useRef, useState } from "react";
import { AlertDemo } from "@/components/AlertCustom";
import Logo from "@/components/ui/Logo";
import useAuthStore from "@/store/useAuthStore";
import { loginService } from "@/utils/api/service";

function LoginMain() {
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const navigate = useNavigate();

  const [alertConfig, setAlertConfig] = useState<{
    isOpen: boolean;
    title: string;
    description: string;
    isErr: boolean;
    className?: string;
    onClose?: () => void;
  }>({
    isOpen: false,
    title: "",
    description: "",
    isErr: false,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [hide, setHide] = useState(true);

  // async function signInApi() {
  //   try {
  //     // const res = await axios.post(
  //     //   `${import.meta.env.VITE_SERVER_URL}/users/login`,
  //     //   {
  //     //     email: emailRef.current?.value,
  //     //     password: passwordRef.current?.value,
  //     //   },
  //     // );
  //     // console.log(res);
  //     // setIsLoading(false);
  //     // useAuthStore.getState().setLogin(res.data.nickname, res.data.token);
  //     navigate({ to: "/home" });
  //   } catch (error) {
  //     if (axios.isAxiosError(error)) {
  //       console.log("로그인 에러! :", error.response?.data.message);
  //       setAlertConfig({
  //         isOpen: true,
  //         title: "로그인 오류",
  //         description: error.response?.data.message,
  //         isErr: true,
  //         onClose: () => setAlertConfig((prev) => ({ ...prev, isOpen: false })),
  //       });
  //       setIsLoading(false);
  //     }
  //   }
  // }

  const signInApi = async () => {
    try {
      if (emailRef.current && passwordRef.current) {
        const res = await loginService().logIn(
          emailRef.current.value,
          passwordRef.current.value,
        );
        if (res) {
          useAuthStore.getState().setLogin(res.nickname, res.token);
          navigate({ to: "/home" });
        }
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log("로그인 에러! :", error.response?.data.message);
        setAlertConfig({
          isOpen: true,
          title: "로그인 오류",
          description: error.response?.data.message,
          isErr: true,
          onClose: () => setAlertConfig((prev) => ({ ...prev, isOpen: false })),
        });
        setIsLoading(false);
      }
    }
  };

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    setIsLoading(true);
    e.preventDefault();
    signInApi();
  }

  function handleFillRef() {
    try {
      if (emailRef.current && passwordRef.current) {
        emailRef.current.value = "test123@test.com";
        passwordRef.current.value = "test123!";
      }
    } catch (error) {
      console.log("에러!", error);
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-dvh p-4">
      <AlertDemo
        title={alertConfig.title}
        description={alertConfig.description}
        isOpen={alertConfig.isOpen}
        className={alertConfig.className}
        onClose={
          alertConfig.onClose ||
          (() => setAlertConfig((prev) => ({ ...prev, isOpen: false })))
        }
        isError={alertConfig.isErr}
      />
      <div className="w-full max-w-110 mb-6">
        <Link
          to="/"
          className="flex items-center gap-2 text-slate-500 hover:text-slate-800 transition-colors text-[16px] font-medium"
        >
          <ArrowLeft size={18} />
          <span>돌아가기</span>
        </Link>
      </div>
      <div className="w-full max-w-md bg-white rounded-3xl p-9.5 shadow-[0_4px_24px_rgba(0,0,0,0.04)]">
        <div className="mb-8">
          <Logo />
        </div>
        <div className="mb-8">
          <h3 className="text-[28px] font-black text-slate-900 leading-tight">
            다시 만나서 반가워요
          </h3>
          <p className="text-slate-400 mt-2 font-medium">계정에 로그인하세요</p>
        </div>
        <form className="space-y-1" onSubmit={handleSubmit}>
          <div className="space-y-2 mb-4">
            <p className="text-sm font-bold text-slate-700 ml-1 mb-2">이메일</p>
            <input
              type="email"
              ref={emailRef}
              placeholder="example@email.com"
              className="w-full px-5 py-3.5 bg-slate-50 border-none rounded-xl focus:ring-2 focus:ring-blue-500/20 outline-none transition-all placeholder:text-slate-300 text-slate-700"
            />
          </div>
          <div className="space-y-2 mb-2">
            <p className="text-sm font-bold text-slate-700 ml-1 mb-2">
              비밀번호
            </p>
            <div className="relative">
              <input
                type={`${hide ? "password" : "text"}`}
                ref={passwordRef}
                placeholder="비밀번호를 입력하세요"
                className="w-full px-5 py-3.5 bg-slate-50 border-none rounded-xl focus:ring-2 focus:ring-blue-500/20 outline-none transition-all placeholder:text-slate-300 text-slate-700"
              />
              <button
                type="button"
                onClick={() => setHide(!hide)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
              >
                {hide ? <Eye size={20} /> : <EyeOff size={20} />}
              </button>
            </div>
          </div>
          <button
            type="submit"
            className={`${isLoading ? "bg-[#5996f8]" : "bg-[#3581FA]"} w-full py-3.5 text-white rounded-2xl font-bold text-lg hover:bg-blue-600 transition-all mt-4`}
          >
            {isLoading ? "로그인 중 ..." : "로그인"}
          </button>
        </form>
        <div className="mt-5 p-5 bg-slate-50 rounded-2xl">
          <p className="text-sm text-slate-500 font-normal">
            테스트 계정으로 빠르게 시작하기
          </p>
          <button
            type="button"
            onClick={handleFillRef}
            className="text-blue-600 text-sm font-bold mt-1 hover:underline flex items-center gap-1"
          >
            데모 계정 채우기 →
          </button>
        </div>
        <div className="mt-8 text-center">
          <p className="text-slate-400 font-normal text-sm">
            계정이 없으신가요?
            <Link
              to="/register"
              className="text-blue-600 font-bold ml-2 hover:underline"
            >
              회원가입
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default LoginMain;
