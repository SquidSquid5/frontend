import axios, {
  type AxiosError,
  type AxiosResponse,
  type InternalAxiosRequestConfig,
} from "axios";
import useAuthStore from "@/store/useAuthStore";

export const instance = axios.create({
  baseURL: import.meta.env.VITE_SERVER_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

//요청 인터셉터, 요청을 보내기 전에 요청을 가로채서 요청을 수정
instance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // 요청이 전달되기 전에 작업 수행

    //해당 메서드를 통해 instance로 보내진 모든 http 요청에 개입...
    // config 에는 요청을 보내는 모든 내용이 담겨있는데, header에 token을 추가한 후 요청이 이루어지도록.,,,
    // 즉 이제는 토큰이 필요한 api를 호출할 때마다 토큰을 api에 담아 보낼 필요가 없다,.

    //모든 요청에 token 담아주기
    config.headers.Authorization = useAuthStore.getState().token;
    console.log({
      headers: config.headers,
      method: config.method,
      url: config.url,
      baseUrl: config.baseURL,
      data: config.data,
      params: config.params,
    });
    return config;
  },
  (error: AxiosError) => {
    //요청 오류가 있는 작업 수행
    if (axios.isAxiosError(error)) console.log("에러 : ", error.response?.data);
    console.log("API request error", error.config);
    return Promise.reject(error);
  },
);

// 응답 인터셉터, 응답을 받았을 때 응답을 가로채서 응답을 수정
instance.interceptors.response.use(
  //response 에서도 interceptor를 설정할 수 있음

  (response: AxiosResponse) => {
    console.log({
      status: response.status,
      statusText: response.statusText,
      headers: response.headers,
      data: response.data,
    });

    return response.data; // 서버에서 받는 데이터가 data 속성에 들어있는 경우
    // return response.data.data; // 서버에서 받는 데이터가 data.data 속성에 들어있는 경우
  },

  async (error: AxiosError) => {
    console.warn(error.config?.url, " API response error", {
      response_data: error.response?.data,
      status: error.response?.status,
      request_info: {
        method: error.config?.method,
        url: error.config?.url,
        baseUrl: error.config?.baseURL,
        headers: error.config?.headers,
        params: error.config?.params,
        data: error.config?.data,
      },
    });
    // 400 404 500     401 403
    if (error.status === 400) {
      console.log("400");
      return console.log("400");
    }
    if (error.status === 401) {
      console.log("401");
      return console.log("401");
    }
    if (error.status === 403) {
      console.log("403");
      return console.log("403");
    }
    if (error.status === 404) {
      console.log("404");
      return console.log("404");
    }
    if (error.status === 405) {
      console.log("405");
      return console.log("405");
    }
    return Promise.reject(error);
  },
);

// 새로운 accessToken을 얻기 위한 비동기 함수
// async function getNewAccessToken() {
//   // 여기에 refreshToken을 사용하여 새로운 accessToken을 얻기 위한 API 요청을 추가
//   // aixosinstance가 아닌 다른 인스턴스를 사용해야 한다.
// }

// 그리고 필요하지 않은 interceptor는 다음 코드를 통해 삭제할 수 있다.

// const myInterceptor = axios.interceptors.request.use(function () {
//   /*...*/
// });
// axios.interceptors.request.eject(myInterceptor);
