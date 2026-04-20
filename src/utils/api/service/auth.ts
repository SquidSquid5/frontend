import { instance } from "../axios";
import type { LoginRequest } from "../types/authType";

// export const TestService = () => {
//   /**
//    * 포스트 상세 조회 - id 별 조회
//    * @api-doc: https://jsonplaceholder.typicode.com/guide/
//    */
//   const getPosts = async (
//     params: TestRequest.GetPostsParams,
//     { userId }: TestRequest.GetPostsQuery,
//   ) => {
//     const response = (await instance.get(`${url}/${params.id}`, {
//       params: { userId },
//     })) as TestResponse.GetPosts;
//     return response;
//   };
// };

export const loginService = () => {
  const logIn = async (email: string, password: string) => {
    try {
      const response = (await instance.post("/users/login", {
        email,
        password,
      })) as LoginRequest;
      console.log("res", response);

      return response;
    } catch (error) {
      return Promise.reject(error);
    }
  };

  return { logIn };
};
