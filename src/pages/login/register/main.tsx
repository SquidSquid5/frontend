import { Link, useNavigate } from "@tanstack/react-router";
import axios from "axios";
import { ArrowLeft, Eye, EyeOff } from "lucide-react"; // 눈 아이콘 추가
import { useRef, useState } from "react";
import { AlertDemo } from "@/components/AlertCustom";
import Logo from "@/components/ui/Logo";

function RegisterMain() {
  const emailRef = useRef<HTMLInputElement>(null);
  const nickNameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  // const [alertTitle, setAlertTitle] = useState("");
  // const [alertDescription, setAlertDescription] = useState("");
  // const [alert, setAlert] = useState(false);
  // const [isErr, setIsErr] = useState(false);

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

  // 한 번에 관리할 수 있는 방법 찾아보기
  const [hide, setHide] = useState(true);
  const [hide2, setHide2] = useState(true);

  // const passwordArrray = {};

  async function signUpApi() {
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_SERVER_URL}/users/register`,
        {
          email: emailRef.current?.value,
          password: passwordRef.current?.value,
          nickname: nickNameRef.current?.value,
        },
      );
      console.log(res);
      // setAlertTitle("회원가입 성공");
      // setAlertDescription("회원가입을 완료했습니다. 로그인을 진행해주세요.");
      // setAlert(true);
      // setIsErr(false);
      // navigate({ to: "/login" });
      setAlertConfig({
        isOpen: true,
        title: "회원가입 성공",
        description: "회원가입을 완료했습니다. 로그인을 진행해주세요.",
        isErr: false,
        className: "text-blue-500",
        onClose: () => navigate({ to: "/login" }),
      });
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log("회원가입 에러!:", error.response?.data.message);

        // setAlertTitle("회원가입 오류");
        // setAlertDescription(error.response?.data.message);
        // setAlert(true);
        // setIsErr(true);
        setAlertConfig({
          isOpen: true,
          title: "회원가입 오류",
          description: error.response?.data.message,
          isErr: true,
          onClose: () => setAlertConfig((prev) => ({ ...prev, isOpen: false })),
        });
      }
      console.log(error);
    }
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (password !== passwordRef.current?.value) {
      // setAlertTitle("회원가입 오류");
      // setAlertDescription("비밀번호가 맞지 않습니다!");
      // setAlert(true);
      // setIsErr(true);
      setAlertConfig({
        isOpen: true,
        title: "회원가입 오류",
        description: "비밀번호가 맞지 않습니다!",
        isErr: true,
        onClose: () => setAlertConfig((prev) => ({ ...prev, isOpen: false })),
      });
    }

    signUpApi();
  }

  function handleFillRef() {
    try {
      if (nickNameRef.current && emailRef.current && passwordRef.current) {
        nickNameRef.current.value = "콩쥐땃쥐";
        emailRef.current.value = "test123@test.com";
        passwordRef.current.value = "test123!";
      }
    } catch (error) {
      console.log(error);
    }
  }

  // function handleHide() {}

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
            이음에 오신 걸 환영해요
          </h3>
          <p className="text-slate-400 mt-2 font-medium">
            새 계정을 만들어보세요
          </p>
        </div>
        <form className="space-y-1" onSubmit={handleSubmit}>
          <div className="space-y-2 mb-4">
            <p className="text-sm font-bold text-slate-700 ml-1 mb-2">닉네임</p>
            <input
              type="text"
              ref={nickNameRef}
              placeholder="콩쥐땃쥐"
              className="w-full px-5 py-3.5 bg-slate-50 border-none rounded-xl focus:ring-2 focus:ring-blue-500/20 outline-none transition-all placeholder:text-slate-300 text-slate-700"
            />
          </div>
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
                placeholder="6자 이상 입력하세요"
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
          <div className="space-y-2 mb-4">
            <p className="text-sm font-bold text-slate-700 ml-1 mb-2">
              비밀번호 확인
            </p>
            <div className="relative">
              <input
                type={`${hide2 ? "password" : "text"}`}
                placeholder="비밀번호를 다시 입력하세요"
                onChange={(e) => setPassword(e.currentTarget.value)}
                className="w-full px-5 py-3.5 bg-slate-50 border-none rounded-xl focus:ring-2 focus:ring-blue-500/20 outline-none transition-all placeholder:text-slate-300 text-slate-700"
              />
              <button
                type="button"
                onClick={() => setHide2(!hide2)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
              >
                {hide2 ? <Eye size={20} /> : <EyeOff size={20} />}
              </button>
            </div>
          </div>
          <button
            type="submit"
            className="w-full py-3.5 bg-[#3581FA] text-white rounded-2xl font-bold text-lg hover:bg-blue-600 transition-all mt-4"
          >
            회원가입
          </button>
        </form>
        <div className="mt-5 p-5 bg-slate-50 rounded-2xl">
          <p className="text-sm text-slate-500 font-normal">
            테스트 계정으로 빠르게 회원가입하기
          </p>
          <button
            type="button"
            className="text-blue-600 text-sm font-bold mt-1 hover:underline flex items-center gap-1"
            onClick={handleFillRef}
          >
            데모 계정 채우기 →
          </button>
        </div>
        <div className="mt-8 text-center">
          <p className="text-slate-400 font-normal text-sm">
            이미 계정이 있으신가요?
            <Link
              to="/login"
              className="text-blue-600 font-bold ml-2 hover:underline"
            >
              로그인
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default RegisterMain;
