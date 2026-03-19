import { redirect } from "@tanstack/react-router";
import useAuthStore from "@/store/useAuthStore";

export const verifyAuthHome = () => {
  const { isLoggedIn } = useAuthStore.getState(); // zustand를 통해 저장하고 있는 사용자 정보
  if (!isLoggedIn) {
    throw redirect({ to: "/", search: { redirect: window.location.pathname } });
  }
};

export const verifyAuthMain = () => {
  const { isLoggedIn } = useAuthStore.getState(); // zustand를 통해 저장하고 있는 사용자 정보
  if (isLoggedIn) {
    throw redirect({
      to: "/home",
      search: { redirect: window.location.pathname },
    });
  }
};
