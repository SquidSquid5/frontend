import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware"; //로그인 시 /home으로 이동하게 해놨는데, persist가 없으면 이동할 때 가지고 있던 값들을 다 버리고 가서 로그인을 해도 로그인을 해달라는 창이 뜬다....

interface AuthStore {
	userId: string | null;
	token: string | null;
	nickname: string | null;
	isLoggedIn: boolean;
	setLogin: (userId: string, token: string, nickname: string) => void;
	setLogout: () => void;
}

const useAuthStore = create<AuthStore>()(
	persist(
		(set) => ({
			userId: null,
			token: null,
			nickname: null,
			isLoggedIn: false,
			setLogin: (userId, token, nickname) =>
				set({ userId, token, nickname, isLoggedIn: true }),
			setLogout: () =>
				set({ userId: null, token: null, nickname: null, isLoggedIn: false }),
		}),
		{
			name: "login-storage",
			storage: createJSONStorage(() => sessionStorage), //sessionStorage는 탭을 닫으면 삭제, localStorage는 브라우저를 닫아도 유지이다.
			// partialize
		},
	),
);

export default useAuthStore;
