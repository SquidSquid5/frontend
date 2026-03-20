import axios, { InternalAxiosRequestConfig } from "axios";
import useAuthStore from "@/store/useAuthStore";

export const instance = axios.create({
  baseURL: import.meta.env.VITE_SERVER_URL,
  //   headers: { Authorization: `Bearer ${useAuthStore.getState().token}` },
});

//요청 인터셉터
instance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // 요청이 전달되기 전에 작업 수행

    //해당 메서드를 통해 instance로 보내진 모든 http 요청에 개입...
    // config 에는 요청을 보내는 모든 내용이 담겨있는데, header에 token을 추가한 후 요청이 이루어지도록.,,,
    // 즉 이제는 토큰이 필요한 api를 호출할 때마다 토큰을 api에 담아 보낼 필요가 없다,.

    //모든 요청에 token 담아주기
    config.headers.Authorization = useAuthStore.getState().token;
    return config;
  },
  (error) => {
    //요청 오류가 있는 작업 수행
    if (axios.isAxiosError(error)) console.log("에러 : ", error.response?.data);
  },
);

// 응답 인터셉터
instance.interceptors.response.use(
  //response 에서도 interceptor를 설정할 수 있음

  (response) => {
    return response;
  },
  async (error) => {
    const originreq = error.config;

    if (error.response.status === 401 && originreq && !originreq._retry) {
      originreq._retry = true;

      try {
        // 새로운 accessToken을 얻기 위한 API 요청
        const newAccessToken = await getNewAccessToken();

        // 얻은 새로운 accessToken을 사용하여 요청의 Authorization 헤더를 업데이트
        originreq.headers.Authorization = newAccessToken;

        // 새로운 accessToken을 사용하여 기존 요청을 다시 보낸다.
        return instance(originreq);
      } catch (error) {
        // 새로운 accessToken을 얻는 동안에도 에러가 발생하는 경우
        console.error(
          "새로운 accessToken을 얻는 동안에 에러가 발생했습니다.",
          error,
        );
        return Promise.reject(error);
      }
    }

    // 401 에러가 아니거나, originalRequest가 없거나, 이미 재시도를 한 경우에는 그냥 에러를 반환
    return Promise.reject(error);
  },
);

// 새로운 accessToken을 얻기 위한 비동기 함수
// async function getNewAccessToken() {
//   // 여기에 refreshToken을 사용하여 새로운 accessToken을 얻기 위한 API 요청을 추가
//   // aixosinstance가 아닌 다른 인스턴스를 사용해야 한다.
// }

// 그리고 필요하지 않은 interceptor는 다음 코드를 통해 삭제할 수 있습니다.

// const myInterceptor = axios.interceptors.request.use(function () {
//   /*...*/
// });
// axios.interceptors.request.eject(myInterceptor);
